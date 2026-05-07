import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  isFluid?: boolean;
}

/**
 * PageContainer is the master shell for all pages.
 * It enforces a responsive horizontal margin scale:
 * Mobile: px-6 | Tablet: md:px-12 | Desktop: lg:px-20
 *
 * @param isFluid - If true, removes the standard vertical padding (useful for Heros or custom layouts)
 */
const PageContainer = ({
  children,
  className,
  isFluid = false,
}: PageContainerProps) => (
  <div
    className={cn(
      'page-container',
      isFluid && 'py-0 md:py-0 lg:py-0',
      className
    )}
  >
    {children}
  </div>
);

export default PageContainer;
