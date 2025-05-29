import './utils/utils.js'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { WorkbookProvider } from './contexts/WorkbookContext.jsx'

createRoot(document.getElementById('root')).render(
  <WorkbookProvider>
    <App />
  </WorkbookProvider>,
)
