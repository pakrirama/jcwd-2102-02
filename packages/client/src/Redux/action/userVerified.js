import { axiosInstance } from "../../lib/api";
import qs from "qs";

export function UserVerified(values, setSubmitting) {
 return async function (dispatch) {
 try {
      let body = {
        verified_status: values.verified_status,
      };

      const res = await axiosInstance.patch(`/users/verify/:vertoken${values.id}`, qs.stringify(body));

      setSubmitting(false);
    } catch (err) {
      console.log(err);

      setSubmitting(false);
    }
 }
}