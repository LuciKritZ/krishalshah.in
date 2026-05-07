import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';
import { JSX } from 'react';

import Callout from './callout';
import Code from './code';
import Counter from './counter';

type MDXContentProps = JSX.IntrinsicAttributes & MDXRemoteProps;

const customComponents = {
  Callout,
  code: Code,
  Counter,
};

const MDXContent = ({ components, ...restProps }: MDXContentProps) => (
  <MDXRemote
    {...restProps}
    components={{ ...customComponents, ...components }}
  />
);

export default MDXContent;
