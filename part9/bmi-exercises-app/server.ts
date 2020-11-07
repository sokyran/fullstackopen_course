import express from 'express'
import bodyParser from 'body-parser'
import { calculateBmi } from './calculateBMI'
import { calculateExercises } from './calculateExercises'

const app = express()
app.use(bodyParser.json())

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight)
  const height = Number(req.query.height)
  if (isNaN(weight) || isNaN(height)) {
    return res.send('malformed args')
  }
  const bmi = calculateBmi(height, weight)
  return res.json(bmi)
})

app.post('/exercises', (req, res) => {
  const dailyExercises = req.body.daily_exercises
  const target = req.body.target
  if (dailyExercises && target) {
    try {
      const result = calculateExercises(dailyExercises.concat(target))
      return res.json(result)
    } catch (error) {
      return res.json({ error: 'malformed parametres' })
    }
  }
  return res.json({ error: 'parametres missing' })
})

app.get('/', async (_req, res) => {
  res.send('hello fullstack')
})

const PORT = 3003

app.listen(PORT, () => {
  console.log('started listening')
})
