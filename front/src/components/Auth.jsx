import React, { useEffect } from 'react';
import { Redirect } from '@shopify/app-bridge/actions';
import { v4 as uuidv4 } from 'uuid';
import instance from '../sessionToken';

const Auth = () => {
  const apiKey = process.env.REACT_APP_SHOPIFY_API_KEY;
  const scopes = process.env.REACT_APP_SCOPES;
  const shopOrigin = process.env.REACT_APP_SHOP_ORIGIN;
  const nonce = uuidv4()
  const accessMode = 'offline'
  const redirectUri = process.env.REACT_APP_APPLICATION_URL + '/callback';
  const permissionUrl = `https://${shopOrigin}/admin/oauth/authorize?client_id=${apiKey}&protocol=https://&scope=${scopes}&redirect_uri=${redirectUri}&state=${nonce}&grant_options[]=${accessMode}`;


  // const shopExist = async (shopOrigin) => {
  //   const axios = axiosBase.create({
  //     baseURL: process.env.REACT_APP_PUBLIC_API_URL,
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     responseType: 'json'
  //   })
  //   const res = await axios.get('/shop/exist'+'?shop='+ shopOrigin)
  //   if(res.data.exist){
  //     return true
  //   }else{
  //     return false
  //   }
  // }

  useEffect(() => {
    // shopExist = shopExist(shopOrigin)
    // if(shopExist){
    //   // If the current window is the 'parent', change the URL by setting location.href
    //   if (window.top === window.self) {
    //     window.location.assign(process.env.REACT_APP_APPLICATION_URL);
    //   // If the current window is the 'child', change the parent's URL with Shopify App Bridge's Redirect action
    //   } else {
    //     Redirect.create(app).dispatch(Redirect.Action.ADMIN_PATH, process.env.REACT_APP_APPLICATION_URL + '/top');
    //   }
    // }
    if (window.top === window.self) {
      console.log('aaa')
      window.location.assign(permissionUrl);
    // If the current window is the 'child', change the parent's URL with Shopify App Bridge's Redirect action
    } else {
      console.log('bbb')
      Redirect.create(window.app).dispatch(Redirect.Action.REMOTE, permissionUrl);
    }
  });

  return (
    <div>auth</div>
  )
}

export default Auth
