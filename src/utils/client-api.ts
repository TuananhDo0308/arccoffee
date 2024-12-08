const clientUrl = 'http://localhost:3000';

const clientLinks = {
  user: {
    signin:`${clientUrl}/api/user/login`,
    region: `${clientUrl}/api/user/regions`
  },
  homepage: {
    menu: `${clientUrl}/api/menu`,
    product: `${clientUrl}/api/products`
  },
};

export default clientLinks;
