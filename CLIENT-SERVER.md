# How Servers handle requests

![](https://zentut.com//wp-content/uploads/2012/10/HTTP-Model.png)

When you click on a webpage, submit a form or run a search, web browsers send a request to the server. This request can include:
   * A URL cantaning  the target server

   * A method that defines a particular action knwon as Request Methods
        -GET: To get a particular resource like information about lists of products.
        
        -POST: To create a new resource like a new article on wiki

        -Head: TO get only the metadata about a resource unlike GET which will fetch data in Body too.

        -PUT: TO Update an existing resource.

        -DELETE: Delete the specified resource.

   *  The server receives the request and processes it. It handles each request individually, although it may process many requests Each  request is broken down into a series of steps that together make up the request-handling process.
   
   * The server generates a  response that includes the HTTP protocol version, HTTP status code, and a reason phrase separated by spaces.
