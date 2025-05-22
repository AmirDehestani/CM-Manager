import { deleteWorkbook } from "../services/workbook.service";

const Workbook = ({props, setWorkbooks}) => {
    const {_id, name, ticket, createdAt, lastUpdate} = {...props};
    
    const handleDelete = async () => {
        const response = await deleteWorkbook(_id);
        if (response.status == 200) {
            setWorkbooks((prevItems) => prevItems.filter((item) => item._id !== _id));
        }
    }

    return (
        <div className="workbook-card">
            <span>Name: {name}</span>
            <a href={ticket} target="_blank">Link to ticket</a>
            <span>Created at: {new Date(createdAt).toUTCString()}</span>
            <span>Last update: {new Date(lastUpdate).toUTCString()}</span>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )

}

export default Workbook;