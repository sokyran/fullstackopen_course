export interface Diagnosis {
  code: string
  name: string
  latin?: string
}

export interface Patient {
  id: string
  name: string
  dateOfBirth: string
  gender: Gender
  occupation: string
  ssn: string
}

enum Gender {
  male = 'male',
  female = 'female',
  other = 'other',
}

export type newPatient = Omit<Patient, 'id'>
export type privatePatient = Omit<Patient, 'ssn'>
