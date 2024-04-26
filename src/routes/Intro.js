const router = require('express').Router();
const { Intro} = require('../handlers');
const {Auth}= require('../middleware')
const handlers = new Intro();
const auth = new Auth();


router.post('/', auth.authentication , handlers.createIntro );
router.put('/:id', auth.authentication , handlers.updateIntro );
module.exports= router;