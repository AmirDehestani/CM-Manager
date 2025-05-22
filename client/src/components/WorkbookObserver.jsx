import { useContext, useEffect, useState } from 'react';
import Cell from './Cell.jsx';
import * as XLSX from 'xlsx';
import { saveWorkbook } from '../services/workbook.service.js'
import GenericInput from './generic/GenericInput.jsx';
import { WorkbookContext } from '../contexts/WorkbookContext.jsx';
import SheetSelector from './SheetSelector.jsx';

const WorkbookObserver = () => {
    const [sheetData, setSheetData] = useState(null);
    const [hasData, setHasData] = useState(false);
    const [maxColumns, setMaxColumns] = useState(0);
    const [columnHeaders, setColumnHeaders] = useState([]);
    const [wbName, setWbName] = useState('');
    const [ticketLink, setTicketLink] = useState('');
    const {workbookData, setWorkbookData, activeSheet} = useContext(WorkbookContext)

    useEffect(() => {
        if (!workbookData || !activeSheet) {
            return;
        }
        const data = workbookData[activeSheet] ?? null;
        if (!data) {
            setSheetData(null);
            setHasData(false);
            return;
        }
        setSheetData(data);

        // Check if data is empty
        const dataExists = data && Array.isArray(data) && data.length > 0;
        setHasData(dataExists);

        if (dataExists) {
            // Calculate max columns
            let maxCols = 0;
            data.forEach((row) => {
                if (Array.isArray(row) && row.length > maxCols) {
                    maxCols = row.length;
                }
            });
            setMaxColumns(maxCols);

            // Generate column headers
            const headers = Array.from({ length: maxCols }, (_, i) => {
                return data[0] && data[0][i] ? data[0][i] : '';
            });
            setColumnHeaders(headers);
        }
    }, [workbookData, activeSheet]);

    // Function to handle cell display
    const renderCellContent = (cell) => {
        if (cell === null || cell === undefined) return '';
        if (typeof cell === 'object') return JSON.stringify(cell);
        return cell.toString();
    };

    const exportWorkbook = () => {
        if (!sheetData || !activeSheet) {
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

    const handleSave = () => {
        saveWorkbook(wbName, ticketLink, workbookData)
    }

    return (
        <div className="workbook-observer">
            <h2>Workbook Data</h2>

            {hasData ? (
                <>
                    <SheetSelector/>
                    <button className='input-component' onClick={exportWorkbook}>Export workbook</button>
                    <button className='input-component' onClick={handleSave}>Save workbook</button>
                    <br></br>
                    <GenericInput state={wbName} setState={setWbName} placeholder='Workbook name'/>
                    <GenericInput state={ticketLink} setState={setTicketLink} placeholder='Link to JIRA ticket'/>
                    <div className="workbook-table-container">
                        <table className="workbook-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    {columnHeaders.map((header, index) => (
                                        <th key={index}>
                                            {renderCellContent(header)}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {sheetData?.slice(1).map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <td className="row-index">
                                            {rowIndex + 1}
                                        </td>
                                        {Array.from({ length: maxColumns }).map(
                                            (_, cellIndex) => (
                                                Array.isArray(row) &&
                                                cellIndex < row.length ? (
                                                    <Cell
                                                        cellValue={renderCellContent(
                                                            row[cellIndex]
                                                        )}
                                                        setWorkbookData={
                                                            setWorkbookData
                                                        }
                                                        row={rowIndex + 1}
                                                        col={cellIndex}
                                                        activeSheet={
                                                            activeSheet
                                                        }
                                                        key={cellIndex}
                                                    />
                                                ) : (
                                                    <td key={cellIndex}></td>
                                                )
                                            )
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
