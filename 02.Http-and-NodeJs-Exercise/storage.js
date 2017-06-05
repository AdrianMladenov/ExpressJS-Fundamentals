const fs = require('fs')
const fileName = 'storage.dat'

let globalStorage = {}

let put = (key, value) => {
  validateString(key)
  if (globalStorage.hasOwnProperty(key)) {
    throw new Error('The key already exists')
  }

  globalStorage[key] = value
}

let get = (key) => {
  validateString(key)
  validateKeyExists(key)
  return globalStorage[key]
}

let update = (key, value) => {
  validateString(key)
  validateKeyExists(key)
  globalStorage[key] = value
}

let deleteItem = (key) => {
  validateString(key)
  validateKeyExists(key)
  globalStorage[key] = undefined
}

let clear = () => {
  globalStorage = {}
}

let save = () => {
  return new Promise((resolve, reject) => {
    let storageJSON = JSON.stringify(globalStorage)
      let flag = {flag: 'w'}
    fs.writeFile(fileName, storageJSON, flag, err => {
      if (err) {
        reject(err)
        return
      }

      resolve()
    })
  }).then(clear())
}

let load = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, dataAsJson) => {
      if (err) {
        reject(err)
        return
      }

      globalStorage = JSON.parse(dataAsJson)
      resolve()
    })
  })
}

module.exports = {
  put: put,
  get: get,
  update: update,
  delete: deleteItem,
  clear: clear,
  save: save,
  load: load
}

// helpers
function validateString (key) {
  if (typeof key !== 'string') {
    throw new TypeError('The key must be a string')
  }
}

function validateKeyExists (key) {
  if (!globalStorage.hasOwnProperty(key)) {
    throw new Error('The key do not exists')
  }
}
