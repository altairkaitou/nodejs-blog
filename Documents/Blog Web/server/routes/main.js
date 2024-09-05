const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


//Routes


/**
 * GET /
 * HOME
*/

router.get('', async (req, res) => {

    try {
        const locals = {
            title: "Pratice Blog",
            description: "A simple blog created with Nodejs, Express & MongoDB"
        }

        let perPage = 2;
        let page = req.query.page || 1;

        const data = await Post.aggregate([ { $sort: {createdAt: -1} } ])
        .skip(perPage *  page - perPage)
        .limit(perPage)
        .exec();

        const count = await Post.countDocuments();

        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);
        
    
        res.render('index', {
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null
        });

    } catch (error) {
        console.log(error);
    }

});




// router.get('', async (req, res) => {
//     const locals = {
//         title: "Pratice Blog",
//         description: "A simple blog created with Nodejs, Express & MongoDB"
//     }

//     try {
//         const data = await Post.find();
//         res.render('index', {locals, data});

//     } catch (error) {
//         console.log(error);
//     }

// });



// function insertPostData() {
//     Post.insertMany([
//         {
//             title: "Building a Blog",
//             body: "This is the body text"

//         },
//         {
//             title: "Learn Morgan - HTTP Request logger for NodeJs",
//             body: "Learn Morgan"
//         }
//     ])
// }

// insertPostData();



/**
 * GET /
 * POST : id
*/

router.get('/post/:id', async (req, res) => {
  
    try {
       

        let slug = req.params.id;

        const data = await Post.findById({ _id: slug});

        const locals = {
            title: data.title,
            description: "A simple blog created with Nodejs, Express & MongoDB"
        }
        res.render('post', {locals, data});

    } catch (error) {
        console.log(error);
    }

});

/**
 * POST /
 * POST : searchTerm
*/


router.post('/search', async (req, res) => {
   

    try {
        const locals = {
            title: "Search",
            description: "A simple blog created with Nodejs, Express & MongoDB"
        }

        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^\w\s]/gi, '');

        const data = await Post.find({
            $or: [
                {title: {$regex: new RegExp(searchNoSpecialChar, 'i') }},
                {body: {$regex: new RegExp(searchNoSpecialChar, 'i')}},

            ]
        })


        res.render("search", {
            data,
            locals
        });




    } catch (error) {
        console.log(error);
    }

});



router.get('/about', (req, res) => {
    res.render('about');
})



module.exports = router;

