const bookModel = require('../models/bookModel')

exports.addBook = async function (body) {
    const {title, author, summary} = body || {}
    const existingBook = await bookModel.findOne({title}).lean()
    if(existingBook && !existingBook.isDeleted){
        return {status: false, code: 400, message: "Book already exist with this title"}
    }
    const book = await bookModel.create({title, author, summary})
    return { status: true, code: 200, data: book }
}

exports.getAllBooks = async function () {
    const books = await bookModel.find({isDeleted: false}).lean()
    if(!books.length){
        return {status: false, code: 400, message: "No book exist"}
    }
    return { status: true, code: 200, data: books }
}

exports.getBookById = async function (bookId) {
    const book = await bookModel.findById(bookId)
    if(!book || book.isDeleted){
        return {status: false, code: 404, message: "Book not found"}
    }
    return { status: true, code: 200, data: book }
}

exports.updateBook = async function (body) {
    const {bookId, title, author, summary} = body || {}
    const updateData = {
        ...(title && {title}),
        ...(author && {author}),
        ...(summary && {summary})
    }
    if(!Object.keys(updateData).length){
        return {status: false, code: 400, message: "No data found to update the book"}
    }
    if(title){
        const existingBook = await bookModel.findOne({title, _id: {$ne: bookId}}).lean()
        if(existingBook && !existingBook.isDeleted){
            return {status: false, code: 400, message: "Book already exist with this title"}
        }
    }
    const book = await bookModel.findOneAndUpdate({_id: bookId, isDeleted: false}, updateData, {new: true})
    if(!book){
        return {status: false, code: 404, message: "Book not found"}
    }
    return { status: true, code: 200, data: book }
}

exports.deleteBook = async function (bookId) {
    const book = await bookModel.findOneAndUpdate({_id: bookId, isDeleted: false}, {isDeleted: true})
    if(!book){
        return {status: false, code: 404, message: "Book not found"}
    }
    return { status: true, code: 200, message: "Book deleted successfully" }
}