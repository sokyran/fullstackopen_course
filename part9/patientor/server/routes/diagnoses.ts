import { Router } from 'express'
import diagnosisService from '../services/diagnoses'
import bodyParser from 'body-parser'

const router = Router()
router.use(bodyParser.json())
router.get('/', (_req, res) => {
  res.json(diagnosisService.getAll())
})

router.post('/', (_req, res) => {
  res.send('added something')
})

export default router
