import { Layout, Menu, Typography, Table } from 'antd';

const { Header, Sider, Content } = Layout;

const columns = [
  { title: '单号', dataIndex: 'code' },
  { title: '状态', dataIndex: 'status' },
  { title: '金额', dataIndex: 'amount' },
];

const dataSource = [
  { key: '1', code: 'SO-2024-001', status: '已完成', amount: 3999 },
  { key: '2', code: 'SO-2024-002', status: '处理中', amount: 2999 },
];

export default function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <Menu
          theme="dark"
          mode="inline"
          items={[
            { key: 'dashboard', label: '工作台' },
            { key: 'purchase', label: '采购' },
            { key: 'inventory', label: '库存' },
            { key: 'sales', label: '销售' },
            { key: 'after-sale', label: '售后' },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff' }}>
          <Typography.Title level={4}>二手手机 ERP 管理后台</Typography.Title>
        </Header>
        <Content style={{ margin: 24 }}>
          <Typography.Title level={5}>销售单列表</Typography.Title>
          <Table columns={columns} dataSource={dataSource} pagination={false} />
        </Content>
      </Layout>
    </Layout>
  );
}
