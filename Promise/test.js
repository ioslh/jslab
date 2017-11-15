const MyPromise = require('./MyPromise')

var p = new MyPromise((resolve, reject) => {
  // setTimeout(() => {
    resolve(5)
  // }, 2000)
})

p.then(value => {
    console.log(`First - A - ${value}`)
    return 6
  })
  .then(value => {
    console.log(`First - B - ${value}`)
    return 7
  }).then(value => {
    console.log(`First - C - ${value}`)
  })





p.then(value => {
    console.log(`Second - A - ${value}`)
    return 8
  }).then(value => {
    console.log(`Second - B - ${value}`)
    return 9
  }).then(value => {
    console.log(`Second - C - ${value}`)
  })
