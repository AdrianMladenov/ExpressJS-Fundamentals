let products = []
let count = 1

module.exports.products = {}
module.exports.products.getAll = () => {
  return products
}
module.exports.products.add = (product) => {
  product.id = count++
  products.push(product)
}
module.exports.products.findByName = (name) => {
  let productsFound = []
  for (let prod of products) {
    if (prod.name.toLowerCase().indexOf(name.toLowerCase()) !== -1) {
      productsFound.push(prod)
    }
  }
  return productsFound
}
