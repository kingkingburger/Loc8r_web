const express = require('express');
const router = express.Router();
const jwt = require('express-jwt'); //ver 6.x 이후부터 알고리즘 지정해야 한다.
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256'] //default algorithm
})


const ctrlLocations = require('../controllers/locations');
const ctrlReviews = require('../controllers/reviews');
const ctrlAuth = require('../controllers/authentication');

//locations
router
    .route('/locations')
    .get(ctrlLocations.locationsListByDistance)
    .post(ctrlLocations.locationsCreate);
router
    .route('/locations/:locationid')
    .get(ctrlLocations.locationsReadOne)
    .post(ctrlLocations.locationsUpdateOne)
    .delete(ctrlLocations.locationsDeleteOne);

//reviews
router
    .route('/locations/:locationid/reviews')
    .post(auth, ctrlReviews.reviewCreate);
router
    .route('/locations/:locationid/reviews/:reviewid')
    .get(ctrlReviews.reviewsReadOne)
    .put(auth, ctrlReviews.reviewsUpdateOne)
    .delete(auth, ctrlReviews.reviewsDeleteOne);

//등록 및 로그인에 각각 하나씩 (/api/register 와 /api/login) 필요하다
//데이터를 쏴주는거라 post 방식
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
