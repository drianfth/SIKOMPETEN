import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getAllAsesor = async () => {
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/asesor`, {
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
export const getUser = async (id) => {
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/whoUser/${id}`, {
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
