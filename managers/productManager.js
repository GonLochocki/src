import { productModel } from "../models/products.js";

export default class Product {
  constructor() {}

  getAll = async ({ limit = 10, page = 1, sort, query }) => {
    const options = {
      page,
      limit,
      lean: true, 
      leanWithId: false,
    };
    
    let filter = {};
    
    if (query) {
            
      const [field, value] = query.split(":");
      if (field && value) {
        filter[field] = value;
      }
    }
    
    if (sort) {
      options.sort = { price: sort === "asc" ? 1 : -1 };
    }

    try {
      const result = await productModel.paginate(filter, options);
      return result;
    } catch (error) {
      throw error;
    }
  };

  getById = async (productId) => {
    try {
      const found = await productModel.findById(productId);

      if (found) {
        return found;
      } else {
        return `No se encuentra el usuario con id: ${productId}`;
      }
    } catch (error) {
      throw error;
    }
  };

  saveproducts = async (product) => {
    try {
      const result = await productModel.create(product);
      return result;
    } catch (error) {
      throw error;
    }
  };

  updateproduct = async (productId, newData) => {
    try {
      const product = await productModel.findByIdAndupdate(productId, newData, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      throw error;
    }
  };

  deleteproduct = async (productId) => {
    try {
      const deleted = await productModel.findByIdAndDelete(productId);
      return deleted;
    } catch (error) {
      throw error;
    }
  };
}
