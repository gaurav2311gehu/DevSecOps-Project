const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let users = [];
let loggedIn = false;

// Register
app.post("/register", (req, res) => {
    const { username, password } = req.body;
    users.push({ username, password });

    res.send(`
    <html>
    <body style="font-family:Arial; background:linear-gradient(135deg,#11998e,#38ef7d); display:flex; justify-content:center; align-items:center; height:100vh; color:white;">
        <div style="background:rgba(0,0,0,0.6); padding:30px; border-radius:10px; text-align:center;">
            <h1>✅ Registration Successful</h1>
            <a href="/" style="padding:10px 20px; background:orange; color:white; text-decoration:none;">Login</a>
        </div>
    </body>
    </html>
    `);
});

// Login
app.post("/login", (req, res) => {
    const user = users.find(
        (u) => u.username === req.body.username && u.password === req.body.password
    );

    if (user) {
        loggedIn = true;
        res.redirect("/dashboard");
    } else {
        res.send("Login Failed");
    }
});

// Dashboard
app.get("/dashboard", (req, res) => {
    if (!loggedIn) return res.redirect("/");

    res.send(`
<html>
<head>
    <title>DevOps World</title>
    <style>
        body {
            font-family: Arial;
            background: linear-gradient(135deg, #1d2b64, #f8cdda);
            color: white;
            padding: 30px;
            line-height: 1.6;
        }
        h1 { color: #ffcc00; text-align:center; }
        .box {
            background: rgba(0,0,0,0.6);
            padding: 25px;
            border-radius: 10px;
            margin-top: 20px;
        }
        h2 {
            color: #00e6e6;
            margin-top: 20px;
        }
        ul {
            padding-left: 20px;
        }
        .logout {
            display:inline-block;
            margin-top:30px;
            padding:12px 25px;
            background:linear-gradient(to right, #ff416c, #ff4b2b);
            color:white;
            text-decoration:none;
            border-radius:6px;
            font-weight:bold;
        }
    </style>
</head>
<body>

<h1>🚀 Welcome to My DevOps World</h1>

<div class="box">

<p><b>DevOps</b> is a modern software development approach that combines development (Dev) and operations (Ops) teams to improve collaboration, speed, and efficiency.</p>

<h2>📌 What is DevOps?</h2>
<p>DevOps focuses on automation, continuous delivery, and fast feedback loops. It ensures that applications are developed, tested, and released quickly with high quality.</p>

<h2>🔧 Key Concepts</h2>
<ul>
    <li><b>CI/CD:</b> Continuous Integration and Continuous Deployment automate build and release process.</li>
    <li><b>Automation:</b> Reduce manual work using scripts and tools.</li>
    <li><b>Monitoring:</b> Track application performance and logs.</li>
    <li><b>Infrastructure as Code (IaC):</b> Manage infrastructure using code.</li>
    <li><b>Microservices:</b> Break applications into small independent services.</li>
</ul>

<h2>🛠 Popular DevOps Tools</h2>
<ul>
    <li><b>CI/CD:</b> Jenkins, GitHub Actions, GitLab CI</li>
    <li><b>Containers:</b> Docker</li>
    <li><b>Orchestration:</b> Kubernetes</li>
    <li><b>IaC:</b> Terraform, Ansible</li>
    <li><b>Monitoring:</b> Prometheus, Grafana</li>
</ul>

<h2>🔐 DevSecOps (Security in DevOps)</h2>
<ul>
    <li>SonarQube → Code Security (SAST)</li>
    <li>OWASP → Dependency & Web Security</li>
    <li>Trivy → Container Image Scanning</li>
</ul>

<h2>📈 Benefits of DevOps</h2>
<ul>
    <li>Faster software delivery 🚀</li>
    <li>Better collaboration 👥</li>
    <li>Improved reliability 🔒</li>
    <li>Quick bug detection 🐞</li>
    <li>Scalability 📊</li>
</ul>

<h2>⚙️ DevOps Lifecycle</h2>
<ul>
    <li>Plan → Code → Build → Test → Release → Deploy → Monitor</li>
</ul>

<h2>🔥 Real-World Example</h2>
<p>When a developer pushes code to GitHub:</p>
<ul>
    <li>CI pipeline runs tests</li>
    <li>Security tools scan code</li>
    <li>Docker image is built</li>
    <li>Application is deployed automatically</li>
</ul>

<h2>💡 Why DevOps Matters?</h2>
<p>In today’s fast-paced tech world, companies need to deliver updates quickly and securely. DevOps helps achieve speed without compromising quality.</p>

<a href="/logout" class="logout">🚪 Logout</a>

</div>

</body>
</html>
`);
});

// Logout
app.get("/logout", (req, res) => {
    loggedIn = false;
    res.send(`
    <html>
    <body style="font-family:Arial; background:linear-gradient(135deg,#ff512f,#dd2476); display:flex; justify-content:center; align-items:center; height:100vh; color:white;">
        <div style="background:rgba(0,0,0,0.6); padding:30px; border-radius:10px; text-align:center;">
            <h1>👋 Logged Out</h1>
            <a href="/" style="padding:10px 20px; background:blue; color:white; text-decoration:none;">Login Again</a>
        </div>
    </body>
    </html>
    `);
});

app.listen(3000, () => {
    console.log("App running on http://localhost:3000");
});