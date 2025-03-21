import { highlight } from 'sugar-high';

type CodeProps = {
  children: React.ReactNode;
  className?: string;
} & any;

const Code = ({ children, className = '', ...props }: CodeProps) => {
  let codeHTML = highlight(children as string);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} />;
};

export default Code;
