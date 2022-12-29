const express = require('express');
const AuthController = require('./controllers/AuthController');
const router = express.Router();
router.get('/',(req,res)=>{
    res.json({hello: "World"});
})
router.post('/api/signin',AuthController.signIn);
router.post('/api/signup',AuthController.signUp);
module.exports = router;