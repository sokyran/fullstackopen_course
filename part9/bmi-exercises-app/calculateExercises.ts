interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const parseListArguments = (allArgs: string[]): number[] => {
  const args = allArgs.slice(2)
  if (args.length < 2) throw new Error('Not enough arguments provided!')
  return args.map((arg) => {
    if (!isNaN(Number(arg))) {
      return Number(arg)
    }
    throw new Error('Provided values were not numbers!')
  })
}

export const calculateExercises = (listArgs: any[]): Result => {
  const args = listArgs.map((arg) => {
    if (!isNaN(Number(arg))) {
      return Number(arg)
    } else {
      throw new Error('Provided values were not numbers!')
    }
  })

  const target = args.pop()!
  const days = args

  const periodLength = days.length
  const trainingDays = days.filter((day) => day !== 0).length
  const average = days.reduce((sum, day) => sum + day, 0) / days.length
  const success = target >= average
  const ratingDescription = 'not too bad but could be better'
  const rating = 1

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}
