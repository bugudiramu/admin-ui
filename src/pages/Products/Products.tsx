import { ColumnsType } from "antd/es/table";
import AntTable from "../../components/AntTable/AntTable";
import { Button, Space } from "antd";
import { categories } from "../../constants";
import { IProductData } from "./Product.interface";

const Products = () => {
  const columns: ColumnsType<IProductData> = [
    {
      title: "Product Name",
      dataIndex: "productName",
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
    },
    {
      title: "Action",
      key: "action",
      sorter: true,
      render: () => (
        <Space size="middle">
          <Button type="link">Edit</Button>
          <Button danger type="link">
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  const data: IProductData[] = [];
  for (let i = 1; i <= 100; i++) {
    data.push({
      key: i,
      productName: "John Brown",
      price: Number(`${i}`),
      categoryName: categories[Math.floor(Math.random() * categories.length)],
    });
  }
  return (
    <div>
      <AntTable columns={columns} data={data} />
    </div>
  );
};

export default Products;
