import { ColumnsType } from "antd/es/table";
import AntTable from "../../components/AntTable/AntTable";
import { Button, Space } from "antd";
import { ICategoryData } from "./Category.interface";

const Categories = () => {
  const columns: ColumnsType<ICategoryData> = [
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
  const data: ICategoryData[] = [];
  for (let i = 1; i <= 100; i++) {
    data.push({
      key: i,
      categoryName: "John Brown",
    });
  }
  return (
    <div>
      <AntTable columns={columns} data={data} />
    </div>
  );
};

export default Categories;
