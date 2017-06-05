const url = require('url')
const fs = require('fs')
const path = require('path')
const database = require('../config/database')
const query = require('querystring')

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname
  if (req.pathname === '/' && req.method === 'GET') {
    let filePath = path.normalize(path.join(__dirname, '../views/home/index.html'))
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log(err)
        res.writeHead(404, {
          'Content-Type': 'text/plain'
        })

        res.write('404 not found!')
        res.end()
        return
      }
      let queryData = query.parse(url.parse(req.url).query)
      let products = database.products.getAll()
      let content = prepareEachProduct(products)

      if (queryData.query) {
        products = database.products.findByName(queryData.query)
        if (products.length > 0) {
          console.log(products.length)
          content = prepareEachProduct(products)
        } else {
          content = `Unfortunately, there are no products with name ${queryData.query}. :( Try to search by other criteria.`
        }
      }
      let html = data.toString().replace('{content}', content)

      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      res.write(html)
      res.end()
    })
  } else {
    return true
  }
}

function prepareEachProduct (prods) {
  let concatProds = ''
  for (let product of prods) {
    concatProds +=
      `<div class="product-card">
        <img class="product-img" src="${product.image}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        </div>`
  }
  return concatProds
}
