const {Router} = require('express')
const Post = require('../models/Post')
const router = Router()

router.get('/', async (req, res) => {
	Post.find({}, (err, result) => {
		if(err){
			res.status(400).json({message: 'cant find '})
		}
		res.send(result)
	})
})

router.post('/create', async (req, res) => {
	const {title, subtitle, description} = await req.body
	
	const newPost = new Post({title, subtitle, description})
	await newPost.save()

	res.status(200).json({message: 'post created'})
})

module.exports = router
