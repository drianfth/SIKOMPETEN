import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
export const addAk01 = async (data) => {
  try {
    const res = await axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/hasilak01`,
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

export const checkAk01 = async (id1, id2) => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/checkhasilak01/${id1}/${id2}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("Authorization")}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response);
  }
};
export const getAk01 = async (id) => {
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/hasilak01/${id}`, {
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

export const updateAk01 = async ({ data, id }) => {
  try {
    const res = await axios({
      method: "put",
      url: `http://127.0.0.1:8000/api/hasilak01/${id}`,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("Authorization")}`,
      },
    });
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error.response);
    throw new Error(error.response);
  }
};
