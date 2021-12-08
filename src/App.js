import React from 'react';
import { useWeb3React } from '@web3-react/core'

// importing MyRouts where we located all of our theme
import MyRouts from './routers/routes'
import LoadingOverlay from 'react-loading-overlay';

import { useState, useEffect } from 'react'

import analytics from '../src/utils/analytics'
import { walletLogin } from '../src/utils/account'

import { useDispatch } from "react-redux";
import ArtMarketplace from "../src/contracts/ArtMarketplace.json"
import ArtToken from "../src/contracts/ArtToken.json";
// import getWeb3 from "../../utils/getWeb3";
import {
  setNft,
  setAccount,
  setTokenContract,
  setMarketContract,
} from "../src/redux/actions/nftActions";
import Web3 from 'web3';
import axios from 'axios';



function App() {

    const {  account,  activate } = useWeb3React()
    
    const [isLoading, setIsLoading] = useState(false)

    const api = axios.create({
      baseURL: process.env.REACT_APP_SETNFTS_URL
    });

    useEffect(() => {
        axios.get(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR`)
        .then(res1 => {
            localStorage.setItem('eUsd', Number(res1.data.USD));
        });
        if (localStorage.getItem('userConnectedWallet') === 'true' && !account) {
            analytics.track('On Connect', {
                category: 'general',
                label: "Connecting",
                })
            walletLogin(true, activate)
            localStorage.setItem('userConnectedWallet', 'true')
        } else if (!account) {
            localStorage.setItem('userConnectedWallet', 'false')
        }
      });
    if (account) {
        localStorage.setItem('contactAddress', account);
        localStorage.setItem('userConnectedWallet', 'true')
    }
    
    const dispatch = useDispatch();

    useEffect(() => {
        let itemsList = [];
        const init = async () => {
            try {
                // const web3 = await getWeb3();

                let web3;
                if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
                    // We are in the browser and metamask is running
                    web3 = new Web3(window.web3.currentProvider);
                } else {
                    // We are on the server *OR* the user is not running metamask
                    const provider = new Web3.providers.HttpProvider(
                        'https://rinkeby.infura.io/v3/4958272017084c51a75ac539bc44f59d'
                    );
                    web3 = new Web3(provider);
                }
                
                setIsLoading(true);
                const accounts = await web3.eth.getAccounts();
                
                if (typeof accounts === undefined) {
                    alert("Please login with Metamask!");
                    console.log("login to metamask");
                }

                const networkId = await web3.eth.net.getId();
                try {
                    const artTokenContract = new web3.eth.Contract(
                        ArtToken.output.abi,
                        process.env.REACT_APP_ARTTOKEN
                      );
                      // console.log("Contract: ", artTokenContract);
                      const marketplaceContract = new web3.eth.Contract(
                        ArtMarketplace.output.abi,
                        process.env.REACT_APP_ARTMARKETPLACE
                      );
                      const totalSupply = Number(await artTokenContract.methods
                        .totalSupply()
                        .call());
                      const totalItemsForSale = Number(await marketplaceContract.methods
                        .totalItemsForSale()
                        .call());
            
                      for (var tokenId = 1; tokenId <= totalSupply; tokenId++) {
                        let item = await artTokenContract.methods.Items(tokenId).call();
                        let owner = await artTokenContract.methods.ownerOf(tokenId).call();
                        // const response = await api
                        //   .get(`/tokens/${tokenId}`)
                        //   .catch((err) => {
                        //     console.log("Err: ", err);
                        //   });
                        // console.log("response: ", response);
                        itemsList.push({
                            tokenId: item.id,
                            creator: item.creator,
                            owner: owner,
                            uri: item.uri,
                            isForSale: false,
                            saleId: null,
                            price: 0,
                            isSold: null,
                        });
                      }
                      if (totalItemsForSale > 0) {
                        for (var saleId = 0; saleId < totalItemsForSale; saleId++) {
                          let item = await marketplaceContract.methods
                            .itemsForSale(saleId)
                            .call();
                          let active = await marketplaceContract.methods
                            .activeItems(item.tokenId)
                            .call();
            
                          let itemListIndex = itemsList.findIndex(
                            (i) => i.tokenId === item.tokenId
                          );
            
                          itemsList[itemListIndex] = {
                            ...itemsList[itemListIndex],
                            isForSale: active,
                            saleId: item.id,
                            price: item.price,
                            isSold: item.isSold,
                          };
                        }
                      }

                      const data = {userid: localStorage.getItem("userid"), account: account, itemList:itemsList};

                      await api.post("/tokens", JSON.stringify(data), {
                        headers: {
                          "Content-Type": `multipart/form-data`,
                        },
                      });

                      console.log(itemsList);
                      // console.log(response);
                      dispatch(setAccount(accounts[0]));
                      dispatch(setTokenContract(artTokenContract));
                      dispatch(setMarketContract(marketplaceContract));
                      dispatch(setNft(itemsList));
                      setIsLoading(false);
                } catch (error) {
                    console.error("Error", error);
                    alert(
                        "Contracts not deployed to the current network " +
                        networkId.toString()
                    );
                    setIsLoading(false);
                }
            } catch (error) {
                alert(
                `Failed to load web3, accounts, or contract. Check console for details.` +
                    error
                );
                console.error(error);
                setIsLoading(false);
            }
        };
        if(localStorage.getItem('logged')==="true") init();
    }, [dispatch, account]);

  return (
      <LoadingOverlay
          active={isLoading}
          spinner
          text='Loading NFT...'
          >
        <div>
          <MyRouts />
          
        </div>
      </LoadingOverlay>
  );
}

export default App;