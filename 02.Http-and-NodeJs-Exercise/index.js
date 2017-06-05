const storage = require('./storage')

console.log('--Testing put--')
storage.put('zero', '000')
console.log(storage.get('zero'))
storage.put('o ye', 2)
console.log(storage.get('o ye'))
storage.put('string', false)
console.log(storage.get('string'))
storage.put('', null)
// storage.put('', null)
console.log(storage.get(''))
storage.put('undefined', undefined)
console.log(storage.get('undefined'))
storage.put('quick brown fox', 'jumps over the lazy dog')
console.log(storage.get('quick brown fox'))
console.log()

console.log('--Testing update--')
storage.update('o ye', 'o ne')
storage.update('', [])
console.log(storage.get('o ye'))
console.log(storage.get(''))
console.log()

console.log('--Testing delete--')
storage.delete('undefined')
console.log(storage.get('undefined'))
storage.delete('zero')
console.log(storage.get('zero'))
console.log()

console.log('--Testing save--')
storage.save()
setTimeout(() => {     // testing .clear()
  storage.get('o ye')  // with 0.100secs delay
}, 100)                // because throw error breaks .dat file
console.log()

console.log('--Testing load--')
storage.load()
setTimeout(() => {
  console.log(storage.get('o ye'))            // same
  console.log(storage.get('quick brown fox')) // reason
  console.log(storage.get(''))
}, 100)
