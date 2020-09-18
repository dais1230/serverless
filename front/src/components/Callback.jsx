import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { parse } from 'query-string';

import { saveAccessToken } from '../actions/index';

const Callback = (props) => {
  useEffect(() => {
    console.log(props)
    const query = parse(props.location.search);
    props.saveAccessToken(query)

    const redirectUri = `https://${query.shop}/admin/apps/${process.env.REACT_APP_SHOPIFY_API_KEY}`
    window.location.assign(redirectUri);
  }, [saveAccessToken]);

  return (
    <div>callback</div>
  )
}
const mapStateToProps = state => ({
  accessToken: state.authReducer.accessToken,
  products: state.productReducer.products
})

const mapDispatchToProps = (dispatch) => ({
  saveAccessToken: query => dispatch(saveAccessToken(query))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Callback)
