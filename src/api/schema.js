import axios from "axios";
import Cookies from "universal-cookie";
const BASE_URL = "http://127.0.0.1:8000/api/schema";

const cookies = new Cookies();

const schemaApi = axios.create({
  baseURL: BASE_URL,
  method: "get",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${cookies.get("Authorization")}`,
  },
});

export const showSchemaApi = axios.create({
  method: "get",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${cookies.get("Authorization")}`,
  },
});

export default schemaApi;
