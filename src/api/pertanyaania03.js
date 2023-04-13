import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

//get pertanyaan ia03 filter by schema id
export const getPertanyaanIa03 = async (id) => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/pertanyaania03/${id}`,
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
