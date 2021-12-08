import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const initData = {
    pre_heading: "Help Center",
    heading: "How can we help you?",
    content: ""
}

const data = [
    {
        id: "1",
        icon: "icon icon-plane text-effect",
        title: "Getting Started",
        content: "Learn how to create an account, set up your wallet, and what you can do on SpaceGrime’s NFT Marketplace"
    },
    {
        id: "2",
        icon: "icon icon-note text-effect",
        title: "Creating",
        content: "Learn how to create your very first NFT and how to create your NFT collections so you can begin selling and sharing."
    },
    {
        id: "3",
        icon: "icon icon-handbag text-effect",
        title: "Buying",
        content: "Learn how to purchase your first NFT and understand gas fees and what's gas-free on SpaceGrime’s NFT Marketplace"
    },
    {
        id: "4",
        icon: "icon icon-chart text-effect",
        title: "Selling",
        content: "Learn how list your NFTs for sale and understand the different ways to list your NFTs"
    },
    {
        id: "5",
        icon: "icon icon-link text-effect",
        title: "Partners",
        content: "Learn how you can partner with us to showcase your NFT drops"
    },
    {
        id: "6",
        icon: "icon icon-flag text-effect",
        title: "Developers",
        content: "Learn how you can develop with SpaceGrime and sell your NFTs on the Marketplace"
    }
]

