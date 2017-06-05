const fs = require('fs')
const path = require('path')
const dbPath = path.join(__dirname, '/database.json')
// let products = getProducts()

module.exports.products = {}
module.exports.products.getAll = getProducts
module.exports.products.add = (product) => {
  let products = getProducts()
  product.id = products.length + 1
  products.push(product)
  saveProducts(products)
}

module.exports.products.findByName = (name) => {
  return getProducts().filter(p => p.name.toLowerCase().includes(name))
}

// helpers

function getProducts () {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, '[]')
    return []
  }

  let productsJson = fs.readFileSync(dbPath).toString() || '[]'
  return JSON.parse(productsJson)
}

function saveProducts (products) {
  let productsJson = JSON.stringify(products)
  fs.writeFileSync(dbPath, productsJson)
}
