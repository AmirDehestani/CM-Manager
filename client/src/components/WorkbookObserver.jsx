import { useContext, useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { saveWorkbook, getWorkbookData, updateWorkbook } from '../services/workbook.service.js'
import GenericInput from './generic/GenericInput.jsx';
import { WorkbookContext } from '../contexts/WorkbookContext.jsx';
import SheetSelector from './SheetSelector.jsx';
import { useNavigate } from 'react-router-dom';
import Macros from './Macros.jsx';
import Sheet from "./Sheet.jsx";

const WorkbookObserver = () => {
    const [hasData, setHasData] = useState(false);
    const [wbName, setWbName] = useState('');
    const [ticketLink, setTicketLink] = useState('');
    const [hasHeaders, setHasHeaders] = useState(false);
    const {workbookData, setWorkbookData, activeSheet, workbookId, setSheets, setActiveSheet} = useContext(WorkbookContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (!workbookData || !activeSheet) {
            if (workbookId) {
                fetchWorkbookDataFromId();
            }
            return;
        }
        setHasData(workbookData[activeSheet] && Array.isArray(workbookData[activeSheet]) && workbookData[activeSheet].length > 0);
    }, [workbookData, activeSheet]);

    const exportWorkbook = () => {
        if (!workbookData) {
            alert('No data to export');
            return;
        }

        try {
            const wb = XLSX.utils.book_new();
            for (const [sheetName, data] of Object.entries(workbookData)) {
                const ws = XLSX.utils.json_to_sheet(data);
                XLSX.utils.book_append_sheet(wb, ws, sheetName);
            }
            const wbName = new Date().getTime();
            XLSX.writeFile(wb, `${wbName}.xlsx`);
        } catch (error) {
            console.error('Error exporting workbook:', error);
            alert('Failed to export workbook. See console for details.');
        }
    };

    const handleSave = async () => {
        let response;
        if (workbookId) {
            response = await updateWorkbook(workbookId, wbName, ticketLink, workbookData);
        } else {
            response = await saveWorkbook(wbName, ticketLink, workbookData)
        }
        
        if (response.status == 201) {
            navigate('/workbooks');
        } else {
            console.error(response);
            alert('An error occurd while saving the workbook');
        }
    }

    const fetchWorkbookDataFromId = async () => {
        const response = await getWorkbookData(workbookId);
        if (response.status == 200) {
            setWbName(response.data.name);
            setTicketLink(response.data.ticket);
            setWorkbookData(response.data.workbook.data);
            Object.keys(response.data.workbook.data).forEach((sheet) => {
                setSheets((prevSheets) => [...prevSheets, sheet]);
            })
        } else {
            alert("Failed to load workbook data");
        }
    }

    const handleCreateSheet = () => {
        const rowCount = 5;
        const colCount = 5;
        const emptyArray = Array.from({ length: rowCount }, () => Array(colCount).fill(null));
        setSheets((prevSheets) => {
            const sheetName = `Sheet-${prevSheets.length}`;
            setActiveSheet(sheetName);
            setWorkbookData((prevData) => ({...prevData, [sheetName]: emptyArray}));
            return [...prevSheets, sheetName];
        })
    }

    return (
        <div className="workbook-observer">
            <h2>Workbook Data</h2>
            <button onClick={handleCreateSheet}>Creane new sheet</button>
            <SheetSelector/>

            {hasData ? (
                <>
                    <button className='input-component' onClick={exportWorkbook}>Export workbook</button>
                    <button className='input-component' onClick={handleSave}>Save workbook</button>
                    <input onClick={() => setHasHeaders(!hasHeaders)} type='checkbox' /><span>This sheet has headers</span>
                    <br></br>
                    <GenericInput state={wbName} setState={setWbName} placeholder='Workbook name'/>
                    <GenericInput state={ticketLink} setState={setTicketLink} placeholder='Link to JIRA ticket'/>
                    <Macros/>
                    <Sheet hasHeaders={hasHeaders} />
                </>
            ) : (
                <p>No data available. Please upload an Excel file.</p>
            )}
        </div>
    );
};

export default WorkbookObserver;
