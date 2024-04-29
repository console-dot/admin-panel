const router = require('express').Router();
const {WebDev} = require('../handlers');
const {Auth}= require('../middleware')
const handlers = new WebDev();
const auth = new Auth();


router.post('/', auth.authentication , handlers.addWebDev );
router.get('/:id', auth.authentication , handlers.getWebDev );
module.exports= router;