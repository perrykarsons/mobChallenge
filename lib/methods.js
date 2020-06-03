const fetch = require ("node-fetch"); //  npm i node-fetch
const fs = require ('fs');

const apiMob = () => {
    fs.writeFile('gallery.txt', 'hi');
};


module.exports = {
    apiMob
}; 


// fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) {
//   if (err) throw err;
//   console.log('Saved!');
// });