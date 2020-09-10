import React, { useEffect } from 'react';
import { parse } from 'query-string';
import axiosBase from 'axios';
import { saveAccessToken } from '../actions';

const Callback = (props) => {
  const saveAccessToken = async (query) => {
    const clientId = process.env.REACT_APP_SHOPIFY_API_KEY
    const clientSecret = process.env.REACT_APP_SHOPIFY_API_SECRET
    const code = query.code
    const shopOrigin = process.env.REACT_APP_SHOP_ORIGIN
    const axios = axiosBase.create({
      baseURL: process.env.REACT_APP_SAVE_ACCESS_TOKEN_ENDPOINT,
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'json'
    })
    const res = await axios.get(`/?clientId=${clientId}&clientSecret=${clientSecret}&code=${code}&shopOrigin=${shopOrigin}`)
    console.log(res)
  }

  useEffect(() => {
    const query = parse(props.location.search);
    saveAccessToken(query)
  })

  return (
    <div>callback</div>
  )
}

export default Callback