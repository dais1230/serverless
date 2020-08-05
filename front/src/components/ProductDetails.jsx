import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Button,
  Page
} from '@shopify/polaris';
import Header from './Header';
import {
  fetchProducts,
  addProduct,
  removeProduct
} from '../actions/index';

const styles = {
  buttons: {
    width: '320px',
    margin: '0px',
    display: 'flex',
    justifyContent: 'space-between'
  }
}

const ProductDetails = ({
  products,
  selectedProducts,
  fetchProducts,
  addProduct,
  removeProduct
}) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  // for preventing infinite loop, make second useEffect for setting product
  useEffect(() => {
    if (products) {
      setProduct(products.find(p => p.id === parseInt(productId, 10)))
    }
  }, [products, productId])

  const handleClickAdd = () => {
    addProduct(product)
  }

  const handleClickRemove = () => {
    removeProduct(product.id)
  }

  const selectedProductsCount = () => {
    return selectedProducts.filter(sp => sp.id === product.id).length
  }

  return (
    <div>
      <Header />
      <Page>
        {product &&
          <div>
            <p>{product.title} / {product.price}円</p>
            <img alt="product_img" src={product.images} width="64px" height="64px" />
            <div style={styles.buttons}>
              <Button onClick={handleClickRemove}>カートから削除</Button>
              <Button onClick={handleClickAdd}>カートに追加</Button>
              <p style={{margin: '0'}}>個数: {selectedProductsCount()}個</p>
            </div>
          </div>
        }
      </Page>
    </div>
  )
}

const mapStateToProps = state => ({
  products: state.productReducer.products,
  selectedProducts: state.productReducer.selectedProducts
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
  addProduct: product => dispatch(addProduct(product)),
  removeProduct: id => dispatch(removeProduct(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetails)
