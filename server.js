const express = require('express')
const path = require('path')
const app = express(),
      bodyParser = require("body-parser"),
      port = 8080;
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')))

const db = {
    "products": [
        {
            "name": "American Express Cards (US)",
            "url": "https://www.americanexpress.com",
            "type": "CREDIT_CARD"
        },
        {
            "name": "ADP Retirement Services - 401k (US)",
            "url": "http://www.adp.com/solutions/employer-services/retirement-services.aspx",
            "type": "INVESTMENT"
        },
        {
            "name": "American Express Bank (Personal Savings) (US)",
            "url": "https://www.americanexpress.com/?inav=NavLogo",
            "type": "BANK"
        }
    ]
};

app.get('/api/getInstitutions', (req, res) => {
    res.json(db.products);
  });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});