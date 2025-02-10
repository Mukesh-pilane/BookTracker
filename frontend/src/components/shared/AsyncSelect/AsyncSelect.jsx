import { useState, useEffect } from 'react';
import { Box, Combobox, Loader, Stack, Text, TextInput, useCombobox } from '@mantine/core';

export default function AsyncSelect({ loadOptions }) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState('');
  const [empty, setEmpty] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState(value);



  // Fetch options using the API service
  const fetchOptions = (query) => {
    setLoading(true);

    loadOptions(query) // Pass the search query
      .then((response) => {
        setData(response);
        setLoading(false);
        setEmpty(response.length === 0);
      })
      .catch((err) => {
        console.error('error', err);
        setLoading(false);
        setData([]);
        setEmpty(true);
      });
  };
  const options = (data || []).map((item) => (
    <Combobox.Option value={item?.value} key={item?.key}>
      {item?.value}
    </Combobox.Option>
  ));


  // Debounce the input value
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 500); // 500ms debounce time

    return () => clearTimeout(timer); // Clean up timeout if the component unmounts or value changes
  }, [value]);

  // Call fetchOptions when debouncedValue changes
  useEffect(() => {
    if (debouncedValue) {
      fetchOptions(debouncedValue); // Fetch data with the debounced value
    } else {
      setData(null);
    }
  }, [debouncedValue]);


  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        setSelected(optionValue);
        combobox.closeDropdown();
      }}
      withinPortal={false}
      store={combobox}
    >
      <Stack>
        <Combobox.Target>
          <Box
            onClick={() => combobox.openDropdown()}
            onFocus={() => {
              combobox.openDropdown();
              if (data === null) {
                fetchOptions(value);
              }
            }}
          >{selected}khmjdsncsc</Box>
        </Combobox.Target>
     
      </Stack>
      <Combobox.Dropdown hidden={data === null}>
      <TextInput
          // label="Pick value or type anything"
          placeholder="Search categories"
          value={selected || value}
          onChange={(event) => {
            setSelected('')
            setValue(event.currentTarget.value);
            combobox.resetSelectedOption();
            combobox.openDropdown();
          }}
          onFocus={() => {
            combobox.openDropdown();
            if (data === null) {
              fetchOptions(value);
            }
          }}
          onBlur={() => {
            setValue('')
            combobox.closeDropdown();
          }}
          rightSection={loading && <Loader size={18} />}
        />
        <Combobox.Options>
          {options}
          {empty && <Combobox.Empty>No results found</Combobox.Empty>}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
