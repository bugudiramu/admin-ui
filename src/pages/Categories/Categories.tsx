import { ColumnsType } from "antd/es/table";
import AntTable from "../../components/AntTable/AntTable";
import { Button, Form, Input, Space } from "antd";
import { ICategoryData } from "./Category.interface";
import { categories } from "../../constants";
import { useState } from "react";
import { RequiredMark } from "antd/es/form/Form";

const Categories = () => {
  const [form] = Form.useForm();

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
  for (let i = 1; i <= categories.length; i++) {
    data.push({
      key: i,
      categoryName: categories[i],
    });
  }
  return (
    <div>
      {/* Add new category */}
      <Form form={form} layout="vertical" requiredMark={true}>
        <Form.Item
          label="Create new category"
          required
          tooltip="This is a required field"
          name="createNewCategory"
        >
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item>
          <Space size="small">
            <Button type="primary" htmlType="submit">
              Save
            </Button>
            <Button
              onClick={() => {
                console.log({ form });
                form.resetFields();
              }}
            >
              Clear
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <AntTable columns={columns} data={data} />
    </div>
  );
};

export default Categories;
