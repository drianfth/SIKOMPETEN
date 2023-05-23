import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getProsedurKeputusan = async () => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/data-prosuder-keputusan`,
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

export const addAk06 = async (data) => {
  try {
    const res = await axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/hasilak06`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("Authorization")}`,
      },
      data: data,
    });
    console.log(data);
    return res.data;
  } catch (err) {
    console.log(err.response.data);
    throw new Error(err.response);
  }
};

export const getAk06 = async (id1, id2) => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/hasilak06/${id1}/${id2}`,
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
