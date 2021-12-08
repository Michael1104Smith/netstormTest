import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Checkmark}  from 'react-checkmark';

const initData = {
    "preHeading": "Creators",
    "heading": "Our Creators",
    "content": "SpaceGrime’s NFT Marketplace has brought together hundreds of artists, who have created thousands of different digital collectibles to represent their art."
  };  

class Authors extends Component {
    state = {
        data: {},
        authorData: []
    }
    componentDidMount(){
        axios.get(`${process.env.REACT_APP_GETUSERS_URL}`)
            .then(res => {
                if (!res.data.error) {
                    this.setState({
                        data: initData,
                        authorData: res.data.data
                    })
                }
            })
        .catch(err => console.log(err))
    }
    render() {
        return (
            <section className="popular-collections-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-7">
                            {/* Intro */}
                            <div className="intro text-center">
                                <span>{this.state.data.preHeading}</span>
                                <h3 className="mt-3 mb-0">{this.state.data.heading}</h3>
                                <p>{this.state.data.content}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row items">
                        {this.state.authorData.map((item, idx) => {
                            return (
                                <div key={`ad_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                                    <div className="card no-hover text-center">
                                        <div className="image-over">
                                            <Link to={`/author/${item.userid}`}>
                                                <img className="card-img-top" src={item.coverImage} alt="" />
                                            </Link>
                                            {/* Seller */}
                                            <Link className="seller" to={`/author/${item.userid}`}>
                                                <div className="seller-thumb avatar-lg">
                                                    <img className="rounded-circle" src={item.imgURL} alt="" />
                                                </div>
                                            </Link>
                                        </div>
                                        {/* Card Caption */}
                                        <div className="card-caption col-12 p-0">
                                            {/* Card Body */}
                                            <div className="card-body mt-4">
                                                <Link to={`/author/${item.userid}`}>
                                                    <h5>{item.username}
                                                        <span className="d-inline-block pointerCursor" tabindex="0" data-toggle="tooltip" title="Verified User"><Checkmark size='20px'/></span>
                                                    </h5>
                                                </Link>
                                                <Link className="btn btn-bordered-white btn-smaller" to="#">Follow</Link>
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

export default Authors;