import { useContext } from "react"
import { WorkbookContext } from "../contexts/WorkbookContext"

const Macros = () => {
    const {setWorkbookData, activeSheet} = useContext(WorkbookContext);

    const deleteEmptyRows = () => {
        setWorkbookData((prevData) => {
            const worksheet = prevData[activeSheet];
            if (!worksheet || worksheet.length === 0) return prevData;
            let filteredWorksheet = worksheet.filter(row => row.some(cell => cell));
            return {...prevData, [activeSheet]: filteredWorksheet}
        })
    }

    
    const deleteEmptyColumns = () => {
        setWorkbookData((prevData) => {
            const worksheet = prevData[activeSheet];
            if (!worksheet || worksheet.length === 0) return prevData;

            const columnCount = Math.max(...worksheet.map(row => row.length));

            // Determine which columns are not entirely empty
            const nonEmptyColumnIndices = [];
            for (let col = 0; col < columnCount; col++) {
                if (worksheet.some(row => row[col])) {
                    nonEmptyColumnIndices.push(col);
                }
            }

            // Filter each row to keep only non-empty columns
            const filteredWorksheet = worksheet.map(row =>
                nonEmptyColumnIndices.map(colIndex => row[colIndex])
            );

            return { ...prevData, [activeSheet]: filteredWorksheet };
        });
    };



    return (
        <>
            <div>
                <button onClick={deleteEmptyRows}>Remove Empty Rows</button>
                <button onClick={deleteEmptyColumns}>Remove Empty Columns</button>
            </div>
        </>
    )
}

export default Macros;