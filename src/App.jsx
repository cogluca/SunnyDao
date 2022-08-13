import {useAddress, useMetamask} from "@thirdweb-dev/react";

const App = () => {

    const address = useAddress();
    const connectWithMetamask = useMetamask();
    console.log("👋 Address: ". address);


    if(!address){
        return <div className="landing">
           <h1>Hey, seems your wallet is not connected! </h1>
            <button onClick={connectWithMetamask} className="btn-hero">Connect Wallet</button>
        </div>
    }

  return (
    <div className="landing">
      <h1>Welcome to SunnyDAO</h1>
    </div>
  );
};

export default App;
