const {Router} = require('express')
const Career = require('../models/Career')

const router = Router()

// api/careers/
router.get('/', (req, res) => {
	Career.find({}, (err, result) => {
		if(err){
			res.status(400).json({message: "cant find career"})
		}
		res.send(result)
	})
})

// api/careers/create/
router.post('/create', async (req, res) => {
	const {title, salary, stackTechnology, requirement, more} = await res.body

	const newCareer = new Career({title, salary,stackTechnology, requirement, more})
	await newCareer.save()

	res.status(200).json({message: 'career created'})
})

router.delete('/:career_id', (req, res) => {
	Career.remove({_id: req.param.career_id}, (err) => {
		if(err){
			res.status(400).json({message: "in delete something got wrong"})
		}
		res.json({message: "career is deleted"})
	})
})

module.exports = router
