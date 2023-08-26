import { ethers } from "ethers";
import "./App.css";
import { useEffect, useState } from "react";
import abi from "./contractJson/contracts/chai.sol/chai.json";
import Buy from "./components/Buy";
import chai from "./chai.png";
import Memos from "./components/Memos";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("Not connected");

  useEffect(() => {
    const template = async () => {
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;
        const accnt = await ethereum.request({
          method: "eth_requestAccounts",
        });

        window.ethereum.on("accountsChanged", () => {
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

        setState({ web3Provider, web3signer, contract });
      } catch (error) {
        console.log(error.message);
      }
    };
    template();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <img
        src={chai}
        className="shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4 w-full md:w-2/3 lg:w-1/2 xl:w-5/6"
        alt=".."
      />

      <p className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4 w-full ">
        Connected Account -<small> {account}</small>
      </p>

      <blockquote class="text-xl italic font-semibold text-center text-gray-900 dark:text-white">
        <p className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4 w-full ">
          "Users have the option to send transactions by adding funds to the
          platform. Each contribution, regardless of its size, accumulates to
          form a financial pool dedicated to a specific charitable organization.
          At the end of a predefined period, the entirety of the accumulated
          amount is automatically transferred to the charitable organization,
          thus eliminating traditional barriers and complex fundraising
          processes."
        </p>
      </blockquote>

      <Buy state={state} />
      <Memos state={state} />
    </div>
  );
}

export default App;
