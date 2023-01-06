import registerApi from "../api/signup";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginApi from "../api/login";
import csrfApi from "../api/csrf";
import Cookies from "universal-cookie";
import userApi from "../api/me";
import logoutApi from "../api/logout";

const useAuth = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const cookies = new Cookies();

  const registerAccount = async (data) => {
    setLoading(true);
    try {
      const res = await registerApi({
        method: "post",
        data,
      });
      console.log(res.data);
      setResponse(res.data);
      navigate("/login", { state: "Akun Berhasil Dibuat Silahkan Login" });
    } catch (err) {
      console.log(err.response);
      setError(err.response);
    } finally {
      setLoading(false);
    }
  };
  const getCsrf = async () => {
    try {
      const res = await csrfApi();
      console.log(res.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  const login = async (data) => {
    getCsrf();
    setLoading(true);
    try {
      const res = await loginApi({
        method: "post",
        data,
      });
      console.log(res.data);
      cookies.set("Authorization", res.data.token);
      setResponse(res.data);
      navigate("/dashboard");
    } catch (err) {
      console.log(err.response.data);
      setError(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const res = await logoutApi({
        headers: { Authorization: `Bearer ${cookies.get("Authorization")}` },
      });
      console.log(res.data);
      cookies.remove("Authorization");
      setResponse(res.data);
    } catch (err) {
      console.log(err.response.data);
      setError(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const res = await userApi({
        // headers: { Authorization: `Bearer ` },
        headers: { Authorization: `Bearer ${cookies.get("Authorization")}` },
      });
      console.log(res.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  return { response, loading, error, registerAccount, login, getUser };
};

export default useAuth;
