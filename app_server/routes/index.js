var express = require('express');
var router = express.Router();

const ctrlLocation = require('../controllers/locations');
const ctrlOther = require('../controllers/others');


router.get('/',ctrlLocation.homelist);
router.get('/location',ctrlLocation.locationInfo);
router.get('/review/new',ctrlLocation.addReview);

router.get('/about',ctrlOther.about);


module.exports = router;
