const router = require('express').Router();

const {User} = require('../handlers');
const handlers = new User();

router.post('/signup', handlers.signUp);
module.exports = router;