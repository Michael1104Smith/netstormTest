import React, { Component } from 'react';
import axios from 'axios';
import {
    Link,
    withRouter
} from "react-router-dom";

class Blog extends Component {
    state = {
        data: []
    }

    componentDidMount(){
        // axios.get(`${BASE_URL}`)
        //     .then(res => {
        //         this.setState({
        //             data: res.data.blogData
        //         })
        //         // console.log(this.state.data)
        //     })
        // .catch(err => console.log(err))
        // this.setState({
        //     data: initData
        // })
      this.setBlog(this.props.location);
      this.unlisten = this.props.history.listen((location, action) => {
        this.setBlog(location);
      });
    }
    componentWillUnmount() {
      this.unlisten();
    }
    setBlog = async (location) => {
      const scriptApi = axios.create({
          baseURL: process.env.REACT_APP_SCRIPTS_URL
      });
      let date = "", author = "", category = "", keyword = "";
      if (!!location.search) {
        const search = location.search;
        if (search.indexOf("?date=") >= 0) {
          date = search.split("?date=")[1];
        } else if (search.indexOf("?author=") >= 0) {
          author = search.split("?author=")[1];
        } else if (search.indexOf("?category=") >= 0) {
          category = ";" + search.split("?category=")[1] + ";";
        } else if (search.indexOf("?keyword=") >= 0) {
          keyword = search.split("?keyword=")[1];
        }
      }
      const data = {"status": "4", "date1": date, "author": author, "category": category, "keyword": keyword};
      const response = await scriptApi.post("/tokens", JSON.stringify(data), {
          headers: {
              "Content-Type": `multipart/form-data`,
          },
          });

      // console.log(response);
      if (response["data"]) {
          const error = response["data"]["error"];
          if (!error) {
              let data = response["data"]["data"];
              for (let i = 0; i < data.length; i++) {
                data[i]["date"] = data[i]["date1"];
              }
              this.setState({data: response["data"]["data"]});
          }
      }
  }

    render() {
        return (
            <section className="blog-area">
                <div className="container">
                    <div className="row items">
                        {this.state.data.map((item, idx) => {
                            return (
                                <div key={`bd_${idx}`} className="col-12 col-md-4 item">
                                    {/* Single Blog */}
                                    <div className="card blog-card">
                                        {/* Blog Thumb */}
                                        <div className="blog-thumb">
                                            <Link to={`/blog-single/${idx}`}><img src={item.img} alt="" /></Link>
                                        </div>
                                        {/* Blog Content */}
                                        <div className="blog-content">
                                            {/* Meta Info */}
                                            <ul className="meta-info d-flex justify-content-between list-unstyled mt-4">
                                                <li>By <Link to={`/blog?author=${item.author}`}>{item.author}</Link></li>
                                                <li><Link to={`/blog?date=${item.date}`}>{item.date}</Link></li>
                                            </ul>
                                            {/* Blog Title */}
                                            <Link to={`/blog-single/${idx}`}>
                                                <h4>{item.title}</h4>
                                            </Link>
                                            <p>{item.content}</p>
                                            {/* Blog Button */}
                                            <Link className="btn content-btn" to={`/blog-single/${idx}`}>Read More</Link>
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

const BlogWithRouter = withRouter(Blog);
export default BlogWithRouter;