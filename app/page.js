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
  const [message, setMessage] = useState(""); // Message to show
  const [showMessage, setShowMessage] = useState(false); // Control visibility


  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        setWalletAddress(accounts);
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
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("Please install MetaMask!");
    }
  }

  const handleDisconnect = () => {
    setIsConnected(false);
    setSigner(null);
    setEthValue("");
    setContractBalance("");
    localStorage.removeItem("isConnected");
    console.log("Wallet disconnected.");
  };


  async function handleFund() {
    if (isConnected && signer) {
      const contract = new ethers.Contract(address, abi, signer);
      try {
        setEthValue("");
        setMessage("Processing...");
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
        const transactionResponse = await contract.fund({
          value: ethers.parseEther(ethValue),
        });
        await transactionResponse.wait(1);
        setEthValue("");
        setMessage("Funding Successful!");
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
        console.log("Funding successful!");
        console.log("The input value is:", ethValue);
      } catch (error) {
        console.log("Error occured during funding:", error);
        setEthValue("");
        setMessage("Error occured during funding!");
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
      }
    } else {
      console.log("Please connect your Metamask.");
      setMessage("An error occured...");
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  }

  async function handleWithdraw() {
    if (isConnected && signer) {
      const contract = new ethers.Contract(address, abi, signer);
      if (signer.address === "0x4efDce2b3Fc96cA78820F88fE01F845121Ed0330") {
        try {
          setMessage("Withdrawal Processing...");
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
          }, 3000);
          const transactionResponse = await contract.withdraw();
          console.log("Withdraw Pending...");
          await transactionResponse.wait(1);
          console.log("Withdraw Successful!");
          setMessage("Withdrawal Successful!");
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
          }, 3000);
        } catch (e) {
          setMessage("Withdrawal Error!");
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
          }, 3000);
          console.log("Withdrawal error!");
        }
      } else {
        // Show the message if the user cannot withdraw
        setMessage("This user cannot withdraw.");
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 5000); // Hide message after 5 seconds
      }
    } else {
      console.log("Please connect your MetaMask!");
    }
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
          isConnected ? <button className="connect-button" onClick={handleDisconnect}>Dissconect</button> :
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
