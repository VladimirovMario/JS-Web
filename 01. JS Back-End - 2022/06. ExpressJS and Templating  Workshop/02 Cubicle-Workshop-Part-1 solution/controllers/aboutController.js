const router = require('express').Router()

router.get('/', (req, res)=>{
    res.render('about', {
        title: 'About ' + res.locals.title
    })
})

module.exports = router