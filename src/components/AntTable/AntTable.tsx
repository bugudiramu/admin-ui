import { useState } from "react";
import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";

interface IProps<T> {
  columns: ColumnsType<T>;
  data: T[];
}

const AntTable = <T extends object>({ columns, data }: IProps<T>) => {
  const [hasData, setHasData] = useState<boolean>(true);

  const scroll: { x?: number | string; y?: number | string } = {};

  const tableColumns = columns.map((item) => ({ ...item }));

  const tableProps: TableProps<T> = {};

  return (
    <>
      <Table
        {...tableProps}
        pagination={{
          position: ["bottomCenter"],
        }}
        columns={tableColumns}
        dataSource={hasData ? data : []}
        scroll={scroll}
        rowKey="id"
      />
    </>
  );
};

export default AntTable;
