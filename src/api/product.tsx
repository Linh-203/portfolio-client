import instanse from './instanse';
// const token = JSON.parse(localStorage.getItem('token'));
const getAllProduct = () => {
  return instanse.get('/products/?_expand=category');
};
const deleteProduct = (id) => {
  return instanse.delete('/products/' + id);
};
const addProduct = (product) => {
  return instanse.post('/products', product);
};
const updateProduct = (id, product) => {
  return instanse.patch('/products/' + id, product);
};
export { getAllProduct, deleteProduct, addProduct, updateProduct };
