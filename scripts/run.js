const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory('Wave');
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();

    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    await waveContract.getTotalWaves();
    
    let waveTxn = await waveContract.wave();
    waveTxn.wait();
  
    await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).wave();
    waveTxn = await waveContract.connect(randomPerson).wave();
    await waveTxn.wait();

    await waveContract.getTotalWaves();
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();