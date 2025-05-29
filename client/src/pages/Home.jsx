import { useEffect, useContext } from "react";
import ExcelInput from "../components/ExcelInput";
import WorkbookObserver from "../components/WorkbookObserver";
import { WorkbookContext } from "../contexts/WorkbookContext";
import BlockGenerator from "../components/BlockGenerator";


const Home = () => {
    const {setWorkbookData, setSheets, setActiveSheet, setWorkbookId} = useContext(WorkbookContext);

    useEffect(() => {
        return () => {
            // Empty any existing workbook data after unmounting the component (home page)
            setWorkbookData({});
            setSheets([]);
            setActiveSheet('');
            setWorkbookId(null);
        }
    }, [])

    return (
        <>
            <ExcelInput />
            <BlockGenerator />
            <WorkbookObserver />
        </>
    )
}

export default Home;