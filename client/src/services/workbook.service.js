import axios from "axios"

const API_URL = 'http://localhost:5000'

export const saveWorkbook = async (name, ticket, workbook) => {
    const response = await axios.post(`${API_URL}/workbooks`, {
        name: name,
        ticket: ticket,
        workbook: workbook
    })
    return response;
}

export const loadWorkbooks = async () => {
    const response = await axios.get(`${API_URL}/workbooks`)
    return response;
}

export const deleteWorkbook = async (workbookId) => {
    const response = await axios.delete(`${API_URL}/workbooks/${workbookId}`)
    return response;
}

export const getWorkbookData = async (workbookId) => {
    const response = await axios.get(`${API_URL}/workbooks/${workbookId}`)
    return response;
}

export const updateWorkbook = async (workbookId, name, ticket, workbook) => {
    const response = await axios.put(`${API_URL}/workbooks/${workbookId}`, {
        name: name,
        ticket: ticket,
        workbook: workbook
    })
    return response;
}