import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Checkout from '../Checkout/Checkout'
import Offer from '../Offer/Offer'
import Web3 from "web3";

const initData = {
    pre_heading: "Explore",
    heading: "Exclusive Digital Assets",
    content: "We’ve got the most out-of-this-world NFTs here! View them all or only the ones you’re interested in by choosing a category below.",
    filter_1: "All",
    filter_2: "Art",
    filter_3: "Music",
    filter_4: "Collectibles",
    filter_5: "Sports"
}

class ExploreThree extends Component {
    state = {
        initData: {},
        data: [],
        showModal: false,
        showOfferModal: false,
        isCheckOffer: false,
        imgData: '',
        title: '',
        price_1: '',
        price_2: '',
        idx: '',
        userid: '',
        username: '',
        ethprice: '',
        igroup: 'All'
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
  
    handleOpenModal = (id) => (e) => {

        axios.get(`${process.env.REACT_APP_GETITEMFI_URL}?itemid=${id}`)
            .then(res => {
                const datum = res.data.data[0];
                const price = Number(datum.price.split(' ')[0]);
                const ethprice = Web3.utils.fromWei(String(price*1e18), "ether");
                this.setState({ 
                    showModal: true,
                    imgData: datum.seller_thumb,
                    title: datum.title,
                    price_1: datum.price,
                    price_2: '$' + (ethprice*Number(localStorage.getItem("eUsd"))).toFixed(2),
                    idx: id,
                    userid: datum.userid,
                    username: datum.owner,
                    ethprice: ethprice
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

    igroupChange = (e) => {
        this.setState({igroup: e.target.value});
    }

    render() {
        return (
            <section className="explore-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-7">
                            {/* Intro */}
                            <div className="intro text-center mb-4">
                                <span>{this.state.initData.pre_heading}</span>
                                <h3 className="mt-3 mb-0">{this.state.initData.heading}</h3>
                                <p>{this.state.initData.content}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center text-center">
                        <div className="col-12">
                            {/* Explore Menu */}
                            <div className="explore-menu btn-group btn-group-toggle flex-wrap justify-content-center text-center mb-4">
                                <label className={this.state.igroup==="All" ? "btn active d-table text-uppercase p-2": "btn d-table text-uppercase p-2"}>
                                    <input type="radio" defaultValue="All" checked={this.state.igroup==="All"} className="explore-btn" onChange={this.igroupChange} />
                                    <span>{this.state.initData.filter_1}</span>
                                </label>
                                <label className={this.state.igroup==="Art" ? "btn active d-table text-uppercase p-2": "btn d-table text-uppercase p-2"}>
                                    <input type="radio" defaultValue="Art" checked={this.state.igroup==="Art"} className="explore-btn" onChange={this.igroupChange} />
                                    <span>{this.state.initData.filter_2}</span>
                                </label>
                                <label className={this.state.igroup==="Music" ? "btn active d-table text-uppercase p-2": "btn d-table text-uppercase p-2"}>
                                    <input type="radio" defaultValue="Music" checked={this.state.igroup==="Music"} className="explore-btn" onChange={this.igroupChange} />
                                    <span>{this.state.initData.filter_3}</span>
                                </label>
                                <label className={this.state.igroup==="Collectibles" ? "btn active d-table text-uppercase p-2": "btn d-table text-uppercase p-2"}>
                                    <input type="radio" defaultValue="Collectibles" checked={this.state.igroup==="Collectibles"} className="explore-btn" onChange={this.igroupChange} />
                                    <span>{this.state.initData.filter_4}</span>
                                </label>
                                <label className={this.state.igroup==="Sports" ? "btn active d-table text-uppercase p-2": "btn d-table text-uppercase p-2"}>
                                    <input type="radio" defaultValue="Sports" checked={this.state.igroup==="Sports"} className="explore-btn" onChange={this.igroupChange} />
                                    <span>{this.state.initData.filter_5}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row items explore-items">
                        {this.state.data.map((item, idx) => {
                            return (
                                (this.state.igroup==="All" || item.igroup.split(";").indexOf(this.state.igroup) >= 0) && (
                                <div key={`edth_${idx}`} className="col-12 col-sm-6 col-lg-4 item explore-item" data-groups={item.group}>
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
                                )
                            );
                        })}
                    </div>
                </div>
                <Checkout showModal={this.state.showModal} onClose={this.handleCloseModal} imgData={this.state.imgData} title={this.state.title} price_1={this.state.price_1} price_2={this.state.price_2} idx={this.state.idx} userid={this.state.userid} username={this.state.username} ethprice={this.state.ethprice}/>
                <Offer showOfferModal={this.state.showOfferModal} handleCloseOfferModal={this.handleCloseOfferModal} isCheckOffer={this.state.isCheckOffer} idx={this.state.idx} ethprice={this.state.ethprice}/>
            </section>
        );
    }
}

export default ExploreThree;