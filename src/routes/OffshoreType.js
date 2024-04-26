const router = require('express').Router();
const { OffShoreType} = require('../handlers');
const {Auth}= require('../middleware')
const handlers = new OffShoreType();
const auth = new Auth();


router.post('/', auth.authentication , handlers.createOffSHoreType );
router.put('/:id', auth.authentication , handlers.updateOffShoreType );
module.exports= router;