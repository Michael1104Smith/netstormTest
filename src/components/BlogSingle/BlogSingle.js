import React, { Component } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import {
    Link,
    withRouter
} from "react-router-dom";
import { useForm } from "react-hook-form";
import LoadingOverlay from 'react-loading-overlay';
import Blog1 from './Blog1';
import Blog2 from './Blog2';
import Blog3 from './Blog3';

class BlogSingle extends Component {
    state = {
        data: {},
        uname: "",
        uemail: "",
        umsg: "",
        isLoading: false,
        content_1: "",
        date: "",
        image: "",
        title: "",
        idx: -1
    }

    componentDidMount(){
      this.setBlog();
    }

    setBlog = async () => {
      
      let idx = Number(this.props.match.params.idx);
        
      const scriptApi = axios.create({
        baseURL: process.env.REACT_APP_SCRIPTS_URL
      });
      const data = {"status": "5", "idx": idx+1};
      const response = await scriptApi.post("/tokens", JSON.stringify(data), {
          headers: {
              "Content-Type": `multipart/form-data`,
          },
      });
      const query = response["data"]["data"];
      this.setState({
        content_1: query["description"],
        date: query["date1"],
        image: query["img"],
        title: query["title"],
        idx: idx+1
      });
    }

    
    onComment = async (e) => {
      e.preventDefault();
      this.setState({isLoading: true});
      const scriptApi = axios.create({
        baseURL: process.env.REACT_APP_SCRIPTS_URL
      });

      const data = {"uname": this.state.uname, "uemail": this.state.uemail, "umsg": this.state.umsg, "useremail": localStorage.getItem("useremail"), "status": 3};
      const response = await scriptApi.post("/tokens", JSON.stringify(data), {
          headers: {
          "Content-Type": `multipart/form-data`,
          },
      });
      alert(response["data"]["message"]);
      this.setState({isLoading: false});
    }

    nameChange = (e) => {
      this.setState({uname: e.target.value});
    }

    emailChange = (e) => {
      this.setState({uemail: e.target.value});
    }

    msgChange = (e) => {
      this.setState({umsg: e.target.value});
    }
    render() {
        return (
            <section className="single featured post-details">
              <LoadingOverlay
                  active={this.state.isLoading}
                  spinner
                  text={'Posting Comment...'}
                  >
                  <div className="container">
                      <div className="row">
                          {/* Main */}
                          <div className="col-12 col-lg-8 p-0">
                              <div className="row">
                                  <div className="col-12 align-self-center">
                                      {/* Image */}
                                      <div className="blog-thumb">
                                          <img className="w-100" src={this.state.image} alt="" />
                                      </div>
                                      <h2 className="featured ml-0">{this.state.title}</h2>
                                      { this.state.idx === 1 && ( <Blog1 />) }
                                      { this.state.idx === 2 && ( <Blog2 />) }
                                      { this.state.idx === 3 && ( <Blog3 />) }
                                      {/* Post Holder */}
                                      <ul className="mb-5 post-holder">
                                          <li className="post-meta-item">
                                              <div className="date">
                                                  <span className="posted-on">Posted On
                                                    <Link rel="bookmark" to={`/blog?date=${this.state.date}`}>
                                                      <time className="entry-date published updated" dateTime="2018-11-01T06:18:46+00:00"> {this.state.date}</time>
                                                    </Link>
                                                  </span>
                                              </div>
                                          </li>
                                      </ul>
                                      {/* Comments */}
                                      <h3 className="comments-reply-text mb-3">Leave a Comment</h3>
                                      <p className="mt-3"></p>
                                      <form onSubmit = {this.onComment}>
                                          <fieldset>
                                              <div className="row">
                                                  <div className="col-12 col-lg-6 input-group p-0 pr-lg-3 mb-3">
                                                      <input type="text" name="name" data-minlength={3} value={this.state.uname} placeholder="Name" onChange={this.nameChange} required />
                                                  </div>
                                                  <div className="col-12 col-lg-6 input-group p-0 mb-3">
                                                      <input type="email" name="email" data-minlength={3} placeholder="Email" value={this.state.uemail} onChange={this.emailChange} required />
                                                  </div>
                                              </div>
                                              <div className="row">
                                                  <div className="col-12 input-group p-0 mb-3">
                                                      <textarea name="message" data-minlength={3} rows={4} placeholder="Message" value={this.state.umsg} required defaultValue={""} onChange={this.msgChange} />
                                                  </div>
                                              </div>
                                              <div className="col-12 input-group p-0">
                                                  <button className="btn btn-bordered-white text-white">Post Comment<i className="icon-login ml-2" /></button>
                                              </div>
                                          </fieldset>
                                      </form>
                                  </div>
                              </div>
                          </div>
                          {/* Sidebar */}
                          <Sidebar />
                      </div>
                  </div>
                </LoadingOverlay>
            </section>
        );
    }
}


export const withUseFormHook = (Component) => {
  return props => {
      const form = useForm();
      return <Component {...props} {...form} />
  }       
}

const BlogSingleWithRouter = withRouter(withUseFormHook(BlogSingle));

export default BlogSingleWithRouter;