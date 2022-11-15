import React from 'react';


const ProductsTableRow = ({
    item = {
        id: '',
        code: '',
        name: ''
    }
}) => {

    const {
        id = '',
        code = '',
        name = ''
    } = item;

    return <tr>
        <th scope="row">{ `${ id }` }</th>
        <td>{ `${ code }` }</td>
        <td>{ `${ name }` }</td>
        <td>
            <div className="button-list">
                <a href={ `/control-panel/product-card?id=${ id }` }
                   className="btn btn-success-rgba"
                   target="_blank"
                   ><i className="feather icon-edit-2"></i></a>
            </div>
        </td>
    </tr>;
};

export default ProductsTableRow;
