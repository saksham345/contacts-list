const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded())
app.use(express.static('assets'));  //middleware
var contactList = [
    {
        name: 'saksham kumar',
        phone: '1234567890'
    },
    {
        name: 'AP Dhillon',
        phone : '0987654321' 
    },
    {
        name: 'Gurinder Gill',
        phone : '9878987890'
    },
    {
        name: 'Shinda Khalon',
        phone: '1232145654'
    }
]

app.get('/', function(req, res)
{
    Contact.find({/* query to find contact*/}, function(err, contacts)
    {
        if(err){
            console.log('Error in fetching contacts from DB')
                
            }
    return res.render('home', {  
        title: "This is home",
        contact_list : contacts });
    });
});

app.get('/practice', function(req, res)
{
    return res.render('practice.ejs');

});
app.post('/create_contact', function(req, res)
{
    // contactList.push(req.body);
    Contact.create({
        name:req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err) {console.log('Error in creating contact!'); 
        return;}
        console.log('#########',newContact);
        return res.redirect('back');
    });
    // return res.redirect('back');
});

app.get('/delete_contact', function(req, res)
{
    // console.log(req.query);
    // let phone = req.query.phone;

    // let contindex = contactList.findIndex(contact => contact.phone == phone);
    // if(contindex != -1){
    // contactList.splice(contindex, 1);
    // }
    // return res.redirect('back');

    let id = req.query.id;
    Contact.findByIdAndDelete(id, function(err)
    {
        if(err)  {console.log('Error in deleting');
        return;}
    });
    return res.redirect('back');

});
app.listen(port, function(err)
{
    if(err)
    {
        console.log('error');
        return;
    }
    else
    console.log('port is running: ', port);
});