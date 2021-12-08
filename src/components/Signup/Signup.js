import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useForm } from "react-hook-form";
import LoadingOverlay from 'react-loading-overlay';
import { SocialIcon } from 'react-social-icons';

const initData = {
    pre_heading: "Register",
    heading: "Create an Account",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit."
}

const socialData = [
    {
        id: "1",
        link: "facebook",
        icon: "fab fa-facebook-f"
    },
    {
        id: "2",
        link: "twitter",
        icon: "fab fa-twitter"
    },
    {
        id: "3",
        link: "google-plus",
        icon: "fab fa-google-plus-g"
    }
]

class Signup extends Component {
    state = {
        initData: {},
        data: [],
        isLoading: false,
        username: '',
        useremail: '',
        userpwd: '',
        ischecked: false,
        imgURL: '',
        img: '',
        coverImageUrl: '',
        coverImage: '',
        description: ''
    }

    componentDidMount(){
        this.setState({
            initData: initData,
            data: socialData
        })
    }
    
    onSubmit = async (e) => {
        e.preventDefault();
        const { history } = this.props;
        if (this.state.ischecked) {
            this.setState({isLoading: true});

            let res = await this.uploadFile(this.state.img);
            let res1 = await this.uploadFile(this.state.coverImage);
            if (!res.data.error && !res1.data.error) {
                const recipeUrl = `${process.env.REACT_APP_SIGNUP_URL}`;
                const requestMetadata = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({username: this.state.username, useremail: this.state.useremail, userpwd: this.state.userpwd, imgURL: res.data.img, coverImage: res1.data.img, usercomment: this.state.description})
                };
                fetch(recipeUrl, requestMetadata)
                    .then(res => res.json())
                    .then(recipes => {
                        alert(recipes["message"]);
                        this.setState({
                            isLoading: false
                        });
                        if (!recipes["error"]) {
                            history.push("/login");
                        }
                    }).catch((error) => {
                        alert(error);
                        this.setState({isLoading : false});
                    });
                } else {
                    if (res.data.error) alert(res.data.message);
                    else if (res1.data.error) alert(res1.data.message);
                    this.setState({isLoading : false});
                }
        } else {
            alert("You should read and accept our policy for signup!")
        }
    }

    uploadFile = async (file) => {
        

        const formData = new FormData();
        
        formData.append('avatar', file)
        
        return  await axios.post(`${process.env.REACT_APP_UPLOAD_URL}`, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    }

    unChange = (e) => {
        this.setState({username : e.target.value});
    }

    ueChange = (e) => {
        this.setState({useremail : e.target.value});
    }

    upChange = (e) => {
        this.setState({userpwd : e.target.value});
    }

    descriptionChange = (e) => {
        this.setState({description : e.target.value});
    }

    cChange = (e) => {
        this.setState({ischecked: true})
    }

    imgChange = (e) => {
        this.setState({img : e.target.files[0]});
        this.setState({imgURL : e.target.value});
    }

    cimgChange = (e) => {
        this.setState({coverImage : e.target.files[0]});
        this.setState({coverImageURL : e.target.value});
    }

    render() {
        return (
            <section className="author-area">
                <LoadingOverlay
                    active={this.state.isLoading}
                    spinner
                    text='Creating User...'
                    >
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-7 col-lg-7">
                                {/* Intro */}
                                <div className="intro text-center">
                                    <span>{this.state.initData.pre_heading}</span>
                                    <h3 className="mt-3 mb-0">{this.state.initData.heading}</h3>
                                    {/* <p>{this.state.initData.content}</p> */}
                                </div>
                                {/* Item Form */}
                                <form className="item-form card no-hover" onSubmit = {this.onSubmit}>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group mt-3">
                                                <input type="text" className="form-control" name="name" placeholder="Enter your Name" required="required" value={this.state.username} onChange={this.unChange} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="input-group form-group mt-3">
                                                <div className="custom-file">
                                                    <input type="file" className="custom-file-input" id="inputGroupFile01" onChange={this.cimgChange} required="required" />
                                                    <label className="custom-file-label" htmlFor="inputGroupFile01">{!this.state.coverImageURL ? 'Choose File for Cover Image' : this.state.coverImageURL}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="input-group form-group mt-3">
                                                <div className="custom-file">
                                                    <input type="file" className="custom-file-input" id="inputGroupFile02" onChange={this.imgChange} required="required" />
                                                    <label className="custom-file-label" htmlFor="inputGroupFile02">{this.state.imgURL.length === 0 ? 'Choose File for Avatar' : this.state.imgURL}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group mt-3">
                                                <input type="email" className="form-control" name="email" placeholder="Enter your Email" required="required" value={this.state.useremail} onChange={this.ueChange} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group mt-3">
                                                <input type="password" className="form-control" name="password" placeholder="Enter your Password" required="required" value={this.state.userpwd} onChange={this.upChange} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group mt-3">
                                                <textarea className="form-control" name="textarea" placeholder="Description" cols={30} rows={3} defaultValue={""} value={this.state.description} onChange={this.descriptionChange} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group mt-3">
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" defaultValue="option1" onChange={ this.cChange }  />
                                                    <label className="form-check-label" htmlFor="inlineRadio1">I agree to the <Link to="/privacy-terms">Privacy Policy</Link></label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button className="btn w-100 mt-3 mt-sm-4" type="submit">Sign Up</button>
                                        </div>
                                        <div className="col-12">
                                            <span className="d-block text-center mt-4">Already have an account? <Link to="/login">Login</Link></span>
                                        </div>
                                        <div className="col-12">
                                            <hr />
                                            <div className="other-option">
                                                <span className="d-block text-center mb-4">Or</span>
                                                {/* Social Icons */}
                                                <div className="social-icons d-flex justify-content-center">
                                                    <SocialIcon url="https://www.facebook.com/SpaceGrime-110765561163111" style={{ height: 40, width: 40 }} target="_blank" />
                                                    <SocialIcon url="https://www.instagram.com/spacegrimecoin/" style={{ height: 40, width: 40 }} target="_blank" />
                                                    <SocialIcon url="https://twitter.com/spacegrime" style={{ height: 40, width: 40 }} target="_blank" />
                                                    <SocialIcon url="https://www.tiktok.com/@spacegrimecoin" style={{ height: 40, width: 40 }} bgColor="#ff5a01" target="_blank"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
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

export default withRouter(withUseFormHook(Signup));