/**
 * Created by kellycarmichael on 9/27/16.
 */
/**
 * Created by kellycarmichael on 7/28/16.
 */
var express = require ('express');
var mongoose = require('mongoose');
var router = express.Router ();
var portfolioModel = require('../models/portfolioschema');
var db = mongoose.connection;
var mongodb = require('mongodb');

router.route ('/create')

    .post (function (req, res) {
        var portfolio = new portfolioModel ();
        portfolio.name = req.body.name;
        portfolio.description = req.body.description;
        portfolio.github = req.body.github;

        portfolio.save (function (err, result) {
            if (err) {
                res.statusCode(500).json ({message: 'Account could not be saved.'});
                return;
            }
            res.json ({message: 'Account successfully created.'});
        })
    });

router.route ('/all')
    .get (function (req, res) {
        portfolioModel.find(function (err, results) {
            if (err) {
                res.json ({message: 'Error getting all the wagons'});
                return;
            }
            res.json ({message: 'Here are all the wagons', portfolioItems: results});
        });
    });

//Exporting router

module.exports = router;