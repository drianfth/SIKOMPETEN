import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const addAk05 = async (data) => {
  try {
    const res = await axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/hasilak05`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("Authorization")}`,
      },
      data: data,
    });
    return res.data;
  } catch (err) {
    console.log(err.response);
    throw new Error(err.response);
  }
};

export const getAk05 = async (id1, id2) => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/hasilak05/${id1}/${id2}`,
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
