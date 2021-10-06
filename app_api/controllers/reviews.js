const mongoose = require("mongoose");
const Loc = mongoose.model('Location');

const reviewCreate = (req, res) => {};
const reviewsReadOne = (req, res) =>{};
const reviewsUpdateOne = (req, res) =>{};
const reviewsDeleteOne = (req, res) =>{};

module.exports ={
    reviewCreate,
    reviewsReadOne,
    reviewsUpdateOne,
    reviewsDeleteOne,
}