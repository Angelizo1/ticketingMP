import axios from "axios";
import { useState } from "react";

const requestHook = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      const resp = await axios[method](url, { ...body, props });
      if (onSuccess) {
        onSuccess(resp.data);
      }
      return resp.data;
    } catch (errs) {
      console.log(errs.response.data);
      setErrors(
        <div className="alert alert-danger">
          <h4>Ooooops....</h4>
          <ul className="my-0">
            {errs.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};

export default requestHook;
