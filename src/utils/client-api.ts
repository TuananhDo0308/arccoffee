const clientUrl = 'http://localhost:3000';

const clientLinks = {
  user: {
    signin:`${clientUrl}/api/user/login`,    
    register:`${clientUrl}/api/user/register`,
    cart: `${clientUrl}/api/user/cart`,
    getProfile:`${clientUrl}/api/user/profile`,
    region: `${clientUrl}/api/user/regions`
  },
  homepage: {
    category:`${clientUrl}/api/homepage/categories`,
    menu: `${clientUrl}/api/menu`,
    product: `${clientUrl}/api/products`,
    detailProduct: `${clientUrl}/api/products/detail`
  },

  cart: {
    payments: `${clientUrl}/api/user/cart/payments`,
    shippings: `${clientUrl}/api/user/cart/shippings`,

    deleteItem: `${clientUrl}/api/user/cart/deleteitem`,
    addToCart: `${clientUrl}/api/user/cart/addtocart`,
  },

  bill: {
    completedBills: `${clientUrl}/api/user/bills/completedbills`,
    pendingBills: `${clientUrl}/api/user/bills/pendingbills`,
    detailBill: `${clientUrl}/api/user/bills/detail`,
  },

  voucher: {
    completedBills: `${clientUrl}/api/user/cart/vouchers`,
    pendingBills: `${clientUrl}/api/user/bills/vouchers/detail`,
  },
};

export default clientLinks;
