import React, { Component } from 'react';
import MailchimpSubscribe from "react-mailchimp-subscribe";

import {
    Link,
    withRouter
} from "react-router-dom";

import { SocialIcon } from 'react-social-icons';

const initData = {
    "img": "/img/logo.png",
    "content": "There are thousands of great tokens, but only a select few get immortalized as non-fungible tokens. Our universe is bursting with potential and we aim to bring out the very best of it.",
    "widget_1": "Useful Links",
    "widget_2": "Community",
    "widget_3": "Subscribe to Us",
    "socialData": [
      {
        "id": 1,
        "link": "facebook",
        "icon": "fab fa-facebook-f"
      },
      {
        "id": 2,
        "link": "twitter",
        "icon": "fab fa-twitter"
      },
      {
        "id": 3,
        "link": "google-plus",
        "icon": "fab fa-google-plus-g"
      },
      {
        "id": 4,
        "link": "vine",
        "icon": "fab fa-vine"
      }
    ],
    "widgetData_1": [
      {
        "id": 1,
        "text": "All NFTs",
        "url": "/explore"
      },
      {
        "id": 2,
        "text": "How It Works",
        "url": "/how-it-works"
      },
      {
        "id": 3,
        "text": "Create",
        "url": "/create"
      },
      {
        "id": 4,
        "text": "Explore",
        "url": "/explore"
      },
      {
        "id": 5,
        "text": "Privacy & Terms",
        "url": "/privacy-terms"
      }
    ],
    "widgetData_2": [
      {
        "id": 1,
        "text": "Help Center",
        "url": "/help-center"
      },
      {
        "id": 2,
        "text": "Partners",
        "url": "/help-center"
      },
      {
        "id": 3,
        "text": "Blog",
        "url": "/blog"
      }
    ]
  };

class Footer extends Component {
    state = {
        data: {},
        socialData: [],
        widgetData_1: [],
        widgetData_2: [],
        url: ''
    }
    componentDidMount(){
        this.setState({
            data: initData,
            socialData: initData.socialData,
            widgetData_1: initData.widgetData_1,
            widgetData_2: initData.widgetData_2,
            url: encodeURIComponent(process.env.REACT_APP_SERVER_URL + this.props.match.url)
        });
    }
    render() {
        const postUrl = `https://genhybridsystems.us1.list-manage.com/subscribe/post?u=${process.env.REACT_APP_MAILCHIMP_U}&id=${process.env.REACT_APP_MAILCHIMP_ID}`;

        return (
            <footer className="footer-area">
                {/* Footer Top */}
                <div className="footer-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-sm-6 col-lg-3 res-margin">
                                {/* Footer Items */}
                                <div className="footer-items">
                                    {/* Logo */}
                                    <Link className="navbar-brand" to="/">
                                        <img src={this.state.data.img} alt="" />
                                    </Link>
                                    <p>{this.state.data.content}</p>
                                    {/* Social Icons */}
                                    <div className="social-icons d-flex">
                                        <SocialIcon url="https://www.facebook.com/SpaceGrime-110765561163111" style={{ height: 40, width: 40 }} target="_blank" rel="noreferrer" />
                                        <SocialIcon url="https://www.instagram.com/spacegrimecoin/" style={{ height: 40, width: 40 }} target="_blank" rel="noreferrer" />
                                        <SocialIcon url="https://twitter.com/spacegrime" style={{ height: 40, width: 40 }} target="_blank" rel="noreferrer" />
                                        <SocialIcon url="https://www.tiktok.com/@spacegrimecoin" style={{ height: 40, width: 40 }} bgColor="#ff5a01" target="_blank" rel="noreferrer"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-3 res-margin">
                                {/* Footer Items */}
                                <div className="footer-items">
                                    {/* Footer Title */}
                                    <h4 className="footer-title">{this.state.data.widget_1}</h4>
                                    <ul>
                                        {this.state.widgetData_1.map((item, idx) => {
                                            return (
                                                <li key={`wdo_${idx}`}><Link to={`${item.url}`}>{item.text}</Link></li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-3 res-margin">
                                {/* Footer Items */}
                                <div className="footer-items">
                                    {/* Footer Title */}
                                    <h4 className="footer-title">{this.state.data.widget_2}</h4>
                                    <ul>
                                        {this.state.widgetData_2.map((item, idx) => {
                                            return (
                                                <li key={`wdo_${idx}`}><Link to={`${item.url}`}>{item.text}</Link></li>
                                            );
                                        })}
                                        <li key="4"><a href="http://reddit.com/r/SpaceGrime" target="_blank" rel="noreferrer">Reddit</a></li>
                                        <li key="5"><a href="https://t.me/spacegrimechat" target="_blank" rel="noreferrer">Telegram</a></li>
                                        <li key="6"><Link to="/contact">Contact Us</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-3">
                                {/* Footer Items */}
                                <div className="footer-items">
                                    {/* Footer Title */}
                                    <h4 className="footer-title">{this.state.data.widget_3}</h4>
                                    {/* Subscribe Form */}
                                    <div className="d-flex align-items-center">
                                        <MailchimpSubscribe url={postUrl} />
                                        {/* <MailchimpSubscribe url="mailto:advertising@spacegrime.com" /> */}
                                        {/* <input type="email" className="form-control" placeholder="info@yourmail.com" />
                                        <button type="submit" className="btn"><i className="icon-paper-plane" /></button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                {/* Copyright Area */}
                                <div className="copyright-area d-flex flex-wrap justify-content-center justify-content-sm-between text-center py-4">
                                    {/* Copyright Left */}
                                    <div className="copyright-left">© SpaceGrime’s NFT Marketplace, 2021. All rights reserved.</div>
                                    {/* Copyright Right */}
                                    {/* <div className="copyright-right">Made with <i className="fas fa-heart" /> By <Link to="#">Themeland</Link></div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

const FooterWithRouter = withRouter(Footer);
export default FooterWithRouter;