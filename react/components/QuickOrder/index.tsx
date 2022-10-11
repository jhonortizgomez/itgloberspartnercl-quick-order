import React, { useState, useEffect } from 'react'
import { useMutation, useLazyQuery } from 'react-apollo'

import UPDATE_CART from '../../graphql/updateCart.graphql'
import GET_PRODUCT from '../../graphql/getProductBySku.graphql'

const QuickOrder = () => {
  const [inputText, setInputText] = useState('')
  const [search, setSearch] = useState('')
  const [getProductData, { data: product }] = useLazyQuery(GET_PRODUCT)
  const [addToCart] = useMutation(UPDATE_CART)

  const handleChange = (e: any) => {
    // console.log('input changed', inputText)
    setInputText(e.target.value)
  }

  // useEffect(() => {
  //   if (product) {
  //     const skuId = parseInt(inputText)

  //     // console.log('Mis datos:', skuId, product)

  //     addToCart({
  //       variables: {
  //         salesChannel: '1',
  //         items: [
  //           {
  //             id: skuId,
  //             quantity: 1,
  //             seller: '1',
  //           },
  //         ],
  //       },
  //     }).then(() => {
  //       window.location.href = '/checkout'
  //     })
  //   }
  // }, [product, search, addToCart, inputText])

  const addProductToCart = () => {
    getProductData({
      variables: {
        sku: inputText,
      },
    })
  }

  const searchProduct = (e: any) => {
    e.preventDefault()
    if (inputText) {
      setSearch(inputText)
      // console.log('al final estamos buscando', inputText)
      addProductToCart()
    } else {
      alert('ingrese algo')
    }
  }

  return (
    <div>
      <h2>Compra rápida de Sony</h2>
      <form onSubmit={searchProduct}>
        <div>
          <label htmlFor="sku">Ingresa el número sku</label>
          <input id="sku" type="text" onChange={handleChange} />
        </div>
        <input type="submit" value="Añadir al carrito" />
      </form>
    </div>
  )
}

export default QuickOrder
