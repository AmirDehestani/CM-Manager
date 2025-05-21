import { useState, memo } from 'react';

interface CellProps {
    cellValue: string;
    setWorkbookData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
    row: number;
    col: number;
    activeSheet: string;
}

const Cell = memo(
    // Memo is essential to prevent unnecessary re-renders
    ({ cellValue, setWorkbookData, row, col, activeSheet }: CellProps) => {
        const [isEditing, setIsEditing] = useState(false);
        const [value, setValue] = useState(cellValue);

        const handleEdit = () => {
            setIsEditing(true);
        };

        const handleChange = (e: any) => {
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

        return (
            <div className="cell" onClick={handleEdit}>
                {isEditing ? (
                    <input
                        autoFocus
                        type="text"
                        value={value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                ) : (
                    <span>{value}</span>
                )}
            </div>
        );
    }
);

export default Cell;
