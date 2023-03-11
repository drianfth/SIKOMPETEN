import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getAllPaketSkema = async () => {
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/paketskema`, {
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

export const createPaketSkema = async (data) => {
  try {
    const res = await axios({
      url: `http://127.0.0.1:8000/api/paketskema`,
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

export const updatePaketSkema = async ({ data, id }) => {
  try {
    const res = await axios({
      url: `http://127.0.0.1:8000/api/paketskema/${id}`,
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

export const removePaketSkema = async (id) => {
  try {
    const res = await axios({
      url: `http://127.0.0.1:8000/api/paketskema/${id}`,
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
