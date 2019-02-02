var express = require('express');
var router = express.Router();
var Journal = require('../models/Journal');

//var data = [];
var todaysDate = formattedDate(); // GET DATE

/* GET home page. */
router.get('/', function(req, res, next) {

  data = Journal.find({}).then(function(journal){
    res.render('index', { data: journal });
  });
  
});

router.get('/new', function(req, res, next){

  res.render('new_entry', {date: todaysDate});
});

router.get('/view/:entry_id', function(req, res, next){

  // GET JOURNAL ENTRY
  Journal.findById(req.params.entry_id, function(err, entry){
    
    // There was an error location the Entry
    if(err){
      res.redirect('/');
    }
    
    // Send to view
    res.render('view_entry', entry);
  });
  
});

router.get('/delete/:entry_id/', function(req, res, next){

  // FIND JOURNAL ENTRY & DELETE
  Journal.findByIdAndDelete(req.params.entry_id, function(err){
    
    // There was an error location the Entry
    if(err){
      res.redirect('/');
    }
    
    // Send to view
    res.redirect('/');
  });
  
});

router.get('/edit/:entry_id', function(req, res, next){

  // FIND JOURNAL ENTRY & DELETE
  Journal.findById(req.params.entry_id, function(err, entry){
    
    // There was an error location the Entry
    if(err){
      res.redirect('/');
    }
    
    // Send to view
    res.render('edit_entry', entry);
  });
  
});

router.post('/new', function(req, res, next){
  formData = {
    toughts_entry: req.body.toughts_entry,
    good_deeds_entry: req.body.good_deeds_entry,
    adjust_focus_entry: req.body.adjust_focus_entry,
    entry_date: todaysDate,
    complete_todo: req.body.complete_todo,
    complete_exercise: req.body.complete_exercise
  }
  
  entry = new Journal(formData);
  entry.save().then(function(result){
    
      res.redirect('/');
  });

});

router.post('/edit', function(req, res, next){

  // FIND ENTRY
  entry = Journal.findByIdAndUpdate(
      // the id of the item to find
      req.body.entry_id,
      
      // the change to be made. Mongoose will smartly combine your existing 
      // document with this change, which allows for partial updates too
      req.body,
      
      // an option that asks mongoose to return the updated version 
      // of the document instead of the pre-updated one.
      //{new: true},
      
      // the callback function
      (err, entry) => {
        // Handle any possible database errors
        if (err){
          return res.status(500).send(err);
        } 
        
        res.redirect('/view/'+entry._id);
      }
  );
  
  
});


// CONVERT DATES TO USER READABLE
function formattedDate(d = new Date) {
  let month = String(d.getMonth() + 1);
  let day = String(d.getDate());
  const year = String(d.getFullYear());

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return `${month}/${day}/${year}`;
}

module.exports = router;
