import React, { Component } from 'react';
import axios from 'axios';

import {
    Link,
    withRouter
  } from "react-router-dom";

  import {
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton
  } from "react-share";

  import {
    FacebookIcon,
    LinkedinIcon,
    TelegramIcon,
    TwitterIcon
  } from "react-share";

let initData = {
    "widgetTitle_1": "Categories",
    "widgetTitle_2": "Popular Tags",
    "widgetTitle_3": "Share This",
    "widgetData_1": [
      {
        "id": 1,
        "title": "NFTs",
        "content": "23"
      },
      {
        "id": 2,
        "title": "Limited Edition Collections",
        "content": "15"
      },
      {
        "id": 3,
        "title": "Creators",
        "content": "12"
      },
      {
        "id": 4,
        "title": "Collections",
        "content": "29"
      },
      {
        "id": 5,
        "title": "Featured",
        "content": "16"
      },
      {
        "id": 6,
        "title": "Latest News",
        "content": "13"
      }
    ],
    "widgetData_2": [
      {
        "id": 1,
        "title": "Bitcoin"
      },
      {
        "id": 2,
        "title": "NFT"
      },
      {
        "id": 3,
        "title": "Bids"
      },
      {
        "id": 4,
        "title": "Crypto"
      },
      {
        "id": 5,
        "title": "Digital"
      },
      {
        "id": 6,
        "title": "Arts"
      },
      {
        "id": 7,
        "title": "Marketplace"
      },
      {
        "id": 8,
        "title": "Token"
      },
      {
        "id": 9,
        "title": "Wallet"
      }
    ],
    "widgetData_3": [
      {
        "id": 1,
        "icon": "icon-social-instagram ml-0"
      },
      {
        "id": 2,
        "icon": "icon-social-facebook"
      },
      {
        "id": 3,
        "icon": "icon-social-twitter"
      },
      {
        "id": 4,
        "icon": "icon-social-linkedin"
      }
    ]
  };  

class Sidebar extends Component {
    state = {
        data: {},
        widgetData_1: [],
        widgetData_2: [],
        widgetData_3: [],
        url: '',
        imgURL: '',
        userid: '',
        username: '',
        usercomment: ''
    }
    componentDidMount(){
        this.getCount();
        this.setState({
            data: initData,
            widgetData_1: initData.widgetData_1,
            widgetData_2: initData.widgetData_2,
            widgetData_3: initData.widgetData_3,
            url: process.env.REACT_APP_SERVER_URL + this.props.match.url,
            imgURL: localStorage.getItem("imgURL"),
            userid: localStorage.getItem("userid"),
            username: localStorage.getItem("username"),
            usercomment: localStorage.getItem("usercomment")
        })
    }

    getCount = async () => {
        
      const scriptApi = axios.create({
        baseURL: process.env.REACT_APP_SCRIPTS_URL
      });
      // console.log("tokenID:" + tokenId);
      const data = {"status": "6"};
      const response = await scriptApi.post("/tokens", JSON.stringify(data), {
          headers: {
              "Content-Type": `multipart/form-data`,
          },
      });
      const query = response["data"]["data"];
      let str = "";
      for (let i = 0; i < query.length; i++) {
        str += query[i]["categories"];
      }
      for (let i = 0; i < initData.widgetData_1.length; i++) {
        const ch = initData.widgetData_1[i]["title"];
        initData.widgetData_1[i]["content"] = (str.split(";"+ch+";").length - 1).toString();
      }
    }

    render() {
        return (
            <aside className="col-12 col-lg-4 pl-lg-5 p-0 float-right sidebar">
                <div className="row">
                    <div className="col-12 align-self-center text-left">
                        {/* Widget [categories] */}
                        <div className="item widget-categories">
                            <h4 className="title">{this.state.data.widgetTitle_1}</h4>
                            <ul className="list-group list-group-flush">
                                {this.state.widgetData_1.map((item, idx) => {
                                    return (
                                        <li key={`wdo_${idx}`} className="list-group-item d-flex justify-content-between align-items-center">
                                            <Link to={`/blog?category=${item.title}`}>{item.title}</Link>
                                            <span className="badge circle">{item.content}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        {/* Widget [tags] */}
                        {/* <div className="item widget-tags">
                            <h4 className="title">{this.state.data.widgetTitle_2}</h4>
                            {this.state.widgetData_2.map((item, idx) => {
                                return (
                                    <Link key={`wdt_${idx}`} to="" className="badge tag">{item.title}</Link>
                                );
                            })}
                        </div> */}
                        {/* Widget [share-this] */}
                        <div className="item widget-share-this">
                            <h4 className="title">{this.state.data.widgetTitle_3}</h4>
                            <ul className="navbar-nav social share-list">                                
                                <FacebookShareButton
                                    url={this.state.url}
                                    quote={this.state.imgURL}
                                    hashtag={this.state.username}>
                                    <FacebookIcon size={43} logoFillColor="white"/>
                                </FacebookShareButton>
                                <TwitterShareButton
                                    url={this.state.url}
                                    title={this.state.username}
                                    via={this.usercomment}
                                    hashtag="#">
                                    <TwitterIcon size={43} logoFillColor="white"/>
                                </TwitterShareButton>
                                <LinkedinShareButton
                                    url={this.state.url}
                                    title={this.state.username}
                                    summary={this.state.usercomment}
                                    source={this.state.imgURL}>
                                    <LinkedinIcon size={43} logoFillColor="white"/>
                                </LinkedinShareButton>
                                <TelegramShareButton
                                    url={this.state.url}
                                    title={this.state.username}>
                                    <TelegramIcon size={43} logoFillColor="white"/>
                                </TelegramShareButton>
                            </ul>
                        </div>
                    </div>
                </div>
            </aside>
        );
    }
}

const SidebareWithRouter = withRouter(Sidebar);
export default SidebareWithRouter;