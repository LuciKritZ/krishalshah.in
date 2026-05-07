import { cn } from '@/lib/utils';

interface DisplayTitleProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  children: React.ReactNode;
  className?: string;
}

const DisplayTitle = ({
  as: Tag = 'h2',
  children,
  className,
}: DisplayTitleProps) => (
  <Tag className={cn('display-title', className)}>{children}</Tag>
);

export default DisplayTitle;
