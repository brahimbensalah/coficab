const ftp = require("basic-ftp"); // Ensure you have installed basic-ftp
const fs = require("fs");
const path = require("path");

// FTP Credentials
const FTP_HOST = "172.20.200.166";
const FTP_USER = "admin";
const FTP_PASS = "admin";
const p = FTP_HOST.lastIndexOf('.');
//get the last 2 char
const NameImp = 'imp'+ FTP_HOST.substring(p + 1);

// Local directory to store files
// 📂 Dossier des fichiers téléchargés
const uploadDirectory = path.join(__dirname, "uploads");
// const LOCAL_DIR = "C:/photocopiecofat/photocopie40/imp40";

// Function to download file
async function downloadFile() {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
        console.log("📡 Connecting to FTP server...");
        await client.access({
            host: FTP_HOST,
            user: FTP_USER,
            password: FTP_PASS,
            secure: false,
        });

        console.log("✅ Connected to FTP");

        const remoteFile = "prnlog"; // Adjust this if needed
        const localFile = path.join(uploadDirectory, generateFileName());

        console.log(`📂 Downloading ${remoteFile} to ${localFile}...`);
        await client.downloadTo(localFile, remoteFile);
        console.log("✅ File downloaded successfully");

    } catch (err) {
        console.error("❌ FTP Download Error:", err);
    } finally {
        client.close();
    }
}

// Helper function to generate filename
function generateFileName() {
    const date = new Date();
    return  NameImp+`${date.toDateString().replace(/\s+/g, "")}${date.getHours()}${date.getMinutes()}${date.getSeconds()}.txt`;
}

// ✅ Export function correctly
module.exports = { downloadFile };
