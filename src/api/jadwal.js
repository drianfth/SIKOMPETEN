import axios from "axios";
import Cookies from "universal-cookie";
const BASE_URL = "http://127.0.0.1:8000/api/jadwal";

const cookies = new Cookies();

const jadwalApi = axios.create({
  // baseURL: BASE_URL,
  method: "put",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${cookies.get("Authorization")}`,
  },
});

export default jadwalApi;
