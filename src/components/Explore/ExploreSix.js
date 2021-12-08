import React, { Component } from 'react';
import axios from 'axios';

import {
    Link,
    withRouter
  } from "react-router-dom";

const initData = {
    pre_heading: "Explore",
    heading: "Exclusive Digital Assets",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
    filter_1: "All",
    filter_2: "Art",
    filter_3: "Music",
    filter_4: "Collectibles",
    filter_5: "Sports"
}

class ExploreSix extends Component {
    state = {
        initData: {},
        data: [],
        igroup: 'All'
    }
    componentDidMount() {
        const params = this.props.match.params;
        const idx = Number(params.idx);
        axios.get(`${process.env.REACT_APP_GETITEM_URL}?userid=${idx}`)
            .then(res => {
                this.setState({
                    initData: initData,
                    data: res.data.data
                })
        })
        .catch(err => console.log(err))
    }
    igroupChange = (e) => {
        this.setState({igroup: e.target.value});
    }
    render() {
        return (
            <div>
                <div className="row justify-content-center text-center mt-5 mt-lg-0">
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
                            <div key={`eds_${item.id}`} className="col-12 col-md-6 item explore-item">
                                <div className="card no-hover text-center">
                                    <div className="image-over">
                                        <Link to={`/item-details/${item.id}`}>
                                            <img className="card-img-top" src={item.img} alt="" />
                                        </Link>
                                        {/* Author */}
                                        <Link className="author" to={`/item-details/${item.id}`}>
                                            <div className="author-thumb avatar-lg">
                                                <img className="rounded-circle" src={item.author} alt="" />
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
                                            <hr />
                                            <div className="card-bottom d-flex justify-content-between">
                                                <span>{item.price}</span>
                                                <span><i className="icon-heart mr-2" />{item.likes}</span>
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
        );
    }
}

const ExplorerSixWithRouter = withRouter(ExploreSix);
export default ExplorerSixWithRouter;