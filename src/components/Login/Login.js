import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import LoadingOverlay from 'react-loading-overlay';
import { useWeb3React } from '@web3-react/core'

const Login = () => {

    const initData = {
        pre_heading: "Login",
        heading: "Login to your Account",
        content: "Welcome back! Do you want to access your account? Simply enter your email and password, or for faster access log in with Facebook, Twitter, or Gmail."
    }
    
    const data = [
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
            link: "gmail",
            icon: "fab fa-google"
        }
    ]
    
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory();
    const { deactivate } = useWeb3React()

    const { register, getValues, handleSubmit } = useForm();

    const onSubmit = (e) => {
        if (localStorage.getItem("logged") === "false") {
            const values = getValues();
            setIsLoading(true);

            const recipeUrl = `${process.env.REACT_APP_LOGIN_URL}`;
            const requestMetadata = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({useremail: values.useremail, userpwd: values.userpwd})
            };
            fetch(recipeUrl, requestMetadata)
                .then(res => res.json())
                .then(recipes => {
                    alert(recipes["message"]);
                    setIsLoading(false);
                    if (!recipes["error"]) {
                        localStorage.setItem('logged', "true");
                        localStorage.setItem('username', recipes["username"]);
                        localStorage.setItem('imgURL', recipes["imgURL"]);
                        localStorage.setItem('useremail', values.useremail);
                        localStorage.setItem('userid', recipes["userid"]);
                        localStorage.setItem('coverImage', recipes["coverImage"]);
                        localStorage.setItem('usercomment', recipes["usercomment"]);
                        history.push("/");
                    } else {
                        localStorage.setItem('logged', "false");
                    }
                }).catch((error) => {
                    alert(error);
                    localStorage.setItem('logged', "false");
                    setIsLoading(false);
                });
        } else {
            deactivate();
            localStorage.setItem('userConnectedWallet', 'false')
            localStorage.setItem('logged', "false");
            localStorage.setItem('userid', "");
            localStorage.setItem('username', "");
            localStorage.setItem('useremail', "");
            localStorage.setItem('imgURL', "");
            localStorage.setItem('coverImage', "");
            localStorage.setItem('usercomment', "");
            history.push("/login");
        }
    }

    return (
        <section className="author-area">
            <LoadingOverlay
                active={isLoading}
                spinner
                text='Login...'
                >
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-7">
                            {/* Intro */}
                            <div className="intro text-center">
                                <span>{initData.pre_heading}</span>
                                <h3 className="mt-3 mb-0">{ localStorage.getItem("logged") === "true" ? "Logged In as " + localStorage.getItem("username") :initData.heading }</h3>
                                { localStorage.getItem("logged") !== "true" && (<p>{initData.content}</p>) }
                            </div>
                            {/* Item Form */}
                            <form className="item-form card no-hover" onSubmit = {handleSubmit(onSubmit)}>
                                <div className="row">
                                    { localStorage.getItem("logged") === "false" && (
                                    <div className="col-12">
                                        <div className="form-group mt-3">
                                            <input type="email" className="form-control" name="email" placeholder="Enter your Email" required="required" {...register("useremail")} />
                                        </div>
                                    </div>
                                    )}
                                    { localStorage.getItem("logged") === "false" && (
                                    <div className="col-12">
                                        <div className="form-group mt-3">
                                            <input type="password" className="form-control" name="password" placeholder="Enter your Password" required="required" {...register("userpwd")} />
                                        </div>
                                    </div>
                                    )}
                                    { localStorage.getItem("logged") === "false" && (
                                    <div className="col-12">
                                        <div className="form-group mt-3">
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" defaultValue="option1" defaultChecked />
                                                <label className="form-check-label" htmlFor="inlineRadio1">Remember Me</label>
                                            </div>
                                        </div>
                                    </div>
                                    )}
                                    <div className="col-12">
                                        <button type="submit" className="btn w-100 mt-3 mt-sm-4">{localStorage.getItem("logged") === "false"?"Sign In":"Log Out"}</button>
                                    </div>
                                    <div className="col-12">
                                        <hr />
                                        <div className="other-option">
                                            <span className="d-block text-center mb-4">Or</span>
                                            {/* Social Icons */}
                                            <div className="social-icons d-flex justify-content-center">
                                                {data.map((item, idx) => {
                                                    return (
                                                        <Link key={`lsd_${idx}`} className={item.link} to="#">
                                                            <i className={item.icon} />
                                                            <i className={item.icon} />
                                                        </Link>
                                                    );
                                                })}
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
    )
}
export default Login;