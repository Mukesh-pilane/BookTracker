import { Button, Checkbox, Flex, Paper, Menu, Stack } from '@mantine/core'
import React, { useState } from 'react'
import { IconFilterSearch } from '@tabler/icons-react';
import { IconCirclePlus } from '@tabler/icons-react';
import { TextInput } from '@mantine/core';
import styles from "./TableSubHeader.module.scss"

const TableSubHeader = ({ setSearch, buttonText, searchFilters, setSearchFilters, searchFilterOptions, open }) => {

  const [input, setInput] = useState("");

  const handleOnchange = (e) => {
    setInput(e.target.value);
    if (e.target.value.length >= 1) {
      setTimeout(() => {
        setSearch(e.target.value);
      }, 1000);
    } else if (e.target.value.length === 0) {
      setSearch(e.target.value);
    }
  };

  return (
    <Paper radius="10" className={styles.container}>
      <Flex size="lg" gap={"1rem"}>
        <TextInput
          placeholder="Search"
          rightSection={
            <Menu shadow="md">
              <Menu.Target>
                <IconFilterSearch size={18} color='white' />
              </Menu.Target>
              <Menu.Dropdown>
                <Checkbox.Group
                  value={searchFilters}
                  onChange={setSearchFilters}
                >
                  <Stack mt="xs">
                    {searchFilterOptions.map(key => (
                      <Checkbox key={key} value={key} label={key} />
                    ))}
                  </Stack>
                </Checkbox.Group>
              </Menu.Dropdown>
            </Menu>
          }
          value={input}
          onChange={handleOnchange}
          className={styles.searchInput}
        />
        <Button
          leftSection={<IconCirclePlus size={18} />}
          onClick={open}
        >
          {buttonText || "Add"}
        </Button>
      </Flex>
    </Paper>
  )
}

export default TableSubHeader