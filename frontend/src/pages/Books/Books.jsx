import React, { useEffect } from 'react'
import { useGetBookQuery } from '../../store/server/queries/booksQuery';
import CommonTable from '../../components/shared/CommonTable/CommonTable';

const Books = () => {
  const { mutate, data, isLoading, error } = useGetBookQuery();

  const columns = [
    {
      name: "Author",
      selector: row => row.author
    }
  ]


  useEffect(() => {
    mutate()
  }, [])

  return (
    <div>
      <CommonTable
        columns={columns}
        data={data}
        isLoading={isLoading}
      // paginationProps={{
      //   isPagination: true,
      //   currentPage: pageNumber,
      //   totalCount,
      //   rowsPerPageValue: perPage,
      //   setPageSelected: setPageNumber,
      //   setRowsPerPageValue: setPerPage,
      // }}
      />
    </div>
  )
}

export default Books