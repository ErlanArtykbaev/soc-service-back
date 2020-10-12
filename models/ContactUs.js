const {Schema, model} = require('mongoose')

const schema = new Schema({
	title:{
		type: String,
		required: false
	},
	message:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true
	},
	phone:{
		type: String,
		required: true
	}
})

module.exports = model('ContactUs', schema)
