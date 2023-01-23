import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getAllPaketAsesmen = async () => {
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/paketasesmen`, {
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

export const createPaketAsesmen = async (data) => {
  try {
    const res = await axios({
      url: `http://127.0.0.1:8000/api/paketasesmen`,
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

export const removePaketAsesmen = async (id) => {
  try {
    const res = await axios({
      url: `http://127.0.0.1:8000/api/paketasesmen/${id}`,
      method: "delete",
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
export const updatePaketAsesmen = async ({ data, id }) => {
  try {
    const res = await axios({
      url: `http://127.0.0.1:8000/api/paketasesmen/${id}`,
      method: "put",
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("Authorization")}`,
      },
    });
  // console.log(data);
    return res.data;
  } catch (err) {
    console.log(err.response);
    throw new Error(err.response);
  }
};
