const router = require('express').Router();
const {ContactUs} = require('../handlers');

const handlers = new ContactUs();



router.post('/',  handlers.createContact);
module.exports= router;