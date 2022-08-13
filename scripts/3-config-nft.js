import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0x73342291dE8bc20042Fb231b2C4bEf943943b17A");

(async () => {
    try {
        await editionDrop.createBatch([
            {
                name: "Sun Fragment",
                description: "This NFT will give you access to SunnyDAO!",
                image: readFileSync("scripts/assets/helium.png"),
            },
        ]);
        console.log("✅ Successfully created a new NFT in the drop!");
    } catch (error) {
        console.error("failed to create the new NFT", error);
    }
})();