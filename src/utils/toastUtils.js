// src/utils/toastUtils.js
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

// Configuration globale
const defaultOptions = {
  position: 'top-right',
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  hideProgressBar: false,
}

// Helpers
export function toastSuccess(message, options = {}) {
  return toast.success(message, { ...defaultOptions, ...options })
}
export function toastError(message, options = {}) {
  return toast.error(message, { ...defaultOptions, ...options })
}
export function toastInfo(message, options = {}) {
  return toast.info(message, { ...defaultOptions, ...options })
}
export function toastWarn(message, options = {}) {
  return toast.warn(message, { ...defaultOptions, ...options })
}

// Confirmation
export function toastConfirm(message, onConfirm, options = {}) {
  toast.info(message, {
    ...defaultOptions,
    ...options,
    autoClose: false,
    closeOnClick: false,
    draggable: false,
    onClose: () => {},
    action: [
      {
        label: 'Oui',
        onClick: () => onConfirm()
      },
      {
        label: 'Non',
        onClick: () => {}
      }
    ]
  })
}
