const express = require('express')
const joyride = express()

const getRawBody = require('raw-body')
const crypto = require('crypto')
const secretKey = '58b07d555d7c8b5aa3d76cfcf1db61f6b7dd1a729e116d8d7454fa69cdd01ac6'

joyride.post('/webhooks/orders/create', async (req, res) => {
    console.log('order created')
  
    // We'll compare the hmac to our own hash
    const hmac = req.get('X-Shopify-Hmac-Sha256')
  
    // Use raw-body to get the body (buffer)
    const body = await getRawBody(req)
  
    // Create a hash using the body and our key
    const hash = crypto
      .createHmac('sha256', secretKey)
      .update(body, 'utf8', 'hex')
      .digest('base64')
  
    // Compare our hash to Shopify's hash
    if (hash === hmac) {
      // It's a match! All good
      console.log('shopify request')
      res.sendStatus(200)
    } else {
      // No match! This request didn't originate from Shopify
      console.log('not shopify request')
      res.sendStatus(403)
    }

    const order = JSON.parse(body.toString())
    //console.log(order)

    const fname = order.customer.first_name
    const lname = order.customer.last_name
    const address = order.shipping_address.address1
    const city = order.shipping_address.city
    const state = order.shipping_address.province
    const country = order.shipping_address.country 
    const price = order.total_price
    const tax = order.total_tax 
    
    // console.log(fname)
    // console.log(lname)
    // console.log(address)
    // console.log(city)
    // console.log(state)
    // console.log(country)
    // console.log(price)
    // console.log(tax)
    console.log(order)

    const customerName = fname + ' ' + lname

    const golf_cart = ["0060", "Icon/2022", "AL78EQ"]
    const moke = ["Moke", "2023/Moke", "BR22WY"]

    // for (var key in order.line_items){
    //   console.log(key)
    //   switch (key.name){
    //     case 'Golf Cart Rental':
    //       const powerFormUrl1 = `https://na4.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=fc95144b-6613-4e60-a1a1-4d2caa29261c&env=na4&acct=42ac23a3-ae2f-4227-98bf-ebc060cc5384&v=2&Renter_Renter=${encodeURIComponent(customerName)}&Renter_Address=${encodeURIComponent(address)}&Renter_City=${encodeURIComponent(city)}&Renter_State=${encodeURIComponent(state)}&Renter_Cart_Number=${encodeURIComponent(golf_cart[0])}&Renter_Year/Make/Model=${encodeURIComponent(golf_cart[1])}&Renter_License=${encodeURIComponent(golf_cart[2])}`
    //       console.log(powerFormUrl1);
    //     case 'Electric Moke Rental':
    //       const powerFormUrl2 = `https://na4.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=fc95144b-6613-4e60-a1a1-4d2caa29261c&env=na4&acct=42ac23a3-ae2f-4227-98bf-ebc060cc5384&v=2&Renter_Renter=${encodeURIComponent(customerName)}&Renter_Address=${encodeURIComponent(address)}&Renter_City=${encodeURIComponent(city)}&Renter_State=${encodeURIComponent(state)}&Renter_Cart_Number=${encodeURIComponent(moke[0])}&Renter_Year/Make/Model=${encodeURIComponent(moke[1])}&Renter_License=${encodeURIComponent(moke[2])}`
    //       console.log(powerFormUrl2)
    //   }
    
    // }
    if (order.line_items.name = "Golf Cart Rental") {
      const powerFormUrl1 = `https://na4.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=fc95144b-6613-4e60-a1a1-4d2caa29261c&env=na4&acct=42ac23a3-ae2f-4227-98bf-ebc060cc5384&v=2&Renter_Renter=${encodeURIComponent(customerName)}&Renter_Address=${encodeURIComponent(address)}&Renter_City=${encodeURIComponent(city)}&Renter_State=${encodeURIComponent(state)}&Renter_Cart_Number=${encodeURIComponent(golf_cart[0])}&Renter_Year/Make/Model=${encodeURIComponent(golf_cart[1])}&Renter_License=${encodeURIComponent(golf_cart[2])}&Renter_Tax=${encodeURIComponent(tax)}&Renter_Total=${encodeURIComponent(price)}`
      console.log(powerFormUrl1)
    }

    if (order.line_items.name = "Electric Moke Rental") {
      const powerFormUrl2 = `https://na4.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=fc95144b-6613-4e60-a1a1-4d2caa29261c&env=na4&acct=42ac23a3-ae2f-4227-98bf-ebc060cc5384&v=2&Renter_Renter=${encodeURIComponent(customerName)}&Renter_Address=${encodeURIComponent(address)}&Renter_City=${encodeURIComponent(city)}&Renter_State=${encodeURIComponent(state)}&Renter_Cart_Number=${encodeURIComponent(moke[0])}&Renter_Year/Make/Model=${encodeURIComponent(moke[1])}&Renter_License=${encodeURIComponent(moke[2])}&Renter_Tax=${encodeURIComponent(tax)}&Renter_Total=${encodeURIComponent(price)}`
      console.log(powerFormUrl2)

    }
    console.log(order)

    //https://na4.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=fc95144b-6613-4e60-a1a1-4d2caa29261c&env=na4&acct=42ac23a3-ae2f-4227-98bf-ebc060cc5384&v=2

    //const powerFormUrl = `https://na4.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=fc95144b-6613-4e60-a1a1-4d2caa29261c&env=na4&acct=42ac23a3-ae2f-4227-98bf-ebc060cc5384&v=2&Renter_Renter=${encodeURIComponent(customerName)}&Renter_Address=${encodeURIComponent(address)}&Renter_City=${encodeURIComponent(city)}&Renter_State=${encodeURIComponent(state)}`
    //console.log(powerFormUrl)
    // Renter, Cell, Address, City, State, Zip
  })



joyride.listen(3000, () => console.log('joyride listening on port 3000'))


// edge cases to deal with:
// if someone rents a moke and a golf cart, just put golf cart/moke price separately in each powerform link
