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

app.get("/:id/delete", (req, res) => {
    const id = req.params.id

    fs.readFile("./data/words.json", (err, data) => {
        if (err) throw err

        const words = JSON.parse(data)

        const filteredWords = todos.filter(todo => todo.id != id)

        fs.writeFile("./data/words.json", JSON.stringify(filteredWords), (err) => {
            if (err) throw err
            res.render("home", { words: filteredWords, deleted: true })
        })
    })
})


app.get("/:id/update", (req, res) => {
    const id = req.params.id

    fs.readFile("./data/words.json", (err, data) => {
        if (err) throw err

        const words = JSON.parse(data)
        const todo = words.filter(todo => todo.id == id)[0]

        const todoIdx = words.indexOf(todo)
        const splicedTodo = words.splice(todoIdx, 1)[0]
        
        splicedTodo.done = true

        words.push(splicedTodo)

        fs.writeFile("./data/words.json", JSON.stringify(words), (err) => {
            if (err) throw err

            res.render("home", { words: words })
        })
    }) 
})


app.listen(PORT, (err) => {
    if (err) throw err

    console.log('This app is running on port' + PORT)
})

function id () {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
