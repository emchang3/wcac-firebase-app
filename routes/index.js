const express = require('express')
const router = express.Router()


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' })
})

// router.post('/testLoc', (req, res, next) => {
//   console.log('--- remote ---', req.connection.remoteAddress, typeof req.connection.remoteAddress)
//   res.json({
//     msg: 'bloop.'
//   })
// })

router.get('/login', (req, res, next) => {
  res.render('default', { title: 'Log In' })
})

router.get('/new_post', (req, res, next) => {
  res.render('default', { title: 'Create Content' })
})

module.exports = router