class HelpCenter extends Component {
    state = {
        initData: {},
        data: [],
        itemIndex: 0
    }
    componentDidMount(){
        this.setState({
            initData: initData,
            data: data
        })
    }
    itemChange = (idx) => (e) => {
        this.setState({itemIndex:idx});
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
                                <h3 className="mt-3 mb-0">{this.state.initData.heading}</h3>
                                <p>{this.state.initData.content}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center items intro">
                        {this.state.data.map((item, idx) => {
                            return (
                                <div key={`hd_${idx}`} className="col-12 col-md-6 col-lg-4 item">
                                    {/* Help Card */}
                                    <div className="card help-card">
                                        <div className="d-block text-center" onClick={this.itemChange(idx)}>
                                            <i className={item.icon} />
                                            <h4>{item.title}</h4>
                                            <p>{item.content}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {   this.state.itemIndex===0 && (
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-8 col-lg-10">
                                {/* Intro */}
                                <div className="intro">
                                    <h3 className="mt-3 mb-0 text-center">How do I create an account on SpaceGrime’s NFT Marketplace?</h3>
                                    <p>This guide explains the three things you'll need in place to open your account and start buying or selling NFTs on our NFT Marketplace.</p>
                                    <p>SpaceGrime’s NFT marketplace is another tool you use to interact with the blockchain. We provide a platform for users to purchase digital assets. Our goal is to create an ecosystem where users can easily acquire any digital asset you can think of. Since you’ll be using the SpaceGrime NFT Marketplace to interact directly with others on the blockchain, you’ll need a wallet to help you turn your actions in the browser into transactions on the blockchain. Click here to check out all <Link to="/wallet-connect">compatible wallets.</Link></p>
                                    <p>Once you have a wallet, you’ll first create an account to be able to connect your wallet. Simply <Link to="/signup">click here</Link> to create your account. After that, choose the Wallet Connect button on the top right of your screen to connect your wallet and get ready to navigate the vast universe that is SpaceGrime’s NFT Marketplace!</p>
                                </div>
                            </div>
                            <div className="col-12 col-md-8 col-lg-10">
                                {/* Intro */}
                                <div className="intro">
                                    <h3 className="mt-3 mb-0 text-center">What is “minting” and how does it work?</h3>
                                    <p>Our job is to empower content creators to mint their creations on the blockchain. Minting NFTs on Binance Smart Chain (BSC) can be very profitable and SpaceGrime is here to make the process even easier. The road to creating and listing your NFT on Binance Smart Chain is the smoothest and fastest one. The requirements for creating an NFT are just two — a blockchain and a BEP20-compatible wallet. SpaceGrime currently allows digital creators to mint artworks, memes, music, and digital art.</p>
                                    <h4>How do I withdraw my funds from SpaceGrime’s NFT Marketplace?</h4>
                                    <p>[TBD]</p>
                                    <h4>What currencies does the SpaceGrime NFT Marketplace support?</h4>
                                    <p>Our NFT Marketplace supports ALL the existing global currencies and will grow with whatever future currencies emerge.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {   this.state.itemIndex===1 && (
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-8 col-lg-10">
                                {/* Intro */}
                                <div className="intro">
                                    <h3 className="mt-3 mb-0 text-center">Creating an NFT</h3>
                                    <p>The moment that you sign up and create an account on SpaceGrime’s NFT Marketplace, you have access to many features including the ability to create your first-ever NFT! Once you have an account and wallet connected, go to the Create tab (or follow this link <Link to="/create">here</Link>) to get started. The process is straightforward, simply complete the creation form and upload your media (image, video, audio, or any other digital art format is acceptable) and you’ll be all set. NFT Creation takes only a few seconds!</p>
                                </div>
                            </div>
                            <div className="col-12 col-md-8 col-lg-10">
                                {/* Intro */}
                                <div className="intro">
                                    <h3 className="mt-3 mb-0 text-center">Physical Item Trades</h3>
                                    <p>SpaceGrime’s NFT Marketplace currently does not facilitate NFT sales that involve a legal transfer of physical goods or rights, but that doesn’t mean it wouldn’t be an option in the near future! We may even complete the first multiplanetary NFT sales. </p>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {   this.state.itemIndex===2 && (
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-8 col-lg-10">
                                {/* Intro */}
                                <div className="intro">
                                    <h3 className="mt-3 mb-0 text-center">Placing a Bid</h3>
                                    <p>Each NFT item in our marketplace offers you the possibility to buy it now or place a bid to compete with other buyers. You can choose to buy an NFT now or place your bid, and the auction will tell you how much time is left and what your starting bid is.</p>
                                    <p>To place a bid, you’ll need to first create an account and connect your wallet. Unsure on how to do that? Visit our Getting Started page for details. Once you’re connected, click “place a bid” and select the currency you'd like to make your offer in.</p>
                                    <p>Please note: If you’ve never purchased a specific currency before, you might be prompted to pay a one-off gas fee to complete your purchase. This usually happens when you send a transaction from a wallet that has never been used to transact before. After your first purchase, future purchases in that currency will be free!</p>
                                    <p>After you’ve entered your currency, you can then place a bid. To see a list of all active offers linked to your wallet address, simply go back to your profile.</p>
                                </div>
                            </div>
                            <div className="col-12 col-md-8 col-lg-10">
                                {/* Intro */}
                                <div className="intro">
                                    <h3 className="mt-3 mb-0 text-center">Bid Requirements</h3>
                                    <p>Due to NFTs being non-fungible, you must bid at least 5% more than any previous bids. Remember that each NFT is one of a set (and therefore unique). Only bids in the same payment token (e.g. GRIMEX) as the auction will be counted towards the winning bid.</p>
                                    <p>If someone bids in the last 10 minutes of an auction, and if their bid exceeds all others, the auction will automatically extend by 10 minutes. Cancellations to the top bid also trigger an extension. This can continue for up to a week of extensions.</p>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {   this.state.itemIndex===3 && (
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-8 col-lg-10">
                                {/* Intro */}
                                <div className="intro">
                                    <h3 className="mt-3 mb-0 text-center">Royalties on SpaceGrime’s NFT Marketplace</h3>
                                    <p>NFTs can be programmed so that each transaction includes royalties, allowing creators to be rewarded fairly for their work online.</p>
                                    <p>The fact that NFTs are created and stored on the blockchain, means they can be traded seamlessly from wallet to wallet, with royalties paid every time they move.</p>
                                    <p>This guide explains how to set royalties up to 10% in the SpaceGrime’s NFT Marketplace editor, and breaks down when you can expect royalty payouts on future transactions. </p>
                                </div>
                            </div>
                            <div className="col-12 col-md-8 col-lg-10">
                                {/* Intro */}
                                <div className="intro">
                                    <h3 className="mt-3 mb-0 text-center">Setting your Royalties</h3>
                                    <p>When you create a new NFT, you can easily set the royalties for your creations there. Once you make a sale, your royalties get sent right away into your wallet; the same one you used to create an account with.</p>
                                    <p>It’s important to note that SpaceGrime’s NFT Marketplace is unable to split royalties to multiple addresses, and that royalties also apply to primary sales (sales by you).</p>
                                </div>
                            </div>
                            <div className="col-12 col-md-8 col-lg-10">
                                {/* Intro */}
                                <div className="intro">
                                    <h3 className="mt-3 mb-0 text-center">Timed Auctions</h3>
                                    <p>SpaceGrime’s NFT Marketplace allows you to 1) Sell to the highest bidder: where the highest bid wins at the end and 2) Sell with declining price: where the price falls until someone purchases.</p>
                                    <h4>Selling to the Highest Bidder</h4>
                                    <p>SpaceGrime’s NFT Marketplace allows your NFT to be sold to the highest bidder if an auction item finishes above 1 BNB, with the marketplace paying the gas fees. Should an auction end below that amount, the seller would then need to accept the highest offer. The seller is under no obligation to complete the transaction.</p>
                                    <p>Auctions can't have a reserve price lower than 1 BNB because SpaceGrime’s NFT Marketplace covers the transaction fee when the auction ends successfully.</p>
                                    <p>The seller can always choose to accept a bid below the reserve price at any time during or after the auction, but the seller will have to pay gas to do so.</p>
                                    <p>⚠️ Please note that once an auction starts, users are unable to change the reserve price. </p>
                                    <h4>Selling with a Declining Price</h4>
                                    <p>This type of auction is similar to fixed-price listings, but the price falls over time. For example, a listing can have a starting price of 2 BNB but have an "Ending price" of 1 BNB after a duration of 3 days.</p>
                                </div>
                            </div>
                            <div className="col-12 col-md-8 col-lg-10">
                                {/* Intro */}
                                <div className="intro">
                                    <h3 className="mt-3 mb-0 text-center">Gas Fees</h3>
                                    <p>There are gas fees when the item is sold and who pays the fees, depending on the type of transaction:</p>
                                    <h4>Buyers pay the gas fees when purchasing fixed-price items.</h4>
                                    <h4>Sellers pay the gas when accepting offers.</h4>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {   this.state.itemIndex===4 && (
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-8 col-lg-10">
                                {/* Intro */}
                                <div className="intro">
                                    <h3 className="mt-3 mb-0 text-center">SpaceGrime’s NFT Marketplace Fees</h3>
                                    <p>At SpaceGrime’s NFT Marketplace, we take 2.5% of every transaction that happens on the marketplace. That's it. Users and partners can create NFTs for free at any time.</p>
                                    <p>You can set a royalty of up to 10% (more about royalties here [DEV: Please link the Selling page here]. This means you can earn revenue every time your NFT sells on SpaceGrime’s NFT Marketplace. To learn how to set your royalty, click here [DEV: Please link the Selling page here].</p>
                                </div>
                            </div>
                            <div className="col-12 col-md-8 col-lg-10">
                                {/* Intro */}
                                <div className="intro">
                                    <h3 className="mt-3 mb-0 text-center">Promotions</h3>
                                    <p>SpaceGrime’s NFT Marketplace is happy to help our partners promote content in a variety of ways:</p>
                                    <h4>Social Media and Telegram</h4>
                                    <p>We’re happy to promote creators on our social media platforms and through our ever-growing Telegram community</p>
                                    <h4>SpaceGrime’s NFT Marketplace</h4>
                                    <p>We do our best to promote every asset we list on the marketplace. It largely depends on your content and how we feel you can add value to our community and users. Ultimately, it is up to our Marketing Team to make that determination and we will be transparent about it. If you're interested in homepage promotion and already have your collection on SpaceGrime’s NFT Marketplace created, you can reach out to us via email [DEV: Please link the following email: management@spacegrime.com]</p>
                                </div>
                            </div>
                            <div className="col-12 col-md-8 col-lg-10">
                                {/* Intro */}
                                <div className="intro">
                                    <h3 className="mt-3 mb-0 text-center">Creating out of this World NFT Offerings</h3>
                                    <h4>Artwork</h4>
                                    <p>It’s the artwork more than any other piece that will be the key to getting traction on your marketplace. Innovations in art provide people with more opportunities to express themselves and their creativity more than any other content on the platform.</p>
                                    <h4>Unlockable Content</h4>
                                    <p>We like to consider these as time capsules of unforgettable experiences. Make your offering truly memorable with a custom digital experience for new owners. Unlockable content helps token owners increase their experience and value. Think of digital experiences that will continue to grow with the token.</p>
                                </div>
                            </div>
                            <div className="col-12 col-md-8 col-lg-10">
                                {/* Intro */}
                                <div className="intro">
                                    <h3 className="mt-3 mb-0 text-center">Partnerships</h3>
                                    <p>SpaceGrime’s NFT Marketplace is first and foremost a self-serve marketplace. We partner with all kinds of creators, but like them to take the lead in creating their art and uploading it on SpaceGrime’s NFT Marketplace.</p>
                                    <h4>We’d love to partner with you, that’s why we ask you prepare the following before reaching out to our team:</h4>
                                    <p>Have your assets and artwork ready for marketing: We’re interested in your artwork and assets. We’d love to have a conversation with you about them, so we can better understand how they can be used.</p>
                                    <p>Think about what your NFTs will unlock for your buyer: If your NFTs won’t bring something unique to the marketplace, the people who buy them will just resell them for a profit. Before you create them, you should figure out what they bring to the table. That’s the only way you make a profit.</p>
                                    <p>Establish strategies and commitments to promote the NFT drop in well-trafficked marketing channels of your own.</p>
                                    <h4>Once you’re ready, send our management team an email with the subject line Partnership. Please note that SpaceGrime’s NFT Marktplace still reserves the right to go a different direction.</h4>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {   this.state.itemIndex===5 && (
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-8 col-lg-10">
                                {/* Intro */}
                                <div className="intro">
                                    <h3 className="mt-3 mb-0 text-center">Developer Docs</h3>
                                    <p>SpaceGrime NFT Marketplace’s team is currently working on making the platform fully open to developers. Stay tuned for docs coming soon! If you’d like to get notified when these become available, simply drop us a line at [DEV: Please link the following email: management@spacegrime.com]</p>
                                </div>
                            </div>
                            <div className="col-12 col-md-8 col-lg-10">
                                {/* Intro */}
                                <div className="intro">
                                    <h3 className="mt-3 mb-0 text-center">Technical Support</h3>
                                    <p>We don't offer formal technical support for developers due to the high number of requests we receive. However, our Telegram [DEV: Please link the Telegram account https://t.me/spacegrimechat] admins are available 24/7 and can help direct your question to the appropriate team member –– you may even see Flik or Jaks pop in every once in a while!</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        );
    }
}

export default HelpCenter;