import { TranslationOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';

const items = [
  {
    key: 'en-US',
    label: 'English',
  },
  {
    key: 'zh-CN',
    label: '中文',
  },
];

interface LanguageChangerProps {}

const LanguageChanger: React.FC<LanguageChangerProps> = () => {
  const { i18n } = useTranslation();

  const handleChange = (key: string) => {
    i18n.changeLanguage(key);
    localStorage.setItem('locale', key);
  };

  return (
    <Dropdown
      menu={{
        items,
        selectedKeys: [i18n.language],
        onClick: ({ key }) => handleChange(key),
      }}
    >
      <div className="header-item">
        <TranslationOutlined />
      </div>
    </Dropdown>
  );
};

export default LanguageChanger;
