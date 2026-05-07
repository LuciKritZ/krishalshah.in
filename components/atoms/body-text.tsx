import { cn } from '@/lib/utils';

interface BodyTextProps {
  as?: 'div' | 'p' | 'span';
  children: React.ReactNode;
  className?: string;
}

const BodyText = ({ as: Tag = 'p', children, className }: BodyTextProps) => (
  <Tag className={cn('body-text', className)}>{children}</Tag>
);

export default BodyText;
