import { createContext, useState } from 'react';

export const WorkbookContext = createContext({});

export const WorkbookProvider = ({children}) => {
    const [workbookData, setWorkbookData] = useState({});

    return (
        <WorkbookContext.Provider value={{workbookData, setWorkbookData }}>
            {children}
        </WorkbookContext.Provider>
    )
}