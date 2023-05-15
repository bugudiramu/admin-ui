import { ColumnsType } from "antd/es/table";
import AntTable from "../../components/AntTable/AntTable";
import { Button, Form, Input, Space, Spin, message } from "antd";
import { ICategoryData } from "./Category.interface";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "./Categories.api";
import { IBaseError, ICategory } from "../../utils/common.interface";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../components/AntModal/AntModal.slice";
import AntModal from "../../components/AntModal/AntModal";
import { DELETE_TEXT } from "../../constants";

const Categories = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { isLoading, data: categories, isError } = useGetCategoriesQuery();

  const [createCategory, { isLoading: isCreatingCategory }] =
    useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const dispatch = useDispatch();

  const [deletableCategory, setDeletableCategory] = useState<string>("");

  const [messageApi, contextHolder] = message.useMessage();

  const handleDeleteCategory = async (id: string) => {
    dispatch(toggleModal(true));
    setDeletableCategory(id);
  };

  const columns: ColumnsType<ICategoryData> = [
    {
      title: "Category Name",
      dataIndex: "categoryName",
    },
    {
      title: "Action",
      key: "action",
      sorter: true,
      render: (value: ICategoryData, record, index: number) => {
        return (
          <Space size="middle">
            <Button
              onClick={() =>
                navigate(`/categories/${value.categoryName}`, {
                  state: {
                    category: record,
                  },
                })
              }
              type="link"
            >
              Edit
            </Button>
            <Button
              onClick={() => handleDeleteCategory(record.key)}
              danger
              type="link"
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  if (isLoading) return <Spin spinning={isLoading}></Spin>;

  if (isError) return messageApi.error("something wen't wrong...");

  const data: ICategoryData[] = [];
  for (const category of categories?.categories as ICategory[]) {
    data.push({
      key: category["_id"],
      categoryName: category["title"],
    });
  }

  const handleCategoryCreation = async () => {
    const { categoryName = "" } = form.getFieldsValue();
    if (!categoryName || categoryName?.length < 3) {
      return messageApi.error(
        "Category name should have atleast 3 characters..."
      );
    }
    await createCategory({
      title: categoryName,
      description: "These are different types of Sarees",
      image: "image url",
    })
      .unwrap()
      .then(() => messageApi.success("Category created successfully"))
      .catch((error: IBaseError) => messageApi.error(error.data.error.message));
    form.resetFields();
  };

  return (
    <div>
      {contextHolder}
      <AntModal
        text={DELETE_TEXT}
        handleSubmit={async () =>
          await deleteCategory(deletableCategory)
            .unwrap()
            .then(() => messageApi.success("Category deleted success"))
            .catch((error: IBaseError) =>
              messageApi.error(error.data.error.message)
            )
        }
      />
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
