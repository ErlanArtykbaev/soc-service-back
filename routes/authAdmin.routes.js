const {Router} = require('express')
const {validationResult, check} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const Admin = require('../models/Admin')
const router = Router()


router.post(
	'/register', 
	[
		check('username', 'Введите коректные данные').exists(),
		check('password', 'введите пароль').exists()
	],
	async (req, res) => {
		const errors = validationResult(req)

		if(!errors.isEmpty()){
			return res.status(400).json({
				errors: errors.array(),
				message: 'некоректные данные'
			})
		}
	try{

		const {username, password} = req.body
		const admin = await Admin.findOne({username})

		if(admin){
			return res.status(400).json({
				message: 'Пользователь уже существует'
			})
		}

		const hashedPassword = await bcrypt.hash(password, 12)

		const newAdmin = new Admin({username, password: hashedPassword})
		await newAdmin.save()

		res.status(201).json({message: 'админ создан'})

	}catch(e){
		res.status(500).json({message: 'что то пошло не так'})
		console.log(e.message)
	}
})

router.post(
	'/login', 
	[
		check('username', 'Введите коректные данные').exists(),
		check('password', 'введите пароль').exists()
	],
	async (req, res) => {
	try{
		const errors = validationResult(req)

		if(!errors.isEmpty()){
			return res.status(400).json({
				errors: errors.array(),
				message: 'Некоректные данные при входе'
			})
		}

		const {username, password} = req.body
		const admin = await Admin.findOne({username})

		if(!admin){
			return res.status(400).json({
				message: 'Пользователь не найден'
			})
		}

		const isMatch = await bcrypt.compare(password, admin.password)

		if(!isMatch){
			return res.status(400).json({
				message: 'Неверный пароль'
			})
		}

		const token = jwt.sign(
			{ adminName: admin.username },
			config.get('jwtSecret'),
			{ expiresIn: '1h' }
		)

		res.json({ token, username: admin.username })

	}catch(e){
		res.status(500).json({message: 'что то пошло не так'})
		console.log(e.message)
	}
})

module.exports = router
