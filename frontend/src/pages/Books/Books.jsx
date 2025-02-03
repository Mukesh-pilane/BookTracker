import React, { useEffect, useState } from 'react'
import { IconEdit } from '@tabler/icons-react';

import { useGetBookQuery } from '../../store/server/queries/booksQuery';
import CommonTable from '../../components/shared/CommonTable/CommonTable';
import { Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import BookForm from './BookForm';
import styles from "./Books.module.scss"

const Books = () => {
  const { mutate, data, isLoading } = useGetBookQuery();
  const [opened, { open, close }] = useDisclosure(false);
  const [search, setSearch] = useState("")
  const [editData, setEditData] = useState({});


  const columns = [
    {
      name: "name",
      selector: row => row.name
    },
    {
      name: "Author",
      selector: row => row.author
    },
    {
      name: "name",
      selector: row => row.name
    },
    {
      name: "name",
      selector: row => row.name
    },
    {
      name: "Edit",
      cell: row => <IconEdit onClick={() => {
        setEditData(row)
        open()
      }} />
    }
  ]


  useEffect(() => {
    mutate()
  }, [search])

  return (
    <>
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
        tableSubHeaderProps={{
          setSearch,
          open
        }}
      />
      <Drawer
        opened={opened}
        position='right' offset={8} radius="md"
        onClose={() => {
          setEditData({})
          close()
        }} 
        className={styles.drawer}
        title="Add Book">
        <BookForm data={editData} />
      </Drawer>
    </>
  )
}

export default Books