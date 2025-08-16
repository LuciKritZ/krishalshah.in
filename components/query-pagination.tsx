import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from './ui/pagination';

interface QueryPaginationProps {
  className?: string;
  createPaginationLink: (pageNumber: string | number) => string;
  currentPage: number;
  isLoading?: boolean;
  totalPages: number;
}

const QueryPagination = ({
  className,
  isLoading,
  totalPages,
  createPaginationLink,
  currentPage,
}: QueryPaginationProps) => {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  if (isLoading) {
    return null;
  }

  return (
    <Pagination className={className}>
      <PaginationContent>
        {prevPage >= 1 ? (
          <PaginationItem>
            <PaginationPrevious href={createPaginationLink(prevPage)} />
          </PaginationItem>
        ) : null}

        {Array(totalPages)
          .fill('')
          .map((_, index) => (
            <PaginationItem
              className='hidden sm:inline-block'
              key={`page-button-${index + 1}`}
            >
              <PaginationLink
                className='hover:bg-border/50 hover:text-inherit transition-colors duration-200 ease-linear'
                href={createPaginationLink(index + 1)}
                isActive={currentPage === index + 1}
                shallow={true}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

        {nextPage <= totalPages ? (
          <PaginationItem>
            <PaginationNext href={createPaginationLink(nextPage)} />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
};

export default QueryPagination;
