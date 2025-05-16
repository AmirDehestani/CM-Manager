import { useEffect, useState } from 'react';

interface WorkbookObserverProps {
    workbookData: Record<string, any>;
    activeSheet: string | null;
}

const WorkbookObserver = ({
    workbookData,
    activeSheet,
}: WorkbookObserverProps) => {
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
                return data[0] && data[0][i] ? data[0][i] : `Column ${i + 1}`;
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

    return (
        <div className="workbook-observer">
            <h2>Workbook Data</h2>

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
                                                <td key={cellIndex}>
                                                    {Array.isArray(row) &&
                                                    cellIndex < row.length
                                                        ? renderCellContent(
                                                              row[cellIndex]
                                                          )
                                                        : ''}
                                                </td>
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
