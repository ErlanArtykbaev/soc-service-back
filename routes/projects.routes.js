const {Router} = require('express')
const Project = require('../models/Project')
const router = Router()

// /api/projects/
router.get('/', (req, res) => {
	Project.find({}, (err, result) => {
		if(err){
			res.status(400).json({message: 'cant find '})
		}
		res.send(result)
	})
})

// /api/projects/create
router.post('/create', async (req, res) => {
	const {title} = await req.body
	
	const newProject = new Project({title})
	await newProject.save()

	res.status(200).json({message: 'project created'})
})

module.exports = router
