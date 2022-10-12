import jsCookie from "js-cookie";
import { axiosInstance } from "../../lib/api";
import auth_types from "../reducers/auth/type";
import qs from "qs";

export function UserLogin(values, setSubmitting) {
  return async function (dispatch) {
    try {
      let body = {
        username: values.username,
        email: values.email,
        password: values.password,
      };
      const res = await axiosInstance.post("/users/login", qs.stringify(body));

      const userData = res.data.result.user;
      const token = res.data.result.token;

      if (!userData) {
        throw new Error("User not found");
      }
      if (userData.password !== values.password) {
        throw new Error("Wrong password");
      }

      console.log(userData);

      jsCookie.set("auth_token", token);
      dispatch({
        type: auth_types.AUTH_LOGIN,
        payload: userData,
      });

      setSubmitting(false);
    } catch (err) {
      console.log(err);
      alert("Username, Email or Password wrong");

      setSubmitting(false);
    }
  };
}
