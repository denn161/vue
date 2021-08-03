const express = require('express') 
const fs = require('fs')
const app = express() 
const port = 3001
const bodyParser = require('body-parser')

app.use(express.static('public'));
const jsonParser = bodyParser.json();

// app.get('/', (req, res) => {
//   res.send('Hello World!')  // мидлвары
// })
app.get('/catalog', (req, res) => {
    fs.readFile('./server/catalog.json','utf8', (err,text) => {
        res.send(text);
      
  })
})
app.get('/cart', (req, res) => {
    fs.readFile('./server/cart.json','utf8', (err,text) => {
        res.send(text);      
  })
})

app.post('/cart',jsonParser, (req, res) => {
    fs.readFile('./server/cart.json','utf8', (err,text) => {
        const cart = JSON.parse(text);
        cart.push(req.body);

   fs.writeFile('./server/cart.json', JSON.stringify(cart), () => {
            res.end();
        })   
      
  })
})
app.delete('/cart',jsonParser, (req, res) => {
    fs.readFile('./server/cart.json','utf8', (err,text) => {
      const cart = JSON.parse(text);
      const index = req.body;
      cart.splice(index,1);

   fs.writeFile('./server/cart.json', JSON.stringify(cart), () => {
            res.end();
        })   
      
  })
})

app.get('/stat', (req, res) => {
    fs.readFile('./server/statistic.json','utf8', (err,text) => {
        res.send(text);      
  })
})

app.post('/stat',jsonParser, (req, res) => {
    fs.readFile('./server/statistic.json','utf8', (err,text) => {
        const stat = JSON.parse(text);
      const item = req.body;
        stat.push(item);

        fs.writeFile('./server/statistic.json', JSON.stringify(stat), () => {
            console.log('done');
            res.end('ok');
        })   
      
  })
})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})