import React, { Component } from 'react';
import axios from 'axios';
import Checkout from '../Checkout/Checkout'
import Offer from '../Offer/Offer'
import OfferList from '../OfferList/OfferList'
import Web3 from "web3";
import { Checkmark}  from 'react-checkmark';

  import {
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
  } from "react-share";

  import {
    FacebookIcon,
    LinkedinIcon,
    TelegramIcon,
    TwitterIcon,
  } from "react-share";

import {
    Link,
    withRouter
  } from "react-router-dom";

let initData = {
    itemImg: "/img/auction_2.jpg",
    date: "2022-03-30",
    tab_1: "Bids",
    tab_2: "Offers",
    tab_3: "Details",
    ownerImg: "/img/avatar_1.jpg",
    itemOwner: "Themeland",
    created: "15 Jul 2021",
    title: "Walking On Air",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
    price_1: "1.5 ETH",
    price_2: "$500.89",
    count: "1 of 5",
    size: "14000 x 14000 px",
    volume: "64.1",
    highest_bid: "2.9 BNB",
    bid_count: "1 of 5",
    btnText: "Place a Bid",
    contactAddress: "",
    offers: "",
    creatorName: "",
    creatorId: "",
    creatorImg: ""
}

const tabData_1 = [
    {
        id: "1",
        img: "/img/avatar_1.jpg",
        price: "14 ETH",
        time: "4 hours ago",
        author: "@arham"
    },
    {
        id: "2",
        img: "/img/avatar_2.jpg",
        price: "10 ETH",
        time: "8 hours ago",
        author: "@junaid"
    },
    {
        id: "3",
        img: "/img/avatar_3.jpg",
        price: "12 ETH",
        time: "3 hours ago",
        author: "@yasmin"
    }
]

const sellerData = [
    {
        id: "1",
        img: "/img/avatar_1.jpg",
        seller: "@ArtNoxStudio",
        post: "Creator"
    },
    {
        id: "2",
        img: "/img/avatar_2.jpg",
        seller: "Virtual Worlds",
        post: "Collection"
    }
]

class ItemDetails extends Component {
    state = {
        initData: {},
        tabData_1: [],
        tabData_2: [],
        sellerData: [],
        idx: -1,
        days: 0,
        hours: 0,
        mintues: 0,
        seconds: 0,
        hideDate: false,
        datum: {},
        tabIndex: 1,
        showModal: false,
        showOfferModal: false,
        userid: -1,
        isCheckOffer: false,
        approved: false,
        price: 0,
        url: ''
    }

    async getUserData(offers) {
        let tabData_2 = [], i;
        for (i = 0; i < offers.length; i++) {
            const offer = offers[i];
            const ud = await axios.get(`${process.env.REACT_APP_GETUSER_URL}?userid=${offer.userid}`);
            const u = ud["data"]["data"][0];
            const diffHour = (((new Date().getTime())/1000 - Number(offer.time)) / 3600).toFixed(2);

            tabData_2.push({id: i+1, img: u.imgURL, price: offer.price + " ETH", time: diffHour + " hours ago", author: "@" + u.username, approved: offer.approved});
        }
        return tabData_2;
    }

    componentDidMount(){
        const params = this.props.match.params;
        const idx = Number(params.idx);
        this.setState({url: process.env.REACT_APP_SERVER_URL + this.props.match.url});
        axios.get(`${process.env.REACT_APP_GETITEMFI_URL}?itemid=${idx}`)
            .then(res => {
                const datum = res.data.data[0];
                initData.itemImg = datum.img;
                initData.date = datum.date;
                initData.ownerImg = datum.seller_thumb;
                initData.itemOwner = datum.owner;
                initData.created = datum.date;
                initData.title = datum.title;
                initData.content = datum.description;
                initData.price_1 = datum.price;
                initData.count = datum.count;
                initData.contactAddress = datum.contactAddress;
                initData.size = datum.size;
                initData.offers = datum.offers;
                initData.creatorName = datum.creatorName;
                initData.creatorId = datum.creatorId;
                initData.creatorImg = datum.creatorImg;
                initData.verified = Number(datum.verified);
                if (initData.offers && initData.offers.length > 0) {
                    const offers = JSON.parse(initData.offers);
                    this.getUserData(offers).then(data => {
                        this.setState({tabData_2: data});
                    });
                }
                const price = Number(datum.price.split(' ')[0]);
                const ethprice = Web3.utils.fromWei(String(price*1e18), "ether");
                initData.price_2 = '$' + (ethprice*Number(localStorage.getItem("eUsd"))).toFixed(2);
                this.isCheck(idx);
                this.setState({
                    initData: initData,
                    tabData_1: tabData_1,
                    sellerData: sellerData,
                    idx: idx,
                    datum: datum,
                    userid: datum.userid,
                    ethprice: ethprice
                });
                this.Timer();
        })
    }

