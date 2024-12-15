const clientUrl = 'http://localhost:3000';

const clientLinks = {
  user: {
    signin:`${clientUrl}/api/user/login`,    
    register:`${clientUrl}/api/user/register`,
    region: `${clientUrl}/api/user/regions`
  },
  homepage: {
    category:`${clientUrl}/api/homepage/categories`,
    menu: `${clientUrl}/api/menu`,
    product: `${clientUrl}/api/products`
  },
};

export default clientLinks;
