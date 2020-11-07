import { Router, Request, Response } from 'express'
import bodyParser from 'body-parser'
import patientsService from '../services/patients'
import { newPatient } from '../types'

const router = Router()
router.use(bodyParser.json())
router.get('/', (_req, res) => {
  res.json(patientsService.getAll())
})

router.post(
  '/',
  (req: Request<unknown, unknown, newPatient>, res: Response) => {
    console.log(req.body)
    const { name, occupation, gender, dateOfBirth, ssn } = req.body
    const addedPatient = patientsService.addData({
      name,
      dateOfBirth,
      gender,
      occupation,
      ssn,
    })
    res.json(addedPatient)
  }
)

export default router
