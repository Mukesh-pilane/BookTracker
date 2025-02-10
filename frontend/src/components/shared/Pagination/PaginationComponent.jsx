import React, { useEffect, useState, useMemo } from 'react';
import styles from './PaginationComponent.module.scss';
// import ReactPaginate from 'react-paginate';
import { Pagination } from '@mantine/core';

const PaginationComponent = ({ currentPage, totalCount, rowsPerPageValue, onPageChange, onRowsChange }) => {
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageValue);
    const noOfPages = useMemo(() => Math.ceil(totalCount / rowsPerPage), [rowsPerPage, totalCount]);

    const handleRowsChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        onRowsChange(Number(e.target.value));
        onPageChange(1)
    };

    const startEntry = (currentPage - 1) * rowsPerPage + 1;
    const endEntry = Math.min(currentPage * rowsPerPage, totalCount);

    useEffect(() => {
        setRowsPerPage(rowsPerPageValue);
    }, [rowsPerPageValue]);

    return (
        <div className={styles.pagination}>
            <div className={styles.paginationLeftSide}>
                <div className={styles.dataRange}>
                    {`${startEntry}-${endEntry} / ${totalCount}`}
                </div>
                <div>
                    <span className={styles.dropdownText}>Rows:</span>
                    <select
                        onChange={handleRowsChange}
                        value={rowsPerPage}
                        className={styles.rowPerPageDropdown}
                    >
                        {[20, 50, 100, 200].map((data) => (
                            <option key={data} value={data}>
                                {data}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className={styles.paginationRightSide}>
                <Pagination total={noOfPages} onChange={onPageChange} value={currentPage}/>
            </div>
        </div>
    );
};

export default PaginationComponent;