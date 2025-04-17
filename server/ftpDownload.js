const ftp = require("basic-ftp");
const fs = require("fs");
const path = require("path");
const { Printer } = require("./Models"); // <- adjust if your Printer model is elsewhere

const uploadDirectory = path.join(__dirname, "uploads");

// 📁 Ensure local directory exists
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

// 🔁 Function to download from all printers
async function downloadFromAllPrinters() {
    try {
        const printers = await Printer.findAll(); // Get all printer IPs from DB
      

        for (const printer of printers) {
            const host = printer.dataValues.ip_adress; // <- Adjust field name as needed
            const client = new ftp.Client();
            client.ftp.verbose = true;

            const ipSuffix = host.split(".").pop(); // e.g. "166" → "imp166"
            const namePrefix = `imp${ipSuffix}`;

            const localFileName = `${namePrefix}_${generateTimestamp()}.txt`;
            const localFilePath = path.join(uploadDirectory, localFileName);

            try {
                console.log(`🔌 Connecting to printer FTP: ${host}...`);
                await client.access({
                    host,
                    user: "admin",
                    password: "admin",
                    secure: false,
                });

                console.log(`📥 Downloading prnlog from ${host}...`);
                await client.downloadTo(localFilePath, "prnlog");
                console.log(`✅ Downloaded from ${host} as ${localFileName}`);
            } catch (err) {
                console.error(`❌ Failed to download from ${host}:`, err.message);
            } finally {
                client.close();
            }
        }
    } catch (err) {
        console.error("❌ Error fetching printers from DB:", err.message);
    }
}

// 🕒 Timestamp generator
function generateTimestamp() {
    const d = new Date();
    return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

function pad(n) {
    return n.toString().padStart(2, '0');
}

module.exports = { downloadFromAllPrinters };
