import React, { Component } from 'react';
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';

import AuthorProfile from "../AuthorProfile/AuthorProfile";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";


class Create extends Component {

    constructor(props) {
        super(props);

        this.state = {
            img: '',
            title: '',
            description: '',
            price: '',
            imgURL: '',
            isLoading: false,
            royalty: '',
            igroup: [],
            size: 0,
            copies: 1
        };
    }

    componentDidMount() {
    }

    mint = async (tokenMetadataURL) => {
        try {
            const artTokenContract = this.props.allNft.artTokenContract;
            const account = this.props.allNft.account;
            const receipt = await artTokenContract.methods
                .mint(tokenMetadataURL)
                .send({ from: account });
            console.log(receipt);
            console.log(receipt.events.Transfer.returnValues.tokenId);
            // setItems(items => [...items, {
            //   tokenId: receipt.events.Transfer.returnValues.tokenId,
            //   creator: accounts[0],
            //   owner: accounts[0],
            //   uri: tokenMetadataURL,
            //   isForSale: false,
            //   saleId: null,
            //   price: 0,
            //   isSold: null
            // }]);
            return true;
        } catch (error) {
          console.error("Error, minting: ", error);
          alert("Error while minting!");
          return false;
        }
      }

    mint1 = async () => {
        const artTokenContract = this.props.allNft.artTokenContract;
        const totalSupply = await artTokenContract.methods.totalSupply().call();
        const tokenId = Number(totalSupply) + 1;
        return await this.mint(`${process.env.REACT_APP_SERVER_URL}/${tokenId}`);
    }

    onSubmit = async (e) => {
        e.preventDefault();
        this.setState({isLoading: true});
        if (localStorage.getItem("logged") === "false") {
            alert("You should login first!");
        // } else if (await this.mint1()) {
        } else {

            let res = await this.uploadFile(this.state.img);
    
            if (!res.data.error) {
                this.setState({imgURL: res.data.img});
                this.setState({price: this.state.price});
                const recipeUrl = `${process.env.REACT_APP_CREATEITEMS_URL}`;
                const contactAddress = localStorage.getItem('contactAddress');
                
                const requestMetadata = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({userid: localStorage.getItem('userid'), img: this.state.imgURL, title: this.state.title,
                                            imgURL: localStorage.getItem('imgURL'), username: localStorage.getItem('username'),
                                            price: this.state.price, description: this.state.description, royalty: this.state.royalty,
                                            contactAddress: contactAddress, igroup: this.state.igroup.join(";"),
                                            size: this.state.size, copies: this.state.copies})
                };
                fetch(recipeUrl, requestMetadata)
                .then(res => res.json())
                .then(recipes => {
                    alert(recipes["message"]);
                    console.log(recipes);
                    if (!recipes["error"]) {
                        this.setState({
                            imgURL: '',
                            title: '',
                            description: '',
                            price: '',
                            royalty: '',
                            size: 0,
                            copies: 1
                        });
                    }
                    this.setState({
                        isLoading: false
                    });
                    // window.location.reload(false);
                }).catch((error) => {
                    alert(error);
                    this.setState({isLoading : false});
                });
            } else {
                alert(res.data.message);
                this.setState({isLoading : false});
            }
        }
        this.setState({isLoading: false});
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

    imgChange = (e) => {
        this.setState({img : e.target.files[0]});
        this.setState({imgURL : e.target.value});
    }

    titleChange = (e) => {
        this.setState({title : e.target.value});
    }

    descriptionChange = (e) => {
        this.setState({description : e.target.value});
    }

    priceChange = (e) => {
        this.setState({price : e.target.value});
    }

    royaltyChange = (e) => {
        this.setState({royalty: e.target.value});
    }

    sizeChange = (e) => {
        this.setState({size: e.target.value});
    }

    copiesChange = (e) => {
        this.setState({copies: e.target.value});
    }

    checkChange = (e) => {
        const val = e.target.value;
        let igroup = this.state.igroup;
        if (e.target.checked) {
            igroup.push(val);
        } else {
            const index = igroup.indexOf(val);
            igroup.splice(index, 1);
        }
        this.setState({igroup: igroup});
    }

    render() {
        
        return (
            <section className="author-area">
                {(localStorage.getItem("logged") === "false") && (
                    <h1>
                        You should login and connect the wallet to create item!
                    </h1>
                )}
                {(localStorage.getItem('userConnectedWallet') === 'false') && (
                    <h1>
                        You should connect the wallet to create item!
                    </h1>
                )}

                {localStorage.getItem("logged") === "true" && localStorage.getItem('userConnectedWallet') === 'true' && (
                <LoadingOverlay
                    active={this.state.isLoading}
                    spinner
                    text='Creating Item...'
                    >
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col-12 col-md-4">
                                {/* Author Profile */}
                                <AuthorProfile />
                            </div>
                            <div className="col-12 col-md-7">
                                {/* Intro */}
                                <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
                                    <div className="intro-content">
                                        <span>Get Started</span>
                                        <h3 className="mt-3 mb-0">Create Item</h3>
                                    </div>
                                </div>
                                {/* Item Form */}
                                <form className="item-form card no-hover" onSubmit = {this.onSubmit}>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="input-group form-group">
                                                <div className="custom-file">
                                                    <input type="file" className="custom-file-input" id="inputGroupFile01" onChange={this.imgChange} />
                                                    <label className="custom-file-label" htmlFor="inputGroupFile01">{this.state.imgURL.length === 0 ? 'Choose File' : this.state.imgURL}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group mt-3">
                                                <input type="text" className="form-control" name="name" placeholder="Item Name" required="required" value={this.state.title} onChange={this.titleChange} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <textarea className="form-control" name="textarea" placeholder="Description" cols={30} rows={3} defaultValue={""} value={this.state.description} onChange={this.descriptionChange} />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="price" placeholder="Item Price (ETH)" required="required" value={this.state.price} onChange={this.priceChange} />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="royality" placeholder="Royality" required="required" value={this.state.royalty} onChange={this.royaltyChange} />
                                            </div>
                                        </div>
                                        {/* <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Size" required="required" value={this.state.size} onChange={this.sizeChange} />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="copies" placeholder="No of Copies" required="required" value={this.state.copies} onChange={this.copiesChange} />
                                            </div>
                                        </div> */}
                                        <div className="col-12">
                                            <div className="form-group mt-3">
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="checkbox" name="inlineCheckOptions" id="inlineCheck1" defaultValue="Art" onChange={this.checkChange} />
                                                    <label className="form-check-label" htmlFor="inlineCheck1">Art</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="checkbox" name="inlineCheckOptions" id="inlineCheck2" defaultValue="Music" onChange={this.checkChange} />
                                                    <label className="form-check-label" htmlFor="inlineCheck2">Music</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="checkbox" name="inlineCheckOptions" id="inlineCheck3" defaultValue="Collectibles" onChange={this.checkChange} />
                                                    <label className="form-check-label" htmlFor="inlineCheck3">Collectibles</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="checkbox" name="inlineCheckOptions" id="inlineCheck3" defaultValue="Sports" onChange={this.checkChange} />
                                                    <label className="form-check-label" htmlFor="inlineCheck3">Sports</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button className="btn w-100 mt-3 mt-sm-4" type="submit">Create Item</button>
                                            {/* <div className="btn w-100 mt-3 mt-sm-4" onClick={this.mint1}>Mint</div> */}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </LoadingOverlay>
                )}
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

function mapStateToProps(dispatch) {
    const allNft = dispatch.allNft;
    return { allNft: allNft }
}
export default connect(
    mapStateToProps
 )(withUseFormHook(Create));