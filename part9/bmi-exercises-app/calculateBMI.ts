interface MultiplyValues {
  value1: number
  value2: number
}

interface bmiResult {
  height: number
  weight: number
  bmi: string
}

const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

export const calculateBmi = (height: number, weight: number): bmiResult => {
  const res = weight / ((height / 100) * (height / 100))
  let verdict = ''
  if (res < 25) verdict = 'Normal weight'
  if (res >= 25 && res < 30) verdict = 'Overweight'
  if (res >= 30) verdict = 'Obese'
  return {
    height,
    weight,
    bmi: verdict,
  }
}
