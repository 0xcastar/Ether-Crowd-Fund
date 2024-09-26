export const abi = [{ "type": "constructor", "inputs": [{ "name": "priceFeed", "type": "address", "internalType": "address" }], "stateMutability": "nonpayable" }, { "type": "fallback", "stateMutability": "payable" }, { "type": "receive", "stateMutability": "payable" }, { "type": "function", "name": "MINIMUM_USD", "inputs": [], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" }, { "type": "function", "name": "cheaperWithdraw", "inputs": [], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "fund", "inputs": [], "outputs": [], "stateMutability": "payable" }, { "type": "function", "name": "getBalance", "inputs": [], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" }, { "type": "function", "name": "getFunder", "inputs": [{ "name": "index", "type": "uint256", "internalType": "uint256" }], "outputs": [{ "name": "", "type": "address", "internalType": "address" }], "stateMutability": "view" }, { "type": "function", "name": "getOwner", "inputs": [], "outputs": [{ "name": "", "type": "address", "internalType": "address" }], "stateMutability": "view" }, { "type": "function", "name": "getVersion", "inputs": [], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" }, { "type": "function", "name": "getaddressToAmmountFunded", "inputs": [{ "name": "fundingAddress", "type": "address", "internalType": "address" }], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" }, { "type": "function", "name": "s_funders", "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "outputs": [{ "name": "", "type": "address", "internalType": "address" }], "stateMutability": "view" }, { "type": "function", "name": "withdraw", "inputs": [], "outputs": [], "stateMutability": "nonpayable" }, { "type": "error", "name": "FundMe__NotOwner", "inputs": [] }];

export const address = "0x1b43f71Ed737FEcAa0a7392C34D67d4669F03f0e";