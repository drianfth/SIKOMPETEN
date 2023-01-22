import React from "react";
import tw from "twin.macro";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import SwitchRightIcon from "@mui/icons-material/SwitchRight";
import { useTable, usePagination, useSortBy } from "react-table";
const Container = tw.div`relative overflow-x-auto shadow-lg border border-gray-200 sm:rounded-lg mt-8 w-11/12 mx-auto`;
const Table = tw.table`w-full text-sm text-left text-gray-800`;
const TableHead = tw.thead`text-xs text-gray-700 uppercase bg-gray-50 `;
const TableBody = tw.tbody``;
const TableRow = tw.tr``;
const TableRowBody = tw.tr`bg-white border-b`;
// const TableHeader = tw.th`px-6 py-4 font-medium text-gray-900 whitespace-nowrap`;
const TableData = tw.td`px-6 py-4`;
const TableDataHead = tw.td`px-6 py-4 font-bold text-gray-800 text-center`;

const TableBasic = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,

    state: { pageIndex },
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 5 } },
    useSortBy,
    usePagination
  );
  const getPage = () => {
    if (pageIndex === pageOptions.length - 1) {
      const at = pageCount - 2;
      return pageOptions.slice(at, pageCount);
    } else {
      return pageOptions.slice(pageIndex, pageIndex + 2);
    }
  };
  const pages = getPage();
  return (
    <Container>
      <Table {...getTableProps}>
        <TableHead>
          {headerGroups?.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers?.map((column) => (
                <TableDataHead
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <div className="flex items-center justify-center">
                    {column.render("Header")}
                    <span className="ml-2">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ArrowDropDownIcon />
                        ) : (
                          <ArrowDropUpIcon />
                        )
                      ) : (
                        <SwitchRightIcon className="rotate-90 text-gray-400 w-4" />
                      )}
                    </span>
                  </div>
                </TableDataHead>
              ))}
            </TableRow>
          ))}
        </TableHead>

        <TableBody {...getTableBodyProps()}>
          {page?.map((row, i) => {
            prepareRow(row);
            return (
              <TableRowBody {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <TableData {...cell.getCellProps()}>
                    {" "}
                    {cell.render("Cell")}
                  </TableData>
                ))}
              </TableRowBody>
            );
          })}
        </TableBody>
      </Table>
      <nav
        className="flex items-center justify-between p-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 ">
          page{" "}
          <span className="font-semibold text-gray-900">{pageIndex + 1}</span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900">
            {pageOptions.length}
          </span>
        </span>
        <ul className="inline-flex items-center -space-x-px">
          <li>
            <button
              className={`block px-3 py-2 ml-0 leading-tight text-gray-500 ${
                canPreviousPage ? "bg-white" : "bg-gray-100"
              } border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 `}
              type="button"
              onClick={() => previousPage()}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
          {pages.map((page) => (
            <li key={page} onClick={() => gotoPage(page)}>
              <button
                type="button"
                className="px-3 py-2 text-md leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
              >
                {page + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              className={`block px-3 py-2 leading-tight text-gray-500 ${
                canNextPage ? "bg-white" : "bg-gray-100"
              } border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 `}
              type="button"
              onClick={() => nextPage()}
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </Container>
  );
};

export default TableBasic;
