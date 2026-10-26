const fs = require("node:fs/promises");

/* /* async function rename(){
    try{
    await fs.rename("notes.txt","my-notes.txt");
    console.log("file name changed");
    }
    catch(error){
        console.log(error.message);
    }
}
rename();
 

async function copyFile(){
    await fs.copyFile("my-notes.txt","backup.txt");
    console.log("File copied");
}
copyFile().catch(console.error);    */


async function deleteFile(){
    await fs.unlink("backup.txt");
    console.log("File deleted");
}
deleteFile().catch(console.error);  