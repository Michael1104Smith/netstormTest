import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Checkmark}  from 'react-checkmark';

const initData = {
    "preHeading": "Creative Artist",
    "heading": "Top Sellers"
  };

class TopSeller extends Component {
    state = {
        data: {},
        sellerData: []
    }
    compare = (a, b) => {
        if (a.price > b.price) {
          return -1;
        }
        if (a.price < b.price) {
          return 1;
        }
        // a must be equal to b
        return 0;
      }
    componentDidMount(){
        axios.get(`${process.env.REACT_APP_GETTOPSELLERS_URL}`)
            .then(res => {
                let data = res.data.data, sellerData = [];
                for (let i = 0; i < data.length; i++) {
                    data[i].price = Number(data[i].price);
                }
                data.sort(this.compare);
                const cnt = Math.min(6, data.length);
                for (let i = 0; i < cnt; i++) {
                    const datum = data[i];
                    sellerData.push({"id":datum.userid, "img":datum.imgURL, "seller": "@"+datum.username, "price":datum.price.toFixed(1) + " ETH", "userid":datum.userid});
                }
                this.setState({
                    data: initData,
                    sellerData: sellerData
                })
                // console.log(this.state.data)
            })
        .catch(err => console.log(err))
    }
    render() {
        return (
            <section className="top-seller-area pt-0">
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
                                    <Link className="btn content-btn" to="/authors">View All</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row items">
                        {this.state.sellerData.map((item, idx) => {
                            return (
                                <div key={`ts_${idx}`} className="col-12 col-sm-6 col-lg-4 item">
                                    {/* Single Seller */}
                                    <div className="card no-hover">
                                        <div className="single-seller d-flex align-items-center">
                                            <Link to={`/author/${item.userid}`}>
                                                <img className="avatar-md rounded-circle" src={item.img} alt="" />
                                            </Link>
                                            {/* Seller Info */}
                                            <div className="seller-info ml-3">
                                                <Link className="seller mb-2" to={`/author/${item.userid}`}>{item.seller}<span className="d-inline-block pointerCursor" tabindex="0" data-toggle="tooltip" title="Verified User"><Checkmark size='20px'/></span></Link>
                                                <span>{item.price}</span>
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

export default TopSeller;