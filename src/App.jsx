import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';

export default function App() {
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    ethereum
      .request({ method: "eth_accounts" })
      .then(accounts => {
        console.log(accounts);
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", accounts);
          setCurrentAccount(account)
        } else {
          console.log("No authorized account found")
        }
      })
  }

  const connectWallet = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Get MetaMask, nerd!");
      return;
    }

    ethereum
      .request({ method: "eth_requestAccounts" })
      .then(accounts => {
        console.log("Connected", accounts[0]);
        setCurrentAccount(accounts[0]);
      })
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <img 
          class ="nikhil" src="https://nikhilthota.com/images/nikhil-v2-fade-small.png"/>
        <div className="header">
          Hey, I'm Nikhil! 🧘🏽‍♂️
        </div>

        <div className="bio">
          I'm exploring Web3 & other shtuff. Connect your Ethereum wallet to holler at me! <a href="https://nikhilthota.com/">Check out my other stuff here.</a>
        </div>

        <button className="waveButton" onClick={null}>
          Wave at Me 👋🏽
        </button>

        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet 💳
          </button>
        )}
      </div>
    </div>
  );
}
