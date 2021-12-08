import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const initData = {
    "preHeading": "Exclusive Assets",
    "heading": "Explore",
    "btnText": "Explore More"
}

class ExploreTwo extends Component {
    state = {
        initData: {},
        data: []
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
    render() {
        return (
            <section className="explore-area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* Intro */}
                            <div className="intro d-flex justify-content-between align-items-end m-0">
                                <div className="intro-content">
                                    <span>{this.state.initData.preHeading}</span>
                                    <h3 className="mt-3 mb-0">{this.state.initData.heading}</h3>
                                </div>
                                <div className="intro-btn">
                                    <Link className="btn content-btn" to="/explore-1">{this.state.initData.btnText}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row items">
                        {this.state.data.map((item, idx) => {
                            return (
                                <div key={`edt_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
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
                                                    <Link to="/author">
                                                        <h6 className="ml-2 mb-0">{item.owner}</h6>
                                                    </Link>
                                                </div>
                                                <div className="card-bottom d-flex justify-content-between">
                                                    <span>{item.price}</span>
                                                    <span>{item.count}</span>
                                                </div>
                                                
                                                
                                                <div className="row mt-1">
                                                    <div className="col-12 col-md-6 item px-lg-1">
                                                        <Link className="btn btn-bordered-white btn-smaller mt-3" to="/login"><i className="icon-handbag mr-2" />Place a Bid</Link>
                                                    </div>
                                                    <div className="col-12 col-md-6 item px-lg-1">
                                                        <Link className="btn btn-bordered-white btn-smaller mt-3" to="/login"><i className="icon-bag mr-2" />Buy Now</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        );
    }
}

export default ExploreTwo;