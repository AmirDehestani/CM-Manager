import { useEffect, useContext } from 'react';
import { WorkbookContext } from '../contexts/WorkbookContext';

const SheetSelector = () => {
    const {sheets, setActiveSheet} = useContext(WorkbookContext)
    // Set the first sheet as active by default
    useEffect(() => {
        if (sheets.length > 0) {
            setActiveSheet(sheets[0]);
        }
    }, [sheets]);

    if (!sheets || sheets.length === 0) {
        return '';
    }

    const handleSheetChange = (event) => {
        const selectedSheet = event.target.value;
        setActiveSheet(selectedSheet);
    };

    return (
        <div className="sheet-selector">
            Select worksheet:&nbsp;
            <select onChange={handleSheetChange}>
                {sheets.map((sheet, index) => (
                    <option key={index} value={sheet}>
                        {sheet}
                    </option>
                ))}
            </select>
        </div>
    );
};
export default SheetSelector;
