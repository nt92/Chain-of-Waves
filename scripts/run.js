const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory('WaveChain');
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();

    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log(waveCount.toNumber());

    let waveTxn = await waveContract.wave("Test Message 1");
    await waveTxn.wait(); 
    let waveCountOwner = await waveContract.getWaveCount(owner.getAddress());
    console.log(await owner.getAddress(), " has waved ", waveCountOwner.toNumber(), " times");

    waveTxn = await waveContract.connect(randomPerson).wave("Test Message 2");
    waveTxn = await waveContract.connect(randomPerson).wave("Test Message 3");
    waveTxn = await waveContract.connect(randomPerson).wave("Test Message 4");
    await waveTxn.wait(); 
    let waveCountRando = await waveContract.getWaveCount(randomPerson.getAddress());
    console.log(await randomPerson.getAddress(), " has waved ", waveCountRando.toNumber(), " times");

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);

    waveCount = await waveContract.getTotalWaves();
    console.log(waveCount);
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