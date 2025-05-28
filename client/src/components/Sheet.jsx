import { useContext } from "react";
import { WorkbookContext } from "../contexts/WorkbookContext";
import Cell from "./Cell";

const Sheet = ({hasHeaders}) => {
    const {workbookData, activeSheet} = useContext(WorkbookContext);

    return (
        <div className="workbook-table-container">
            <table className="workbook-table">
                {hasHeaders && <thead>
                    <tr>
                        <th>#</th>
                        {workbookData[activeSheet][0].map((header, index) => (
                            <th key={index}>
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>}
                <tbody>
                    {workbookData[activeSheet]?.slice(hasHeaders ? 1 : 0).map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td className="row-index">
                                {rowIndex}
                            </td>
                            {row.map((val, cellIndex) =>
                                <Cell
                                    cellValue={val}
                                    row={rowIndex}
                                    col={cellIndex}
                                    key={cellIndex}
                                />
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Sheet;