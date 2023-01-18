import axios from "axios";
import Cookies from "universal-cookie";
// const BASE_URL = "http://127.0.0.1:8000/api/schema";

const cookies = new Cookies();

const kelengkapanApi = axios.create({
  //   baseURL: BASE_URL,
  method: "get",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${cookies.get("Authorization")}`,
  },
});

export default kelengkapanApi;
