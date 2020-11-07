import express from 'express'
import diagnosesRouter from './routes/diagnoses'
import patientsRouter from './routes/patients'

const app = express()

app.get('/api/ping', (_req, res) => {
  res.send('pong')
})

app.use('/api/diagnoses', diagnosesRouter)
app.use('/api/patients', patientsRouter)

const PORT = 3001

app.listen(PORT, () => {
  console.log('started listening on port ', PORT)
})
