import React from 'react';
import { connect } from 'react-redux';
import {
  Page
} from '@shopify/polaris';
import Header from './Header';

const Purchase = ({ products }) => {
  return (
    <div>
      <Header />
      <Page>
        <p>じゃんけんに勝つと500円割引！</p>
      </Page>
    </div>
  )
}

const mapStateToProps = state => ({
  products: state.productReducer.selectedProducts
})

export default connect(
  mapStateToProps
)(Purchase)
