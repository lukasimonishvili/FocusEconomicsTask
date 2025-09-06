interface ISearchParams {
  page?: string;
  search?: string;
  sortFecha?: "asc" | "desc";
  sortValor?: "asc" | "desc";
  minValor?: string;
  maxValor?: string;
}

export default ISearchParams;
