import { useState, useEffect, memo, useContext } from 'react';
import { WorkbookContext } from '../contexts/WorkbookContext';

const Cell = memo(
    // Memo is essential to prevent unnecessary re-renders
    ({ cellValue, row, col }) => {
        const [isEditing, setIsEditing] = useState(false);
        const [value, setValue] = useState(cellValue);
        const [hovered, setHovered] = useState(false);
        const {setWorkbookData, activeSheet} = useContext(WorkbookContext)

        // This updates the existing cell value when the active sheet changes
        useEffect(() => {
            setValue(cellValue);
        }, [cellValue]);


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

        return (
            <td className={`cell ${hovered ? 'hovered-cell' : ''}`} onClick={handleEdit} onMouseEnter={() => setHovered(true)} onMouseLeave={()=>setHovered(false)}>
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
