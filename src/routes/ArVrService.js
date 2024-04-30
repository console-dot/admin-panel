const router = require('express').Router();
const {ArVrService} = require('../handlers');
const {Auth}= require('../middleware')
const handlers = new ArVrService();
const auth = new Auth();


router.post('/', auth.authentication , handlers.addArVrService );
router.get('/:id', auth.authentication , handlers.getArVrService );
router.put('/:id', auth.authentication , handlers.updateArVr );

module.exports= router;