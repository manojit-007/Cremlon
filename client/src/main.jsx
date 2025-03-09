import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Store from './store/Store'
import { Toaster } from "@/components/ui/sonner"


createRoot(document.getElementById('root')).render(
  <Provider store={Store}> 
  <BrowserRouter>
    <App />
    <Toaster />
  </BrowserRouter>
  </Provider>
)
