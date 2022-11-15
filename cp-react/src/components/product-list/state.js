import { makeAutoObservable } from 'mobx';
import axios from 'axios';


class ProductListState {

    isAwait = false

    products = []

    vendors = []

    reloadProducts() {

        this.isAwait = true;

        axios
            .get('/api/v1/private/products')
            .then(({ data = {} }) => {
                const { payload = [] } = data;
                this.products = payload;
            })
            .finally(() => {
                this.isAwait = false;
            })
    }

    reloadVendors() {
        axios
          .post('/api/v1/private/vendor/dict')
          .then(({ data = {} }) => {
              const { payload = [] } = data;
              this.vendors = payload.map(item => {
                  return {
                      value: item.id,
                      label: item.name
                  };
              });
          });
    }

    constructor() {
      makeAutoObservable(this);
      this.reloadVendors();
      this.reloadProducts();
    }
}

const productListStateInstance = new ProductListState();

export default productListStateInstance;
