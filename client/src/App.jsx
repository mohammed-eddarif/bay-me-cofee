import {ethers} from 'ethers';
import './App.css';
import { useEffect,useState } from 'react';
import abi from './contractJson/chai.json';
import Buy from './components/Buy';
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
      const contractAddress = "0x76aCbDbF31Be28912c4c55C60d4a13d2715f1929";
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
      connected account : {account}
     <Buy state={state}/> 
     <Memos/>
    </div>
  )
}

export default App