const fs = require("fs");
const path = require("path");

const fileName = "fsAsycn.txt";
const filePath = path.join(__dirname, fileName);

fs.writeFile(filePath, "This is the initial Data", "utf-8", (err) => {
    if (err) console.error(err);
    else {
        console.log("File has been Saved");
    };
})

fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) console.error(err);
    else console.log(data);
})

fs.appendFile(filePath, "\nThis is the Updated Data", "utf-8", (err) => {
    if (err) console.error(err);
    else console.log("File has been Updated");
});

fs.unlink(filePath, (err) => {
    if (err) console.error(err);
    else console.log("File has been Deleted");
});

fs.rename(filePath, path.join(__dirname, "fsAsycn2.txt"), (err) => { 
    if (err) console.error(err);
    else console.log("File has been Renamed");
})
