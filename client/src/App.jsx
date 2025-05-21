import ExcelInput from './components/ExcelInput';
import WorkbookObserver from './components/WorkbookObserver';
import './App.css';
import { useState } from 'react';
import SheetSelector from './components/SheetSelector';

function App() {
    // TODO: To avoid prop drilling, explore a global state management solution like Redux or Context API.
    const [workbookData, setWorkbookData] = useState({});
    const [sheets, setSheets] = useState([]);
    const [activeSheet, setActiveSheet] = useState('');

    return (
        <div className="app-container">
            <header>
                <h1>CM Manager</h1>
            </header>
            <main>
                <ExcelInput
                    setWorkbookData={setWorkbookData}
                    setSheets={setSheets}
                />
                <SheetSelector
                    sheets={sheets}
                    setActiveSheet={setActiveSheet}
                />
                <WorkbookObserver
                    workbookData={workbookData}
                    setWorkbookData={setWorkbookData}
                    activeSheet={activeSheet}
                />
            </main>
            <footer>
                <p>© 2025 CM Manager</p>
            </footer>
        </div>
    );
}

export default App;
