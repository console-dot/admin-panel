const router = require('express').Router();
const {MobDev} = require('../handlers');
const {Auth}= require('../middleware')
const handlers = new MobDev();
const auth = new Auth();


router.post('/', auth.authentication , handlers.addMobDev );
router.get('/:id', auth.authentication , handlers.getMobDev );
module.exports= router;