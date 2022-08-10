import { useEffect } from "react";
import Router from 'next/router';
import requestHook from "../../hooks/use-request";

const signout = () => {

  const { doRequest } = requestHook({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/')
  })

  useEffect(() => {
    doRequest();
  }, []);


  return <div> Signing you out</div>
}

export default signout;
