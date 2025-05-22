import { useEffect, useState } from "react";
import { loadWorkbooks } from "../services/workbook.service";
import Workbook from "../components/Workbook";

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
        workbooks ?
        <div className="workbooks-container">{workbooks.map(wb => <Workbook props={wb} setWorkbooks={setWorkbooks} key={wb._id} />)}</div>:
        "There are no workbooks stored in the database"
    )
}

export default Workbooks;