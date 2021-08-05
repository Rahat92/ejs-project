const express = require("express");
const bodyParser = require("body-parser");
const _ = require('lodash');
const app = express();
let posts = [];
const homeStartingContent = "THIS IS HOME PAGE";
const aboutContent = "THIS IS ABOUT PAGE";
const contactContent = "THIS IS CONTACT PAGE";
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public/bootstrap"));
app.use(express.static("public/css"));
app.set("view engine","ejs");
let requestedTitle = "";
app.get("/",function(req,res){
	res.render("home",{startingContent:homeStartingContent,posts:posts});
})

app.get("/about",function(req,res){
	res.render("about",{aboutContent:aboutContent});
})

app.get("/contact",function(req,res){
	res.render("contact",{contactContent:contactContent});
})

app.get("/compose",function(req,res){
	res.render("compose");
})

app.post("/compose",function(req,res){
	const post = {
		title:req.body.postTitle,
		content:req.body.postBody,
		name:req.body.name
	};
	posts.push(post);
	if(post.content.length>0&&post.title.length>0){
		res.redirect("/");
	}else{
		res.redirect("/compose");
	}
	
});

app.get("/posts/:postName",function(req,res){
	requestedTitle = _.lowerCase(req.params.postName);
	posts.forEach(function(post){
		const storedTitle = _.lowerCase(post.title);
		if(storedTitle === requestedTitle){
			
			res.render("post",{title:post.title,content:post.content,postedBy:post.name})
		}
		

	});
});
app.listen(3000,function(){
	console.log("Server is running on port 3000");
})