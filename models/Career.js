const {Schema, model} = require('mongoose')

const schema = new Schema({
	title:{
		type: String,
		required: true
	},
	salary:{
		type: String,
		required: true
	},
	stackTechnology:{
		type: String,
		required: true
	},
	requirement:{
		type: String,
		required: true
	},
	more:{
		type: String,
		required: false
	}
})

module.exports = model('Career', schema)
