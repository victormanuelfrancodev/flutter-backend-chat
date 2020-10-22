/*
    path:
api/login
*/

const { Router } = require('express');
const { createUser,login,renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();
router.post('/new', [
    check('name','the name is necessary').not().isEmpty(),
    check('email','the email is necessary').isEmail(),
    check('password','the password is necessary').not().isEmpty(),
    validateFields
],createUser);

router.post('/',[
    check('email','the email is necessary').isEmail(),
    check('password','the password is necessary').not().isEmpty(),
],login);


router.get('/renew', validateJWT, renewToken);
module.exports = router;