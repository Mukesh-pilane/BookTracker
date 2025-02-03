import React from 'react';
import DataTable from 'react-data-table-component';
import { Loader } from '@mantine/core';

import Styles from './CommanTable.module.scss';
import { combineClasses } from '../../../utility';
import TableSubHeader from './TableSubHeader';
// import PaginationComponent from "../Pagination/PaginationComponent"




const CommonTable = ({ columns, data, className, paginationProps, isLoading, tableSubHeaderProps }) => {
  return (
    <div className={Styles.table_maincontainer} style={{ height: "100%" }}>
      <TableSubHeader  {...tableSubHeaderProps} />
      <DataTable
        progressPending={isLoading}
        noDataComponent={<p className={Styles.noData}>There are no records to display</p>}
        progressComponent={<div style={{ marginTop: "10rem" }}> <Loader color="blue" />;</div>}
        columns={columns}
        data={data}
        responsive
        persistTableHead={true}
        fixedHeader={true}
        className={combineClasses(Styles.table, className || '')}
      />
      {/* {paginationProps?.isPagination && paginationProps?.totalCount > 0 && (
        <PaginationComponent
          currentPage={paginationProps.currentPage}
          totalCount={paginationProps.totalCount}
          rowsPerPageValue={paginationProps.rowsPerPageValue}
          onPageChange={paginationProps.setPageSelected}
          onRowsChange={paginationProps.setRowsPerPageValue}
        />
      )} */}
    </div>
  );
};

export default CommonTable;
