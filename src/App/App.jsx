import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
// import ProductDetailPage from './pages/ProductDetail';
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
} from '../api/product';
import {
  createCategory,
  deleteCate,
  getAllCate,
  updateCate,
} from '../api/category';
import ProductManagementPage from '../Pages/admin/ProductManagement';
import AddProductPage from '../Pages/admin/AddProduct';
import UpdateProductPage from '../Pages/admin/UpdateProduct';
import CategoryManagementPage from '../Pages/admin/CategoryManagementPage';
import AddCategory from '../Pages/admin/AddCategory';
import UpdateCategoryPage from '../Pages/admin/UpdateCategory';
import WebsiteLayout from '../Pages/layouts/WebsiteLayout';
import HomePage from '../Pages/HomePage';
import AdminLayout from '../Pages/layouts/AdminLayout';
import Dashboard from '../Pages/admin/Dashboard';
import Detail from '../Pages/Detail';
function App() {
  const [products, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    getAllProduct()
      .then(({ data }) => setProduct(data))
      .catch(({ response }) => {
        alert(response.data.message);
      });
  }, []);
  useEffect(() => {
    getAllCate()
      .then(({ data }) => setCategory(data))
      .catch(({ response }) => {
        alert(response.data.message);
      });
  }, []);
  const onHandleRemove = async (id) => {
    // fetch('http://localhost:3000/products/' + id, {
    //   method: 'DELETE'
    // }).then(() => setProduct(products.filter(product => product.id !== id)))
    await deleteProduct(id)
      .then(() => {
        getAllProduct().then(({ data }) => setProduct(data));
        navigate('/admin/products');
      })
      .catch(({ response }) => {
        alert(response.data.message);
      });
  };
  const onHandleAdd = (product) => {
    addProduct(product)
      .then(() => {
        getAllProduct().then(({ data }) => setProduct(data));
        alert('successfully added');
        navigate('/admin/products');
      })
      .catch(({ response }) => alert(response.data.message));
  };
  const onHandleUpdate = async (id, product) => {
    await updateProduct(id, product)
      .then(() => {
        getAllProduct().then(({ data }) => setProduct(data));
        alert('successfully updated');
        navigate('/admin/products');
      })
      .catch(({ response }) => {
        alert(response.data.message);
      });
  };

  // ------------------------------CATE---------------------
  const onHandleRemoveCate = async (id) => {
    await deleteCate(id)
      .then(() => {
        getAllCate().then(({ data }) => setCategory(data));
        navigate('/admin/category');
      })
      .catch(({ response }) => {
        alert(response.data.message);
      });
  };
  const onHandleAddCategory = (cate) => {
    createCategory(cate)
      .then(() => {
        getAllCate().then(({ data }) => setCategory(data));
        navigate('/admin/category');
      })
      .catch(({ response }) => alert(response.data.message));
  };
  const onHandleUpdateCategory = (id, product) => {
    console.log(id, product);

    updateCate(id, product)
      .then(() => {
        getAllCate().then(({ data }) => setCategory(data));
        navigate('/admin/category');
      })
      .catch(({ response }) => {
        alert(response.data.message);
      });
  };
  console.log(products);
  return (
    <div className="App">
      {/* <>
        <NavBar />
        <Hero />
        <About />
        <Projects products={products} />
        <Skills />
        <Contact />
      </> */}
      <Routes>
        {/* -------------------------------------WEBSITE-------------------------------------------- */}
        <Route path="/" element={<WebsiteLayout />}>
          <Route index element={<HomePage products={products} />} />
          <Route path="products/:id" element={<Detail />} />
        </Route>
        <Route path="" element></Route>
        {/* -------------------------------------ADMIN-------------------------------------------- */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="products">
            <Route
              index
              element={
                <ProductManagementPage
                  products={products}
                  onRemove={onHandleRemove}
                />
              }
            />
            <Route
              path=":id/update"
              element={
                <UpdateProductPage
                  products={products}
                  onUpdate={onHandleUpdate}
                />
              }
            />
            <Route
              path="add"
              element={<AddProductPage onAdd={onHandleAdd} />}
            />
          </Route>
          <Route path="category">
            <Route
              index
              element={
                <CategoryManagementPage
                  category={category}
                  onRemoveCate={onHandleRemoveCate}
                />
              }
            />
            <Route
              path="add"
              element={<AddCategory onAddCategory={onHandleAddCategory} />}
            />
            <Route
              path=":id/update"
              element={
                <UpdateCategoryPage
                  category={category}
                  onUpdateCate={onHandleUpdateCategory}
                />
              }
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
