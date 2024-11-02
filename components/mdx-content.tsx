import { JSX } from 'react';

import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';
import { highlight } from 'sugar-high';

import Callout from './callout';
import Counter from './counter';

type MDXContentProps = JSX.IntrinsicAttributes & MDXRemoteProps;

// TODO: Fix any type
const Code = ({ children, ...props }: any) => {
  let codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
};

const customComponents = {
  code: Code,
  Callout,
  Counter,
};

const MDXContent = ({ components, ...restProps }: MDXContentProps) => (
  <MDXRemote
    {...restProps}
    components={{ ...customComponents, ...components }}
  />
);

export default MDXContent;
