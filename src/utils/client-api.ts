const clientUrl = 'http://localhost:3000';

const clientLinks = {
  user: {
    signin:`${clientUrl}/api/user/login`,    
    register:`${clientUrl}/api/user/register`,
    region: `${clientUrl}/api/user/regions`,
    cart: `${clientUrl}/api/user/cart`,
    
  },
  homepage: {
    category:`${clientUrl}/api/homepage/categories`,
    menu: `${clientUrl}/api/menu`,
    product: `${clientUrl}/api/products`
  },

  cart: {
    payments: `${clientUrl}/api/user/cart/payments`,
    shippings: `${clientUrl}/api/user/cart/shippings`,
  },
};

export default clientLinks;
