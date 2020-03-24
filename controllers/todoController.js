var bodyParser=require('body-parser');
var mongoose=require('mongoose');

//conect to mongo
mongoose.connect( 'mongodb+srv://test:test@cluster0-yt9k0.mongodb.net/test?retryWrites=true&w=majority');


// creat a schema
var todoSchema=new mongoose.Schema({
item:String
});

//creat a model

var Todo=mongoose.model('Todo',todoSchema );

// var itemOne=Todo({item:'go to your home'}).save(function(err){
// if(err) throw err;
// console.log('item has been save');
// });


//var data=[{item:'get milk'},{item:'I LOVE MY HUSBAND'},{item:'kick some coding ass'}];

var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports=function(app){

    app.get('/todo',function(req,res){
        //get data from mongodb and pass it to view
        Todo.find({},function(err,data){
            if(err) throw err;
            res.render('todo',{todos:data});  
        });
    });

    app.post('/todo',urlencodedParser,function(req,res){
        //get data from the view and add it to mongodb
        var newTodo=Todo(req.body).save(function(err,data){
            if(err) throw err;
            res.json(data);
             });

    });

    app.delete('/todo/:item',function(req,res){
        //deleted the requested item from mongodb
        Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
            if(err) throw err;
            res.json(data);
        });
        // data=data.filter(function (todo){
        //     return todo.item.replace(/ /g,'-')!==req.params.item;
        // });
        // res.json(data);

    });

};