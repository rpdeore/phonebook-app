var express = require('express');
var app = express();
app.set('view engine','ejs');
app.use(express.static('./public'));

var mongojs = require('mongojs');
var db = mongojs('grouplist',['grouplist']);
//var db1 = mongojs('grouplist',['grouplist']);

var bodyParser = require('body-parser');
app.use(bodyParser.json());

  app.get('/', function(req,res){
   db.grouplist.find(function(err,docs){
      //console.log(docs);
      res.render('index',{grouplist:docs});

    });
  });

  app.post('/', function (req, res) {
  db.grouplist.update({groupname:req.body.groupname},{$push:{contacts:req.body}}, function(err, doc) {
     res.json(doc);
   });
 });

 app.post('/group', function (req, res) {
   db.grouplist.insert(req.body, function(err, doc) {
     db.grouplist.update({groupname:req.body.groupname},{$push:{contacts:null}}, function(err, doc) {
        res.json(doc);
        });
    });
});

app.delete('/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.grouplist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});
//
   app.delete('/:id/:contactname', function (req, res) {
   var id = req.params.id;
   var contactname = req.params.contactname;
    var ObjectId = new db.ObjectId(id);
    console.log(ObjectId)
    db.grouplist.find({"_id": ObjectId},function(err,doc) {
     var contacts = doc[0].contacts;
     for(var i=0;i<contacts.length;i++)
     {
       if(contacts[i].contactname == contactname)
       {
        var unset ={};
        unset['$unset'] ={};
        unset.$unset['contacts.' +i]= 1;
        // unset.$unset['contacts.' +i]= 1;
        // unset.$unset['contacts.' +i+ '.groupname']= 1;
        db.grouplist.update({_id:ObjectId}, unset);

        var pull ={};
        pull['$pull'] ={};
        pull.$pull['contacts']= null;
        db.grouplist.update({_id:ObjectId}, pull);
       }
     }
     res.json(doc);
   });

 });

app.listen(3000);
console.log("you are listening to 3000");
