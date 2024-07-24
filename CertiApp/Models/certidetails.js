const { Schema } = require('mongoose');
const { model } = require('mongoose');
const demo = new Schema({
    certificateid: { type: Number, required: true },
    candidatename: { type: String, required: true },
    coursename:{type:String,required:true},
    grade:{type:String,required:true},
    date:{type:String,required:true}
});


const sample = model('details', demo);
module.exports = sample;