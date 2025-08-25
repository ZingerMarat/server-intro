const http = require("http")

// const server = http.createServer(function (request, response) {
//   if (request.url === "/") {
//     response.writeHead(200, { "Content-Type": "text/plain" })
//     response.write("Welcome to my server!")
//     response.end()
//   }

//   if (request.url === "/about") {
//     response.writeHead(200, { "Content-Type": "text/plain" })
//     response.write("This is about page")
//     response.end()
//   }

//   if (request.url === "/contact") {
//     response.writeHead(200, { "Content-Type": "text/plain" })
//     response.write("I am Zinger")
//     response.end()
//   }
// })

let users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
]

const server = http.createServer(async function (request, response) {
  response.writeHead(200, { "Content-Type": "application/json" })
  if (request.method === "GET") {
    if (request.url === "/api/users") {
      response.write(JSON.stringify(users))
    }

    if (request.url.startsWith("/api/users/")) {
      const id = parseInt(request.url.split("/")[3], 10)
      const user = users.find((u) => u.id === id)

      if (user) {
        response.write(JSON.stringify(user))
      } else {
        response.statusCode = 404
        response.write(JSON.stringify({ error: "User not found" }))
      }
    }
  } else if (request.method === "POST") {
    if (request.url === "/api/users") {
      const newUser = await readBody(request)

      if (newUser && newUser.name) {
        newUser.id = users[users.length - 1].id + 1
        users.push(newUser)
        response.write(JSON.stringify(newUser))
      } else {
        response.statusCode = 400
        response.write("Bad request")
      }
    }
  } else {
    response.statusCode = 404
    response.write("Not found")
  }

  response.end()
})

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = []
    req
      .on("data", (chunk) => {
        body.push(chunk)
      })
      .on("end", () => {
        body = Buffer.concat(body).toString()
        resolve(JSON.parse(body))
      })
  })
}

const port = 3000
server.listen(port, function () {
  console.log(`Node server created at port ${port}`)
})
