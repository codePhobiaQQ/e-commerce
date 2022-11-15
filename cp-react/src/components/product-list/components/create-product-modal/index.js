import React from 'react';
import CreateProductModal from '../../../product-card/components/create-product-modal';
import productListStateInstance from '../../state';


const CreateProductModalForProductList = () => {
  return <CreateProductModal getVendors={ () => productListStateInstance.vendors } btnClasses={ 'btn btn-outline-info' } />
};

export default CreateProductModalForProductList;
