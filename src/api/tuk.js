import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getAllTuk = async () => {
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/tuk`, {
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

export const createTUK = async (data) => {
  try {
    const res = await axios({
      url: `http://127.0.0.1:8000/api/tuk`,
      method: `post`,
      data: data,
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
