import React, { useState, useEffect } from 'react'
import { useMutation, useLazyQuery } from 'react-apollo'
import { useCssHandles } from 'vtex.css-handles'

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

  useEffect(() => {
    if (product) {
      // const skuId = parseInt(inputText)

      // console.log('Mis datos:', skuId, product)

      addToCart({
        variables: {
          salesChannel: '1',
          items: [
            {
              // id: skuId,
              quantity: 1,
              seller: '1',
            },
          ],
        },
      }).then(() => {
        window.location.href = '/checkout'
      })
    }
  }, [product, search, addToCart, inputText])

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

  const CSS_HANDLES = [
    'quickOrder__container',
    'quickOrder__form',
    'quickOrder__form_info',
    'quickOrder__label',
    'quickOrder__text',
    'quickOrder__form_submit',
    'quickOrder__submit',
  ]

  const handles = useCssHandles(CSS_HANDLES)

  return (
    <div className={handles.quickOrder__container}>
      <form className={handles.quickOrder__form} onSubmit={searchProduct}>
        <div className={handles.quickOrder__form_info}>
          <label className={handles.quickOrder__label} htmlFor="sku">
            Ingresa el número sku
          </label>
          <input
            className={handles.quickOrder__text}
            id="sku"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className={handles.quickOrder__form_submit}>
          <input
            className={handles.quickOrder__submit}
            type="submit"
            value="Añadir al carrito"
          />
        </div>
      </form>
    </div>
  )
}

export default QuickOrder
