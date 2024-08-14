import type { KeyPrefix } from 'i18next';
import { Translation as TranslationBase } from 'react-i18next';

type Keys = KeyPrefix<'translation'>;

interface TranslationProps {
  token: Keys;
}

const Translation: React.FC<TranslationProps> = ({ token }) => {
  return <TranslationBase>{(t) => t(token as unknown as any)}</TranslationBase>;
};

export default Translation;
