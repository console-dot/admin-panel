const router = require('express').Router();
const {TechStack} = require('../handlers');
const {Auth}= require('../middleware')
const handlers = new TechStack();
const auth = new Auth();


router.post('/', auth.authentication , handlers.createTechStack );
router.put('/:id', auth.authentication , handlers.updateTechStack );
module.exports= router;