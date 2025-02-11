import { useQuery } from '@tanstack/react-query';

//this is the actual function that does the fetching
const fetchProducts = async () => {
	const response = await fetch('http://localhost:8000/api/products');
	// const response = await fetch('https://dummyjson.com/products');
	console.log('enter useQuery fetch func');
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	const data = await response.json();
	console.log(data);
	return data;
};

export const useProductList = () => {
	return useQuery({
		queryKey: ['products'],
		queryFn: fetchProducts,
	});
};
