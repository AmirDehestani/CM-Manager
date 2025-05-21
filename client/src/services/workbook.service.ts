import axios from "axios"

const API_URL = 'http://localhost:5000'

export const saveWorkbook = async (name: string, ticket: string, workbook: Record<string, []>) => {
    const response = await axios.post(`${API_URL}/workbooks`, {
        name: name,
        ticket: ticket,
        workbook: workbook
    })
    console.log(response)
}
