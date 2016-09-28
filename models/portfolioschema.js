/**
 * Created by kellycarmichael on 9/10/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var portfolioSchema = new Schema({
    name:  String,
    description: String,
    github:   String,
    technologies: String,
    website: String
});

module.exports = mongoose.model("kbc-projects", portfolioSchema);