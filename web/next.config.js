require('dotenv').config();

module.exports = {
  env: {
    CLIENT_URL: process.env.CLIENT_URL,
    STRIPE_PUBLISHABLE: process.env.STRIPE_PUBLISHABLE,
    LINKEDIN_URL: process.env.LINKEDIN_URL,
    GOOGLE_URL: process.env.GOOGLE_URL,
    FACEBOOK_URL: process.env.FACEBOOK_URL,
  },
};
