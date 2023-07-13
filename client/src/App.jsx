import {ethers} from 'ethers';
import './App.css';
import { useEffect,useState } from 'react';
import abi from './contractJson/chai.json';
import Buy from './components/Buy';
import chai from "./chai.png";
import Memos from './components/Memos';

function App() {

  const [state,setState] = useState({
    provider:null,
    signer:null,
    contract:null
  });

  const [account,setAccount] = useState('Not connected');

  useEffect(()=>{
    const template =async ()=>{
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const contractABI = abi.abi;
     try{
      const {ethereum} = window;
      const accnt = await ethereum.request({
        method:"eth_requestAccounts"
      }); 
      
      window.ethereum.on('accountsChanged',()=>{
        window.location.reload();
      });

      setAccount(accnt);
      
      const web3Provider = new ethers.BrowserProvider(ethereum);
      const web3signer = await web3Provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        web3signer
      );

     
      setState({web3Provider,web3signer,contract})
     }catch (error) {

      console.log(error.message)
  
    }
  }
    template();
  },[])

  return (
    <div>
      <img src={chai} className="img-fluid" alt=".." width="100%" />
      <p style={{ marginTop: "10px", marginLeft: "5px" }}>
        <small>Connected Account - {account}</small>
      </p>

      <Buy state={state} />
      <Memos state={state} />
    </div>
  );
}

export default App