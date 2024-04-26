const router = require('express').Router();
const { About} = require('../handlers');
const {Auth}= require('../middleware')
const handlers = new About();
const auth = new Auth();


router.post('/', auth.authentication , handlers.createAbout );
router.put('/:id', auth.authentication , handlers.updateAbout );
module.exports= router;