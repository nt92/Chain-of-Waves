// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Wave {
    uint totalWaves;
    mapping(address => uint) public waveCounts;

    constructor() {
        console.log("This is Thot's first contract");
    }

    function wave() public {
        address sender = msg.sender;

        totalWaves++;
        waveCounts[sender]++;

        console.log("%s waved! They've waved %d times.", 
            msg.sender, 
            waveCounts[sender]
        );
    }

    function getTotalWaves() public view returns (uint) {
        console.log("We have %d total waves", totalWaves);
        return totalWaves;
    }
}