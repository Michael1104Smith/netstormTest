import React, { Component, useEffect } from 'react';
import axios from 'axios';
import ReactModal from 'react-modal';
import Checkout from '../Checkout/Checkout'
import Web3 from "web3";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    withRouter
  } from "react-router-dom";

let initData = {
    itemImg: "/img/auction_2.jpg",
    date: "2022-03-30",
    tab_1: "Bids",
    tab_2: "History",
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
    contactAddress: ""
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

const tabData_2 = [
    {
        id: "1",
        img: "/img/avatar_6.jpg",
        price: "32 ETH",
        time: "10 hours ago",
        author: "@hasan"
    },
    {
        id: "2",
        img: "/img/avatar_7.jpg",
        price: "24 ETH",
        time: "6 hours ago",
        author: "@artnox"
    },
    {
        id: "3",
        img: "/img/avatar_8.jpg",
        price: "29 ETH",
        time: "12 hours ago",
        author: "@meez"
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
        userid: -1
    }
     componentDidMount(){
        const params = this.props.match.params;
        const idx = Number(params.idx);
        axios.get(`${process.env.REACT_APP_GETITEMFI_URL}?itemid=${idx}`)
            .then(res => {
                const datum = res.data.data[0];
                const unit = datum.price.split(' ')[1];
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
                const price = Number(datum.price.split(' ')[0]);
                const ethprice = Web3.utils.fromWei(String(price*1e18), "ether");
                axios.get(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR`)
                    .then(res1 => {
                        initData.price_2 = '$' + (ethprice*Number(res1.data.USD)).toFixed(2);
                        this.setState({
                            initData: initData,
                            tabData_1: tabData_1,
                            tabData_2: tabData_2,
                            sellerData: sellerData,
                            idx: idx,
                            datum: datum,
                            userid: datum.userid,
                            ethprice: ethprice
                        });
                        this.Timer();
                });
        })
    }

    Timer = () => {
        let interval = setInterval(() => {
            const date = this.state.datum.date, s = new Date, t = date.split("-"), a = [0, 0];
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

    homeTab = () => {
        this.setState({ tabIndex: 1 });
    }

    profileTab = () => {
        this.setState({ tabIndex: 2 });
    }

    contactTab = () => {
        this.setState({ tabIndex: 3 });
    }
  
    handleOpenModal = () => {
      this.setState({ showModal: true });
    }
    
    handleCloseModal = () => {
      this.setState({ showModal: false });
    }

    render() {
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
        const closeImg = {cursor:'pointer', float:'right', marginTop: '5px', width: '20px'};

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
                                {/* Netstorm Tab */}
                                <ul className="netstorm-tab nav nav-tabs" id="nav-tab">
                                    <li>
                                        <a className={this.state.tabIndex === 1?"active":"inactive"} id="nav-home-tab" data-toggle="pill" onClick={this.homeTab}>
                                            <h5 className="m-0">{this.state.initData.tab_1}</h5>
                                        </a>
                                    </li>
                                    <li>
                                        <a className={this.state.tabIndex === 2?"active":"inactive"} id="nav-profile-tab" data-toggle="pill" onClick={this.profileTab}>
                                            <h5 className="m-0">{this.state.initData.tab_2}</h5>
                                        </a>
                                    </li>
                                    <li>
                                        <a className={this.state.tabIndex === 3?"active":"inactive"} id="nav-contact-tab" data-toggle="pill" onClick={this.contactTab}>
                                            <h5 className="m-0">{this.state.initData.tab_3}</h5>
                                        </a>
                                    </li>
                                </ul>
                                {/* Tab Content */}
                                <div className="tab-content" id="nav-tabContent">
                                    <div className={this.state.tabIndex === 1?"tab-pane fade show active":"tab-pane fade"} id="nav-home">
                                        <ul className="list-unstyled">
                                            {/* Single Tab List */}
                                            {this.state.tabData_1.map((item, idx) => {
                                                return (
                                                    <li key={`tdo_${idx}`} className="single-tab-list d-flex align-items-center">
                                                        <img className="avatar-sm rounded-circle mr-3" src={item.img} alt="" />
                                                        <p className="m-0">Bid listed for <strong>{item.price}</strong> {item.time} <br />by <Link to="/author">{item.author}</Link></p>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                    <div className={this.state.tabIndex === 2?"tab-pane fade show active":"tab-pane fade"} id="nav-profile">
                                        <ul className="list-unstyled">
                                            {/* Single Tab List */}
                                            {this.state.tabData_2.map((item, idx) => {
                                                return (
                                                    <li key={`tdt_${idx}`} className="single-tab-list d-flex align-items-center">
                                                        <img className="avatar-sm rounded-circle mr-3" src={item.img} alt="" />
                                                        <p className="m-0">Bid listed for <strong>{item.price}</strong> {item.time} <br />by <Link to="/author">{item.author}</Link></p>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                    <div className={this.state.tabIndex === 3?"tab-pane fade show active":"tab-pane fade"} id="nav-contact">
                                        {/* Single Tab List */}
                                        <div className="owner-meta d-flex align-items-center mt-3">
                                            <span>Owner</span>
                                            <Link className="owner d-flex align-items-center ml-2" to="/author">
                                                <img className="avatar-sm rounded-circle" src={this.state.initData.ownerImg} alt="" />
                                                <h6 className="ml-2">{this.state.initData.itemOwner}</h6>
                                            </Link>
                                        </div>
                                        <p className="mt-2">Created : {this.state.initData.created}</p>
                                        <p className="mt-2">Contact Address : {this.state.initData.contactAddress}</p>
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
                                    <span>Owned By</span>
                                    <Link className="owner-meta d-flex align-items-center ml-3" to="/author">
                                        <img className="avatar-sm rounded-circle" src={this.state.initData.ownerImg} alt="" />
                                        <h6 className="ml-2">{this.state.initData.itemOwner}</h6>
                                    </Link>
                                </div>
                                {/* Item Info List */}
                                <div className="item-info-list mt-4">
                                    <ul className="list-unstyled">
                                        <li className="price d-flex justify-content-between">
                                            <span>Current Price {this.state.initData.price_1}</span>
                                            <span>{this.state.initData.price_2}</span>
                                            <span>{this.state.initData.count}</span>
                                        </li>
                                        <li>
                                            <span>Size </span>
                                            <span>{this.state.initData.size}</span>
                                        </li>
                                        <li>
                                            <span>Volume Traded </span>
                                            <span>{this.state.initData.volume}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="row items">
                                    {this.state.sellerData.map((item, idx) => {
                                        return (
                                            <div key={`sd_${idx}`} className="col-12 col-md-6 item px-lg-2">
                                                <div className="card no-hover">
                                                    <div className="single-seller d-flex align-items-center">
                                                        <Link to="/author">
                                                            <img className="avatar-md rounded-circle" src={item.img} alt="" />
                                                        </Link>
                                                        {/* Seller Info */}
                                                        <div className="seller-info ml-3">
                                                            <Link className="seller mb-2" to="/author">{item.seller}</Link>
                                                            <span>{item.post}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div className="col-12 item px-lg-2">
                                        <div className="card no-hover">
                                            <h4 className="mt-0 mb-2">Highest Bid</h4>
                                            <div className="price d-flex justify-content-between align-items-center">
                                                <span>{this.state.initData.highest_bid}</span>
                                                <span>{this.state.initData.bid_count}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-12 col-md-6 item px-lg-2">
                                        <Link className="d-block btn btn-bordered-white" to="/wallet-connect">Place a Bid</Link>
                                    </div>
                                    <div className="col-12 col-md-6 item px-lg-2">
                                        <button className="d-block btn btn-bordered-white" onClick={this.handleOpenModal}>Buy Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ReactModal 
                    isOpen={this.state.showModal}
                    contentLabel="onRequestClose Example"
                    onRequestClose={this.handleCloseModal}
                    style={customStyles}
                    shouldCloseOnOverlayClick={false}
                    ariaHideApp={false}
                    >
                    <p className="close" href="#" onClick={this.handleCloseModal} />
                    <Checkout imgData={this.state.initData.ownerImg} title={this.state.initData.title} price_1={this.state.initData.price_1} price_2={this.state.initData.price_2} idx={this.state.idx} userid={this.state.userid} username={this.state.initData.itemOwner} ethprice={this.state.ethprice}/>
                </ReactModal>
            </section>
        );
    }
}

const ItemDetailsWithRouter = withRouter(ItemDetails);

export default ItemDetailsWithRouter;