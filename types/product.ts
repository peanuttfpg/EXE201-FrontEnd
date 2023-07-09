export type Product = {
    id:number;
    name:string;
    productDetail: ProductDetail;
    quantity:number;
    createDate:number;
    updatedDate:number;
    price:number;
    imageUrl:string;
    productStatus:string;
    isDeleted:boolean;
    imageList:string[];
};

export type ProductDetail = {
    id:number;
    description:string;
    quantity: number;
    imageList: string[];
    createdDate: Date,
    updatedDate: Date,
    color:string;
    size:string;
    brand:string;
    material:string;
    height:number;
    weigth:number;
    warranty:number;
};
