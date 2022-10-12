export interface Category {
    id:string;
    name:string;
}

export interface Product {
    id: string;
    title: string;
    price: number;
    images: string[];
    description: string;
    category: Category;
}

/* extiende de Product, menos el id y categoría, pero se reemplaza category por number */

export interface CreateProductDTO extends Omit<Product, 'id' | 'category' > {
    categoryId: number;
}

/*los campos son opcionales con Partial*/ 
export interface UpdateProductDTO extends Partial <CreateProductDTO>{
   
}