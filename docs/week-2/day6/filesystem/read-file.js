const fs = require("node:fs/promises");
async function readFile(){
    try{
        const data = await fs.readFile("notes.txt","utf8")
        console.log(data);
    }
    catch(error){
        console.log("Error:",error.message);
    }
}
readFile();