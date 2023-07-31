import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
const Footer: React.FC = () => {
  const defaultMessage = '编程导航知识星球出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: '鱼智能 BI',
          title: '鱼智能 BI',
          href: 'https://github.com/TuwenMark/yubi',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/TuwenMark',
          blankTarget: true,
        },
        {
          key: '鱼智能 BI',
          title: '鱼智能 BI',
          href: 'https://github.com/TuwenMark/yubi',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;