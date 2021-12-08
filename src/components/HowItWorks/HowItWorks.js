import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const initData = {
    pre_heading: "How It Works",
    heading1: "How do I create an account on SpaceGrime’s NFT Marketplace?",
    heading2: "What is “minting” and how does it work?"
}

class HowItWorks extends Component {
    state = {
        initData: {},
        data: []
    }
    componentDidMount(){
        this.setState({
            initData: initData
        })
    }
    render() {
        return (
            <section className="help-center-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-7">
                            {/* Intro */}
                            <div className="intro text-center">
                                <span>{this.state.initData.pre_heading}</span>
                            </div>
                        </div>
                        <div className="col-12 col-md-8 col-lg-7">
                            {/* Intro */}
                            <div className="intro">
                                <h3 className="mt-3 mb-0 text-center">{this.state.initData.heading1}</h3>
                                <p>This guide explains the three things you'll need in place to open your account and start buying or selling NFTs on our NFT Marketplace.</p>
                                <p>SpaceGrime’s NFT marketplace is another tool you use to interact with the blockchain. We provide a platform for users to purchase digital assets. Our goal is to create an ecosystem where users can easily acquire any digital asset you can think of. Since you’ll be using the SpaceGrime NFT Marketplace to interact directly with others on the blockchain, you’ll need a wallet to help you turn your actions in the browser into transactions on the blockchain. Click here to check out all <Link to="/wallet-connect">compatible wallets.</Link></p>
                                <p>Once you have a wallet, you’ll first create an account to be able to connect your wallet. Simply <Link to="/signup">click here</Link> to create your account. After that, choose the Wallet Connect button on the top right of your screen to connect your wallet and get ready to navigate the vast universe that is SpaceGrime’s NFT Marketplace!</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-8 col-lg-7">
                            {/* Intro */}
                            <div className="intro">
                                <h3 className="mt-3 mb-0 text-center">What is an NFT?</h3>
                                <p>FTs are unique, digital items with blockchain-managed ownership. They are examples of digital art, collectibles and virtual reality items. These tokens are “fungible”, meaning one commodity is interchangeable with another of the same type. Think of them as equivalent to a digital equivalent of a collectible figurine or trading cards like <a target="_blank" rel="noreferrer" href="https://nftevening.com/the-iron-maiden-eddie-nft-collection-digitizes-the-metalheads-mascot/">Iron Maiden’s Funko NFTs.</a> To understand more about how NFTs work and why they’re more and more common to hear about in the IoT, we prepared a handy blog post: <Link to="/blog-single/0">NFT 101</Link></p>
                            </div>
                        </div>
                        <div className="col-12 col-md-8 col-lg-7">
                            {/* Intro */}
                            <div className="intro">
                                <h3 className="mt-3 mb-0 text-center">How do I purchase ETH?</h3>
                                <p>Ether is the base currency of Ethereum. You need ETH to pay for your transactions on SpaceGrime’s NFT Marketplace. In order to buy or make an offer on the items in our marketplace, you’ll need to ensure that your wallet has ETH. You can add funds swiftly by clicking on the Wallet button on the top right corner of the screen once your wallet is connected. This will prompt you with the Add Funds option where you can purchase with a credit or debit card, or deposit ETH into your wallet from an exchange.</p>
                                <h5>If you’re unfamiliar with buying crypto, it’s best to use a simple exchange. Exchanges like Coinbase or Binance have user-friendly interfaces and make the process simple. Here are two guides that can help you through the process:</h5>
                                <p>Coinbase: <a target="_blank" rel="noreferrer" href="https://help.coinbase.com/en/coinbase/trading-and-funding/cryptocurrency-trading-pairs/how-to-send-and-receive-cryptocurrency.html%C2%A0">How to send and receive cryptocurrency</a></p>
                                <p>Binance: <a target="_blank" rel="noreferrer" href="https://www.binance.com/en/blog/p2p/how-to-send-crypto-to-family-and-friends-worldwide-using-binance-p2p-421499824684902082">How to Send Crypto to Family and Friends Worldwide Using Binance P2P</a></p>
                            </div>
                        </div>
                        <div className="col-12 col-md-8 col-lg-7">
                            {/* Intro */}
                            <div className="intro">
                                <h3 className="mt-3 mb-0 text-center">What blockchains does the SpaceGrime NFT Marketplace support?</h3>
                                <p>SpaceGrime’s NFT Marketplace aims to offer cross-blockchain support, however its starting blockchain is <a target="_blank" rel="noreferrer" href="https://ethereum.org/en/">Ethereum</a> (ETH). </p>
                                <h5>Here’s what you need to know about ETH:</h5>
                                <p>Ethereum was created by Vitalik Buterin in 2013 and launched in 2015; It has many applications besides being a cryptocurrency. Ethereum is an open source public blockchain-based distributed computing platform featuring smart contract (scripting) functionality.. it allows anyone to write and deploy code that interacts with the blockchain in the form of decentralized applications, or “dApps”.</p>
                                <p>​​ETH is used to pay transaction fees (known as gas fees) on the Ethereum blockchain, so when you complete a transaction, you’ll need to consider ETH’s gas fees in addition to our marketplace’s 2.5% fee.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default HowItWorks;