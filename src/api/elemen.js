import axios from "axios";
import Cookies from "universal-cookie";
import useAuth from "../hooks/useAuth";

const cookies = new Cookies();

// const { logout } = useAuth();
export const getElemen = async (id) => {
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/elemen/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("Authorization")}`,
      },
    });

    return res.data;
  } catch (err) {
    console.log(err.response);
    // logout();
    throw new Error(err.response);
  }
};
export const getSubElemen = async (id) => {
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/sub-elemen/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("Authorization")}`,
      },
    });

    return res.data;
  } catch (err) {
    console.log(err.response);
    // logout();
    throw new Error(err.response);
  }
};
