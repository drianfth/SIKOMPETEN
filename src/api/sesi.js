import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getSesi = async (id) => {
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/sesi/${id}`, {
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
export const getSesiNow = async (id) => {
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/whosesi/${id}`, {
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

export const getPeserta = async (id) => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/sesi/peserta/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("Authorization")}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    console.log(err.response);
    throw new Error(err.response);
  }
};

export const getPesertaAsesor = async (id1, id2) => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/asesiAsesor/${id1}/${id2}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("Authorization")}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    console.log(err.response);
    throw new Error(err.response);
  }
};

export const createSesi = async (data) => {
  try {
    const res = await axios({
      url: `http://127.0.0.1:8000/api/sesi`,
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

export const removeSesi = async (id) => {
  try {
    const res = await axios({
      url: `http://127.0.0.1:8000/api/sesi/${id}`,
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

export const updateSesi = async ({ data, id }) => {
  console.log(id);
  try {
    const res = await axios({
      url: `http://127.0.0.1:8000/api/sesi/${id}`,
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
