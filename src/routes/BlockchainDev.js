const router = require('express').Router();
const {BlockchainDS} = require('../handlers');
const {Auth}= require('../middleware')
const handlers = new BlockchainDS();
const auth = new Auth();


router.post('/', auth.authentication , handlers.addBlockchain );
router.get('/', auth.authentication , handlers.getBlockchain );
router.put('/:id', auth.authentication , handlers.updateBlockchain );
module.exports= router;