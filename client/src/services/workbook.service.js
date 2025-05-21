import axios from "axios"

const API_URL = 'http://localhost:5000'

export const saveWorkbook = async (name, ticket, workbook) => {
    const response = await axios.post(`${API_URL}/workbooks`, {
        name: name,
        ticket: ticket,
        workbook: workbook
    })
    console.log(response)
}
