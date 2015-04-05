var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var filmShema = Schema({
  id: Number,
  name: String,
  rating: Number
});

filmShema.set('autoIndex', false);

filmShema.pre('save', function (id, next) {
	// validate id ?
	// fetch
		// if error
			// parse error
				// delete 
		// update
});

var Film = mongoose.model('Film', filmShema);


module.exports = Film;