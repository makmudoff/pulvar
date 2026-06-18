const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

/* ================= DEMO DATABASE ================= */
let users = [
  { username: "admin", password: "123", balance: 0 }
];

let orders = [];

/* ================= STYLE ================= */

const style = `
<style>
body{
  margin:0;
  font-family:Arial;
  background:#0f172a;
  color:#fff;
  display:flex;
  justify-content:center;
  align-items:center;
  min-height:100vh;
}

.card{
  background:#1e293b;
  padding:20px;
  border-radius:12px;
  width:380px;
  text-align:center;
  box-shadow:0 10px 25px rgba(0,0,0,0.4);
}

input,button{
  width:90%;
  padding:10px;
  margin:6px 0;
  border-radius:8px;
  border:none;
}

button{
  background:#3b82f6;
  color:#fff;
  cursor:pointer;
}

a{
  color:#38bdf8;
  text-decoration:none;
}
</style>
`;

/* ================= HOME ================= */

app.get("/", (req,res)=>{
  res.send(style+`
  <div class="card">
    <h2>🚀 SMM PANEL DEMO</h2>
    <a href="/login">Giriş</a>
  </div>`);
});

/* ================= LOGIN ================= */

app.get("/login",(req,res)=>{
  res.send(style+`
  <div class="card">
    <h3>Login</h3>
    <form method="POST">
      <input name="username" placeholder="Username"/>
      <input name="password" placeholder="Password"/>
      <button>Giriş</button>
    </form>
  </div>`);
});

app.post("/login",(req,res)=>{
  let u = users.find(x=>x.username==req.body.username && x.password==req.body.password);
  if(!u) return res.send("❌ Səhv login");
  res.redirect("/panel");
});

/* ================= PANEL ================= */

app.get("/panel",(req,res)=>{
  let u = users[0]; // demo user

  res.send(style+`
  <div class="card">
    <h2>📊 PANEL</h2>

    <p>👤 User: ${u.username}</p>
    <p>💰 Balans: ${u.balance} AZN</p>

    <hr>

    <h3>🛒 Sifariş</h3>
    <form method="POST" action="/order">
      <input name="service" placeholder="Service"/>
      <input name="link" placeholder="Link"/>
      <input name="qty" placeholder="Qty"/>
      <button>Sifariş et</button>
    </form>

    <br>

    <a href="/add-balance">💳 Balans artır</a><br>
    <a href="/orders">📦 Orders</a>
  </div>`);
});

/* ================= ORDER ================= */

app.post("/order",(req,res)=>{
  orders.push(req.body);
  res.send("✔ Sifariş göndərildi <a href='/panel'>geri</a>");
});

/* ================= ORDERS ================= */

app.get("/orders",(req,res)=>{
  res.send(style+`
  <div class="card">
    <h3>📦 Orders</h3>
    <pre>${JSON.stringify(orders,null,2)}</pre>
    <a href="/panel">geri</a>
  </div>`);
});

/* ================= BALANCE ================= */

app.get("/add-balance",(req,res)=>{
  res.send(style+`
  <div class="card">
    <h2>💳 Balans artır</h2>
    <p>Demo: +10 AZN əlavə olunacaq</p>
    <a href="/success"><button>Ödəniş et</button></a>
  </div>`);
});

/* ================= SUCCESS ================= */

app.get("/success",(req,res)=>{
  users[0].balance += 10;

  res.send(style+`
  <div class="card">
    <h2>✔ Ödəniş uğurlu</h2>
    <p>+10 AZN əlavə edildi</p>
    <a href="/panel">Panelə qayıt</a>
  </div>`);
});

/* ================= START ================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
  console.log("SMM PANEL RUNNING ON " + PORT);
});