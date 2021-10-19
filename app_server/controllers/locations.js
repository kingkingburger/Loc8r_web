var request = require('request');

const apiOptions = {
    server: 'http://localhost:3000'
};

if(process.env.NODE_ENV === 'production'){
    apiOptions.server  = 'https://loc8rwon.herokuapp.com';
}

const homelist = (req, res) => {
    const path = '/api/locations';
    const requestOptions ={
        url:`${apiOptions.server}${path}`,
        method:'GET',
        json:{},
        qs:{
            lng: 1,//126.964062,
            lat: 1,//37.468769,
            maxDistance: 0.002//200000
        }
    };
    request(requestOptions,(err, {statusCode}, body) => {
        let data =[];
        if(statusCode === 200 && body.length){
            data = body.map( (item) =>{
                item.distance = formatDistance(item.distance);
                return item;
            });
        };
    
        renderHomepage(req,res,data);
    });
};

const renderHomepage = (req,res, responseBody) =>{
    let message = null;
    if(!(responseBody instanceof Array)) {
        message = "API lookup error";
        responseBody = [];
    } else{
        if(!responseBody.length){
            message = "No places found nearby";
        }
    }

    res.render('locations-list',{
        title: 'Loc8r - find a place to work with wifi',
        pageHeader: {
            title: 'Loc8r',
            strapline: 'Find place to work with wifi near you!'
        },
        sidebar: "Looking for wifi and a seat? Loc8r helps you find places\
        to work when out and about. Perhaps with ceffe, cake or a pint?\
        Let Loc8r help you find the place you're looking for.",
        locations: responseBody,
        message
    });
};

const formatDistance = (distance) => {
    let thisDistance = 0;
    let unit = 'm';
    if(distance >1000){
        thisDistance = parseFloat(distance/1000).toFixed(1);
        unit = 'km';
    }else{
        thisDistance = Math.floor(distance);
    }
    return thisDistance+unit;
};

const locationInfo = (req, res) => {
    res.render('locations-Info',
        {
            title: 'Starcups',
            pageHeader: {
                title: 'Loc8r',
            },
            sidebar: {
                context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
                callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
            },
            location: {
                name: 'Starcups',
                address: '경기도 의왕시 오전동 등칙골 12',
                rating: 3,
                facilities: ['Hot drinks', 'Food', 'Premium wifi'],
                coords: { lat: 37.35262356893374, lng: 126.97324254928807 },
                openingTimes: [
                    {
                        days: 'Monday - Friday',
                        opening: '7:00am',
                        closing: '7:00pm',
                        closed: false
                    },
                    {
                        days: 'Saturday',
                        opening: '8:00am',
                        closing: '5:00pm',
                        closed: false
                    },
                    {
                        days: 'Sunday',
                        closed: true
                    }
                ],
                reviews: [
                    {
                        author: 'Simon Holmes',
                        rating: 5,
                        timestamp: '16 July 2013',
                        reviewText: 'What a great place. I can\'t say enough good things about it.'
                    },
                    {
                        author: 'Charlie Chaplin',
                        rating: 3,
                        timestamp: '16 June 2013',
                        reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
                    }
                ]
            }
        }
    );
};

const addReview = (req, res) => {
    res.render('location-review-form',
        {
            title: 'Review Starcups on Loc8r',
            pageHeader: { title: 'Review Starcups' }
        }
    );
};

module.exports = {
    homelist,
    locationInfo,
    addReview
};