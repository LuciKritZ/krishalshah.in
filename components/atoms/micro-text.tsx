import { cn } from '@/lib/utils';

interface MicroTextProps {
  as?: 'div' | 'p' | 'span';
  children: React.ReactNode;
  className?: string;
}

const MicroText = ({
  as: Tag = 'span',
  children,
  className,
}: MicroTextProps) => (
  <Tag className={cn('micro-text', className)}>{children}</Tag>
);

export default MicroText;
