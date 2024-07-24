const express = require('express');

const {mongoose}=require('mongoose')

mongoose.connect('mongodb://localhost:27017/blog')

const sample=require('./model/blogdetails.js')

const app = express();

const path= require('path');

require('dotenv').config()

const PORT = process.env.PORT || 4000

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

const blogPosts = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'blog.html'))
})

app.get('/submitted', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'submit.html'))
})

app.get('/view', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'viewblog.html'))
})

app.get('/viewallblogs', (req, res) => {
    res.send(blogPosts)
})

app.post('/blog', (req,res) => {
    const {blogid, title, author, content } = req.body;
    //console.log(req.body);
    const newPost = {blogid, title, author, content };
    //blogPosts.push(newPost);
    sample.create(newPost)
    
    //console.log(blogPosts);
    res.redirect('/submitted');
})

app.get('/blog/:id', async (req,res) => {
    const id = req.params.id;
    //const blogs = blogPosts.find((blog) => blog.BlogID == id);
    try{
    const blogs= await sample.findOne({blogid:id})
    if (!blogs) {
      return res.status(404).send("Blog not found");
    }
    //res.json(blogs);
    res.sendFile(path.join(__dirname, 'public', 'viewblog.html'));
}catch(error){
    res.status(500).send(error);
}
})

app.get('/api/blog/:id', async (req,res) => {
    const id = req.params.id;
   // const blogs = blogPosts.find(blog => blog.BlogID == id);
   try{
   const blogs=await sample.findOne({blogid:id})
    if (!blogs) {
        return res.status(404).json({ error: 'Blog not found' });
    }
    //console.log(blogs);
    res.json(blogs);
}catch(error){
    res.status(500).json({ error: error.message });
}
})

app.listen(PORT , ()=>{
    console.log(`The Application is running on port ${PORT}`)
} )

const database=mongoose.connection
database.on("error",(error)=>{
    console.log(error)
})
database.once("connected",()=>{
    console.log("Database Connected")
})