import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export function ResultsPagination({ nextResult }) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href='#' />
          {/* <button onClick={() => nextResult(1)}>1</button> */}
        </PaginationItem>
        <PaginationItem>
          <button onClick={() => nextResult(1)}>1</button>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <button onClick={() => nextResult(2)}>2</button>
        </PaginationItem>
        <PaginationItem>
          <button onClick={() => nextResult(3)}>3</button>
          {/* <PaginationLink href='#'>3</PaginationLink> */}
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href='#' />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
