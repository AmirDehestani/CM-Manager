import { useContext } from "react"
import { WorkbookContext } from "../contexts/WorkbookContext"

const Macros = () => {
    const {setWorkbookData, activeSheet} = useContext(WorkbookContext);

    const deleteEmptyRows = () => {
        setWorkbookData((prevData) => {
            const worksheet = prevData[activeSheet];
            let filteredWorksheet = worksheet.filter(row => row.some(cell => cell));
            return {...prevData, [activeSheet]: filteredWorksheet}
        })
    }

    return (
        <>
            <div>
                <button onClick={deleteEmptyRows}>Remove Empty Rows</button>
            </div>
        </>
    )
}

export default Macros;