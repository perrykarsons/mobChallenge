const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const fs = require('fs')
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: 'hbs'
}));

app.set('view engine', '.hbs');

app.get('/', async (req, res) => { // localhost:3000/ home page
  
    res.render('index');
});

app.get('/pictures', async (req, res) => { // localhost:3000/ home page
    fs.readdir(path.join(__dirname,'public', 'img'), function(err, files){
        if (err) {
            return res.status(400).send(`Unable to access directory`)
        }
        res.render('pictures', {files})
    })

});

app.post('/pictures', function (req, res) {
    if(req.files){
      let  file = req.files.sampleFile;
      file.mv('./public/img/'+file.name,function(err){
        if(err){
          return  res.status(400).send("error occured")
        }
        else{
          console.log("saved");
          res.redirect('pictures')
        
        }
      })
    }
  })




app.listen(3000,() => { // localhost:3000 but can be any port between 3000-8000 i think
    console.log("listening on port 3000"); 
})