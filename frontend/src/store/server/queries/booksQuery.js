import { useMutation } from 'react-query';
import { getBooks } from '../services/booksService';

export const useGetBookQuery = () =>
  useMutation(['books'], async (params) => {
    const res = await getBooks(params);
    return res.data.data;
  });