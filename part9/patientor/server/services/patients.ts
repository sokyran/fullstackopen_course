import patientsData from '../data/patients.json'
import { privatePatient, Patient, newPatient } from '../types'

const savedPatients: Patient[] = [...patientsData]

const getAll = (): privatePatient[] => {
  return savedPatients.map(
    ({ id, name, dateOfBirth, gender, occupation, ssn }) => {
      return { id, name, dateOfBirth, gender, occupation, ssn }
    }
  )
}

const addData = (patient: newPatient): Patient => {
  const id: string = Math.random().toString(36)
  console.log(patient)
  const newPatient: Patient = {
    id,
    ...patient,
  }
  patientsData.push(newPatient)
  return newPatient
}

export default { getAll, addData }
