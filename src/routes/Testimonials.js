const router = require('express').Router();
const {Testimonials} = require('../handlers');
const {Auth}= require('../middleware')
const handlers = new Testimonials();
const auth = new Auth();


router.post('/', auth.authentication , handlers.createTestimonials );
router.put('/:id', auth.authentication , handlers.updateTestimonials );
module.exports= router;