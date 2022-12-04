import axios from "axios";


const instance = axios.create({
    baseURL: "https://burger-store-8cee3-default-rtdb.firebaseio.com"
})


export default instance;