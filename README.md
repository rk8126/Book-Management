# Book-Management

# API Endpoints
GET /book/list : Get a list of all books.
GET /book : Get details of a specific book by ID (requires bookId in the request query params).
POST /book : Add a new book (requires title, author, and summary in the request body).
PUT /book : Update details of a specific book by ID (requires bookId in the request body).
DELETE /book : Delete a book by ID (requires bookId in the request body).

### Models
- Book Model
```yaml
{
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        trim: true,
        required: true,
    },
    summary: {
        type: String,
        trim: true,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}
```

# To add a new book:
POST http://localhost:3000/book
Body:
{
    "title": "Sample Book",
    "author": "John Doe",
    "summary": "This is a sample book."
}

# To fetch all book:
GET http://localhost:3000/book/list

# To fetch book details:
GET http://localhost:3000/book
query params:
{
    "bookId": ""
}

# To update a book:
PUT http://localhost:3000/book
Body:
{
    "bookId": "",
    "title": "Sample Book",
    "author": "John Doe",
    "summary": "This is a sample book."
}

# To delete a book:
DELETE http://localhost:3000/book
Body:
{
    "bookId": ""
}

# Instructions to set up and run the application locally
1. clone the repository via https://github.com/rk8126/Book-Management.git
2. Go to inside the directory and install all dependencies with "npm i" command
3. run command "npm start" to start locally