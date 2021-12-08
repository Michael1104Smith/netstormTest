import React, { Component } from 'react';
import axios from 'axios';
// import HelmetMetaData from '../HelmetMetaData/HelmetMetaData';
import { Checkmark}  from 'react-checkmark';

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

const initData = {
    "img": "/img/auction_2.jpg",
    "authorImg": "/img/avatar_8.jpg",
    "author": "Artnox",
    "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    "authorId": "ZqpthncaYTsd0579hasfu00st",
    "btnText": "Follow",
    "socialData": [
      {
        "id": 1,
        "link": "facebook",
        "icon": "fab fa-facebook-f",
        "url": "https://www.facebook.com"
      },
      {
        "id": 2,
        "link": "twitter",
        "icon": "fab fa-twitter",
        "url": "https://twitter.com/home"
      },
      {
        "id": 3,
        "link": "google-plus",
        "icon": "fab fa-google-plus-g",
        "url": "https://www.google.com/"
      },
      {
        "id": 4,
        "link": "vine",
        "icon": "fab fa-vine",
        "url": "https://vine.co"
      }
    ]
  }

class AuthorProfile extends Component {
    state = {
        data: {},
        socialData: [],
        coverImage: '',
        imgURL: '',
        userid: '',
        username: '',
        usercomment: '',
        url: '',
        verified: 0
    }
    componentDidMount(){
        const params = this.props.match.params;
        let idx = Number(params.idx);
        if (!idx) idx = localStorage.getItem("userid");
        this.setState({url: process.env.REACT_APP_SERVER_URL + this.props.match.url});
        axios.get(`${process.env.REACT_APP_GETUSER_URL}?userid=${idx}`)
            .then(res => {
                const datum = res.data.data[0];
                this.setState({
                    data: initData,
                    socialData: initData.socialData,
                    coverImage: datum.coverImage,
                    imgURL: datum.imgURL,
                    userid: datum.userid,
                    username: datum.username,
                    usercomment: datum.usercomment,
                    verified: Number(datum.verified)
                })
        })
        .catch(err => console.log(err))
    }
    render() {

        return (
            <div className="card no-hover text-center">
                <div className="image-over">
                    <img className="card-img-top" src={this.state.coverImage} alt="" />
                    {/* Author */}
                    <div className="author">
                        <div className="author-thumb avatar-lg">
                            <img className="rounded-circle" src={this.state.imgURL} alt="" />
                        </div>
                    </div>
                </div>
                {/* Card Caption */}
                <div className="card-caption col-12 p-0">
                    {/* Card Body */}
                    <div className="card-body mt-4">
                        <h5 className="mb-3">{this.state.username}
                            {this.state.verified === 1 && (
                                <span className="d-inline-block pointerCursor" tabindex="0" data-toggle="tooltip" title="Verified User"><Checkmark size='20px'/></span>  
                            )}
                        </h5>
                        <p className="my-3">{this.state.usercomment}</p>
                        {/* <div className="input-group">
                            <input type="text" className="form-control" placeholder={this.state.userid} />
                            <div className="input-group-append">
                                <button><i className="icon-docs" /></button>
                            </div>
                        </div> */}
                        {/* Social Icons */}
                        {/* <HelmetMetaData image={this.state.imgURL} description={this.state.usercomment} title={this.state.username}></HelmetMetaData> */}

                        <div className="social-icons d-flex justify-content-center my-3">
                            <FacebookShareButton
                                url={this.state.url}
                                quote={this.state.imgURL}
                                hashtag={"#"+this.state.username}>
                                <FacebookIcon size={43} logoFillColor="white"/>
                            </FacebookShareButton>
                            <TwitterShareButton
                                url={this.state.url}
                                title={this.state.username}
                                via={this.state.usercomment}
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
                        </div>
                        <Link className="btn btn-bordered-white btn-smaller" to="#">{this.state.data.btnText}</Link>
                    </div>
                </div>
            </div>
        );
    }
}

const AuthorProfileWithRouter = withRouter(AuthorProfile);
export default AuthorProfileWithRouter;