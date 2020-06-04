// express
const express = require("express");
const app = express();

//handlebars
const hbs = require("express-handlebars");
const path = require("path");

const fileUpload = require("express-fileupload");
app.use(fileUpload());

const fs = require("fs");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.engine(
  ".hbs",
  hbs({
    defaultLayout: "layout",
    extname: "hbs",
  })
);

app.set("view engine", ".hbs");

app.get("/", async (req, res) => {
  // localhost:3000/ home page

  res.render("index");
});

app.get("/pictures", async (req, res) => {
  // fs.readdir(path.join(__dirname, "public", "img"), function (err, files) { // filesystem read directory of images
  //   if (err) {
  //     return res.status(400).send(`Unable to access directory`);
  //   }
  //   res.render("pictures", { files }); // render file list in pictures
  // });
  files = fs.readdirSync(path.join(__dirname, "public", "img")); // access list of files in img
  res.render('pictures', {files})
  
});

app.post("/pictures", function (req, res) { // post to pictures
  if (req.files) { // if files exist
    let file = req.files.sampleFile; // grab file from form
    file.mv(path.join(__dirname, "public", "img", file.name), function (err) { //move file to location
      if (err) {
        return res.status(400).send(`Error uploading file`);
      } else {
        console.log(`File uploaded`);
        res.redirect("pictures"); // once posted redirect to pictures
      }
    });
  }
});

app.listen(3000, () => { // localhost:3000 but can be any port between 3000-8000
  console.log("listening on port 3000");
});
