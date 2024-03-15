import express from 'express';

const router = express.Router();

router.get('', (req, res) => {
    const locals = {
        title: 'Travel buddy home'
    };
    res.render("index", { locals });

})


export default router;