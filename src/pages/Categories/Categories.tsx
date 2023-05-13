import { ColumnsType } from "antd/es/table";
import AntTable from "../../components/AntTable/AntTable";
import { Button, Form, Input, Space, Spin } from "antd";
import { ICategoryData } from "./Category.interface";
import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
} from "./Categories.api";
import { ICategory } from "../../utils/common.interface";

const Categories = () => {
  const [form] = Form.useForm();
  const { isLoading, isError, data: categories } = useGetCategoriesQuery();

  const [createCategory, { isLoading: isCreatingCategory }] =
    useCreateCategoryMutation();

  console.log({ categories, isLoading });

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

  if (isLoading) return <Spin spinning={isLoading}></Spin>;

  if (isError) throw new Error("Something went wrong...");

  const data: ICategoryData[] = [];
  for (const category of categories?.categories as ICategory[]) {
    data.push({
      key: category["id"],
      categoryName: category["title"],
    });
  }

  const handleCategoryCreation = async () => {
    const { categoryName = "" } = form.getFieldsValue();
    await createCategory({
      title: categoryName,
      description: "These are different types of Sarees",
      image: "image url",
    }).unwrap();
    form.resetFields();
  };

  return (
    <div>
      {/* Add new category */}
      <Form form={form} layout="vertical" requiredMark={true}>
        <Form.Item
          label="Create new category"
          required
          tooltip="This is a required field"
          name="categoryName"
        >
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item>
          <Space size="small">
            <Button
              onClick={handleCategoryCreation}
              type="primary"
              htmlType="submit"
              loading={isCreatingCategory}
            >
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
