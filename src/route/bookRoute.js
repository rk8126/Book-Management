const express = require('express')
const router = express.Router()
const bookController = require('../controller/bookController')

router.post('/', bookController.addBook)
router.get('/list', bookController.getAllBooks)
router.get('/', bookController.getBookById)
router.put('/', bookController.updateBook)
router.delete('/', bookController.deleteBook)

module.exports = router