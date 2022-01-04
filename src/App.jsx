import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./utils/WaveChain.json";

export default function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [totalWaves, setTotalWaves] = useState(0);
  const [allWaves, setAllWaves] = useState([]);
  const [isMining, setIsMining] = useState(false);

  const contractAddress = "0xacb8DE7370D017d04f3999e93Cc8A088fD439169";
  const contractABI = abi.abi;

  const checkIfWalletIsConnected = () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask!");
      return;
    } else {
      console.log("We have the ethereum object: ", ethereum);
    }

    ethereum
      .request({ method: "eth_accounts" })
      .then(accounts => {
        console.log(accounts);
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account: ", accounts);
          setCurrentAccount(account)
        } else {
          console.log("No authorized account found :(")
        }
      })
  }

  const initializeData = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await wavePortalContract.getTotalWaves();
        setTotalWaves(count.toNumber());
        console.log("Total wave count is... ", count.toNumber());
      }
    } catch (error) {
      console.log(error)
    }
  }

  const connectWallet = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Get Metamask, nerd!");
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

  const getAllWaves = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        const waves = await wavePortalContract.getAllWaves();

        let wavesCleaned = [];
        waves.forEach(wave => {
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message
          });
        });

        setAllWaves(wavesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
    initializeData();
  }, [])
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <img 
          class ="nikhil" src="https://nikhilthota.com/images/nikhil-v2-fade-small.png" />
        <div className="header">
          Hey, I'm Nikhil! 🧘🏽‍♂️
        </div>

        <div className="mainText">
          I'm exploring Web3 & other shtuff. Connect your Ethereum wallet on Rinkeby to holler at me! <a href="https://nikhilthota.com/">Check out my other stuff here.</a>
        </div>

        {currentAccount !== null
          ? 
            <button 
              className="button" 
              onClick={wave}>
              Wave at Me 👋🏽
            </button>
          :
            <button 
              className="button" 
              onClick={connectWallet}>
              Connect Wallet 💳
            </button>
        }

        {totalWaves === 0 
          ? 
            <div className="totalWaves mainText">
              Wave at me to see total # of waves!
            </div>
          : 
            <div className="totalWaves mainText">
              So far, I've gotten {totalWaves} waves!
            </div>
        }

        {isMining && (
          <div class="miningGif">
            <p className="mainText">⛏ Mining...</p>
            <img src="./src/assets/mining.gif" />
          </div>
        )}
      </div>
    </div>
  );
}
