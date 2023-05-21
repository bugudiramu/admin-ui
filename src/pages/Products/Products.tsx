import { ColumnsType } from "antd/es/table";
import AntTable from "../../components/AntTable/AntTable";
import { Button, Form, Space, Spin, message } from "antd";
import { DELETE_TEXT } from "../../constants";
import { IProductData } from "./Product.interface";
import { useNavigate } from "react-router-dom";
import { toggleModal } from "../../components/AntModal/AntModal.slice";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import AntModal from "../../components/AntModal/AntModal";
import { IBaseError, IProduct } from "../../utils/common.interface";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "./Products.api";
import AddNewProductForm from "../../components/AddNewProductForm";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const {
    isLoading,
    data: products,
    isError,
    isSuccess,
  } = useGetProductsQuery();
  const [createProduct, { isLoading: isCreatingProduct }] =
    useCreateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [deletableProduct, setDeletableProduct] = useState<string>("");
  const [actionType, setActionType] = useState<string>("");

  const handleDeleteProduct = async (id: string) => {
    dispatch(toggleModal(true));
    setDeletableProduct(id);
  };
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
      title: "Product Name",
      dataIndex: "productName",
    },
    {
      title: "Action",
      key: "action",
      sorter: true,
      render: (value: IProductData, record) => {
        return (
          <Space size="middle">
            <Button
              onClick={() =>
                navigate(`/products/${value.productName}`, {
                  state: {
                    product: record,
                  },
                })
              }
              type="link"
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                setActionType("DELETE");
                handleDeleteProduct(record.key);
              }}
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

  const sortProducts: IProductData[] = useMemo(() => {
    const sortedCategories = products?.products?.slice() as IProduct[];
    sortedCategories?.sort((a, b) => a.title.localeCompare(b.title));
    return sortedCategories?.map((product) => {
      const { _id, title, price, category } = product;
      return {
        key: _id,
        productName: title,
        price,
        categoryName: category,
      };
    });
  }, [products?.products]);

  if (isLoading) return <Spin spinning={isLoading}></Spin>;

  if (isError) return messageApi.error("something wen't wrong...");

  const handleProductCreation = async () => {
    const {
      productName = "",
      price,
      description = "lorem ispum generator",
      categoryName = "",
      tags = [],
      image = "",
      inStock = true,
      rating = 5.0,
    } = form.getFieldsValue();
    if (!productName || productName?.length < 3) {
      return messageApi.error(
        "Product name should have atleast 3 characters..."
      );
    }
    await createProduct({
      title: productName,
      price,
      description,
      category: categoryName,
      tags,
      image,
      inStock,
      rating,
    })
      .unwrap()
      .then(() => messageApi.success("Product created successfully"))
      .catch((error: IBaseError) => messageApi.error(error.data.error.message));
    form.resetFields();
  };

  const onChange = (value: string | number | null) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };
  const addNewProductFormProps = {
    form,
    onChange,
    onSearch,
  };
  return (
    <div>
      {contextHolder}
      <AntModal
        text={DELETE_TEXT}
        handleSubmit={async () =>
          await deleteProduct(deletableProduct)
            .unwrap()
            .then(() => messageApi.success("Product deleted success"))
            .catch((error: IBaseError) =>
              messageApi.error(error.data.error.message)
            )
        }
      />
      <Space size="middle">
        <Button
          type="primary"
          onClick={() => {
            setActionType("ADD");
            dispatch(toggleModal(true));
          }}
        >
          Add new product
        </Button>
      </Space>
      {/* Add new product inside modal */}
      {actionType === "ADD" && (
        <AntModal text="Add new product" handleSubmit={handleProductCreation}>
          {/* Add new product */}
          <AddNewProductForm {...addNewProductFormProps} />
        </AntModal>
      )}

      {actionType === "DELETE" && (
        <AntModal
          text={DELETE_TEXT}
          handleSubmit={async () =>
            await deleteProduct(deletableProduct)
              .unwrap()
              .then(() => messageApi.success("Product deleted success"))
              .catch((error: IBaseError) =>
                messageApi.error(error.data.error.message)
              )
          }
        />
      )}
      {isSuccess && <AntTable columns={columns} data={sortProducts} />}
    </div>
  );
};

export default Products;

