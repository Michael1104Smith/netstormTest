import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// import * as Web3 from 'web3'
// import { OpenSeaPort, Network } from 'opensea-js'
// // This example provider won't let you make transactions, only read-only calls:
// const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io')

// const seaport = new OpenSeaPort(provider, {
//   networkName: Network.Main
// })

class AuctionsTwo extends Component {
    constructor(prpos) {
        super(prpos);
        this.state = {
            initData: {},
            data: [],
            items: [],
            visible: 4,
            error: false
        }
        this.loadMore = this.loadMore.bind(this);
    }
    componentDidMount() {
        axios.get(`${process.env.REACT_APP_GETITEMS_URL}`)
            .then(res => {
                this.setState({
                    initData: res.data,
                    data: res.data.data
                })
                console.log(res.data);
        })
    }
    loadMore() {
        this.setState((prev) => {
            return {visible: prev.visible + 4};
        });
    }
    render() {
        return (
            <section className="live-auctions-area load-more">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-7">
                            {/* Intro */}
                            <div className="intro text-center">
                                <span>{this.state.initData.pre_heading}</span>
                                <h3 className="mt-3 mb-0">{this.state.initData.heading}</h3>
                                <p>{this.state.initData.content}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row items">
                        {this.state.data.slice(0, this.state.visible).map((item, idx) => {
                            return (
                                <div key={`auct_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
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
                                                <div className="countdown-times mb-3">
                                                    <div className="countdown d-flex justify-content-center" data-date={item.date} />
                                                </div>
                                                <Link to={`/item-details/${item.id}`}>
                                                    <h5 className="mb-0">{item.title}</h5>
                                                </Link>
                                                <Link className="seller d-flex align-items-center my-3" to="/author">
                                                    <img className="avatar-sm rounded-circle" src={item.seller_thumb} alt="" />
                                                    <span className="ml-2">{item.seller}</span>
                                                </Link>
                                                <div className="card-bottom d-flex justify-content-between">
                                                    <span>{item.price}</span>
                                                    <span>{item.count}</span>
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
                            <Link id="load-btn" className="btn btn-bordered-white mt-5" to="#" onClick={this.loadMore}>Show More</Link>
                        }
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default AuctionsTwo;