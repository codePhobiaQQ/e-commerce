import React from 'react';
import ProductsTableRow from './components/products-table-row';


const ProductsTable = ({
    products = () => []
}) => {

    return <div className="table-responsive">
        <table className="table table-borderless">
        <thead>
            <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Name</th>
            <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            { products.map(item => {

                const { id = '' } = item;

                return <ProductsTableRow key={ `ptr${ id }` } item={ item } />
            }) }
        </tbody>
        </table>
    </div>
};

export default ProductsTable;
