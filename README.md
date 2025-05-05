# coficab

# 🖨️ Print Log Management System

This Node.js-based application is designed for **Coficab Group** to automate the process of collecting and managing print logs from multiple printers connected over FTP. The application:

- Automatically connects to registered printer IPs via FTP.
- Downloads print log files (`prnlog`) from each printer.
- Stores these files locally with timestamped names.
- Inserts relevant data into a MySQL database.
- Allows cumulative report generation by printer.
- Supports export to Excel and TXT formats.

---

## 🚀 Features

- 📥 Automated FTP downloads from multiple printers.
- 🕒 Timestamped file naming convention (`imp166_20250414_104512.txt`).
- 🗃️ Centralized MySQL database using Sequelize ORM.
- 📊 Cumulative file generation per printer.
- 📤 Exports printer logs in Excel and TXT format.
- 🧠 Designed with modular MVC architecture.

---

## 🛠️ Tech Stack

| Tech           | Usage                                     |
|----------------|-------------------------------------------|
| Node.js        | Backend server                            |
| Express.js     | API routing and middleware                |
| Sequelize      | ORM for MySQL database                    |
| MySQL          | Database for storing printer logs         |
| basic-ftp      | FTP client to access printer logs         |
| xlsx / fs      | File reading, writing, and Excel exports  |

---

## 🗂️ Project Structure

