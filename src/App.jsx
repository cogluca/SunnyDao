import { useAddress, useMetamask, useEditionDrop } from '@thirdweb-dev/react';
import { useState, useEffect } from 'react';

const App = () => {

    const address = useAddress();
    const connectWithMetamask = useMetamask();
    console.log("👋 Address: ". address);

    // Initialize our editionDrop contract
    const editionDrop = useEditionDrop("0x73342291dE8bc20042Fb231b2C4bEf943943b17A");
    // State variable for us to know if user has our NFT.
    const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
    const [isClaiming, setIsClaiming] = useState(false);

    useEffect(() => {
        // If they don't have a connected wallet, exit!
        if (!address) {
            return;
        }

        const checkBalance = async () => {
            try {
                const balance = await editionDrop.balanceOf(address, 0);
                if (balance.gt(0)) {
                    setHasClaimedNFT(true);
                    console.log("🌟 this user has a membership NFT!");
                } else {
                    setHasClaimedNFT(false);
                    console.log("😭 this user doesn't have a membership NFT.");
                }
            } catch (error) {
                setHasClaimedNFT(false);
                console.error("Failed to get balance", error);
            }
        };
        checkBalance();
    }, [address, editionDrop]);

    const mintNft = async () => {
        try {
            setIsClaiming(true);
            await editionDrop.claim("0", 1);
            console.log(`🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`);
            setHasClaimedNFT(true);
        } catch (error) {
            setHasClaimedNFT(false);
            console.error("Failed to mint NFT", error);
        } finally {
            setIsClaiming(false);
        }
    };



    if(!address){
        return <div className="landing">
           <h1>Hey, seems your wallet is not connected! </h1>
            <button onClick={connectWithMetamask} className="btn-hero">Connect Wallet</button>
        </div>
    }

    if (hasClaimedNFT) {
        return (
            <div className="member-page">
                <h1>🍪DAO Member Page</h1>
                <p>Congratulations on being a member</p>
            </div>
        );
    };

  return (
    <div className="mint-nft">
      <h1>Mint your free SunnyDao Membership NFT</h1>
        <button disabled={isClaiming} onClick={mintNft}>{isClaiming? "Minting...": "Claim your NFT" }</button>
    </div>
  );
};

export default App;
