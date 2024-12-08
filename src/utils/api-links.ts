const authUrl = 'http://localhost:5078';

const apiLinks = {
  user: {
    signin:`${authUrl}/api/authentication/login`,
    region: `${authUrl}/api/regions`
  },
  homepage: {
    menu:`${authUrl}/api/homepage/menu`,
    product: `${authUrl}/api/products`
  },
};

export default apiLinks;
