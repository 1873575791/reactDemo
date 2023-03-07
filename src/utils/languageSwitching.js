import zh from '../locale/zh-CN.json'
import en from '../locale/en-US.json'

export const _L = (locale, newLocale) => {
  const currentLanguage = newLocale;
  let fn;
  switch (currentLanguage){
    case 'zh-CN' :
      fn = zh;
      break;
    case 'en-US' :
      fn = en;
      break;
    default :
      fn = zh;
  }
  return (fn[locale]);
}