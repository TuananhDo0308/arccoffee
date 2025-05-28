const authUrl = 'http://dotnet.aaateammm.online';

const apiLinks = {
  user: {
    signin:`${authUrl}/api/authentication/login`,
    register:`${authUrl}/api/authentication`,
    updateProfile:`${authUrl}/api/authentication`,
    getProfile:`${authUrl}/api/authentication`,
    region: `${authUrl}/api/regions`,
    getmail: `${authUrl}/api/authentication/email`
  },

  homepage: {
    category:`${authUrl}/api/categories`,
    menu:`${authUrl}/api/homepage/menu`,
    product: `${authUrl}/api/products/available`, //chỉ hiển thị những sp có sẵn cho người dùng
    getDetailProduct: `${authUrl}/api/products`//
  },

  cart: {
    getCart: `${authUrl}/api/orders`,//
    addToCart: `${authUrl}/api/orders/item`,//
    deleteItem: `${authUrl}/api/orders/item`,//
    addListCart: `${authUrl}/api/orders/items`,//
    updateQuantity: `${authUrl}/api/orders`,
  },

  bill: {
    placeOrder: `${authUrl}/api/bills`,//
    getBills: `${authUrl}/api/bills`,
    getDetailBills: `${authUrl}/api/bills`,
    checkout: `${authUrl}/api/bills`,
  },
  payment: {
    getPayments: `${authUrl}/api/payments`,
  },

  shipping: {
    getShippings: `${authUrl}/api/shippings`,
  },

  voucher: {
    getVouchers: `${authUrl}/api/vouchers/public`,
    getDetailVoucher: `${authUrl}/api/vouchers/detail`,
  },

  authen:{
    updatePassword: `${authUrl}/api/authentication/password`,
    googlesignin: `${authUrl}/api/authentication/login/google`,
    registerGoogle:`${authUrl}/api/authentication/google`,
  }
};

export default apiLinks;
