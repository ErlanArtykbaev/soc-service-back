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
	const {title, salary, stackTechnology, requirement, more} = await req.body

	const newCareer = new Career({title, salary, stackTechnology, requirement, more})
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

router.put('/:id', (req, res) => {
	Career.findOneAndUpdate(
		{id: req.param.id},
		req.body,
		{omitUndefined: false, new: true}
	)
		.then(book => res.json(book))
		.catch(err => res.status(400).json(err.message))
})

module.exports = router
