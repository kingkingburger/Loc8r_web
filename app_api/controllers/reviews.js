const mongoose = require("mongoose");
const Loc = mongoose.model('Location');

const reviewCreate = (req, res) => {};
const reviewsReadOne = (req, res) =>{
    Loc
        .findById(req.parmas.locationid)
        .select('name reviews')
        
        .exec((err, location) =>{
            if(!location){
                return res
                    .status(404)
                    .json({
                        "message":"lcoation not found"
                    });
            } else if (err){
                return res
                    .status(404)
                    .json(err);
            }
            if(location.reviews && location.reviews.length >0){
                const review = location.reviews.id(req.parmas.reviewid);

                if(!review){
                    return res
                        .status(404)
                        .json({"message": "review not found"});
                }else{
                    const response={
                        location: {
                            name: location.name,
                            id: req.parmas.locationid
                        },
                        review
                    };

                    return res
                        .status(200)
                        .json(response)
                }
            }else{
                return res
                    .status(404)
                    .json({"message": "No reviews found"});
            }
        });
};
const reviewsUpdateOne = (req, res) =>{};
const reviewsDeleteOne = (req, res) =>{};

module.exports ={
    reviewCreate,
    reviewsReadOne,
    reviewsUpdateOne,
    reviewsDeleteOne,
}