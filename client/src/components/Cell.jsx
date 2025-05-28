import { useState, useEffect, memo, useContext } from 'react';
import { WorkbookContext } from '../contexts/WorkbookContext';

const Cell = memo(
    // Memo is essential to prevent unnecessary re-renders
    ({ row, col, cellValue="" }) => {
        const [isEditing, setIsEditing] = useState(false);
        const [value, setValue] = useState(cellValue);
        const [hovered, setHovered] = useState(false);
        const {setWorkbookData, activeSheet, workbookData} = useContext(WorkbookContext)

        // This updates the existing cell value when the active sheet changes
        useEffect(() => {
            setValue(cellValue);
        }, [cellValue, workbookData]);


        const handleChange = (e) => {
            const newValue = e.target.value;
            setValue(newValue);
            setWorkbookData((prevData) => {
                // We could use immer library in the future if such functions turn out to be common
                if (prevData[activeSheet][row][col] === newValue)
                    return prevData;

                const newData = { ...prevData };
                newData[activeSheet] = [...prevData[activeSheet]];
                newData[activeSheet][row] = [...prevData[activeSheet][row]];
                newData[activeSheet][row][col] = newValue;

                return newData;
            });
        };

        const handleBlur = () => {
            setIsEditing(false);
        };

        const handleEdit = () => {
            setIsEditing(true);
        };

        const handlePaste = (e) => {
            var clipboardData, pastedData;
            // Get pasted data via clipboard API
            clipboardData = e.clipboardData || window.clipboardData;
            pastedData = clipboardData.getData('Text');

            // Do whatever with pasteddata
            const rows = pastedData.split('\r\n');
            if (rows.length > 1) {
                e.preventDefault();

                for(let i = 0; i<rows.length-1; i++){
                const columns = rows[i].split('\t');
                    for(let j = 0; j<columns.length; j++){
                        // borderCollision(i, j);
                        setWorkbookData((prevData) => {
                            if (prevData[activeSheet][row + i][col + j] === columns[j])
                                return prevData;

                            const newData = { ...prevData };
                            newData[activeSheet] = [...prevData[activeSheet]];
                            newData[activeSheet][row + i] = [...prevData[activeSheet][row + i]];
                            newData[activeSheet][row + i][col + j] = columns[j];

                            return newData;
                        });
                        console.log(`this r${window.row+i}c${window.column + j}`)
                    }
                
                }
            }
        }

        return (
            <td className={`cell ${hovered ? 'hovered-cell' : ''}`} onClick={handleEdit} onMouseEnter={() => setHovered(true)} onMouseLeave={()=>setHovered(false)} onPaste={handlePaste}>
                {isEditing ? (
                    <input
                        autoFocus
                        type='text'
                        value={value ?? ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                ) : (
                    <span>{value ?? ''}</span>
                )}
            </td>
        );
    }
);

export default Cell;
