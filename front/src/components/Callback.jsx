import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { parse } from 'query-string';

import { saveAccessToken, setSessionToken } from '../actions/index';

const Callback = (props) => {
  useEffect(() => {
    const query = parse(props.location.search);
    props.saveAccessToken(query)

    const redirectUri = `https://${query.shop}/admin/apps/${process.env.REACT_APP_SHOPIFY_API_KEY}`
    window.location.assign(redirectUri);
  }, [props]);

  useEffect(() => {
    props.setSessionToken()
  }, [props])

  return (
    <div></div>
  )
}
const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  saveAccessToken: query => dispatch(saveAccessToken(query)),
  setSessionToken: () => dispatch(setSessionToken())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Callback)
