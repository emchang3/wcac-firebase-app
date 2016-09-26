const express = require('express')
const router = express.Router()
const { capitalize } = require('lodash')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Home' })
})

// router.post('/testLoc', (req, res, next) => {
//   console.log('--- remote ---', req.connection.remoteAddress, typeof req.connection.remoteAddress)
//   res.json({
//     msg: 'bloop.'
//   })
// })

router.get('/admin', (req, res, next) => {
  res.render('default', { title: 'Administrator' })
})

router.get('/posts', (req, res, next) => {
  res.render('default', { title: 'All Posts' })
})

router.get('/create_new', (req, res, next) => {
  res.render('default', { title: 'Create Content' })
})

router.get('/edit/:its', (req, res, next) => {
  const its = req.params.its
  res.render('secondary', { title: `Edit Post: ${its}` })
})

router.get('/view/:its', (req, res, next) => {
  const its = req.params.its
  res.render('secondary', { title: `View Post: ${its}` })
})

router.get('/category/:cat', (req, res, next) => {
  const cat = req.params.cat
  res.render('secondary', { title: `Category: ${capitalize(cat)}` })
})

module.exports = router
