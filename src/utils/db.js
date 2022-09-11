const mongoose = require('mongoose')


// connect to database here
function connect() {

  const uri = `${process.env.URI}`;
  try {
    mongoose.connect('mongodb+srv://jyvenspierre:yvenstij43gt@cluster0.sjcbu.mongodb.net/rentlify?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = connect;