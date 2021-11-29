import "./pagination.css";

export function Pagination({
  currentPage = 1,
  totalPages = 1,
  onChange = () => {},
}) {
  const pages = [...new Array(totalPages || 1)].map((_, index) => index + 1);
  return (
    <div className="pagination">
      {pages.map((page) => {
        return (
          <div
            key={page}
            onClick={() => onChange(page)}
            className={`page page${page === currentPage ? "-active" : ""}`}
          >
            {page}
          </div>
        );
      })}
    </div>
  );
}
