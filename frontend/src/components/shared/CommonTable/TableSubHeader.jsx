import { Button, Flex, Paper } from '@mantine/core'
import React, { useState } from 'react'
import { IconSearch } from '@tabler/icons-react';
import { IconCirclePlus } from '@tabler/icons-react';
import { TextInput } from '@mantine/core';
import styles from "./TableSubHeader.module.scss"

const TableSubHeader = ({ setSearch, buttonText, open }) => {

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
          rightSection={<IconSearch size={18} color='white'/>}
          value={input}
          onChange={handleOnchange}
          className={styles.searchInput}
        />
        <Button
          leftSection={<IconCirclePlus size={18} />}
          onClick={open}
        // variant="default"
        >
          {buttonText || "Add"}
        </Button>
      </Flex>
    </Paper>
  )
}

export default TableSubHeader