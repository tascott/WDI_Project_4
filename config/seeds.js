var seeder = require('mongoose-seed');

// Connect to MongoDB via Mongoose 
seeder.connect(process.env.MONGODB_URI || 'mongodb://localhost/myMoments', function() {
 seeder.loadModels(['./models/comment.js', './models/user.js', './models/event.js']);
 seeder.clearModels(['comment', 'user', 'event'], function() {
   seeder.populateModels(data);
 });
});

var data = [
{
 // 'model': 'User',
 // 'documents': [
 //     {
 //       name: "Bob",
 //       email: "bob@bob.com",
 //       password: "bob"
 //     }
 //   ]
 }
 ]