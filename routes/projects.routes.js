const {Router} = require('express')
const Project = require('../models/Project')
const router = Router()

// /api/posts/
router.get('/', async (req, res) => {
	Project.find({}, (err, result) => {
		if(err){
			res.status(400).json({message: 'cant find '})
		}
		res.send(result)
	})
})

// /api/posts/create
router.post('/create', async (req, res) => {
	const {title, subtitle, description} = await req.body
	
	const newProject = new Project({title, subtitle, description})
	await newProject.save()

	res.status(200).json({message: 'project created'})
})

module.exports = router
