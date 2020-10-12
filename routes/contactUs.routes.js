const {Router} = require('express')
const ContactUs = require('../models/ContactUs')
const router = Router()

router.post('/create', async (req, res) => {
	const {title, message, email, phone} = await req.body

	const newContactUs = new ContactUs({title, message, email, phone})
	await newContactUs.save()

	res.status(200).json({message: 'new contact us created'})
})

router.get('/', (req, res) => {
	ContactUs.find({}, (err, result) => {
		if(err){
			res.status(400).json({message: 'cant find contact us'})
		}
		res.send(result)
	})
})
