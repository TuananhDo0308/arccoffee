const authUrl = 'http://localhost:5078';

const apiLinks = {
  user: {
    signin:`${authUrl}/api/authentication/login`,
    register:`${authUrl}/api/authentication/register`,
    region: `${authUrl}/api/regions`,
  },
  homepage: {
    category:`${authUrl}/api/authentication/categories`,
    menu:`${authUrl}/api/homepage/menu`,
    product: `${authUrl}/api/products`
  },
};

export default apiLinks;
