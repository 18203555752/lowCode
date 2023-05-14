export const compareResetValue = (value: number, upperLimit: number, lowLimit: number): number => {
  if (value < lowLimit) {
    return lowLimit
  } else if (upperLimit && Number(upperLimit) && value > upperLimit) {
    return upperLimit
  } else {
    return value
  }
}
