# react-antd-table-ex

一个基于 Ant Design Table 组件的增强版表格组件，提供自动计算滚动高度的全高度布局功能。

## 📋 背景

在使用 Ant Design 的 Table 组件时，我们经常需要实现表格的全高度布局，让表格能够自动填充容器高度，并在内容超出时显示滚动条。然而，原生的 Ant Design Table 组件需要手动计算和设置 `scroll.y` 属性，这在实际开发中非常繁琐，特别是在以下场景：

- 表格容器高度动态变化
- 分页器显示/隐藏状态切换
- 页面尺寸变化（响应式布局）
- 表格列数或内容变化

`react-antd-table-ex` 组件通过自动计算滚动高度，解决了这些问题，让开发者可以专注于业务逻辑，而无需关心复杂的布局计算。

## ✨ 功能特性

- 🎯 **自动计算滚动高度**：根据容器高度、表头、分页器等自动计算表格滚动区域高度
- 📱 **响应式支持**：自动响应容器尺寸变化和分页器状态变化
- 🔧 **完全兼容 Ant Design Table**：支持所有 Ant Design Table 的原生属性和功能
- 🎨 **灵活的自定义**：支持自定义容器样式和类名
- 📦 **TypeScript 支持**：完整的 TypeScript 类型定义
- 🚀 **轻量级**：基于 Ant Design Table，无额外依赖

## 📦 安装

```bash
npm install react-antd-table-ex
# 或
yarn add react-antd-table-ex
# 或
pnpm add react-antd-table-ex
```

## 🔨 使用方法

### 基础用法

```tsx
import React from 'react';
import { TableEx } from 'react-antd-table-ex';
import 'react-antd-table-ex/dist/index.css';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  },
];

const dataSource: DataType[] = [
  {
    key: '1',
    name: '张三',
    age: 32,
    address: '北京市朝阳区',
  },
  {
    key: '2',
    name: '李四',
    age: 42,
    address: '上海市浦东新区',
  },
  // ... 更多数据
];

function App() {
  return (
    <div style={{ height: '400px', padding: '16px' }}>
      <TableEx
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />
    </div>
  );
}
```

### 禁用自动滚动

如果你需要手动控制滚动高度，可以设置 `autoScroll={false}`：

```tsx
<TableEx
  dataSource={dataSource}
  columns={columns}
  autoScroll={false}
  scroll={{ y: 200 }}
  pagination={{
    pageSize: 10,
  }}
/>
```

### 自定义容器样式

```tsx
<TableEx
  dataSource={dataSource}
  columns={columns}
  containerClassName="my-custom-table"
  containerStyle={{
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
  }}
  pagination={{
    pageSize: 10,
  }}
/>
```

### 全屏布局示例

```tsx
function App() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ height: '64px', background: '#001529' }}>
        {/* 头部内容 */}
      </header>
      <main style={{ flex: 1, padding: '24px' }}>
        <TableEx
          dataSource={dataSource}
          columns={columns}
          pagination={{
            pageSize: 20,
            showSizeChanger: true,
          }}
        />
      </main>
    </div>
  );
}
```

## 📚 API 文档

### TableExProps

`TableEx` 组件继承自 Ant Design 的 `TableProps`，并添加了以下额外属性：

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| autoScroll | 是否自动计算滚动高度 | `boolean` | `true` | 否 |
| containerClassName | 表格容器的类名 | `string` | - | 否 |
| containerStyle | 表格容器的样式 | `React.CSSProperties` | - | 否 |

**注意**：所有 Ant Design Table 的原生属性都可以正常使用，包括 `dataSource`、`columns`、`pagination`、`scroll` 等。

### 自动滚动高度计算逻辑

当 `autoScroll={true}` 时，组件会自动计算滚动高度：

1. 获取容器高度
2. 减去表头（`.ant-table-thead`）高度
3. 减去分页器（`.ant-pagination`）高度（如果存在）
4. 减去表格的 padding 和 border
5. 减去分页器的 margin
6. 确保最小高度为 100px

计算会在以下情况自动触发：
- 组件挂载时
- `pagination` 配置变化时（如 `pageSize`、`current` 改变）
- `autoScroll` 属性变化时
- `scroll.y` 属性变化时

## 🎯 使用场景

### 1. 后台管理系统

在后台管理系统中，表格通常需要填充整个内容区域，`TableEx` 可以自动处理这种情况：

