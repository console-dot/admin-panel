const router = require("express").Router();

const {user} = require('./User');




router.use('/signup', user)