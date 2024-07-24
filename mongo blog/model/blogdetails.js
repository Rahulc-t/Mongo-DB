const{Schema}=require('mongoose')
const{model}=require('mongoose')
const demo=new Schema({
    blogid:{type:String,required:true},
    title:{type:String,required:true},
    author:{type:String,required:true},
    content:{type:String,required:true}
})

const sample=model('blogDetails',demo)
module.exports=sample