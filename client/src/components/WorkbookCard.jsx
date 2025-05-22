import { deleteWorkbook, getWorkbookData } from "../services/workbook.service";
import { useContext } from "react";
import { WorkbookContext } from "../contexts/WorkbookContext";
import { useNavigate } from 'react-router-dom'

const WorkbookCard = ({props, setWorkbooks}) => {
    const {_id, name, ticket, createdAt, lastUpdate} = {...props};
    const { setWorkbookId } = useContext(WorkbookContext);
    const navigate = useNavigate();
    
    const handleDelete = async () => {
        const response = await deleteWorkbook(_id);
        if (response.status == 200) {
            setWorkbooks((prevItems) => prevItems.filter((item) => item._id !== _id));
        }
    }

    const handleEdit = async () => {
        setWorkbookId(_id)
        navigate('/');
    }

    return (
        <div className="workbook-card">
            <span>Name: {name}</span>
            <a href={ticket} target="_blank">Link to ticket</a>
            <span>Created at: {new Date(createdAt).toUTCString()}</span>
            <span>Last update: {new Date(lastUpdate).toUTCString()}</span>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleEdit}>Edit</button>
        </div>
    )

}

export default WorkbookCard;