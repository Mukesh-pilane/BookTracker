import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify"
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Suspense fallback>
    <App />
    <ToastContainer />
  </Suspense>
  // </React.StrictMode>,
)

