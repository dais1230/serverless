import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from '@shopify/app-bridge/actions';
import { v4 as uuidv4 } from 'uuid';
import app from '../appBridge'

import { verifyShop } from '../actions/index';

const Auth = ({ verifyShop }) => {
  const apiKey = process.env.REACT_APP_SHOPIFY_API_KEY;
  const scopes = process.env.REACT_APP_SCOPES;
  const shopOrigin = process.env.REACT_APP_SHOP_ORIGIN;
  const nonce = uuidv4()
  const accessMode = 'offline'
  const redirectUri = process.env.REACT_APP_APPLICATION_URL + '/callback';
  const permissionUrl = `https://${shopOrigin}/admin/oauth/authorize?client_id=${apiKey}&protocol=https://&scope=${scopes}&redirect_uri=${redirectUri}&state=${nonce}&grant_options[]=${accessMode}`;

  useEffect(() => {
    let shopExist = false
    verifyShop(shopOrigin)
      .then(res => {
        shopExist = res
        if (shopExist) {
          window.location.assign(process.env.REACT_APP_APPLICATION_URL);
        } else {
          if (window.top === window.self) {
            window.location.assign(permissionUrl);
          } else {
            Redirect.create(app).dispatch(Redirect.Action.REMOTE, permissionUrl);
          }
        }
      })
      .catch(err => {
        console.log('err', err)
      })
  }, []);

  return (
    <div></div>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  verifyShop: shopOrigin => dispatch(verifyShop(shopOrigin))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth)