    isCheck = async (tokenId) => {
        const checkapi = axios.create({
            baseURL: process.env.REACT_APP_CHECKOFFER_URL
        });
        // console.log("tokenID:" + tokenId);
        const data = {"userid": localStorage.getItem("userid"), "itemid": tokenId};
        const response = await checkapi.post("/tokens", JSON.stringify(data), {
            headers: {
                "Content-Type": `multipart/form-data`,
            },
            });

        // console.log(response);
        if (response["data"]) {
            const error = response["data"]["error"];
            this.setState({isCheckOffer: error});
            if (error && !!response["data"]["approved"]) {
                this.setState({approved: response["data"]["approved"]});
                this.setState({price: response["data"]["price"]});
            }
        }
    }

    Timer = () => {
        let interval = setInterval(() => {
            const date = this.state.datum.date, s = new Date(), t = date.split("-"), a = [0, 0];
            let c = new Date(t[0], t[1] - 1, t[2], a[0], a[1]).getTime() / 1e3 - s.getTime() / 1e3;
            if (c <= 0 || isNaN(c)) {
                clearInterval(interval); 
                this.setState({
                    days: 0,
                    hours: 0,
                    mintues: 0,
                    seconds: 0
                })
            } else {
                const e = Math.floor(c / 86400);
                c %= 86400;
                const i = Math.floor(c / 3600);
                c %= 3600;
                const u = Math.floor(c / 60);
                c = Math.floor(c % 60);
                this.setState({
                    days: e,
                    hours: i,
                    mintues: u,
                    seconds: c
                })
            }
        }, 1e3)
    }

    bidTab = () => {
        this.setState({ tabIndex: 1 });
    }

    contactTab = () => {
        this.setState({ tabIndex: 2 });
    }
  
    handleOpenModal = () => {
      this.setState({ showModal: true });
    }
    
    handleCloseModal = () => {
      this.setState({ showModal: false });
    }
  
    handleOpenOfferModal = () => {
      this.setState({ showOfferModal: true });
    }
    
    handleCloseOfferModal = () => {
      this.setState({ showOfferModal: false });
    }

