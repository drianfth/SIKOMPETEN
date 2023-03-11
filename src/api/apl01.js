import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const addRApl01api = axios.create({
  method: "post",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${cookies.get("Authorization")}`,
  },
});

export const addApl01 = async (data) => {
  try {
    const res = await axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/hasilapl01`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("Authorization")}`,
      },
      data: data,
    });
    console.log(data);
    return res.data;
  } catch (err) {
    console.log(err.response);
    throw new Error(err.response);
  }
};

export const getDetailApl01 = async (id) => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/hasilapl01lengkap/${id}`,
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

export const getOneApl01 = async (id) => {
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/hasilapl01/${id}`, {
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
export const updateApl01 = async ({ data, id }) => {
  try {
    const res = await axios({
      method: "put",
      url: `http://127.0.0.1:8000/api/hasilapl01/${id}`,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("Authorization")}`,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error.response);
    throw new Error(error.response);
  }
};
