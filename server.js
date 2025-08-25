const http = require("http")

const server = http.createServer(function (request, response) {
  if (request.url === "/") {
    response.writeHead(200, { "Content-Type": "text/plain" })
    response.write("Welcome to my server!")
    response.end()
  }

  if (request.url === "/about") {
    response.writeHead(200, { "Content-Type": "text/plain" })
    response.write("This is about page")
    response.end()
  }

  if (request.url === "/contact") {
    response.writeHead(200, { "Content-Type": "text/plain" })
    response.write("I am Zinger")
    response.end()
  }
})

const port = 3000
server.listen(port, function () {
  console.log(`Node server created at port ${port}`)
})
