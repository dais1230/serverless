export const ADD_PRODUCT = 'ADD_PRODUCT'
// export const GO_PRODUCT_DETAIL = 'GO_PRODUCT_DETAIL'


// export function addProduct(product) {
//   return { type: ADD_PRODUCT, product }
// }

export const addProduct = (products) => ({
  type: ADD_PRODUCT,
  payload: {
    products
  }
})

// export const addProduct = () => {
//   return {
//     type: ADD_PRODUCT,
//   }
// }

// export const goProductDetail = productId => ({
//   type: types.GO_PRODUCT_DETAIL,
//   payload: {
//     productId
//   }
// })
