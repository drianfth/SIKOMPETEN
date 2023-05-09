import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const addIa11 = async (data) => {
  try {
    console.log(data);
    const res = await axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/hasilia11`,
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

export const getDaftarIa11 = async (id) => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/daftar-hasilIa11/${id}`,
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

export const getIa11 = async (id) => {
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/hasilia11/${id}`, {
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

export const getUnitKegiatan = async (id) => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/unit-kegiatan/${id}`,
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
