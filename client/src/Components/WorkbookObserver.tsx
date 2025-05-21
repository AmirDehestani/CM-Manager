import { useEffect, useState } from 'react';
import Cell from './Cell';
import * as XLSX from 'xlsx';

interface WorkbookObserverProps {
    workbookData: Record<string, any>;
    setWorkbookData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
    activeSheet: string;
}

const WorkbookObserver = ({
    workbookData,
    setWorkbookData,
    activeSheet,
}: WorkbookObserverProps) => {
    console.log(workbookData);
    const [sheetData, setSheetData] = useState<any[] | null>(null);
    const [hasData, setHasData] = useState(false);
    const [maxColumns, setMaxColumns] = useState(0);
    const [columnHeaders, setColumnHeaders] = useState<any[]>([]);

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
    const renderCellContent = (cell: any) => {
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

    return (
        <div className="workbook-observer">
            <h2>Workbook Data</h2>
            <button onClick={exportWorkbook}>Export workbook</button>

            {hasData ? (
                <>
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
