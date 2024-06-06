import React from 'react'
import ReactDOM from 'react-dom/client'

import '@/style/tailwind.css'
import App from './App.tsx'

const mountNode = document.getElementById('root')

if (!mountNode) {
  throw new Error("React mount point 'root' not found in document.")
}

ReactDOM.createRoot(mountNode).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
