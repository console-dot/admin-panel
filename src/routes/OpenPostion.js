const router = require('express').Router();
const {OpenPosition}= require('../handlers');
const {Auth} = require('../middleware/Auth');

const handlers = new OpenPosition();
const auth = new Auth();


router.get('/',auth.authentication , handlers.getAllPositions );
router.get('/:id',auth.authentication , handlers.getPositionById );
router.post('/',auth.authentication , handlers.createPosition );
router.put('/:id',auth.authentication , handlers.updatePosition );
router.delete('/:id',auth.authentication , handlers.deletePosition );
module.exports=router;