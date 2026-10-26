const fs = require("node:fs/promises");

async function appendFile(){
    try{
        await fs.appendFile("notes.txt","\nToday I am Learning new topics of node.js");
        console.log("content added")
    }
    catch(error){
        console.log("Error:",error.message);
    }
}
appendFile();