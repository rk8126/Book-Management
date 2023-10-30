const bookService = require('../service/bookService')
const { checkValidString, isValidObjectId } = require('../util/validator')

exports.addBook = async function (req, res) {
    const activity = "Add Book"
    try {
        const {title, author, summary} = req.body || {}
        if(!title || !checkValidString(title)){
            console.log(`${activity} | title is mandatory and must be a valid string`)
            return res.status(400).send({status: false, code: 400, message:"title is mandatory and must be a valid string"})
        }
        if(!author || !checkValidString(author)){
            console.log(`${activity} | author is mandatory and must be a valid string`)
            return res.status(400).send({status: false, code: 400, message:"author is mandatory and must be a valid string"})
        }
        if(!summary || !checkValidString(summary)){
            console.log(`${activity} | summary is mandatory and must be a valid string`)
            return res.status(400).send({status: false, code: 400, message:"summary is mandatory and must be a valid string"})
        }
        const { status, message, code, data } = await bookService.addBook(req.body)
        return res.status(code || 200).send({ status, ...(message && { message }), ...(data && { data }) })
    } catch (error) {
        console.log(`${activity} | Error while adding book`, error?.message, { error })
        return res.status(500).send({ status: false, message: `Error while adding book : ${error?.message}` })
    }
}

exports.getAllBooks = async function (req, res) {
    const activity = "Fetch All Books"
    try {
        const { status, message, code, data } = await bookService.getAllBooks()
        return res.status(code || 200).send({ status, ...(message && { message }), ...(data && { data }) })
    } catch (error) {
        console.log(`${activity} | Error while fetching all books`, error?.message, { error })
        return res.status(500).send({ status: false, message: `Error while fetching all books : ${error?.message}` })
    }
}

exports.getBookById = async function (req, res) {
    const activity = "Fetch Book details"
    try {
        const {bookId} = req.query || {}
        if(!bookId || !isValidObjectId(bookId)){
            console.log(`${activity} | bookId is mandatory and must be a valid object id`)
            return res.status(400).send({status: false, code: 400, message:"bookId is mandatory and must be a valid object id"})
        }
        const { status, message, code, data } = await bookService.getBookById(bookId)
        return res.status(code || 200).send({ status, ...(message && { message }), ...(data && { data }) })
    } catch (error) {
        console.log(`${activity} | Error while fetching book details`, error?.message, { error })
        return res.status(500).send({ status: false, message: `Error while fetching book details : ${error?.message}` })
    }
}

exports.updateBook = async function (req, res) {
    const activity = "Update Book"
    try {
        const {bookId, title, author, summary} = req.body || {}
        if(!bookId || !isValidObjectId(bookId)){
            console.log(`${activity} | bookId is mandatory and must be a valid object id`)
            return res.status(400).send({status: false, code: 400, message:"bookId is mandatory must be a valid object id"})
        }
        if(title && !checkValidString(title)){
            console.log(`${activity} | title must be a valid string`)
            return res.status(400).send({status: false, code: 400, message:"title must be a valid string"})
        }
        if(author && !checkValidString(author)){
            console.log(`${activity} | author must be a valid string`)
            return res.status(400).send({status: false, code: 400, message:"author must be a valid string"})
        }
        if(summary && !checkValidString(summary)){
            console.log(`${activity} | summary must be a valid string`)
            return res.status(400).send({status: false, code: 400, message:"summary must be a valid string"})
        }
        const { status, message, code, data } = await bookService.updateBook(req.body)
        return res.status(code || 200).send({ status, ...(message && { message }), ...(data && { data }) })
    } catch (error) {
        console.log(`${activity} | Error while updating book`, error?.message, { error })
        return res.status(500).send({ status: false, message: `Error while updating book : ${error?.message}` })
    }
}

exports.deleteBook = async function (req, res) {
    const activity = "Delete Book"
    try {
        const {bookId} = req.body || {}
        if(!bookId || !isValidObjectId(bookId)){
            console.log(`${activity} | bookId is mandatory and must be a valid object id`)
            return res.status(400).send({status: false, message:"bookId is mandatory and must be a valid object id"})
        }
        const { status, message, code, data } = await bookService.deleteBook(bookId)
        return res.status(code || 200).send({ status, ...(message && { message }), ...(data && { data }) })
    } catch (error) {
        console.log(`${activity} | Error while deleting book`, error?.message, { error })
        return res.status(500).send({ status: false, message: `Error while deleting book : ${error?.message}` })
    }
}