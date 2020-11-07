import diagnosesData from '../data/diagnoses.json'
import { Diagnosis } from '../types'

const getAll = (): Diagnosis[] => {
  return diagnosesData as Diagnosis[]
}

const addData = (): null => {
  return null
}

export default { getAll, addData }
