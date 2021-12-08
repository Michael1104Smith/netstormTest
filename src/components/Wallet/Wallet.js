import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { fbt } from 'fbt-runtime'
import { useWeb3React } from '@web3-react/core'

import { connectorsByName } from '../../utils/connectors'
import AccountStore from '../../stores/AccountStore'

import analytics from '../../utils/analytics'

// const BASE_URL = "https://my-json-server.typicode.com/themeland/netstorm-json-1/wallet";

const initData = {
    "preHeading": "Wallet Connect",
    "heading": "Connect your Wallet",
    "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
    "walletData": [
      {
        "id": 1,
        "img": "/img/metamask.png",
        "title": "MetaMask",
        "content": "A browser extension with great flexibility. The web's most popular wallet"
      },
      {
        "id": 2,
        "img": "/img/ledger.jpeg",
        "title": "Ledger",
        "content": "The Ledger Nano is a range of hardware wallets that allows you to connect"
      },
      {
        "id": 3,
        "img": "/img/walletconnect.png",
        "title": "WalletConnect",
        "content": "Pair with Trust, Argent, MetaMask & more. Works from any browser, without an extension"
      },
      {
        "id": 4,
        "img": "/img/mew.svg",
        "title": "MEW",
        "content": "Launched a new NFT manager which currently features CryptoKitties, CryptoFlowers ..."
      }
    ]
  };

const Activity = () => {
    const [state, setState] = useState({
        data: {},
        walletData: []

    });

    useEffect(() => {        
        setState({
            data: initData,
            walletData: initData.walletData
        })
    }, []);

    const { activate, active } = useWeb3React()
    // const [activatingConnector, setActivatingConnector] = useState()
    // const [error, setError] = useState(null)
    // const [warning, setWarning] = useState(null)
    const [warningShowTimeout, setWarningShowTimeout] = useState(null)
    const { account } = useWeb3React()
  
    useEffect(() => {
      if (active) {
        // setActivatingConnector(null)
        closeLoginModal()
      }
    }, [active])
  
    const closeLoginModal = () => {
      AccountStore.update((s) => {
        s.showLoginModal = false
      })
    }
  
    // const errorMessageMap = (error) => {
    //   if (
    //     error.message.includes(
    //       'No Ethereum provider was found on window.ethereum'
    //     )
    //   ) {
    //     return fbt('No ethereum wallet detected', 'no wallet detected')
    //   } else if (
    //     error.message.includes('Ledger device: UNKNOWN_ERROR (0x6804)')
    //   ) {
    //     return fbt(
    //       'Unlock your Ledger wallet and open Ethereum application',
    //       'Unlock ledger and open eth app'
    //     )
    //   } else if (
    //     error.message.includes(
    //       'Failed to sign with Ledger device: U2F DEVICE_INELIGIBLE'
    //     )
    //   ) {
    //     return fbt(
    //       'Unlock your Ledger wallet and open Ethereum application',
    //       'Unlock ledger and open eth app'
    //     )
    //   } else if (error.message.includes('MULTIPLE_OPEN_CONNECTIONS_DISALLOWED')) {
    //     return fbt(
    //       'Unexpected error occurred. Please refresh page and try again.',
    //       'Unexpected login error'
    //     )
    //   }
  
    //   return error.message
    // }

    const onSignIn = (title) => async (event) => {
      if (localStorage.getItem("logged") === "false") {
        alert("You should login first!");
      } else {
        const name = title
        const currentConnector = connectorsByName[name].connector
        // const activating = currentConnector === activatingConnector
        // const connected = currentConnector === connector && active
        // const { displayName, fileName } = connectorsByName[name]
  
        analytics.track(`On Connect Wallet`, {
            category: 'general',
            label: name,
          })
  
        if (name === 'Ledger') {
            setWarningShowTimeout(
                setTimeout(() => {
                // setWarning(
                //     fbt(
                //     'Make sure your Ledger is connected and Ethereum App is opened',
                //     'Make sure Ledger connected app opened'
                //     )
                // )
                }, 4000)
            )
        } else {
            if (warningShowTimeout) {
                clearTimeout(warningShowTimeout)
                setWarningShowTimeout(null)
            }
        }
  
        // setWarning(null)
        // setError(null)
        // setActivatingConnector(currentConnector)
        await activate(
            currentConnector,
            /* According to documentation: https://github.com/NoahZinsmeister/web3-react/tree/v6/docs#understanding-error-bubbling
                * if this onError function is specified no changes shall be done to the "useWeb3React" global context.
                * also with the 3rd parameter being false errors should not be thrown.
                *
                * When I test using my ledger Nano S [sparrowDom] the below function doesn't consistently throw errors
                * when I either lock my Ledger or exit Ethereum app. On my end it sometimes just seems that the errors
                * are suppressed.
                */
            (err) => {
                console.debug('Setting the error: ', err)
                console.log("Setting the error:", err);
                // setError(err)
                // setActivatingConnector(null)
                localStorage.setItem('userConnectedWallet', 'false')
                localStorage.setItem('contactAddress', account);
            },
            // do not throw the error, handle it in the onError callback above
            false
        )
        // setWarning(null)
        clearTimeout(warningShowTimeout)
        setWarningShowTimeout(null)
      }
    }
  
    return (
        <section className="wallet-connect-area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-7">
                        {/* Intro */}
                        <div className="intro text-center">
                            <span>{state.data.preHeading}</span>
                            <h3 className="mt-3 mb-0">{state.data.heading}</h3>
                            <p>{state.data.content}</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center items">
                    {state.walletData.map((item, idx) => {
                        return (
                            <div key={`wd_${idx}`} className="col-12 col-md-6 col-lg-4 item">
                                {/* Single Wallet */}
                                <div className="card single-wallet">
                                  {!account && (
                                    <Link className="d-block text-center" to="#" onClick={onSignIn(item.title)}>
                                      <img className="avatar-lg" src={item.img} alt="" />
                                      <h4 className="mb-0">{item.title}</h4>
                                      <p>{item.content}</p>
                                    </Link>
                                  )}
                                  {account && (
                                    <div className="d-block text-center">
                                      <img className="avatar-lg" src={item.img} alt="" />
                                      <h4 className="mb-0">{item.title}</h4>
                                      <p>{item.content}</p>
                                    </div>
                                  )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
  }

export default Activity;