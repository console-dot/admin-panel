const router = require('express').Router();
const {Faq} = require('../handlers');
const {Auth}= require('../middleware')
const handlers = new Faq();
const auth = new Auth();


router.post('/', auth.authentication , handlers.createFaq );
router.get('/', auth.authentication , handlers.getAllFaqs );
router.put('/', auth.authentication , handlers.updateFaq );
module.exports= router;