import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import TableEx, { TableExProps } from './index';

const meta: Meta<typeof TableEx> = {
  title: 'Components/TableEx',
  component: TableEx,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const dataSource: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const Template: StoryFn<TableExProps<DataType>> = (args) => (
  <div style={{ height: '400px', padding: '10px 10px 0 10px', border: '1px solid #d9d9d9' }}>
    <TableEx {...args} />
  </div>
);

export const Basic = Template.bind({});
Basic.args = {
  dataSource,
  columns,
  pagination: {
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
  },
};

export const WithFewRows = Template.bind({});
WithFewRows.args = {
  dataSource: dataSource.slice(0, 2),
  columns,
  pagination: false,
};

export const WithManyRows = Template.bind({});
WithManyRows.args = {
  dataSource: Array.from({ length: 50 }, (_, index) => ({
    key: index.toString(),
    name: `Name ${index}`,
    age: 20 + index,
    address: `Address ${index}, Some City, Some Country`,
  })),
  columns,
  pagination: {
    pageSize: 20,
    showSizeChanger: true,
    showQuickJumper: true,
  },
};

export const WithoutAutoScroll = Template.bind({});
WithoutAutoScroll.args = {
  dataSource,
  columns,
  autoScroll: false,
  scroll: { y: 200 },
  pagination: {
    pageSize: 10,
  },
};