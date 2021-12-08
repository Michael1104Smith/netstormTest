import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const initData = {
    "preHeading": "How It Works",
    "heading": "Create and sell your NFTs"
};

class Work extends Component {
    state = {
        data: {}
    }
    componentDidMount(){
        this.setState({
            data: initData
        })
    }
    render() {
        return (
            <section className="work-area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* Intro */}
                            <div className="intro mb-4">
                                <div className="intro-content">
                                    <span>{this.state.data.preHeading}</span>
                                    <h3 className="mt-3 mb-0">{this.state.data.heading}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row items">
                        <div key="1" className="col-12 col-sm-6 col-lg-3 item">
                            {/* Single Work */}
                            <div className="single-work">
                                <i className="icons icon-wallet text-effect" />
                                <h4>Set up your wallet</h4>
                                <p>Once you’ve set up your wallet of choice, connect it to SpaceGrime’s NFT Marketplace by clicking the Wallet Connect button in the top right corner. Click <Link to="/wallet-connect">here</Link> to learn about the wallets we support.</p>
                            </div>
                        </div>
                        
                        <div key="2" className="col-12 col-sm-6 col-lg-3 item">
                            {/* Single Work */}
                            <div className="single-work">
                                <i className="icons icon-grid text-effect" />
                                <h4>Create your collection</h4>
                                <p>Click Create and set up your collection. Add social links, a description, profile & banner images, and set a secondary sales fee.</p>
                            </div>
                        </div>
                        
                        <div key="3" className="col-12 col-sm-6 col-lg-3 item">
                            {/* Single Work */}
                            <div className="single-work">
                                <i className="icons icon-drawer text-effect" />
                                <h4>Add your NFTs</h4>
                                <p>Upload your work (image, video, audio, or 3D art), add a title and description, and customize your NFTs with properties, stats, and unlockable content.</p>
                            </div>
                        </div>
                        
                        <div key="4" className="col-12 col-sm-6 col-lg-3 item">
                            {/* Single Work */}
                            <div className="single-work">
                                <i className="icons icon-bag text-effect" />
                                <h4>List them for sale</h4>
                                <p>Choose between auctions, fixed-price listings, and declining-price listings. You choose how you want to sell your NFTs!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Work;