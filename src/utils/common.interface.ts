export interface IBase {
  key: number;
}
export interface ICategory {
  name: string;
}

export interface IProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  category: ICategory;
}
