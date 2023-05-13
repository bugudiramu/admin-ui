import { IBase, IProduct } from "../../utils/common.interface";

export interface IOrdersData extends IBase {
  date: string;
  paid: string;
  recipient: string;
  products: IProduct[];
}
