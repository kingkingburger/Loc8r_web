var express = require('express');
var router = express.Router();

const ctrlMain = require('../controllers/main');
router.get('/',ctrlMain.index)


const homepageController = (req, res) =>{
  res.render('index',{ title: 'Express by Wonminho' });
};
router.get('/',homepageController);

module.exports = router;
