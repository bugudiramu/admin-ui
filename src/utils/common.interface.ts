export interface IBase {
  key: string;
}
export interface ICategory {
  _id: string;
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

export interface IBaseError {
  data: IError;
  status: number;
}
export interface IError {
  success: boolean;
  error: IMessage;
}
export interface IMessage {
  message: string;
}

export enum API_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}
