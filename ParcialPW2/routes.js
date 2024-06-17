 const express = require('express');
 const router = express.Router();
 const path = require('path');

 router.use(express.json());

router.use('/public', express.static('public'));
//////////////////////////////////////////////////////
router.use(express.static("views"))

router.use('/public', express.static(path.join(__dirname, 'public')));
router.use(express.static(path.join(__dirname, 'public')));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.get('/home', (req,res)=>{
    res.render(index);
});

module.exports = router;