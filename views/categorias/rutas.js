import Express from 'express';
import {
  queryAllCategories,
  crearCategoria,
  editarCategoria,
  eliminarCategoria,
  consultarCategoria,
} from '../../controllers/categorias/controller.js';

const rutasCategoria = Express.Router();

const genercCallback = (res) => (err, result) => {
  if (err) {
    console.log('error', err);
    res.status(500).json({ error: err });
  } else {
    res.json(result);
  }
};

rutasCategoria.route('/categorias').get((req, res) => {
  console.log('alguien hizo get en la ruta /categorias');
  queryAllCategories(genercCallback(res));
});

rutasCategoria.route('/categorias').post((req, res) => {
  crearCategoria(req.body, genercCallback(res));
});

rutasCategoria.route('/categorias/:id').get((req, res) => {
  console.log('alguien hizo get en la ruta /categorias');
  consultarCategoria(req.params.id, genercCallback(res));
});

rutasCategoria.route('/categorias/:id').patch((req, res) => {
  editarCategoria(req.params.id, req.body, genercCallback(res));
});

rutasCategoria.route('/categorias/:id').delete((req, res) => {
  eliminarCategoria(req.params.id, genercCallback(res));
});

export default rutasCategoria;
