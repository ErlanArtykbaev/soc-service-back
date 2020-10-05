const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use('/api/posts/', require('./routes/posts.routes'))

const PORT = config.get('port') || 5000

const start = async () => {
	try{
		await mongoose.connect(config.get('mongoUrl'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		})

		app.listen(5000, () => {
			console.log('server is started on server: ' + PORT)
		})
	}catch(e){
		console.log(e.message)
		process.exit(1)
	}
}

start()

