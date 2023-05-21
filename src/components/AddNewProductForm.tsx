import { Form, FormInstance, Input, InputNumber, Select, Tag } from "antd";
import { useGetCategoriesQuery } from "../pages/Categories/Categories.api";
import { useMemo } from "react";
import { CustomTagProps } from "rc-select/lib/BaseSelect";

interface IProps {
  form: FormInstance<unknown>;
  onChange: (value: number | string | null) => void;
  onSearch: (value: string) => void;
}

const AddNewProductForm = (props: IProps) => {
  const { form, onChange, onSearch } = props;
  const {
    isLoading,
    data: categories,
    isError,
    isSuccess,
  } = useGetCategoriesQuery();
  // TODO: Categories are loading even before this is on focus

  const transformdCategories = useMemo(() => {
    return categories?.categories.map((category) => {
      return {
        label: category.title,
        value: category.title,
      };
    });
  }, [categories]);

  const options = [
    { value: "gold" },
    { value: "lime" },
    { value: "green" },
    { value: "cyan" },
  ];

  const tagRender = (props: CustomTagProps) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={value}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <Form form={form} layout="vertical" requiredMark={true}>
      <Form.Item label="Enter product name" required name="productName">
        <Input placeholder="input placeholder" />
      </Form.Item>

      <Form.Item label="Choose a category" required name="categoryName">
        {/* TODO: Implement loading for get categories */}
        <Select
          showSearch
          placeholder="Select a category"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={transformdCategories}
        />
      </Form.Item>
      {/* _id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    tags: Array<string>;
    image: string;
    inStock: boolean;
    rating: number; */}
      <Form.Item label="Choose tags" required name="tags">
        {/* TODO: Implement loading for get categories */}
        <Select
          mode="multiple"
          showArrow
          tagRender={tagRender}
          defaultValue={["gold", "cyan"]}
          options={options}
        />
      </Form.Item>
      <Form.Item label="Choose price" required name="price">
        <InputNumber
          defaultValue={999 as unknown as string}
          formatter={(value) =>
            `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
          onChange={onChange}
        />
      </Form.Item>
      <Form.Item label="Choose stock" required name="stock">
        <InputNumber min={1} max={1000} defaultValue={1} onChange={onChange} />
      </Form.Item>
    </Form>
  );
};
export default AddNewProductForm;
