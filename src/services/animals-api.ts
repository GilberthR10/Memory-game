import axios  from "axios";

const animalsApi = axios.create({
    baseURL: import.meta.env.VITE_API_CLIENTS_URL
})

export default animalsApi