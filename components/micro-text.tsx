import { cn } from '@/lib/utils';

interface MicroTextProps {
  as?: 'span' | 'p' | 'div';
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
