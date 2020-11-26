module.exports = {
  plugins: {
    autoprefixer: {
      // browsers: ['Android >= 4.0', 'iOS >= 8'],
    }, // 注释掉,在broser里面添加
    'postcss-pxtorem': {
      rootValue: 37.5, // vant按照750设计,这里不太懂
      propList: ['*']
    }
  }
}
