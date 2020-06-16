export default interface Product {
    id?: string;
    category: string;
    desc: string;
    discount: number;
    image: string;
    name: string;
    price: number;
    link?: string;
    salePrice?: number;
    discountImage?: string;
}