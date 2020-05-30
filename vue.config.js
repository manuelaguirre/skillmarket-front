// eslint-disable-next-line no-undef
module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'Skill Market';
                return args;
            });
    },
};
