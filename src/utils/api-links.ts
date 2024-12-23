const authUrl = 'http://localhost:5000';

const apiLinks = {
  user: {
    signin:`${authUrl}/api/authentication/login`,
    register:`${authUrl}/api/authentication/register`,
    updateProfile:`${authUrl}/api/authentication/profile`,
    getProfile:`${authUrl}/api/authentication/profile`,
    region: `${authUrl}/api/regions`,
  },

  homepage: {
    category:`${authUrl}/api/categories`,
    menu:`${authUrl}/api/homepage/menu`,
    product: `${authUrl}/api/products/available`, //chỉ hiển thị những sp có sẵn cho người dùng
    getDetailProduct: `${authUrl}/api/products`//
  },

  cart: {
    getCart: `${authUrl}/api/orders/cart`,//
    addToCart: `${authUrl}/api/orders/new-item`,//
    deleteItem: `${authUrl}/api/orders`,//
    addListCart: `${authUrl}/api/orders/all-items`,//

  },

  bill: {
    getBills: `${authUrl}/api/bills`,
    getCompletedBills: `${authUrl}/api/bills/completed-bills`,
    getPendingBills: `${authUrl}/api/bills/pending-bills`,
    getDetailBills: `${authUrl}/api/bills`,
    checkout: `${authUrl}/api/bills/payment`,
  },
  payment: {
    getPayments: `${authUrl}/api/payments`,
  },

  shipping: {
    getShippings: `${authUrl}/api/shippingmethods`,
  },

  voucher: {
    getVouchers: `${authUrl}/api/vouchers`,
    getDetailVoucher: `${authUrl}/api/vouchers`,
  },
};

export default apiLinks;
