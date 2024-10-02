'use client'
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { address, abi } from "./constants.js";
import './styles.css';

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [signer, setSigner] = useState(null);
  const [ethValue, setEthValue] = useState("");
  const [contractBalance, setContractBalance] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);


  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        setWalletAddress(accounts[0]);
        if (accounts.length > 0) {
          setIsConnected(true);
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          setSigner(signer);
          console.log("Wallet connected and signer set:", signer);
          console.log(signer.address);
        }
      }
    };

    checkConnection();
    addEventListener();
  }, []);

  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        setSigner(signer);
        localStorage.setItem(isConnected, true);
        console.log("Wallet connected and signer set:", signer);

        await switchToSepolia();
        displayMessage("Connected✅");

      } catch (e) {
        console.log(e);
      }
    } else if (typeof window.ethereum === "undefined") {
      displayMessage("Please install Metamask!")
    }
  }


  const addEventListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      })
    } else {
      setWalletAddress("")
      console.log("Please install Metamask")
    }
  }

  const handleDisconnect = () => {
    setIsConnected(false);
    setSigner(null);
    setEthValue("");
    setContractBalance("");
    localStorage.removeItem("isConnected");
    displayMessage("Disconected.")
    setIsConnected(false);
    console.log("Wallet disconnected.");
  };

  async function switchToSepolia() {
    if (window.ethereum) {
      try {
        const sepoliaChainId = '0xaa36a7';
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: sepoliaChainId }],
        });

        console.log('Successfully switched to Sepolia Testnet');
      } catch (error) {
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: sepoliaChainId,
                chainName: 'Sepolia Testnet',
                nativeCurrency: {
                  name: 'SepoliaETH',
                  symbol: 'ETH',
                  decimals: 18,
                },
                rpcUrls: ['https://eth-sepolia.g.alchemy.com/v2/yKQ1SFMhX7yakyvZIVXeWBd-sQlb3UK7'],
                blockExplorerUrls: ['https://sepolia.etherscan.io'],
              }],
            });
          } catch (addError) {
            console.error('Failed to add Sepolia Testnet', addError);
          }
        } else {
          console.error('Failed to switch to Sepolia Testnet', error);
        }
      }
    } else {
      console.error('MetaMask is not installed');
    }
  }


  async function handleFund() {
    if (!ethValue || isNaN(ethValue) || Number(ethValue) <= 0) {
      displayMessage("Please input a valid Value!")
      return;
    }
    if (isConnected && signer) {
      const contract = new ethers.Contract(address, abi, signer);
      try {
        setEthValue("");
        displayMessage("Processing...")
        const transactionResponse = await contract.fund({
          value: ethers.parseEther(ethValue),
        });
        await transactionResponse.wait(1);
        setEthValue("");
        displayMessage("Funding successful!")
        console.log("Funding successful!");
        console.log("The input value is:", ethValue);
      } catch (error) {
        console.log("Error occured during funding:", error);
        setEthValue("");
        displayMessage("Error occured during funding...")
      }
    } else {
      displayMessage("Please connect your Metamask!");
    }
  }

  async function handleWithdraw() {
    if (isConnected && signer) {
      const contract = new ethers.Contract(address, abi, signer);
      if (signer.address === "0x4efDce2b3Fc96cA78820F88fE01F845121Ed0330") {
        try {
          displayMessage("Withdrawal Processing...");
          const transactionResponse = await contract.withdraw();
          console.log("Withdraw Pending...");
          await transactionResponse.wait(1);
          console.log("Withdraw Successful!");
          displayMessage("Withdraw Successful!")
        } catch (e) {
          displayMessage("Withdrawal error!")
          console.log("Withdrawal error!");
        }
      } else {
        displayMessage("This user cannot withdraw.")
      }
    } else {
      displayMessage("Please connect your Metamask!")
      console.log("Please connect your MetaMask!");
    }
  }

  function displayMessage(message) {
    setMessage(message);
    setShowMessage(true);
    setTimeout(() => {
      setMessage(false);
      setShowMessage(false);
    }, 3000)
  }

  async function handleGetBalance() {
    if (isConnected && signer) {
      const contract = new ethers.Contract(address, abi, signer);
      try {
        const balance = await contract.getBalance();
        const formattedBalance = `${ethers.formatEther(balance)}eth`;
        console.log(formattedBalance);
        setContractBalance(formattedBalance)
      } catch (e) {
        console.log(e)
      }
    } else {
      displayMessage("Please connect your Metamask!")
      console.log("Please connect your Metamask!")
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleFund();
    }
  }

  return (
    <div>

      {showMessage && <div className="message">{message}</div>}
      <div className="connect-button-container">
        {
          isConnected ? <button className="connect-button" onClick={handleDisconnect}>
            {
              walletAddress && walletAddress.length > 0 ?
                `Disconnect: ${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}` : "Connect Metamask"
            }</button> :
            <button className="connect-button" onClick={connectWallet}>Connect Metamask</button>
        }
      </div>

      <div className="main-container">
        <h1>CROWD FUNDING DAPP</h1>

        <div className="page-container">
          <input
            type="number"
            placeholder="Enter ETH amount"
            value={ethValue}
            onChange={(e) => setEthValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="fund-button" onClick={handleFund}>Fund</button>

          <button className="withdraw-button" onClick={handleWithdraw}>Withdraw</button>

          <button className="balance-button" onClick={handleGetBalance}>Get Balance</button>
          <div className="balance-div">Contract Balance: {contractBalance}</div>
        </div>
      </div>
    </div>
  );
}
