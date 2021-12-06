import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

const queryAllCategories = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('categoria').find({}).limit(50).toArray(callback);
};

const crearCategoria = async (datosCategoria, callback) => {
  if (
    Object.keys(datosCategoria).includes('name') &&
    Object.keys(datosCategoria).includes('description') 
  ) {
    const baseDeDatos = getDB();
    // implementar código para crear vehículo en la BD

    await baseDeDatos.collection('categoria').insertOne(datosCategoria, callback);
  } else {
    return 'error';
  }
};

const consultarCategoria = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('categoria').findOne({ _id: new ObjectId(id) }, callback);
};

const editarCategoria = async (id, edicion, callback) => {
  const filtroCategoria = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('categoria')
    .findOneAndUpdate(filtroCategoria, operacion, { upsert: true, returnOriginal: true }, callback);
};

const eliminarCategoria = async (id, callback) => {
  const filtroCategoria = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('categoria').deleteOne(filtroCategoria, callback);
};

export { queryAllCategories, crearCategoria, consultarCategoria, editarCategoria, eliminarCategoria};
