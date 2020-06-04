// const fetch = require ("node-fetch"); //  npm i node-fetch
const fs = require ('fs');
const path = require('path');


const galleryArray = () => {
fs.readdir(path.join(__dirname,'public', 'img'), function(err, files){ // filesystem read directory of images
    if (err) {
        console.log(`error`)
    }
    console.log(files);
})
}

module.exports = {
    galleryArray
}; 

