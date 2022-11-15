import { intercept, makeAutoObservable } from "mobx";
import axios from "axios";

class UpdateProductFormState {

    isAwait = false

    id = null

    formData = {
        code: '',
        vendorId: null,
        name: '',
        length: 0,
        width: 0,
        height: 0,
        mass: 0
    }

    vendorSelectOptions = [
        {value: '1', 'label': 'Apple'}
    ]

    getVendors = () => this.vendorSelectOptions

    reloadInstance(id) {
        if (id) {
            this.isAwait = true;

            axios
                .get(`/api/v1/private/product/${ id }`)
                .then(({ data = {} }) => {
                    const { payload = {} } = data;

                    this.formData = payload;
                })
                .finally(() => this.isAwait = false)
        }
    }

    update() {
        this.isAwait = true;

        axios
            .post('/api/v1/private/product/update', this.formData)
            .then(() => {
                this.reloadInstance(this.id)
            })
            .finally(() => this.isAwait = false)
    }

    constructor() {
        makeAutoObservable(this)
    }
}

const updateProductFormStateInstance = new UpdateProductFormState();

intercept(updateProductFormStateInstance, 'id', change => {
    updateProductFormStateInstance.reloadInstance(change.newValue);
});

export default updateProductFormStateInstance;
