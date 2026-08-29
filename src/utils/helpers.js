export const truncate = (str, length = 100) => {
  if (str.length <= length) return str
  return str.substring(0, length) + '...'
}

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}