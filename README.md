
# 🛡️ RevengeDNS v2.0

<p align="center">
  <img src="https://img.shields.io/badge/RevengeDNS-v2.0-black?style=for-the-badge&logo=icloud&logoColor=red" />
  <img src="https://img.shields.io/badge/Defensive-DNS%20Security-darkred?style=for-the-badge" />
  <img src="https://img.shields.io/badge/TypeScript-Production-blue?style=for-the-badge&logo=typescript" />
</p><p align="center">
  <img src="https://img.shields.io/badge/MRWHITE4939-CYBER%20DEFENSE-red?style=for-the-badge" />
</p>


🔥 Core Features

⚡ Custom UDP DNS Server

🧠 Malware Detection Engine

🎣 Phishing Detection Module

📢 Ad Domain Sinkholing

🗂 Smart DNS Cache

🌐 Fake Ad HTTP Sinkhole Server

🔐 Modular Security Architecture

🛠 Production-ready TypeScript build



---

## 🏗 System Architecture

Client
   ↓
DNS Server (UDP 53 / 5353)
   ↓
Parser
   ↓
Security Layer
   ├── Malware Detector
   ├── Phishing Detector
   └── Ad Detector
   ↓
Resolver
   ↓
Cache
   ↓
Sinkhole (if malicious)


---

## 📦 Installation
```
git clone https://github.com/mrwhite4939/revengedns.git
cd revengedns
npm install
```


---

## 🛠 Build
```
npm run build
```
---

## ▶ Run (No Root - Development Mode)
```
DNS_PORT=5353 node dist/index.js

Expected Output:

DNS Server: 127.0.0.1:5353
Ad Sinkhole HTTP: 127.0.0.1:8080
RevengeDNS is running.
```

---

## 🧪 Test DNS
```
dig @127.0.0.1 -p 5353 google.com

or

nslookup google.com 127.0.0.1#5353
```

---

## 🔒 Production Mode (Port 53)
```
sudo node dist/index.js

or grant permission:

sudo setcap 'cap_net_bind_service=+ep' $(which node)
```
---
## 🛡 Security Modules

Malware Domain Blocking

Phishing Pattern Detection

Advertising Domain Sinkholing

Malicious Traffic Redirection



---

## 📈 Future Roadmap

Threat Intelligence Feeds

Rate Limiting Engine

DNS over HTTPS (DoH)

Logging & Monitoring Dashboard

Docker Deployment

AI-based Domain Scoring



---


## 📧 Email: mrwhite4939@gmail.com



