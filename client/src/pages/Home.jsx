import ExcelInput from "../components/ExcelInput";
import SheetSelector from "../components/SheetSelector";
import WorkbookObserver from "../components/WorkbookObserver";

const Home = () => {
    return (
        <>
            <ExcelInput />
            <SheetSelector />
            <WorkbookObserver />
        </>
    )
}

export default Home;