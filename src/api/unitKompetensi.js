import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getUnitKompetensi = async (id) => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/unit_kompetensi/${id}`,
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
