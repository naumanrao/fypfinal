/* eslint-disable */

// import { showErrorMessage, showSuccessMessage } from '../components/Toast'
import { showErrorMessage, showSuccessMessage } from '../components/toasts'
import { apiClient, config, multiPartConfig } from './env'

export default {
  any: async (api, params, data) => {
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN_KEY)
    if (token) {
      if (data instanceof FormData) {
        apiClient.setHeaders((await multiPartConfig()).headers)
      } else {
        apiClient.setHeaders((await config()).headers)
      }
    }
    const response = await apiClient.any({
      method: api.method,
      url: api.url,
      params: params,
      data: data
    })
    if (!response.ok) {
      if (response.data.error) {
        showErrorMessage(response.data.error)
        return -1
      }
    }

    if (response.ok) {
      if (response.data?.message) showSuccessMessage(response.data.message)
      return response.data
    }
  },
  get: async (url, header, data) => {
    apiClient.setHeaders(header)
    return await apiClient.get(url, data)
  },

  post: async (url, data, header) => {
    apiClient.setHeaders(header)
    return await apiClient.post(url, data)
  },

  put: async (url, data, header) => {
    apiClient.setHeaders(header)
    return await apiClient.put(url, data)
  },

  delete: async (url, data, header) => {
    apiClient.setHeaders(header)
    return await apiClient.delete(url, data)
  }
}
