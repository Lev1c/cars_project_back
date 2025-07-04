const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api", async (req, res) => {
  const { a, u, p, srv } = req.body;

  try {
    const proxyRes = await fetch("https://gps-it.ru/proxy.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        a,
        u,
        p,
        srv,
      }),
    });

    const text = await proxyRes.text();
    res.send(text);
  } catch (e) {
    console.error("Ошибка прокси:", e);
    res.status(500).send("Ошибка сервера-прокси");
  }
});

app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
