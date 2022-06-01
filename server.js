const
    express = require("express"),
    app = express(),
    jwt = require("jsonwebtoken"),
    secret = "1234"

const users = [{
    _id: "1223444",
    name: "avi",
    email: "a@a",
    pass: "1234"
}]

function createToken(id) {
    const token = jwt.sign({ _id: id }, secret, { expiresIn: "15m" })
    return token
}

function authToken(token) {
    const decode = jwt.verify(token, secret)
    const id = decode._id
    const founduser = users.find(u => u._id === id)
    return founduser
}

function login(email, pass) {
    const founduser = users.find(u => u.email === email)
    if (!founduser || founduser.pass !== pass) throw "not auth"
    const token = createToken(founduser._id)
    return token
}

function log() {
    try {
        const token = login('a@a', "1234")
        const res = authToken(token)
        console.log(token);
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

log()

app.listen(3210, () => console.log("server is up"))