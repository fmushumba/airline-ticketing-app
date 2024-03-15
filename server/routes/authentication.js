import express from 'express';
import bcrypt from 'bcrypt';
import client from '../../app.js';

const saltRounds = 10;
const router = express.Router();

router.get('/sign_in_form', (req, res) => {
    const locals = {
        title: 'sign up'
    };
    res.render('sign_in_form', { locals });
});

router.post('/sign_in_form', async (req, res) => {
    const sql = 'INSERT INTO userinfo (firstName, lastName, email, password) VALUES ($1, $2, $3, $4)';


    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const password = req.body.password


    try {
        const checkResult = await client.query('SELECT id FROM userinfo WHERE email = $1', [email]);

        if (checkResult.rows.length > 0) {
            res.render('login');
        } else {
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                    console.log(err)
                }
                else {
                    await client.query(sql, [firstName, lastName, email, hash]);
                    console.log('User signed up successfully');
                    res.status(200).render('index');
                }
            })

        }
    } catch (error) {
        console.error('Error signing up user:', error.message);
        res.status(500).send('Error signing up user: ' + error.message);
    }
});

router.get('/login', (req, res) => {
    const locals = {
        title: 'login'
    };
    res.render('login', { locals });
});


router.post('/login', async (req, res) => {
    const sql = 'SELECT id,password FROM userinfo WHERE email = $1';

    const email = req.body.email
    const loginpassword = req.body.password


    try {
        const checkResult = await client.query(sql, [email]);
        const stored_password = checkResult.rows[0].password
        if (bcrypt.compare(loginpassword, stored_password)) {

            res.status(200).render('index');

        } else {

            res.redirect('login')

        }
    } catch (error) {
        console.error('Error signing in:', error.message);
        res.status(500);
    }
});

export default router;
