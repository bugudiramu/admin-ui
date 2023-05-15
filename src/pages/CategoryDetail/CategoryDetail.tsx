import { Button, Form, Input, Space, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { ICategoryData } from "../Categories/Category.interface";
import { useUpdateCategoryMutation } from "../Categories/Categories.api";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../components/AntModal/AntModal.slice";
import AntModal from "../../components/AntModal/AntModal";
import { UPDATE_TEXT } from "../../constants";
import { IBaseError } from "../../utils/common.interface";

const CategoryDetail = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const location = useLocation();

  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();

  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  const handleUpdateCategory = () => {
    const { newCategoryName = "" } = form.getFieldsValue();
    if (!newCategoryName || newCategoryName?.length < 3) {
      return messageApi.error(
        "Category name should have atleast 3 characters..."
      );
    }
    dispatch(toggleModal(true));
  };

  const currentCategory: ICategoryData = location.state.category;
  return (
    <>
      {contextHolder}
      <AntModal
        text={UPDATE_TEXT}
        handleSubmit={async () =>
          await updateCategory({
            _id: currentCategory.key,
            title: form.getFieldValue("newCategoryName"),
          })
            .unwrap()
            .then(() => {
              messageApi.success("Category updated success");
              navigate("/categories");
            })
            .catch((error: IBaseError) =>
              messageApi.error(error.data.error.message)
            )
        }
      />
      <Form form={form} layout="vertical">
        <Form.Item
          label="Update category"
          tooltip="New category name"
          name="newCategoryName"
        >
          <Input
            defaultValue={currentCategory.categoryName}
            placeholder="input placeholder"
          />
        </Form.Item>
        <Form.Item>
          <Space size="small">
            <Button
              onClick={handleUpdateCategory}
              type="primary"
              htmlType="submit"
              loading={isLoading}
            >
              Update
            </Button>
            <Button onClick={() => navigate(-1)}>Go back</Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default CategoryDetail;
