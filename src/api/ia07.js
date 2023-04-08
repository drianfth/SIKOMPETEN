import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const addIa07 = async (data) => {
  try {
    console.log(data);
    const res = await axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/hasilia07`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("Authorization")}`,
      },
      data: data,
    });
    return res.data;
  } catch (err) {
    console.log("error");
    throw new Error(err.response);
  }
};

export const getIa07 = async (id) => {
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/hasilia07/${id}`, {
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
