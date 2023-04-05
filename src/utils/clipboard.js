const clipboard = navigator.clipboard

export const copyText = (value) => {
  return clipboard.writeText(value)
}