import React, { useEffect, useState } from 'react'
import { IconEdit } from '@tabler/icons-react';
import { useGetBookQuery } from '../../store/server/queries/booksQuery';
import CommonTable from '../../components/shared/CommonTable/CommonTable';
import { Box, Drawer, Flex, Image, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import BookForm from './BookForm';
import styles from "./Books.module.scss"

const Books = () => {
  const { mutate, data, isLoading } = useGetBookQuery();
  const [opened, { open, close }] = useDisclosure(false);
  const [search, setSearch] = useState("")
  const [editData, setEditData] = useState({});
  const [pageNo, setPageNo] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchFilters, setSearchFilters] = useState(['name', 'category', 'author'])

  const columns = [
    {
      name: "Name",
      selector: row => row.name,
      cell: row => (
        <Flex gap={10} justify="center" align="center">
          <Box component='div' className={styles.imageWrapper}>
            <Image
              fit="cover"
              fallbackSrc="https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?t=st=1739108006~exp=1739111606~hmac=880e17658eacfdcaf558afcbc9cd7d83f76b7a1603ed259fc5d60693500b66a7&w=740"
              src={row.imageUrl}
            />
          </Box>
          <Text>{row.name}</Text>
        </Flex>
      ),
    },
    {
      name: "Author",
      selector: row => row.author
    },
    {
      name: "Category",
      selector: row => row.categoryData.category
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
      mutate({ search, pageNo, perPage, searchFilters });
  }, [search, pageNo, perPage, searchFilters])

  return (
    <>
      <CommonTable
        columns={columns}
        data={data?.data}
        isLoading={isLoading}
        paginationProps={{
          isPagination: true,
          currentPage: pageNo,
          totalCount: data?.totalCount,
          rowsPerPageValue: perPage,
          setPageSelected: setPageNo,
          setRowsPerPageValue: setPerPage,
        }}
        tableSubHeaderProps={{
          setSearch,
          setSearchFilters,
          searchFilters,
          searchFilterOptions:['name', 'category', 'author'],
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