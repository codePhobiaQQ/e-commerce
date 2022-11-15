import {makeAutoObservable, observe} from "mobx";
import updateProductFormStateInstance from "./components/product-editor/components/update-product-form/state";
import axios from 'axios';
import productImageEditorStateInstance from './components/product-image-editor/state';
import propertyEditorStateInstance from './components/property-editor/state';


class ProductCardState {

    id = null

    vendorsDict = [
        {value: '1', label: 'Apple'},
        {value: '2', label: 'Sony'}
    ]

    getVendor = () => this.vendorsDict

    constructor() {
        makeAutoObservable(this)

        this.reloadVendorsDict();
    }

    reloadVendorsDict() {
        axios
            .post('/api/v1/private/vendor/dict')
            .then(({ data = {} }) => {
                const { payload = [] } = data;
                this.vendorsDict = payload.map(item => {
                    return {
                        value: item.id,
                        label: item.name
                    };
                });
            });
    }
}

const productCardStateInstance = new ProductCardState();
updateProductFormStateInstance.getVendors = () => productCardStateInstance.getVendor();

observe(productCardStateInstance, change => {
    if (change.name === 'id') {
        updateProductFormStateInstance.id = productCardStateInstance.id;
        productImageEditorStateInstance.id = productCardStateInstance.id;
        propertyEditorStateInstance.id = productCardStateInstance.id;
    }
});

export default productCardStateInstance;
