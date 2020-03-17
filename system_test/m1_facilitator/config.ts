const config = {
  chains: {
    origin: {
      wsEndpoint: 'https://rpc.slock.it/goerli',
      graphEndpoint: '',
      valueToken: '0xd426b22f3960d01189a3d548b45a7202489ff4de',
      gateway: '0x26DdFbC848Ba67bB4329592021635a5bd8dcAe56',
      chainId: 5,
    },
    auxiliary: {
      wsEndpoint: 'wss://chain.mosaicdao.org/hadapsar/wss',
      graphEndpoint: '',
      utilityToken: '',
      cogateway: '0x25a1CE197371735D6EDccC178F90841a7CEc23bb',
      chainId: 1405,
    },
  },
  testData: {
    deposit: {
      iterations: 1,
      depositorCount: 2,
      concurrencyCount: 3,
      pollingInterval: 1,
      timeoutInterval: 20,
      minAmount: 150,
      maxAmount: 250,
      minGasPrice: 5,
      maxGasPrice: 15,
      minGasLimit: 2,
      maxGasLimit: 5,
    },
    withdraw: {
      iterations: 10,
      withdrawerCount: 6,
      concurrencyCount: 5,
      pollingInterval: 2,
      timeoutInterval: 20,
      minAmount: 150,
      maxAmount: 250,
      minGasPrice: 5,
      maxGasPrice: 15,
      minGasLimit: 2,
      maxGasLimit: 5,
    },
  },
  accounts:
  [
    '0x9e895536741F3fb427ff6aD101F790d8A06ac770',
    '0x43b957b219e63C7590324b5508b7cA7AE8133554',
    '0xf795B8084C5E0394d77B6d024F0ec0B0D457cCFd',
    '0xB18CEc01bCb6cf741Db8423627444721f498cC30',
    '0xeBC9cb91c92B713C6b373DE9C4d42fF167D9cE70',
  ],
};

export default config;
