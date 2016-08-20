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

router.get('/admin', (req, res, next) => {
  res.render('default', { title: 'Log In' })
})

router.get('/create_new', (req, res, next) => {
  res.render('default', { title: 'Create Content' })
})

router.get('/edit/:its', (req, res, next) => {
  res.render('secondary', { title: 'Edit Content'})
})

module.exports = router
