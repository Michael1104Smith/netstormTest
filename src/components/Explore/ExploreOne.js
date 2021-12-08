import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Checkout from '../Checkout/Checkout'
import Web3 from "web3";
import Offer from '../Offer/Offer'

const initData = {
    pre_heading: "MOST RECENT ASSETS",
    heading: "Explore",
    btn_1: "View All",
    btn_2: "Load More"
}

class ExploreOne extends Component {
    constructor(prpos) {
        super(prpos);
        this.state = {
            initData: {},
            data: [],
            items: [],
            visible: 3,
            error: false
        }
        this.loadMore = this.loadMore.bind(this);
    }
    componentDidMount() {
        axios.get(`${process.env.REACT_APP_GETITEMS_URL}`)
            .then(res => {
                this.setState({
                    initData: initData,
                    data: res.data.data
                })
        })
    }
    loadMore() {
        this.setState((prev) => {
            return {visible: prev.visible + 3};
        });
    }    
    handleOpenModal = (id) => (e) => {
        axios.get(`${process.env.REACT_APP_GETITEMFI_URL}?itemid=${id}`)
            .then(res => {
                const datum = res.data.data[0];
                const price = Number(datum.price.split(' ')[0]);
                const ethprice = Web3.utils.fromWei(String(price*1e18), "ether");
                axios.get(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR`)
                    .then(res1 => {
                        this.setState({ 
                            showModal: true,
                            imgData: datum.seller_thumb,
                            title: datum.title,
                            price_1: datum.price,
                            price_2: '$' + (ethprice*Number(res1.data.USD)).toFixed(2),
                            idx: id,
                            userid: datum.userid,
                            username: datum.owner,
                            ethprice: ethprice
                        });
                });
        })
    }
    
    handleCloseModal = () => {
      this.setState({ showModal: false,
                        imgData: '',
                        title: '',
                        price_1: '',
                        price_2: '',
                        idx: '',
                        userid: '',
                        username: '',
                        ethprice: ''
                    });
    }

    isCheck = async (id) => {
        const checkapi = axios.create({
            baseURL: process.env.REACT_APP_CHECKOFFER_URL
        });
        const data = {"userid": localStorage.getItem("userid"), "itemid": id};
        const response = await checkapi.post("/tokens", JSON.stringify(data), {
            headers: {
                "Content-Type": `multipart/form-data`,
            },
            });

        if (response["data"]) {
            const error = response["data"]["error"];
            this.setState({isCheckOffer: error});
            // if (error) {
            //     this.setState({approved: response["data"]["approved"]});
            //     this.setState({price: response["data"]["price"]});
            // }
        }
    }
    
    handleOpenOfferModal = (id, ethprice) => (e) => {
        this.isCheck();
        this.setState({ 
            showOfferModal: true,
            idx: id,
            ethprice: ethprice.split(" ")[0]
        });
    }
    
    handleCloseOfferModal = () => {
        this.setState({ 
            showOfferModal: false,
            imgData: '',
            title: '',
            price_1: '',
            price_2: '',
            idx: '',
            userid: '',
            username: '',
            ethprice: ''
        });
    }
    render() {
        return (
            <section className="explore-area p-0">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* Intro */}
                            <div className="intro d-flex justify-content-between align-items-end m-0">
                                <div className="intro-content">
                                    <span>{this.state.initData.pre_heading}</span>
                                    <h3 className="mt-3 mb-0">{this.state.initData.heading}</h3>
                                </div>
                                <div className="intro-btn">
                                    <Link className="btn content-btn" to="/explore-3">{this.state.initData.btn_1}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row items">
                        {this.state.data.slice(0, this.state.visible).map((item, idx) => {
                            return (
                                <div key={`exo_${idx}`} className="col-12 col-sm-6 col-lg-4 item fade-in">
                                    <div className="card">
                                        <div className="image-over">
                                            <Link to={`/item-details/${item.id}`}>
                                                <img className="card-img-top" src={item.img} alt="" />
                                            </Link>
                                        </div>
                                        {/* Card Caption */}
                                        <div className="card-caption col-12 p-0">
                                            {/* Card Body */}
                                            <div className="card-body">
                                                <Link to={`/item-details/${item.id}`}>
                                                    <h5 className="mb-0">{item.title}</h5>
                                                </Link>
                                                <div className="seller d-flex align-items-center my-3">
                                                    <span>Owned By</span>
                                                    <Link to={`/author/${item.userid}`}>
                                                        <h6 className="ml-2 mb-0">{item.owner}</h6>
                                                    </Link>
                                                </div>
                                                <div className="seller d-flex align-items-center my-3">
                                                    <span>Created By</span>
                                                    <Link to={`/author/${item.creatorId}`}>
                                                        <h6 className="ml-2 mb-0">{item.creatorName}</h6>
                                                    </Link>
                                                </div>
                                                <div className="card-bottom d-flex justify-content-between">
                                                    <span>{item.price}</span>
                                                    {/* <span>{item.count}</span> */}
                                                </div>
                                                <div className="row mt-1">
                                                    <div className="col-6 col-md-6 item px-lg-1">
                                                        <button className="btn btn-bordered-white btn-smaller mt-3"  onClick={this.handleOpenModal(item.id)}><i className="icon-bag mr-2" />Buy Now</button>
                                                    </div>
                                                    <div className="col-6 col-md-6 item px-lg-1">
                                                        <button className="btn btn-bordered-white btn-smaller mt-3" onClick={this.handleOpenOfferModal(item.id, item.price)}><i className="icon-handbag mr-2" />Make an Offer</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="row">
                        <div className="col-12 text-center">
                            {this.state.visible < this.state.data.length &&
                                <Link id="load-btn" className="btn btn-bordered-white mt-5" to="#" onClick={this.loadMore}>{this.state.initData.btn_2}</Link>
                            }
                        </div>
                    </div>
                </div>
                <Checkout showModal={this.state.showModal} onClose={this.handleCloseModal} imgData={this.state.imgData} title={this.state.title} price_1={this.state.price_1} price_2={this.state.price_2} idx={this.state.idx} userid={this.state.userid} username={this.state.username} ethprice={this.state.ethprice}/>
                <Offer showOfferModal={this.state.showOfferModal} handleCloseOfferModal={this.handleCloseOfferModal} isCheckOffer={this.state.isCheckOffer} idx={this.state.idx} ethprice={this.state.ethprice}/>
            </section>
        );
    }
}

export default ExploreOne;