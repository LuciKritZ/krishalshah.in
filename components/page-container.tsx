import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

const PageContainer = ({ children, className }: PageContainerProps) => (
  <div className={cn('page-container', className)}>{children}</div>
);

export default PageContainer;
