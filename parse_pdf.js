const fs = require('fs');
const pdf = require('./node_modules/pdf-parse/index.js');

let dataBuffer = fs.readFileSync('Gaza Impact Report - 20th September 2026_261005_111015.pdf');

pdf(dataBuffer).then(function(data) {
    // number of pages
    console.log("Pages:", data.numpages);
    // PDF text
    console.log(data.text);
}).catch(err => {
    console.error("Error reading PDF:", err);
});
