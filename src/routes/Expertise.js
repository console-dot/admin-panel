const router = require('express').Router();
const {Expertise} = require('../handlers');
const {Auth}= require('../middleware')
const handlers = new Expertise();
const auth = new Auth();


router.post('/', auth.authentication , handlers.createExpertise );
router.put('/:id', auth.authentication , handlers.updateExpertise );
router.delete("/:id", auth.authentication, handlers.deleteExpertise);
module.exports= router;