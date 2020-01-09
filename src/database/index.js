const mongoose = require('mongoose')
const uri = 'mongodb+srv://brenojacubovski@gmail.com:brn170988!@cluster0-41wah.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(uri,{ useUnifiedTopology: true, useNewUrlParser: true }, (err) =>{
    if (err) throw new this.Error(err)
    console.log('Connected success!')
});
mongoose.Promise = global.Promise;

module.exports = mongoose;