<p align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:0ea5e9&height=180&section=header&text=MockDock&fontSize=54&fontColor=ffffff&animation=fadeIn&fontAlignY=35" width="100%" alt="MockDock banner"/>
<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=21&pause=900&color=38BDF8&center=true&vCenter=true&width=720&lines=Mock+HTTP+APIs+in+seconds;Predictable+responses%2C+zero+backend+setup" alt="Typing title"/>
</p>
<p align="center">
<img src="https://img.shields.io/github/license/CyberLoop-dev/mockdock?style=for-the-badge" alt="License"/>
<img src="https://img.shields.io/github/languages/top/CyberLoop-dev/mockdock?style=for-the-badge" alt="Language"/>
<img src="https://img.shields.io/github/stars/CyberLoop-dev/mockdock?style=for-the-badge" alt="Stars"/>
<img src="https://img.shields.io/github/last-commit/CyberLoop-dev/mockdock?style=for-the-badge" alt="Last commit"/>
</p>
<p align="center"><img src="assets/overview.svg" width="640" alt="MockDock request flow"/></p>

## 🧭 Overview
MockDock is a tiny local HTTP server driven by a JSON route file. Use it when a frontend or integration needs predictable API responses before the real backend is ready.

## ✨ Features
- 🧩 Match routes by HTTP method and path parameters such as <code>/users/:id</code>
- 📦 Return configurable JSON bodies and status codes
- ⏱️ Simulate network latency per route
- 🪵 Print a readable request log to the terminal
- 🔒 Bind to localhost by default; no account or external service required

## 🎬 Demo
Request <code>http://127.0.0.1:3000/api/users/42</code> while the server is running:
~~~json
{"id":"42","name":"Sample User"}
~~~

## 🚀 Quick Start
Requires Node.js 18 or newer.
~~~bash
npm start
~~~
In another terminal:
~~~bash
curl http://127.0.0.1:3000/api/health
curl http://127.0.0.1:3000/api/users/42
npm test
~~~
Edit <code>mocks.json</code> to add routes. Set <code>PORT</code> or <code>MOCKS_FILE</code> to customize the server.

## 🧰 Tech Stack
- 🟢 Node.js built-in HTTP server
- 📄 JSON route configuration
- 🧪 Node.js built-in test runner

## 🗂️ Folder Structure
~~~text
mockdock/
├── assets/overview.svg
├── tests/server.test.js
├── mocks.json
├── server.js
├── package.json
├── .gitignore
└── README.md
~~~

## 🗺️ Roadmap
- [ ] 🧾 Optional request-body match rules
- [ ] 🧪 Response templates with reusable fixtures
- [ ] 📤 Export captured requests as test fixtures

## 🤝 Contributing
Issues and pull requests are welcome. Keep changes small, add tests for route behavior, and document configuration options.

## 📄 License
MIT — see [LICENSE](LICENSE).

<p align="center"><img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:0ea5e9&height=110&section=footer" width="100%" alt="Wave footer"/></p>