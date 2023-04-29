import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getApl01 = async (id) => {
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/detailapl01/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("Authorization")}`,
      },
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response);
  }
};

export const addAk02 = async (data) => {
  try {
    const res = await axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/hasilak02`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("Authorization")}`,
      },
      data: data,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response);
  }
};
