class IndexController {
  constructor() {

  }
  index() {
    return async (ctx, next) => {
      ctx.body = await ctx.render('index')
    }
  }
}

export default IndexController;
