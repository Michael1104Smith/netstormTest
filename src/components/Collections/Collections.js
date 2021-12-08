import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const initData = {
    "preHeading": "Most Popular",
    "heading": "Popular NFTs",
    "btnText": "Explore More"
  };

class Collections extends Component {
    state = {
        data: {},
        collectionData: []
    }
    componentDidMount(){
        axios.get(`${process.env.REACT_APP_GETCOLLECTIONS_URL}?limitCount=5`)
            .then(res => {
                let data = res.data.data, collectionData = [];
                for (let i = 0; i < data.length; i++) {
                    const datum = data[i];
                    collectionData.push({"id":datum.id, "img":datum.img, "avatar":datum.seller_thumb, "title": datum.title, "content":datum.content});
                }
                this.setState({
                    data: initData,
                    collectionData: collectionData
                })
                // console.log(this.state.data)
            })
        .catch(err => console.log(err))
    }
    render() {
        return (
            <section className="popular-collections-area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* Intro */}
                            <div className="intro d-flex justify-content-between align-items-end m-0">
                                <div className="intro-content">
                                    <span>{this.state.data.preHeading}</span>
                                    <h3 className="mt-3 mb-0">{this.state.data.heading}</h3>
                                </div>
                                <div className="intro-btn">
                                    <Link className="btn content-btn text-left" to="/explore-2">{this.state.data.btnText}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row items">
                        {this.state.collectionData.map((item, idx) => {
                            return (
                                <div key={`cd_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                                    <div className="card no-hover text-center">
                                        <div className="image-over">
                                            <Link to={`/item-details/${item.id}`}>
                                                <img className="card-img-top" src={item.img} alt="" />
                                            </Link>
                                            {/* Seller */}
                                            <Link className="seller" to="/item-details">
                                                <div className="seller-thumb avatar-lg">
                                                    <img className="rounded-circle" src={item.avatar} alt="" />
                                                </div>
                                            </Link>
                                        </div>
                                        {/* Card Caption */}
                                        <div className="card-caption col-12 p-0">
                                            {/* Card Body */}
                                            <div className="card-body mt-4">
                                                <Link to={`/item-details/${item.id}`}>
                                                    <h5 className="mb-2">{item.title}</h5>
                                                </Link>
                                                <span>{item.content}</span>
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

export default Collections;