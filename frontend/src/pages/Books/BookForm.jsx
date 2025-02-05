import { Button, Group, TextInput, Select, FileInput, Stack, Image, Box, Center } from '@mantine/core';
import { IconFileTypePdf } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import React, { useState } from 'react'
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
// import * as pdfjsLib from 'pdfjs-dist/webpack';
import { useAddBookMutation } from '../../store/server/queries/booksQuery';

import { pdfjs } from 'react-pdf';
import AsyncSelect from '../../components/shared/AsyncSelect/AsyncSelect';
import { getCategory } from '../../store/server/services/categoryService';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;




const BookForm = ({ data }) => {
    
    const { mutate: addBookMutation, isError, error } = useAddBookMutation();
    const [filePreview, setFilePreview] = useState(null);

    const schema = z.object({
        name: z.string().min(5, { message: 'Must have at least 5 characters' }),
        author: z.string().min(2, { message: 'Must have at least 2 characters' }),
        categoryId: z.string().min(1, { message: 'Category is required' }),
        file: z.instanceof(File).refine((file) => file?.type === 'application/pdf', {
            message: 'File must be a PDF',
        }).refine((file) => !!file, {
            message: 'File is required',
        }),
        image: z.instanceof(File).refine((file) => !!file, {
            message: 'Picture is required',
        })
    });

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            author: "",
            categoryId: "679ead3169900db4a6c441ca",
            file: "",
            image: ""
        },
        validate: zodResolver(schema),
    });

    const handleFileChange = (file) => {
        if (file && file.type === 'application/pdf') {
            form.setFieldValue("file", file);
            renderFirstPage(file);
        } else {
            alert('Please upload a valid PDF file.');
        }
    };

    const loadCategoryOptions = (query) => {
        return getCategory({ search: query }).then((response) => {
          const result = response.data.data || [];
          return result.map(ele=>({
                value: ele?.category,
                key: ele._id
          }))
        })
      }
    const renderFirstPage = (file) => {
        const fileReader = new FileReader();
        fileReader.onload = async function () {
            try {

                const pdfData = new Uint8Array(this.result);

                // Load the PDF
                const pdf = await pdfjs.getDocument(pdfData).promise;

                // Get the first page
                const page = await pdf.getPage(1);

                // Create a canvas to render the page
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                const viewport = page.getViewport({ scale: 1 });

                canvas.width = viewport.width;
                canvas.height = viewport.height;

                // Render the page
                await page.render({ canvasContext: context, viewport: viewport }).promise;

                // Convert canvas to image URL (base64)
                const imgUrl = canvas.toDataURL('image/png');
                setFilePreview(imgUrl)

                // Convert base64 image to File object
                const imageBlob = await fetch(imgUrl).then(res => res.blob());
                const imageFile = new File([imageBlob], 'first-page.png', { type: 'image/png' });
                form.setFieldValue("image", imageFile);
            } catch (error) {
                console.error("Error during PDF processing:", error);
            }
        };
        fileReader.readAsArrayBuffer(file);
    };


    const handleSubmit = async (values) => {
        console.log('values', values)
        const formData = new FormData()
        Object.entries(values).forEach((key) => {
            formData.append(key[0], key[1])
        })

        addBookMutation(formData)
    };

    return (
        <Stack component='form' onSubmit={form.onSubmit(handleSubmit)} gap="1rem" justify='space-between' style={{ height: "100%" }}>
            <Stack>
                <Group justify="space-between" grow>
                    <TextInput
                        label="Name"
                        placeholder="e.g lord of rings"
                        {...form.getInputProps('name')}
                        size="md"
                    />
                    <TextInput
                        label="Author"
                        placeholder="shakespeare"
                        {...form.getInputProps('author')}
                        size="md"
                    />
                </Group>
                <Group justify="space-between" grow>
                    <AsyncSelect
                        label="Select Catgeory"
                        loadOptions={loadCategoryOptions}
                        {...form.getInputProps('categoryId')}
                        placeholder="Pick Category"
                        data={['React', 'Angular', 'Vue', 'Svelte']}
                        searchable
                    />
                    <FileInput
                        leftSection={<IconFileTypePdf size={18} stroke={1.5} />}
                        {...form.getInputProps('file')}
                        label="Attach Book PDF"
                        placeholder="Pdf only"
                        onChange={handleFileChange}
                        leftSectionPointerEvents="none"
                        disabled={data?._id}
                    />
                </Group>
                {filePreview && (
                    <Center>
                        <Image
                            radius="md"
                            w="69%"
                            src={filePreview} alt="First page of the PDF" />
                    </Center>
                )}
            </Stack>
            <Button fullWidth mt="xl" size="md" type="submit" loading={form.submitting} loaderProps={{ type: 'dots' }}>
                {data?._id ? "Update" : "Add"}
            </Button>
        </Stack>
    )
}

export default BookForm