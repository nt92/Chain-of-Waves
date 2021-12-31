# 👋🏽 Chain of Waves ⛓

## What is this?

<todo>

As this was my first Web3 project, there were a *lot* of learnings along the way — here's a rough order of how things got to the way they are:

  1. Set up Ethereum development environment with [Hardhat](https://hardhat.org/) and then ran a contract to make sure it worked.
  2. Created a smart contract that will store who has *waved* at me, and how many times they've done so — this information is pulled directly from the blockchain and displayed on the site.
  3. Afterwards, the contract was deployed to the Rinkeby testnet [here](https://rinkeby.etherscan.io/address/0x8d8297d090b58151337da30b58f99fde986683d3).
  4. Then, I made the frontend in React which uses some libraries to connect to Metamask (s/o `window.ethereum`) and call the deployed contract.
  5. Hosting is done on Replit for ease of development and so that we can spin up a web server on the fly that points to the output, which is done with the lightweight `vite` library.
  6. ...

## Technology
* `React` for frontend 
* `Replit` for webserver & hosting
* `Web3.js` for connecting webapp to blockchain
* `Alchemy` for deploying the smart contract
* `Solidity` for smart contract development
* `Hardhat` for eth dev environment

## How it Works

<video>
