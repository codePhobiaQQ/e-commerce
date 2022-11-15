import React, { useEffect } from "react";
import {observer} from "mobx-react-lite";
import ReactDOM from "react-dom";
import UpdateProductForm from "./components/product-editor/components/update-product-form";
import { UrlParser } from 'url-params-parser'
import productCardStateInstance from "./state";
import ProductImageEditor from './components/product-image-editor';
import CreateProductImageModal from './components/create-product-image-modal';
import PropertyEditor from './components/property-editor';


const ProductCard = observer(() => {

    useEffect(() => {
        const { id = null } = UrlParser(document.location.href).queryParams;

        if (id) {
            productCardStateInstance.id = parseInt(id);
        }

    }, []);

    return <>
        <div className="row">
            <div className="col-12">
                <div className="card m-b-30">
                    <div className="card-header">
                        <h5 className="card-title">Изображения</h5>
                    </div>

                    <div className="card-body">
                        <div className="col-12 m-b-15">
                            <div className="text-right">
                                <CreateProductImageModal btnClasses="btn btn-outline-info" productId={ productCardStateInstance.id } />
                            </div>
                        </div>

                        <div className="col-12">
                            <ProductImageEditor />
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-sm-3 col-12">
                <div className="card m-b-30">
                    <div className="card-header">
                        <h5 className="card-title">Основные</h5>
                    </div>

                    <div className="card-body">
                        <UpdateProductForm />
                    </div>

                </div>
            </div>

            <div className="col-sm-6 col-12">
                <div className="card m-b-30">
                    <div className="card-header">
                        <h5 className="card-title">Свойства</h5>
                    </div>

                    <div className="card-body">
                        <PropertyEdчtor />
                    </div>

                </div>
            </div>

        </div>
    </>
});

const renderProductCard = () => {
    const root = document.getElementById('product-card-root');
    if (root !== null) {
        ReactDOM.render(<ProductCard />, root);
    }
};

export default renderProductCard;
