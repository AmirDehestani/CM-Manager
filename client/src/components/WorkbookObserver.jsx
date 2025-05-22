import { useContext, useEffect, useState } from 'react';
import Cell from './Cell.jsx';
import * as XLSX from 'xlsx';
import { saveWorkbook, getWorkbookData, updateWorkbook } from '../services/workbook.service.js'
import GenericInput from './generic/GenericInput.jsx';
import { WorkbookContext } from '../contexts/WorkbookContext.jsx';
import SheetSelector from './SheetSelector.jsx';
import { useNavigate } from 'react-router-dom';
import Macros from './Macros.jsx';

const WorkbookObserver = () => {
    const [hasData, setHasData] = useState(false);
    const [maxColumns, setMaxColumns] = useState(0);
    const [columnHeaders, setColumnHeaders] = useState([]);
    const [wbName, setWbName] = useState('');
    const [ticketLink, setTicketLink] = useState('');
    const {workbookData, setWorkbookData, activeSheet, workbookId, setSheets} = useContext(WorkbookContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (!workbookData || !activeSheet) {
            if (workbookId) {
                fetchWorkbookDataFromId();
            }
            return;
        }

        const currSheet = workbookData[activeSheet] ?? null;
        const dataExists = currSheet && Array.isArray(currSheet) && currSheet.length > 0;
        setHasData(dataExists);

        if (dataExists) {
            // Calculate max columns
            let maxCols = currSheet[0].length;

            setMaxColumns(maxCols);

            // Generate column headers
            const headers = Array.from({ length: maxCols }, (_, i) => {
                return currSheet[0] && currSheet[0][i] ? currSheet[0][i] : '';
            });
            setColumnHeaders(headers);
        }
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

    return (
        <div className="workbook-observer">
            <h2>Workbook Data</h2>
            <SheetSelector/>

            {hasData ? (
                <>
                    <button className='input-component' onClick={exportWorkbook}>Export workbook</button>
                    <button className='input-component' onClick={handleSave}>Save workbook</button>
                    <br></br>
                    <GenericInput state={wbName} setState={setWbName} placeholder='Workbook name'/>
                    <GenericInput state={ticketLink} setState={setTicketLink} placeholder='Link to JIRA ticket'/>
                    <Macros/>
                    <div className="workbook-table-container">
                        <table className="workbook-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    {columnHeaders.map((header, index) => (
                                        <th key={index}>
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {workbookData[activeSheet]?.slice(1).map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <td className="row-index">
                                            {rowIndex + 1}
                                        </td>
                                        {row.map((val, cellIndex) =>
                                            <Cell
                                                cellValue={val}
                                                row={rowIndex + 1}
                                                col={cellIndex}
                                                key={cellIndex}
                                            />
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <p>No data available. Please upload an Excel file.</p>
            )}
        </div>
    );
};

export default WorkbookObserver;
