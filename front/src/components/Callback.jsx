import React, { useEffect } from 'react';
import { parse } from 'query-string';
import axiosBase from 'axios';

const Callback = (props) => {
  const oauth = async (query) => {
    const axios = axiosBase.create({
      baseURL: process.env.REACT_APP_PUBLIC_API_URL,
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'json'
    })
    const res = await axios.get(`/oauth?code=${query.code}&shop=${query.shop}&hmac=${query.hmac}&state=${query.state}&timestamp=${query.timestamp}`)
    return res
  }

  useEffect(() => {
    /**
     *  Step 3: Confirm installation
     *  3-1. Shopify アプリインストール確認画面で同意したら callback される
     */

    const query = parse(props.location.search);
    /**
     *  3-2.hmac の検証
     *  3-3.access_token,scope の取得と永続化
     */
    const token = oauth(query)
    /**
     *  Redirect
     */
    const redirectUri = `https://${query.shop}/admin/apps/${process.env.REACT_APP_SHOPIFY_API_KEY}/top`
    window.location.assign(redirectUri);
  })

  return (
    <div>callback</div>
  )
}

export default Callback