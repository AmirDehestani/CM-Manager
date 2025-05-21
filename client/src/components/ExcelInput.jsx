import { useState } from 'react';
import XLSX from 'xlsx';
import Loader from './Loader';

function ExcelInput({ setWorkbookData, setSheets }) {
    const [fileName, setFileName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleUpload = async (e) => {
        try {
            setIsLoading(true);
            const file = e.target.files[0];
            if (!file) return;

            setWorkbookData([]);
            setSheets([]);

            setFileName(file.name);
            const data = await file.arrayBuffer();
            const workbook = XLSX.read(data);
            for (const sheet in workbook.Sheets) {
                const worksheet = workbook.Sheets[sheet];
                if (!worksheet) continue;
                const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                    header: 1,
                    defval: '',
                });
                setSheets((prevSheets) => [...prevSheets, sheet]);
                setWorkbookData((prevData) => ({...prevData, [sheet]: jsonData}));
            }
        } catch (error) {
            console.error('Error processing Excel file:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="excel-input-container">
                <div className="upload-section">
                    <h2>Upload Excel File</h2>
                    <input
                        type="file"
                        accept=".xlsx, .xls, .xlsm"
                        onChange={(e) => handleUpload(e)}
                    />
                    {fileName && <p>File: {fileName}</p>}
                </div>
            </div>
            {isLoading && <Loader />}
        </>
    );
}

export default ExcelInput;
