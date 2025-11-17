/** @type { import('@storybook/react-webpack5').Preview } */
import 'antd/dist/reset.css'; // 引入 Ant Design 的样式

const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;
