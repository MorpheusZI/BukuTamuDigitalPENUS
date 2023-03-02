const express = require("express");
const mysql = require("mysql");
const ejslayouts = require("express-ejs-layouts");
const BodyParser = require("body-parser");
const app = express();
const fileUpload = require("express-fileupload");
const path = require("path");

app.use(fileUpload());
app.use(BodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(ejslayouts);

const db = mysql.createConnection({
  host: "localhost",
  database: "buku_tamu",
  user: "root",
  password: "",
});
db.connect((err) => {
  if (err) throw err;
  console.log("database connected");
  const sql = "SELECT * FROM `info_tamu`";
  // getting data
  app.get("/", (req, res) => {
    db.query(sql, (err, result) => {
      const users = JSON.parse(JSON.stringify(result));
      console.log("hasil database ->", users);
      res.render("upload");
    });
  });
  // posting data
  app.post("/tambah", (req, res) => {
    const file = req.files.Foto;
    const filePath = path.join(
      __dirname,
      "public",
      "serverimg",
      `${file.name}`
    );
    console.log(file);
    const insertSql = `INSERT INTO info_tamu(Nama_tamu,notelp_tamu, Alamat_tamu, Keperluan_tamu) VALUES ('${req.body.Nama}', '${req.body.Notelp}', '${req.body.Alamat}','${req.body.anu}');`;
    db.query(insertSql, (err, result) => {
      if (err) throw err;
      res.redirect("/");
    });

    file.mv(filePath, (err) => {
      if (err) return res.status(500).send(err);
    });
  });
});

app.listen(8000, () => {
  console.log("server ready");
});
