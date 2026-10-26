const fs = require("node:fs/promises");

async function createFile(){
    try{
        await fs.writeFile("notes.txt","Learning Node.js");
        console.log("Created a Node.js file");
    }
    catch(error){
        console.log("Error:",error.message);
    }
}
createFile();