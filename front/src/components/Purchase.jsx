import React from 'react';
import { connect } from 'react-redux';
import {
  Page
} from '@shopify/polaris';
import Header from './Header';

import gu from '../assets/img/gu.png'
import choki from '../assets/img/choki.png'
import pa from '../assets/img/pa.png'

const styles = {
  cursor: {
    cursor: 'pointer'
  }
}

const Purchase = ({ products }) => {
  const handleClick = (userHand) => {
    console.log(userHand)
  }
  return (
    <div>
      <Header />
      <Page>
        <p>じゃんけんに勝つと500円割引！</p>
        <img onClick={() => handleClick('gu')} src={gu} style={styles.cursor} height="100" alt="gu" />
        <img onClick={() => handleClick('choki')} src={choki} style={styles.cursor} height="100" alt="choki" />
        <img onClick={() => handleClick('pa')} src={pa} style={styles.cursor} height="100" alt="pa" />
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
