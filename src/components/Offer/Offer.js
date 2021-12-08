import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import ReactModal from 'react-modal';

import {
    Link
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { selectedNft, removeSelectedNft } from "../../redux/actions/nftActions";
import LoadingOverlay from 'react-loading-overlay';

const Offer = (props) => {

    let history = useHistory();
    const nftId = !!props.idx?props.idx.toString():-1;
    const allNft = useSelector((state) => state.allNft);
    const account = allNft.account;
    let nft = useSelector((state) => state.nft);
    let nftItem = useSelector((state) =>
      state.allNft.nft.filter((nft) => nft.tokenId === nftId)
    );
    const {
      owner,
      tokenId,
      isForSale
    } = nft;
    const dispatch = useDispatch();
  
    // console.log(nft);
    // console.log(nftItem);

    const [isLoading, setIsLoading] = useState(false)
    const [isChecked, setChecked] = useState(false)
    const [ethVal, setEthVal] = useState(Number(props.ethprice))
    const [usdVal, setUsdVal] = useState((Number(props.ethprice)*Number(localStorage.getItem("eUsd"))).toFixed(2))

    useEffect(() => {
        if (nftId && nftId !== "" && nftItem) {
            dispatch(selectedNft(nftItem[0]));
        }
        return () => {
            dispatch(removeSelectedNft());
        };
    }, [nftId]);
    useEffect(() => {
        setEthVal(Number(props.ethprice));
        setUsdVal((Number(props.ethprice)*Number(localStorage.getItem("eUsd"))).toFixed(2));
    }, [props]);

    async function makeOffer() {
        if (!isChecked) {
            alert('You should check the term first!');
        } else {
            setIsLoading(true);
            const api = axios.create({
                baseURL: process.env.REACT_APP_SETOFFERS_URL
              });
            const data = {"userid": localStorage.getItem("userid"), "itemid": tokenId, "price": ethVal};
            const response = await api.post("/tokens", JSON.stringify(data), {
                headers: {
                  "Content-Type": `multipart/form-data`,
                },
              });
            alert(response["data"]["message"]);
            console.log(response);
            setIsLoading(false);
            history.push("/");
        }
    }

    async function cancelOffer() {
        if (!isChecked) {
            alert('You should check the term first!');
        } else {
            setIsLoading(true);
            const api = axios.create({
                baseURL: process.env.REACT_APP_REMOVEOFFER_URL
              });
            const data = {"userid": localStorage.getItem("userid"), "itemid": tokenId};
            const response = await api.post("/tokens", JSON.stringify(data), {
                headers: {
                  "Content-Type": `multipart/form-data`,
                },
              });
            alert(response["data"]["message"]);
            console.log(response);
            setIsLoading(false);
            history.push("/");
        }
    }

    const checkChange = (e) => {
        setChecked(e.target.checked);
    }

    const ethChange = (e) => {
        setEthVal(e.target.value);
        setUsdVal((Number(e.target.value)*Number(localStorage.getItem("eUsd"))).toFixed(2))
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
            isOpen={props.showOfferModal}
            contentLabel="onRequestClose Example"
            onRequestClose={props.handleCloseOfferModal}
            style={customStyles}
            shouldCloseOnOverlayClick={false}
            ariaHideApp={false}
            >
            <LoadingOverlay
                active={isLoading}
                spinner
                text={props.isCheckOffer?'Removing an offer...':'Making an offer...'}
                >
                <header>
                    <p className="close" href="#" onClick={props.handleCloseOfferModal} />
                    <h3>Make an offer</h3>
                </header>

                <div className="col-12">
                    <div className = "col-12 col-md-12">
                        <div className = "col-12 col-md-12 justify-content-between">
                            {owner !== account && isForSale && !props.isCheckOffer && (
                            <div className="d-flex align-items-center">
                                <div className = "col-2 col-md-2 d-flex"><label>ETH</label></div>
                                <div className = "col-8 col-md-8 d-flex"><input type="number" onChange={ethChange} value={ethVal} /></div>
                                <div className = "col-2 col-md-2 d-flex"><label>{`$${usdVal}`}</label></div>
                            </div>
                            )}

                            {owner !== account && isForSale && props.isCheckOffer && (
                                    <h4>You've already make an offer for this item!</h4>
                            )}
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
                        <div className="col-6 col-md-6 text-right">
                        {owner !== account && isForSale && !props.isCheckOffer && (
                            <button className="d-block btn btn-bordered-white"
                            onClick={() => makeOffer()}>Make Offer</button>)
                        }
                        {owner !== account && isForSale && props.isCheckOffer && (
                            <button className="d-block btn btn-bordered-white" 
                            onClick={() => cancelOffer()}>Cancel Offer</button>)
                        }
                        {owner !== account && !isForSale && (
                            <button className="d-block btn btn-bordered-white" disabled>Item shows not for sale</button>)
                        }
                        {owner === account && isForSale && (
                            <button className="d-block btn btn-bordered-white" disabled>Owner don't need to make an offer</button>)
                        }
                        {owner === account && !isForSale && (
                            <button className="d-block btn btn-bordered-white" disabled>You can sell this item, not make an offer</button>)
                        }
                        </div>
                        <div className="col-6 col-md-6 text-right">
                            <button className="btn btn-bordered-white" onClick={props.handleCloseOfferModal}>Cancel</button>
                        </div>
                    </div>
                </footer>
            </LoadingOverlay>
        </ReactModal>
    )
}

export default Offer;