import { createContext, useState } from 'react';

export const WorkbookContext = createContext({});

export const WorkbookProvider = ({children}) => {
    const [workbookData, setWorkbookData] = useState({});
    const [sheets, setSheets] = useState([]);
    const [activeSheet, setActiveSheet] = useState('');
    const [workbookId, setWorkbookId] = useState(null);

    return (
        <WorkbookContext.Provider value={{workbookData, setWorkbookData, sheets, setSheets, activeSheet, setActiveSheet, workbookId, setWorkbookId }}>
            {children}
        </WorkbookContext.Provider>
    )
}