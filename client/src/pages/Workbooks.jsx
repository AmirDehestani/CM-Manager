import { useEffect, useState } from "react";
import { loadWorkbooks } from "../services/workbook.service";
import WorkbookCard from "../components/WorkbookCard";

const Workbooks = () => {
    const [workbooks, setWorkbooks] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await loadWorkbooks();
            setWorkbooks(response.data);
        }
        fetchData();
    }, [])

    return (
        workbooks.length ?
        <div className="workbooks-container">{workbooks.map(wb => <WorkbookCard props={wb} setWorkbooks={setWorkbooks} key={wb._id} />)}</div>:
        "There are no workbooks stored in the database"
    )
}

export default Workbooks;