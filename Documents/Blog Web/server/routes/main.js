const express = require('express');
const router = express.Router();

//Routes

router.get('', (req, res) => {
    const locals = {
        title: "Pratice Blog",
        description: "A simple blog created with Nodejs, Express & MongoDB"
    }
    res.render('index', {locals});

})

router.get('/about', (req, res) => {
    res.render('about');
})



module.exports = router;

