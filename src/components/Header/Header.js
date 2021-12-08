import { Link } from 'react-router-dom';

import { useWeb3React } from '@web3-react/core'
import { fbt } from 'fbt-runtime'

import { useSelector } from "react-redux";
import {
  shortenAddress,
} from '../../utils/web3'

const Header = () => {
    
    const { active } = useWeb3React()
    
    // const correctNetwork = isCorrectNetwork(chainId)
    const correctNetwork = true;
    // const clickable = (!active) || (active && !correctNetwork)
    const userid = localStorage.getItem('logged')==="true"?localStorage.getItem('userid'):1;
    const allNft = useSelector((state) => state.allNft);
    // const marketplaceContract = allNft.marketplaceContract;
    const account = allNft.account;

    return (
        <header id="header">
            {/* Navbar */}
            <nav data-aos="zoom-out" data-aos-delay={800} className="navbar navbar-expand">
                <div className="container header">
                    {/* Navbar Brand*/}
                    <Link className="navbar-brand" to="/">
                        <img className="navbar-brand-sticky" src="/img/logo.png" alt="sticky brand-logo" />
                    </Link>
                    <div className="ml-auto" />
                    {/* Navbar */}
                    <ul className="navbar-nav items mx-auto">
                        <li className="nav-item dropdown">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link" to="/explore">Explore</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link" to="/blog">Blog</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link" to="/creators">Creators</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register" className="nav-link">Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/author/${userid}`} className="nav-link">My Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/create" className="nav-link">Create</Link>
                        </li>
                    </ul>
                    {/* Navbar Icons */}
                    <ul className="navbar-nav icons">
                        <li className="nav-item">
                            <div className="nav-link" data-toggle="modal" data-target="#search">
                                <i className="fas fa-search" />
                            </div>
                        </li>
                    </ul>
                    {/* Navbar Toggler */}
                    <ul className="navbar-nav toggle">
                        <li className="nav-item">
                            <Link to="#" className="nav-link" data-toggle="modal" data-target="#menu">
                                <i className="fas fa-bars toggle-icon m-0" />
                            </Link>
                        </li>
                    </ul>
                    {/* Navbar Action Button */}
                    <ul className="navbar-nav action">
                        <li className="nav-item ml-3">
                            <Link to="/wallet-connect" className="btn ml-lg-auto btn-bordered-white wallet-btn">
                                {/* What causes !active && account? */}
                                {!active &&  (
                                    <div className="address">
                                        Wallet Connect
                                    </div>)}
                                {active && !correctNetwork && (
                                    <div className="address">
                                        {fbt('Wrong network', 'Wrong network')}
                                    </div>
                                )}
                                {active && correctNetwork && (
                                    <div className="address">{shortenAddress(account)}</div>
                                )}
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;