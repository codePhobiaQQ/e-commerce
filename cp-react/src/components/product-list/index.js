import React from "react";
import { observer } from "mobx-react-lite";
import productListStateInstance from "./state";
import ProductsTable from "./components/products-table";
import ReactDOM from 'react-dom';
import CreateProductModalForProductList from './components/create-product-modal';


const ProductList = observer(() => {

    return <div className="row">
        <div className="col-lg-12">
            <div className="card m-b-30">
                <div className="card-header">                
                    <div className="row align-items-center">
                        <div className="col-6">
                            <h5 className="card-title mb-0">Товары</h5>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="text-right m-b-15">
                        <CreateProductModalForProductList />
                    </div>

                    <div>
                        <ProductsTable products={ productListStateInstance.products } />
                    </div>
                </div>
            </div>
        </div>
    </div>
});

const renderProductList = () => {
    const root = document.getElementById('product-list-root');
    if (root !== null) {
        ReactDOM.render(<ProductList />, root);
    }
};

export default renderProductList;
