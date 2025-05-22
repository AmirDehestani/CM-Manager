import ExcelInput from './components/ExcelInput';
import WorkbookObserver from './components/WorkbookObserver';
import './App.css';
import SheetSelector from './components/SheetSelector';


function App() {

    return (
        <div className="app-container">
            <header>
                <h1>CM Manager</h1>
            </header>
            <main>
                <ExcelInput />
                <SheetSelector />
                <WorkbookObserver />
            </main>
            <footer>
                <p>© 2025 CM Manager</p>
            </footer>
        </div>
    );
}

export default App;
