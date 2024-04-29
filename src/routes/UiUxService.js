const router = require('express').Router();
const {UiUxService} = require('../handlers');
const {Auth}= require('../middleware')
const handlers = new UiUxService();
const auth = new Auth();


router.post('/', auth.authentication , handlers.addUiUxService );
router.get('/:id', auth.authentication , handlers.getUiUxService );
module.exports= router;