import {productModel} from "../models/products.js"

export default class Product {
    constructor(){}

    getAll = async () => {
        const products = await productModel.find()
        return products
    }

    getById = async (productId) => {
        try {
          const encontrado = await productModel.findById(productId);
    
          if (encontrado) {
            return encontrado;
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
          const product = await productModel.findByIdAndUpdate(productId, newData, {new: true, runValidators: true})
        } catch (error) {
          throw error;
        }
      };
    
      deleteproduct = async (productId) => {
        try {
    
          const deleted = await productModel.findByIdAndDelete(productId)
          return deleted
          
        } catch (error) {
          throw error;
        }
      }
    
}