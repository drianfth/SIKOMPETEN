import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const addApl02 = async (data) => {
  try {
    const res = await axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/hasilapl02`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("Authorization")}`,
      },
      data: data,
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err.response);
    throw new Error(err.response);
  }
};

export const getOneApl02 = async (id) => {
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/hasilapl02/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("Authorization")}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response);
  }
};

export const getDetailApl02 = async (id) => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/hasilapl02lengkap/${id}`,
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

export const updateApl02 = async ({ data, id }) => {
  try {
    const res = await axios({
      method: "put",
      url: `http://127.0.0.1:8000/api/hasilapl02/${id}`,
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
