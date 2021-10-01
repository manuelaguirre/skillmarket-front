const {
    VUE_APP_API_URL = 'http://localhost:3000',
    // eslint-disable-next-line no-undef
} = process.env;

// eslint-disable-next-line no-undef
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export {VUE_APP_API_URL as API_URL};
export {IS_PRODUCTION as IS_PRODUCTION};
