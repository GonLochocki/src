Dejo estos endpoints de prueba:

Obtener Productos: GET http://localhost:8080/api/products

Obtener un producto: GET http://localhost:8080/api/products/66faf32af7f22a928464468b

Crear un producto: POST http://localhost:8080/api/products 

Pasar por body: 
{
  "title": "Guitar-800",
  "description": "This product is.....",
  "price": 8300,
  "stock": 5,
  "category": "guitars"
}

Actualizar un producto: PUT http://localhost:8080/api/products/66faf32af7f22a928464468b

Pasar por body: 
{
  "title": "Guitar-400",
  "description": "This product is.....",
  "price": 25700,
  "stock": 1,
  "category": "guitars"
}

Eliminar un producto: DELETE http://localhost:8080/api/products/66faf32af7f22a928464468b

Obtener carritos: GET http://localhost:8080/api/carts

Obtener un carrito: GET http://localhost:8080/api/carts/66fc6bd8f3121abebb4f23a0

Crear un carrito: POST http://localhost:8080/api/carts 

Agregar un producto al carrito: POST http://localhost:8080/api/carts/66fc6bd8f3121abebb4f23a0/product/66fc43aecd3bdf038a51edce

Actualizar un carrito: PUT http://localhost:8080/api/carts/66fc6bd8f3121abebb4f23a0 (pasar array de productos por body)

Actualizar cantidad de un producto: PUT http://localhost:8080/api/carts/66fc6bd8f3121abebb4f23a0/products/66faf3c7f7f22a92846446a5

pasar por body:

{
    quantity: 80
}

Eliminar los productos del carrito : DELETE http://localhost:8080/api/carts/66fc6bd8f3121abebb4f23a0

Eliminar un producto del carrito : DELETE http://localhost:8080/api/carts/66fc6bd8f3121abebb4f23a0/products/66faf3c7f7f22a92846446a5