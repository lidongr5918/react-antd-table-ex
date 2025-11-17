# 发布指南

## 配置 NPM Token（首次发布前必须）

### 步骤 1: 创建 NPM Access Token

1. 访问 https://www.npmjs.com/settings/lidongr5918/tokens
2. 点击 "Generate New Token"
3. 选择 "Automation" 类型（用于 CI/CD）
4. 复制生成的 token（只显示一次，请妥善保存）

### 步骤 2: 在 GitHub 中添加 Secret

#### 方法 A: 通过网页界面

1. 访问你的仓库：https://github.com/lidongr5918/react-antd-table-ex
2. 点击顶部的 **Settings** 标签
3. 在左侧菜单中找到 **Secrets and variables** → **Actions**
4. 点击 **New repository secret**
5. 填写：
   - **Name**: `NPM_TOKEN`
   - **Secret**: 粘贴你刚才复制的 npm token
6. 点击 **Add secret**

#### 方法 B: 直接访问 URL

直接访问以下 URL（需要登录 GitHub）：
```
https://github.com/lidongr5918/react-antd-table-ex/settings/secrets/actions
```

#### 如果找不到 Secrets 设置

可能的原因：
- 你没有仓库的管理员权限（需要是仓库的 Owner 或具有 Admin 权限）
- 仓库是组织仓库，需要组织管理员权限

**解决方案**：
1. 确认你是仓库的所有者或有管理员权限
2. 如果是组织仓库，联系组织管理员
3. 或者暂时使用手动发布方式（见下方）

## 发布方式

### 方式 1: 使用 GitHub Actions 自动发布（推荐）

#### 通过手动触发工作流：

1. 访问：https://github.com/lidongr5918/react-antd-table-ex/actions
2. 选择 "Publish to NPM" 工作流
3. 点击 "Run workflow"
4. 选择版本类型：
   - `patch`: 1.0.0 → 1.0.1（修复 bug）
   - `minor`: 1.0.0 → 1.1.0（新功能）
   - `major`: 1.0.0 → 2.0.0（重大变更）
5. 点击 "Run workflow"
6. 工作流会自动：
   - 更新 package.json 版本号
   - 构建项目
   - 发布到 npm
   - 创建 git tag

#### 通过 GitHub Release：

1. 访问：https://github.com/lidongr5918/react-antd-table-ex/releases
2. 点击 "Create a new release"
3. 填写版本号和发布说明
4. 点击 "Publish release"
5. Actions 会自动检测并发布到 npm

### 方式 2: 手动发布（如果无法配置 Secrets）

如果暂时无法配置 GitHub Secrets，可以手动发布：

```bash
# 1. 确保已登录 npm
npm login

# 2. 更新版本号（选择其一）
npm version patch   # 1.0.0 → 1.0.1
npm version minor   # 1.0.0 → 1.1.0
npm version major   # 1.0.0 → 2.0.0

# 3. 构建项目
npm run build

# 4. 发布到 npm
npm publish --access public

# 5. 推送到 GitHub（包括 tag）
git push origin main --follow-tags
```

## 验证发布

发布成功后，可以通过以下方式验证：

1. 访问 npm 包页面：https://www.npmjs.com/package/react-antd-table-ex
2. 测试安装：
```bash
npm install react-antd-table-ex
```

## 常见问题

### Q: 找不到 Secrets 设置？
A: 确保你是仓库的所有者或有管理员权限。如果是组织仓库，需要组织管理员权限。

### Q: 发布失败，提示认证错误？
A: 检查 NPM_TOKEN 是否正确配置，token 是否有效（未过期）。

### Q: 如何更新已发布的版本？
A: 使用 `npm version` 命令更新版本号，然后重新发布。

### Q: 可以撤销已发布的版本吗？
A: npm 不允许删除已发布的版本，但可以发布一个新版本修复问题。

