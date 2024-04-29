const router = require('express').Router();
const {AIService} = require('../handlers');
const {Auth}= require('../middleware')
const handlers = new AIService();
const auth = new Auth();


router.post('/', auth.authentication , handlers.addAIService );
router.get('/:id', auth.authentication , handlers.getAIService );
router.put('/:id', auth.authentication , handlers.updateAIService );
module.exports= router;