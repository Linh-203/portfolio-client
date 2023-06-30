import instanse from './instanse';

const getAllCate = () => {
  return instanse.get('/categories');
};

const getOneCate = (id) => {
  return instanse.get('/categories/' + id);
};
const createCategory = (category) => {
  return instanse.post('/categories', category);
};
const deleteCate = (id) => {
  return instanse.delete('/categories/' + id);
};
const updateCate = (id, product) => {
  return instanse.patch('/categories/' + id, product);
};
export { getAllCate, getOneCate, deleteCate, createCategory, updateCate };
