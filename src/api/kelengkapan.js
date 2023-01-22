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

export const getOneKelengkapan = async (id) => {
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/kelengkapan/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("Authorization")}`,
      },
    });

    return res.data;
  } catch (err) {
    console.log(err.response);
    throw new Error(err.response);
  }
};

export default kelengkapanApi;
