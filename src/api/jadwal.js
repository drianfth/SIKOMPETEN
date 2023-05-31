import axios from "axios";
import Cookies from "universal-cookie";
// const BASE_URL = "http://127.0.0.1:8000/api/jadwal";

const cookies = new Cookies();

const jadwalApi = axios.create({
  // baseURL: BASE_URL,
  method: "put",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${cookies.get("Authorization")}`,
  },
});

export const updateJadwal = async ({ data, id }) => {
  try {
    const res = await axios({
      method: "put",
      url: `http://127.0.0.1:8000/api/jadwal/${id}`,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("Authorization")}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error.response);
    throw new Error(error.response);
  }
};

export const getAllJadwal = async () => {
  // console.log("halo");
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/jadwal`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("Authorization")}`,
      },
    });
    // console.log("halo", res.data);
    return res.data;
  } catch (err) {
    console.log(err.response);
    throw new Error(err.response);
  }
};

export default jadwalApi;
