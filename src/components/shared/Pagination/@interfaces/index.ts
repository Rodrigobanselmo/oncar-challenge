export interface IPaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  siblingsCount?: number;
  onPageChange: (page: number) => void;
}