```tsx
<Layout>
  <Sider>...</Sider>
  <Layout>
    <Header>...</Header>
    <Content style={{ padding: '24px' }}>
      <TableEx
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 20 }}
      />
    </Content>
  </Layout>
</Layout>
```

### 2. 响应式布局

在响应式布局中，容器高度可能会变化，`TableEx` 会自动适应：

```tsx
<div style={{ height: window.innerHeight - 200 }}>
  <TableEx dataSource={dataSource} columns={columns} />
</div>
```

### 3. 动态分页

当分页器显示/隐藏或分页大小改变时，表格会自动调整：

```tsx
const [showPagination, setShowPagination] = useState(true);

<TableEx
  dataSource={dataSource}
  columns={columns}
  pagination={showPagination ? { pageSize: 10 } : false}
/>
```

## 🔧 技术实现

### 核心原理

组件使用 React Hooks 实现自动高度计算：

1. **useRef**：获取容器 DOM 引用
2. **useMemo**：缓存高度计算结果
3. **useEffect**：监听依赖变化，更新滚动高度
4. **DOM 查询**：通过 `querySelector` 获取表头、分页器等元素的实际高度

### 样式方案

组件使用 Flexbox 布局实现全高度填充：

```css
.table-ex-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
```

通过 CSS 类选择器，确保表格的各个层级都能正确填充高度。

## 🛠️ 开发

### 本地开发

```bash
# 克隆项目
git clone <repository-url>
cd react-antd-table-ex

# 安装依赖
npm install

# 启动 Storybook 查看组件
npm run storybook

# 构建
npm run build
```

### 项目结构

```
react-antd-table-ex/
├── src/
│   ├── TableEx/
│   │   ├── index.tsx      # 组件主文件
│   │   ├── index.css      # 样式文件
│   │   └── TableEx.stories.tsx  # Storybook 示例
│   └── index.ts           # 入口文件
├── dist/                  # 构建输出
├── .storybook/            # Storybook 配置
└── rollup.config.js       # Rollup 构建配置
```

## 📝 注意事项

1. **容器高度**：确保表格的父容器有明确的高度，否则自动计算可能不准确
2. **CSS 引入**：使用组件时，需要引入样式文件 `react-antd-table-ex/dist/index.css`
3. **分页器**：当 `pagination={false}` 时，组件会自动排除分页器高度
4. **最小高度**：自动计算的高度最小值为 100px，确保表格始终可滚动

## 🚀 发布

### 手动发布到 NPM

1. 确保你已经登录 npm：
```bash
npm login
```

2. 更新版本号：
```bash
npm version patch  # 或 minor, major
```

3. 构建项目：
```bash
npm run build
```

4. 发布到 npm：
```bash
npm publish --access public
```

### 使用 GitHub Actions 自动发布

项目已配置 GitHub Actions 工作流，支持两种发布方式：

#### 方式 1: 通过 GitHub Release 发布
1. 在 GitHub 仓库中创建一个新的 Release
2. Actions 会自动检测到 Release 事件
3. 自动构建并发布到 npm

#### 方式 2: 手动触发发布
1. 进入 GitHub 仓库的 Actions 页面
2. 选择 "Publish to NPM" 工作流
3. 点击 "Run workflow"
4. 选择版本类型（patch/minor/major）
5. 工作流会自动：
   - 更新版本号
   - 构建项目
   - 发布到 npm
   - 创建 git tag

**注意**：首次使用需要配置 NPM_TOKEN：
1. 在 npm 上创建 Access Token：https://www.npmjs.com/settings/your-username/tokens
2. 在 GitHub 仓库设置中添加 Secret：
   - Settings → Secrets and variables → Actions
   - 添加名为 `NPM_TOKEN` 的 secret，值为你的 npm token

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 开发流程

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

### 本地开发

```bash
# 克隆项目
git clone https://github.com/lidongr5918/react-antd-table-ex.git
cd react-antd-table-ex

# 安装依赖
npm install

# 启动 Storybook
npm run storybook

# 构建
npm run build
```

## 📄 许可证

ISC License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [Ant Design](https://ant.design/) - 优秀的 React UI 组件库
- [React](https://react.dev/) - 强大的 UI 框架

---

如果这个组件对你有帮助，欢迎给个 ⭐ Star！

