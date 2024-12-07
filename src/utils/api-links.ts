const authUrl = 'http://localhost:5000';

const apiLinks = {
  user: {
    signin:`${authUrl}/api/authentication/login`,
    region: `${authUrl}/api/regions`
  },
  homepage: {
    menu:`${authUrl}/api/homepage/menu`,
  },
};

export default apiLinks;
