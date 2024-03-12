import express from 'express';

const router = express.Router();

router.get('', (req, res) => {
    const locals = {
        title: 'Travel buddy home'
    };
    res.render("index", { locals });

})
router.get('/sign_in_form', (req, res) => {
    const locals = {
        title: 'sign up'
    };
    res.render('sign_in_form', { locals })
})


export default router;