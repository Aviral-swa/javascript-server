## Description
An Express app written in TypeScript that Uses mongoose/mongoDB as Database and creates users after authentication then performs CRUD operations using various technological operations like pagination, sorting, search etc.

All files strictly follows all the major development conventions and uses a strict linting policy.

This project performs 6 major operations on different routes. Using __/api__ as basePath.

* __/user/login__ (Post)
* __/user/me__ (Get)
* __/trainee__ (Get, Post, Put)
* __/trainee/:id__ (Delete)

Every route uses some validation on user inputs and JWT(Json Web Token) Authentication except __/user/login__.

This project also implements and keeps track of all the versions of documents using a versionable repository.

## Technologies Used
* Nodejs
* Exress
* Mongoose/MongoDB
* Swagger

**Some server side tools to fetch the documents from the Database based on a query like:**
* Pagination using skip and limit.
* Sorting.
* Searching.
## Testing
This project's functionality and optimizations are tested by myself @Aviral-swa  on a personal level.

