require('dotenv').config()

const data = require('./data.json')
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())

app.use((req, res, next)=> {
    const apiToken = process.env.API_TOKEN
    const authToken = req.get('Authorization')

    if (!authToken || apiToken !== authToken.split(' ')[1]){
        return res.status(401).json({ error: 'Unauthorized request'})
    }

    next()
    
})

// GET /movie
app.get('/movie', (req, res, next)=> {
    const { genre, country, avg_vote } = req.query
    let response = data

    console.log(response)

    if (genre){
        response = data.filter((movie)=> movie.genre.includes(genre))
    }

    if (country){
        response = data.filter((movie)=> movie.country.includes(country))
    }

    if (avg_vote){
        response = data.filter((movie)=> movie.avg_vote >= +avg_vote)
    }

    res.json(response)
    
})


const PORT = 8000

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
