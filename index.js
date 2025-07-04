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
  const { a, u, p, srv, sid, uid, aid, rid, from, to } = req.body;

  try {
    const params = new URLSearchParams();
    if (a) params.append("a", a);
    if (u) params.append("u", u);
    if (p) params.append("p", p);
    if (srv) params.append("srv", srv);
    if (sid) params.append("sid", sid);
    if (uid) params.append("uid", uid);
    if (aid) params.append("aid", aid);
    if (rid) params.append("rid", rid);
    if (from) params.append("from", from);
    if (to) params.append("to", to);

    const proxyRes = await fetch("https://gps-it.ru/proxy.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const text = await proxyRes.text();
    res.send(text);
  } catch (e) {
    console.error("Ошибка прокси:", e);
    res.status(500).send("Ошибка сервера-прокси");
  }
});

app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
