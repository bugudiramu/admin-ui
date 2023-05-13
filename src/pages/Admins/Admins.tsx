import { ColumnsType } from "antd/es/table";
import AntTable from "../../components/AntTable/AntTable";
import { Button, Form, Input, Space } from "antd";
import { IAdminData } from "./Admins.interface";
import { formatDateTime } from "../../utils/common.util";

const Admins = () => {
  const [form] = Form.useForm();

  const columns: ColumnsType<IAdminData> = [
    {
      title: "Admin Email",
      dataIndex: "adminEmail",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Action",
      key: "action",
      sorter: true,
      render: () => (
        <Space size="middle">
          <Button danger type="link">
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  const data: IAdminData[] = [];
  for (let i = 1; i <= 4; i++) {
    data.push({
      key: `${i}`,
      adminEmail: "ramubugudi4@gmail.com",
      date: formatDateTime(new Date().toISOString()),
    });
  }
  return (
    <div>
      {/* Add new category */}
      <Form form={form} layout="vertical" requiredMark={true}>
        <Form.Item
          label="Add new admin"
          required
          tooltip="This is a required field"
          name="addNewAdmin"
        >
          <Input placeholder="Enter an admin email" />
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

export default Admins;
