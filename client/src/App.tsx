import ExcelInput from './Components/ExcelInput';
import WorkbookObserver from './Components/WorkbookObserver';
import './App.css';
import { useState } from 'react';
import SheetSelector from './Components/SheetSelector';

function App() {
    // TODO: To avoid prop drilling, explore a global state management solution like Redux or Context API.
    const [workbookData, setWorkbookData] = useState<Record<string, []>>({});
    const [sheets, setSheets] = useState<string[]>([]);
    const [activeSheet, setActiveSheet] = useState<string>('');

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