    render() {

        return (
            <section className="item-details-area">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-12 col-lg-5">
                            <div className="item-info">
                                <div className="item-thumb text-center">
                                    <img src={this.state.initData.itemImg} alt="" />
                                </div>
                                <div className="card no-hover countdown-times my-4">
                                    <div className="countdown d-flex justify-content-center" data-date={this.state.initData.date}>
                                        <div className='countdown-container days'>
                                            <span className='countdown-heading days-top'>Days</span>
                                            <span className='countdown-value days-bottom'>{this.state.days}</span>
                                        </div>
                                        <div className='countdown-container hours'>
                                            <span className='countdown-heading hours-top'>Hours</span>
                                            <span className='countdown-value hours-bottom'>{this.state.hours}</span>
                                        </div>
                                        <div className='countdown-container minutes'>
                                            <span className='countdown-heading minutes-top'>Minutes</span>
                                            <span className='countdown-value minutes-bottom'>{this.state.mintues}</span>
                                        </div>
                                        <div className='countdown-container seconds'>
                                            <span className='countdown-heading seconds-top'>Seconds</span>
                                            <span className='countdown-value seconds-bottom'>{this.state.seconds}</span>
                                        </div>
                                    </div>
                                </div>
                                {/* <HelmetMetaData image={this.state.initData.itemImg} description={this.state.initData.content} title={this.state.initData.title}></HelmetMetaData> */}

                                <div className="social-icons d-flex justify-content-center my-3">
                                    <FacebookShareButton
                                        url={this.state.url}
                                        quote={this.state.initData.itemImg}
                                        hashtag={"#"+this.state.initData.title}>
                                        <FacebookIcon size={43} logoFillColor="white"/>
                                    </FacebookShareButton>
                                    <TwitterShareButton
                                        url={this.state.url}
                                        title={this.state.initData.title}
                                        via={this.state.initData.content}
                                        hashtag="#">
                                        <TwitterIcon size={43} logoFillColor="white"/>
                                    </TwitterShareButton>
                                    <LinkedinShareButton
                                        url={this.state.url}
                                        title={this.state.initData.title}
                                        summary={this.state.initData.content}
                                        source={this.state.initData.itemImg}>
                                        <LinkedinIcon size={43} logoFillColor="white"/>
                                    </LinkedinShareButton>
                                    <TelegramShareButton
                                        url={this.state.url}
                                        title={this.state.initData.title}>
                                        <TelegramIcon size={43} logoFillColor="white"/>
                                    </TelegramShareButton>
                                </div>
                                {/* Netstorm Tab */}
                                <ul className="netstorm-tab nav nav-tabs" id="nav-tab">
                                    <li>
                                        <Link to="#" className={this.state.tabIndex === 1?"active":"inactive"} id="nav-home-tab" data-toggle="pill" onClick={this.bidTab}>
                                            <h5 className="m-0">{this.state.initData.tab_2}</h5>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className={this.state.tabIndex === 2?"active":"inactive"} id="nav-contact-tab" data-toggle="pill" onClick={this.contactTab}>
                                            <h5 className="m-0">{this.state.initData.tab_3}</h5>
                                        </Link>
                                    </li>
                                </ul>
                                {/* Tab Content */}
                                <div className="tab-content" id="nav-tabContent">
                                    <div className={this.state.tabIndex === 1?"tab-pane fade show active":"tab-pane fade"} id="nav-profile">
                                        <OfferList tabData_2 = {this.state.tabData_2} isCheckOffer={this.state.isCheckOffer} imgData={this.state.initData.ownerImg} title={this.state.initData.title} price_1={this.state.initData.price_1} price_2={this.state.initData.price_2} idx={this.state.idx} userid={this.state.userid} username={this.state.initData.itemOwner} ethprice={this.state.ethprice}/>
                                    </div>
                                    <div className={this.state.tabIndex === 2?"tab-pane fade show active":"tab-pane fade"} id="nav-contact">
                                        {/* Single Tab List */}
                                        <div className="owner-meta d-flex align-items-center mt-3">
                                            <span>Owner</span>
                                            <Link className="owner d-flex align-items-center ml-2" to="/author">
                                                <img className="avatar-sm rounded-circle" src={this.state.initData.ownerImg} alt="" />
                                                <h6 className="ml-2">{this.state.initData.itemOwner}</h6>
                                            </Link>
                                        </div>
                                        <p className="mt-2">Created : {this.state.initData.created}</p>
                                        <p className="mt-2">Contract Address : {this.state.initData.contactAddress}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            {/* Content */}
                            <div className="content mt-5 mt-lg-0">
                                <h3 className="m-0">{this.state.initData.title}</h3>
                                <p>{this.state.initData.content}</p>
                                {/* Owner */}
                                <div className="owner d-flex align-items-center">
                                    <span>Created By</span>
                                    <Link className="owner-meta d-flex align-items-center ml-3" to={`/author/${this.state.initData.creatorId}`}>
                                        <img className="avatar-sm rounded-circle" src={this.state.initData.creatorImg} alt="" />
                                        <h6 className="ml-2">{this.state.initData.creatorName}</h6>
                                    </Link>
                                    {
                                        this.state.initData.verified === 1 && ( 
                                        <span className="d-inline-block pointerCursor" tabindex="0" data-toggle="tooltip" title="Verified User"><Checkmark size='20px'/></span>
                                        )
                                    }
                                </div>
                                {/* Item Info List */}
                                <div className="item-info-list mt-4">
                                    <ul className="list-unstyled">
                                        <li className="price d-flex justify-content-between">
                                            <span>Current Price {this.state.initData.price_1}</span>
                                            <span>{this.state.initData.price_2}</span>
                                            {/* <span>{this.state.initData.count}</span> */}
                                        </li>
                                        {/* <li>
                                            <span>Size </span>
                                            <span>{this.state.initData.size}</span>
                                        </li> */}
                                    </ul>
                                </div>
                                {this.state.approved && (
                                    <div className="row mt-4">
                                        <h3>Your offer has been approved!<br/>(Price: {this.state.price} ETH)</h3>
                                    </div>
                                )}
                                <div className="row mt-4">
                                    <div className="col-12 col-md-1 item px-lg-2">
                                    </div>
                                    <div className="col-5 col-md-5 item px-lg-2">
                                        <button className="d-block btn btn-bordered-white" onClick={this.handleOpenModal}>Buy Now</button>
                                    </div>
                                    <div className="col-5 col-md-5 item px-lg-2">
                                        <button className="d-block btn btn-bordered-white" onClick={this.handleOpenOfferModal}>Make an Offer</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Checkout showModal={this.state.showModal} onClose={this.handleCloseModal} imgData={this.state.initData.itemImg} title={this.state.initData.title} price_1={this.state.initData.price_1} price_2={this.state.initData.price_2} idx={this.state.idx} userid={this.state.userid} username={this.state.initData.itemOwner} ethprice={this.state.ethprice} price={this.state.price} approved={this.state.approved} />
                <Offer showOfferModal={this.state.showOfferModal} handleCloseOfferModal={this.handleCloseOfferModal} isCheckOffer={this.state.isCheckOffer} imgData={this.state.initData.ownerImg} title={this.state.initData.title} price_1={this.state.initData.price_1} price_2={this.state.initData.price_2} idx={this.state.idx} userid={this.state.userid} username={this.state.initData.itemOwner} ethprice={this.state.ethprice}/>
            </section>
        );
    }
}

const ItemDetailsWithRouter = withRouter(ItemDetails);

export default ItemDetailsWithRouter;