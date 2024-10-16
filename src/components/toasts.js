import toast from 'react-hot-toast'

const showSuccessMessage = (message) => {
  return toast.success(message)
}
const showErrorMessage = (message) => {
  return toast.error(message)
}

export { showErrorMessage, showSuccessMessage }
