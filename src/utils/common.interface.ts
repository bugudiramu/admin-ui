export interface IBase {
  key: string;
}
export interface ICategory {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface IProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  category: ICategory;
}

export interface IAdmin {
  email: string;
}

export enum API_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}
