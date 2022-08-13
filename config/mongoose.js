const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/contacts_list_db');

//acquire the conecction(to check if it's successful)
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to db'));

db.once('open', function(){
    console.log('Succesfully connected to the database')
});