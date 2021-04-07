const express = require('express')
const app = express()

const fs = require("fs")
const PORT = 8000

app.set('view engine', 'pug')

app.use("/static", express.static("public"))

app.use(express.urlencoded({ extended: false }))

//http://localhost:8000

app.get('/', (req, res) => {
    fs.readFile("./data/words.json", (err, data) => {
        if (err) throw err

        const words = JSON.parse(data)

        res.render('home', { words:words })
    })
})


app.post("/add", (req, res) => {
    const formData = req.body

    if (formData.todo.trim() == "") {
        fs.readFile("./data/words.json", (err, data) => {
            if (err) throw err

            const words = JSON.parse(data)

            res.render("home", { error: true, words: words })
        })
    }   else {
        fs.readFile("./data/words.json", (err, data) => {
            if (err) throw err

            const words = JSON.parse(data)

            const todo = {
                id: id(),
                description: formData.todo,
                done: false
            }

            words.push(todo)

            fs.writeFile("./data/words.json", JSON.stringify(words), (err) => {
                if (err) throw err

                fs.readFile("./data/words.json", (err, data) => {
                    if (err) throw err

                    const words = JSON.parse(data)

                    res.render("home", { success: true, words: words })
                })
            })
        })
    }
})


app.listen(PORT, (err) => {
    if (err) throw err

    console.log('This app is running on port' + PORT)
})

function id () {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
