import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// Import Swiper React components
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

const initData = {
    pre_heading: "Auctions",
    heading: "Live Auctions",
    btnText: "View All"
}

class AuctionsOne extends Component {
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
        SwiperCore.use([Autoplay])
        return (
            <section className="live-auctions-area">
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
                                    <Link className="btn content-btn" to="/auctions">{this.state.initData.btnText}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="auctions-slides">
                        <div className="swiper-container items">
                            <div className="swiper-wrapper">
                                {/* Single Slide */}
                                <Swiper spaceBetween={50}
                                        slidesPerView={3}
                                        loop={true}
                                        autoplay={{
                                            delay: 2000,
                                            disableOnInteraction: false
                                        }}>
                                {this.state.data.map((item, idx) => {
                                    return (
                                        <SwiperSlide>
                                        <div key={`auc_${idx}`} className="swiper-slide item">
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
                                                        <Link className="seller d-flex align-items-center my-3" to={`/item-details/${item.id}`}>
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
                                        </SwiperSlide>
                                    );
                                })}
                                </Swiper>
                            </div>
                            <div className="swiper-pagination" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default AuctionsOne;