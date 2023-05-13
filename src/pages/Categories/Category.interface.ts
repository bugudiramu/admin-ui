import { IBase } from "../../utils/common.interface";

export interface ICategoryData extends IBase {
  categoryName: string;
}

//! INFO This is the best approach to follow instead of above multiple interfaces
// export type DataType =
//   | {
//       kind: "category";
//       key: number;
//       categorName: string;
//       price: number;
//       category: string;
//     }
//   | { kind: "product"; key: number; productName: string };
