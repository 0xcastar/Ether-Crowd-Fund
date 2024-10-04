# FundMe dApp
## Link to the full project: https://ether-crowd-fund.vercel.app/

## Overview

**FundMe** is a decentralized crowdfunding platform built on the Ethereum blockchain using Solidity, Ethers.js, and React (Next.js). The dApp allows users to connect their wallets, fund the contract, view contract balance, and withdraw funds (by the owner only). The smart contract integrates Chainlink's AggregatorV3Interface for price feed and other key functionalities. The front-end is built using Next.js for a fast and responsive user interface.

## Features

- **Wallet Connection**: Connect to Metamask (or any Web3 wallet) via Ethers.js.
- **Funding**: Fund the contract with any amount of ETH.
- **Get Contract Balance**: Retrieve and display the contract balance.
- **Withdraw Funds**: Only the contract owner can withdraw the funds.
- **Chainlink Price Feeds**: Use Chainlink’s AggregatorV3Interface for real-time ETH price conversion.

## Technologies

- **Solidity**: Smart contracts.
- **Next.js**: React-based framework for front-end development.
- **Ethers.js**: Ethereum JavaScript library for Web3 interaction.
- **Chainlink**: AggregatorV3Interface for price feeds.
- **Foundry**: Testing and smart contract deployment tool.

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js**: v14 or above.
- **Metamask**: Browser extension or a supported wallet.
- **Git**: Version control system.
- **Foundry**: For Solidity contract testing.
- **A Web3-enabled Browser**: Chrome with Metamask, Brave, or Mises.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/0xcastar/Ether-Crowd-Fund.git
cd ETH-FUND-ME
