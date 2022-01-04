// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WaveChain {
    uint totalWaves;
    mapping(address => uint) public waveCounts;

    event NewWave(address indexed from, string message, uint256 timestamp);
    
    struct Wave {
        address waver; 
        string message; 
        uint256 timestamp; 
    }

    Wave[] waves;

    constructor() {
        console.log("This is Thot's first contract");
    }

    function wave(string memory message) public {
        address sender = msg.sender;

        totalWaves++;
        waveCounts[sender]++;

        console.log("%s waved! They've waved %d times.", 
            msg.sender, 
            waveCounts[sender]
        );

        waves.push(Wave(sender, message, block.timestamp));
        emit NewWave(sender, message, block.timestamp);
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint) {
        console.log("We have %d total waves", totalWaves);
        return totalWaves;
    }

    function getWaveCount(address key) public view returns (uint) {
        console.log("%s has waved %d times", key, waveCounts[key]);
        return waveCounts[key];
    }
}