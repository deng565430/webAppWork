import IndexController from './IndexController';


const indexController = new IndexController()
const InitController = {
  getAllrouters(app, router) {
    app.use(router(_ => {
      _.get('/', indexController.index())
    }))
  }
}

export default InitController;
