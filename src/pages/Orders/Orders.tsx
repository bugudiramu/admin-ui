import { ColumnsType } from "antd/es/table";
import AntTable from "../../components/AntTable/AntTable";
import { categories } from "../../constants";
import { IOrdersData } from "./Orders.interface";
import { IProduct } from "../../utils/common.interface";
import { formatDateTime } from "../../utils/common.util";

const Orders = () => {
  const columns: ColumnsType<IOrdersData> = [
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Paid",
      dataIndex: "paid",
    },
    {
      title: "Recipient",
      dataIndex: "recipient",
    },
    {
      title: "Products",
      dataIndex: "products",
      render: (products: IProduct[]) => {
        const productNames = products.map(
          (product, idx) =>
            `${product.title} ${idx !== products.length - 1 ? "," : ""} `
        );
        return productNames;
      },
    },
  ];
  const data: IOrdersData[] = [];
  for (let i = 1; i <= 100; i++) {
    const product: IProduct = {
      id: "1",
      category: {
        name: categories[Math.floor(Math.random() * categories.length)],
      },
      description: "lorem ipsum",
      price: 104.12,
      title: "Kanchipattu Saree",
    };
    data.push({
      key: i,
      date: formatDateTime(new Date().toISOString()),
      paid: "NO",
      products: [product, product],
      recipient: "Ramu", // TODO: recipient should show name,address,phone and email
    });
  }
  return (
    <div>
      <AntTable columns={columns} data={data} />
    </div>
  );
};

export default Orders;
