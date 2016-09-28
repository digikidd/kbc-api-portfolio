/**
 * Created by kellycarmichael on 9/27/16.
 */

var express = require ('express');
var mongoose = require('mongoose');
var router = express.Router ();
var portfolioModel = require('../models/portfolioschema');
var db = mongoose.connection;
var mongodb = require('mongodb');


//Route to get items from db//
router.route ('/create')

    .post (function (req, res) {
        var portfolio = new portfolioModel ();
        portfolio.name = req.body.name;
        portfolio.description = req.body.description;
        portfolio.github = req.body.github;
        portfolio.technologies = req.body.technologies;
        portfolio.website = req.body.website;

        portfolio.save (function (err, result) {
            if (err) {
                res.statusCode(500).json ({message: 'Portfolio item could not be saved.'});
                return;
            }
            res.json ({message: 'Portfolio item successfully added.'});
        })
    });

router.route ('/all')
    .get (function (req, res) {
        portfolioModel.find(function (err, results) {
            if (err) {
                res.json ({message: 'There was an error retrieving portfolio items.'});
                return;
            }
            res.json ({message: 'Here are all the portfolio items!', portfolioItems: results});
        });
    });

//Exporting router
module.exports = router;