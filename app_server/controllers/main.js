const index = (req, res) =>{
    res.render('index',{ title: 'Express by Wonminho' });
};
  

module.exports = {
    index
};