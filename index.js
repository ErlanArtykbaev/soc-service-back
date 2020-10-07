const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

//PORT from config
const PORT = config.get('port') || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api/posts', require('./routes/posts.routes'))
app.use('/api/admin', require('./routes/authAdmin.routes'))

//starting the backend function
const start = async () => {
	try{
		await mongoose.connect(config.get('mongoUrl'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		})

		app.listen(PORT, () => {
			console.log('server is started on server: ' + PORT)
		})
	}catch(e){
		console.log(e.message)
		process.exit(1)
	}
}

start()

