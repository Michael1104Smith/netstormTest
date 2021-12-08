import React, { useState } from 'react';
import axios from 'axios';

import {
    Link
} from "react-router-dom";

import { useSelector } from "react-redux";
import LoadingOverlay from 'react-loading-overlay';

const OfferList = (props) => {

    let tabData_2 = props.tabData_2;
    const nftId = props.idx.toString();
    const allNft = useSelector((state) => state.allNft);
    const account = allNft.account;
    let nftItem = useSelector((state) =>
      state.allNft.nft.filter((nft) => nft.tokenId === nftId)
    );

    let owner, tokenId, isForSale;
    if (nftItem && nftItem.length > 0) {
        owner = nftItem[0].owner;
        tokenId = nftItem[0].tokenId;
        isForSale = nftItem[0].isForSale;
    }

    const [isLoading, setIsLoading] = useState(false)

    async function approve(idx, approved) {
        setIsLoading(true);
        const api = axios.create({
            baseURL: process.env.REACT_APP_APPROVEOFFER_URL
            });
        const data = {"idx": idx, "itemid": tokenId, "approved": approved};
        const response = await api.post("/tokens", JSON.stringify(data), {
            headers: {
                "Content-Type": `multipart/form-data`,
            },
        });
        if (!response["data"]["error"]) {
            tabData_2[idx].approved = approved;
        }
        alert(response["data"]["message"]);
        console.log(response);
        setIsLoading(false);
    }

    return (
        <div>
            <LoadingOverlay
                active={isLoading}
                spinner
                text={'Updating an offer...'}
                >
                <ul className="list-unstyled">
                    {/* Single Tab List */}
                    {tabData_2.map((item, idx) => {
                        return (
                            <li key={`tdt_${idx}`} className="single-tab-list d-flex align-items-center">
                                <img className="avatar-sm rounded-circle mr-3" src={item.img} alt="" />
                                <p className="m-0">Bid listed for <strong>{item.price}</strong> {item.time} <br />by <Link to="/author">{item.author}</Link></p>
                                {owner === account && isForSale && !item.approved && (
                                    <button className="d-block btn btn-bordered-white" onClick={() => approve(idx, true)}>Approve</button>)
                                }
                                {owner === account && isForSale && item.approved && (
                                    <button className="d-block btn btn-bordered-white" onClick={() => approve(idx, false)}>UnApprove</button>)
                                }
                                {owner !== account && isForSale && (
                                    <label>{item.approved?'(Approved)':'(UnApproved)'}</label>)
                                }
                            </li>
                        );
                    })}
                </ul>
            </LoadingOverlay>
        </div>
    )
}

export default OfferList;