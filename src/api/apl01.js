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

// export default jadwalApi;
