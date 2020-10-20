const express = require('express')
const fs = require('fs');
const app = express(),
      bodyParser = require("body-parser"),
      port = 8080;
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var router = express.Router();

// logging middleware
router.use(function(req, res, next) {
    console.log('\nReceived:',{url: req.originalUrl, body: req.body, query: req.query});
    next();
})

const filterProducts = (term) => {
    // Read from db
    let data = JSON.parse(fs.readFileSync('products.json'));
    // Basic logic to filter products based on name
    let newResults = data.products.filter((item) => {
        return item.name.toLowerCase().includes(term);
    });
    // Return top 10 results
    return newResults.slice(0, 10);
  }

router.get('/getProducts', function(req, res) {
    let results = filterProducts(req.query.search.toLowerCase());
    res.json(results);
})

app.use('/api', router);
app.listen(port);
console.log(`API running at localhost:${port}/api`);