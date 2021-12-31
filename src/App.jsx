import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./utils/Wave.json";

export default function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [totalWaves, setTotalWaves] = useState(0);
  const [isMining, setIsMining] = useState(false);

  const contractAddress = "0x8d8297d090b58151337dA30b58f99Fde986683d3";
  const contractABI = abi.abi;

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

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await wavePortalContract.getTotalWaves();
        setTotalWaves(count.toNumber());
        console.log("Total wave count is... ", count.toNumber());

        const waveTxn = await wavePortalContract.wave();
        setIsMining(true);
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        setIsMining(false);
        console.log("Mined! See transaction hash above ⛏");

        count = await wavePortalContract.getTotalWaves();
        setTotalWaves(count.toNumber());
        console.log("Now total wave count is... ", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
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
          I'm exploring Web3 & other shtuff. Connect your Ethereum wallet on Rinkeby to holler at me! <a href="https://nikhilthota.com/">Check out my other stuff here.</a>
        </div>

        <button 
          className="waveButton" 
          onClick={wave}>
          Wave at Me 👋🏽
        </button>

        {!currentAccount && (
          <button 
            className="waveButton" 
            onClick={connectWallet}>
            Connect Wallet 💳
          </button>
        )}

        {totalWaves === 0 
        ? 
          <div className="totalWaves bio">
            Wave at me to see total # of waves!
          </div>
        : 
          <div className="totalWaves bio">
            So far, I've gotten {totalWaves} waves!
          </div>
        }

        {isMining && (
          <img class="gif" src="./src/assets/mining.gif" />
        )}
      </div>
    </div>
  );
}
