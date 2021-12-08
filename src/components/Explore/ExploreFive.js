import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Import Swiper React components
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

const initData = {
    pre_heading: "Explore",
    heading: "Exclusive Digital Assets",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit."
}

class ExploreFive extends Component {
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
            <section className="explore-area">
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
                    <div className="explore-slides">
                        <div className="swiper-container slider-mid items">
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
                                        <div key={`exfi_${idx}`} className="swiper-slide item">
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

export default ExploreFive;