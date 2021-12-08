import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
    Link,
    useHistory
} from "react-router-dom";
import ReactModal from 'react-modal';

import { useDispatch, useSelector } from "react-redux";
import { selectedNft, removeSelectedNft } from "../../redux/actions/nftActions";
import LoadingOverlay from 'react-loading-overlay';

const Checkout = (props) => {

    let history = useHistory();
    const nftId = !!props.idx?props.idx.toString():-1;
    const allNft = useSelector((state) => state.allNft);
    const marketplaceContract = allNft.marketplaceContract;
    const account = allNft.account;
    let nft = useSelector((state) => state.nft);
    let nftItem = useSelector((state) =>
      state.allNft.nft.filter((nft) => nft.tokenId === nftId)
    );
    const {
      owner,
      tokenId,
      saleId,
      isForSale,
    } = nft;
    const dispatch = useDispatch();
  
    // console.log(nft);
    // console.log(nftItem);

    const [isLoading, setIsLoading] = useState(false)
    const [isChecked, setChecked] = useState(false)
    const rprice = props.approved===true?props.price:props.ethprice;
    const [eprice, setEPrice] = useState(rprice);

    useEffect(() => {
        if (nftId && nftId !== "" && nftItem) dispatch(selectedNft(nftItem[0]));
        return () => {
            dispatch(removeSelectedNft());
        };
    }, [nftId]);

    useEffect(() => {
        const rprice = props.approved===true?props.price:props.ethprice;
        setEPrice(rprice);
    }, [props]);

    const scriptApi = axios.create({
        baseURL: process.env.REACT_APP_SCRIPTS_URL
    });

    async function putForSale(id, price) {
        if (!isChecked) {
          alert('You should check the term first!');
        } else {
            // const itemIdex = getItemIndexBuyTokenId(id);
        
            // const marketAddress = ArtMarketplace.networks[1337].address;
            setIsLoading(true);

            const api = axios.create({
                baseURL: process.env.REACT_APP_SETPRICE_URL
            });

            const data = {"itemid": tokenId, "price": eprice};
            const response = await api.post("/tokens", JSON.stringify(data), {
                headers: {
                "Content-Type": `multipart/form-data`,
                },
            });
            if (!response["data"]["error"]) {
                try {

                    await allNft.artTokenContract.methods.approve(process.env.REACT_APP_ARTMARKETPLACE, tokenId).send({from: account});
        
                    price *= 1e18;
    
                    const receipt2 = await marketplaceContract.methods
                        .transferFee(process.env.REACT_APP_CREATOR)
                        .send({ gas: 210000, value: price*2.5/100, from: account });
                    console.log(receipt2);
                    const receipt1 = await marketplaceContract.methods
                        .putItemForSale(id, price)
                        .send({ gas: 210000, from: account });
                    console.log(receipt1);

                    const data = {"itemid": tokenId, "userid": localStorage.getItem("userid"), "sellPrice": price/1e18, "status": 1};
                    await scriptApi.post("/tokens", JSON.stringify(data), {
                        headers: {
                        "Content-Type": `multipart/form-data`,
                        },
                    });

                    setIsLoading(false);
                    history.push("/");
                    window.location.reload(false);
                }
                catch (error) {
                    console.error("Error, puting for sale: ", error);
                    alert("Error while puting for sale!");
                    setIsLoading(false);
                }
            }
        }
      }

    // async function changePrice(id, price) {
    //     if (!isChecked) {
    //         alert('You should check the term first!');
    //     } else {
    //         try {
    //             // const itemIdex = getItemIndexBuyTokenId(id);
            
    //             // const marketAddress = ArtMarketplace.networks[1337].address;
    //             setIsLoading(true);
    //             price = 0.00015;
    //             price *= 1e18;

    //             const receipt = await marketplaceContract.methods
    //                 .changePrice(tokenId, id, price)
    //                 .send({ gas: 210000, from: account });
    //             console.log(receipt);
    //             setIsLoading(false);
    //             window.location.reload(false);
    //         } catch (error) {
    //             console.error("Error, Change for sale: ", error);
    //             alert("Error while changing for sale!");
    //             setIsLoading(false);
    //         }
    //     }
    // }
    
    async function buy(saleId, price) {
        if (!isChecked) {
        alert('You should check the term first!');
        } else {
        try {
            setIsLoading(true);
            price *= 1e18;
            const receipt2 = await marketplaceContract.methods
                .transferFee(process.env.REACT_APP_CREATOR)
                .send({ gas: 210000, value: price*2.5/100, from: account });
            console.log(receipt2);
            const receipt = await marketplaceContract.methods
                .buyOfferItem(saleId, price)
                .send({ gas: 210000, value: price, from: account });
            console.log(receipt);
            // const id = receipt.events.itemSold.id; ///saleId

            if (props.approved) {
                const api = axios.create({
                    baseURL: process.env.REACT_APP_REMOVEOFFER_URL
                });
                const data = {"userid": -1, "itemid": tokenId, "price": price/1e18};
                await api.post("/tokens", JSON.stringify(data), {
                    headers: {
                    "Content-Type": `multipart/form-data`,
                    },
                });
            }

            const data = {"itemid": tokenId, "userid": localStorage.getItem("userid"), "status": 2};
            await scriptApi.post("/tokens", JSON.stringify(data), {
                headers: {
                "Content-Type": `multipart/form-data`,
                },
            });
            setIsLoading(false);
            history.push("/");
            window.location.reload(false);
        } catch (error) {
            console.error("Error, buying: ", error);
            alert("Error while buying!");
            setIsLoading(false);
        }
        }
    }

    const checkChange = (e) => {
        setChecked(e.target.checked);
    }

    const eChange = (e) => {
        setEPrice(e.target.value);
    }

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#000'
        },
      };

    return (
        <ReactModal 
            isOpen={props.showModal}
            contentLabel="onRequestClose Example"
            onRequestClose={props.onClose}
            style={customStyles}
            shouldCloseOnOverlayClick={false}
            ariaHideApp={false}
            >
            <LoadingOverlay
                active={isLoading}
                spinner
                text={owner === account?'Selling Item...':'Buying Item...'}
                >
                <header>
                    <p className="close" href="#" onClick={props.onClose} />
                    <h3>Complete Checkout</h3>
                </header>
                <div className="col-12 checkout">
                    <div className = "col-12 col-md-12">
                        <div className = "col-12 col-md-12 d-flex justify-content-between">
                            <span>Item</span>
                            <span>Subtotal</span>
                        </div>
                    </div>
                    <div className = "col-12 col-md-12 subtotal">
                        <div className = "col-12 col-md-12 d-flex justify-content-between">
                            <div>
                                <div className="d-flex align-items-center">
                                    <Link to={`/author/${props.userid}`}><img className="avatar-md rounded-circle" src={props.imgData} alt="" /></Link>
                                    <div className="ml-3">
                                        <Link to={`/author/${props.userid}`}>{props.username}</Link>
                                        <label>{props.title}</label>
                                        <label>Royalties: 10%</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="d-flex align-items-center">
                                    <div className="mr-2">
                                        { owner === account && !isForSale && (
                                            <div className="check-div">
                                                <input value={eprice} onChange={eChange} className="check-input" /> ETH
                                            </div>
                                        )}
                                        {owner !== account && isForSale && (
                                            <label>{`${eprice} ETH`}</label>
                                        )}
                                        <label>{`$${(eprice*Number(localStorage.getItem("eUsd"))).toFixed(2)}`}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className = "col-12 col-md-12 total">
                        <div className = "col-12 col-md-12 d-flex justify-content-between">
                            <div>
                                <div className="d-flex align-items-center">
                                    <div className="ml-3">
                                        <label>Total</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="d-flex align-items-center">
                                    <div className="mr-2">
                                        <label>{`${eprice} ETH`}</label>
                                        <label>{`$${(eprice*Number(localStorage.getItem("eUsd"))).toFixed(2)}`}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className = "col-12 col-md-12 mt-3">
                        <div className="form-check form-check-inline text-center">
                            <input className="form-check-input" type="checkbox" name="inlineCheckOptions" id="inlineCheck1" onChange={checkChange} />
                            <Link to="/privacy-terms" className="form-check-label" for="inlineCheck1">By checking this box, I agree to SpaceGrime's NFT marketplace's <span>Terms of Service</span></Link>
                        </div>
                    </div>
                </div>
                <footer>
                    <div className = "col-12 col-md-12 d-flex justify-content-between mt-3">
                        <div className="col-6 col-md-6">
                        {   owner === account && !isForSale && (
                            <button className="d-block btn btn-bordered-white"
                            onClick={() => putForSale(tokenId, eprice)}>Sell</button>)
                        }
                        {/* {   owner === account && (
                            <button className="d-block btn btn-bordered-white"
                            onClick={() => changePrice(saleId, props.ethprice)}>Change Price</button>)
                        } */}
                        {owner !== account && isForSale && (
                            <button className="d-block btn btn-bordered-white"
                            onClick={() => buy(saleId, eprice)}>Buy</button>)
                        }
                        {owner !== account && !isForSale && (
                            <button className="d-block btn btn-bordered-white" disabled>Item shows not for sale</button>)
                        }
                        {owner === account && isForSale && (
                            <button className="d-block btn btn-bordered-white" disabled>This item has been already enabled for sale</button>)
                        }
                        </div>
                        <div className="col-6 col-md-6 text-right">
                            <button className="btn btn-bordered-white" onClick={props.onClose}>Cancel</button>
                        </div>
                        {/* <div>
                            <button className="d-block btn btn-bordered-white">Add Funds</button>
                        </div> */}
                    </div>
                </footer>
            </LoadingOverlay>
        </ReactModal>
    )
}

export default Checkout;