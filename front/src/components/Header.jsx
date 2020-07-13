import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const styles = {
  header: {
    backgroundColor: '#1C2260',
    height: '56px',
  },
  cart: {
    color: '#ffffff',
    marginRight: '20px',
    float: 'right'
  }
}

const Header = (selectedProducts) => {
  return (
    <div style={styles.header}>
      <Link to={'/cart'}>
        <p style={styles.cart}>カート({selectedProducts.selectedProducts.length})</p>
      </Link>
    </div>
  )
}

const mapStateToProps = state => ({
  selectedProducts: state.productReducer.selectedProducts
})

export default connect(
  mapStateToProps
)(Header)
