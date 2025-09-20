import React from 'react'
import {ToastContainer} from 'react-toastify'

function Notifications() {
  return (
    <>
    <ToastContainer position='top-center' autoClose={3000} theme="colored" pauseOnFocusLoss />
    </>
  )
}

export default Notifications