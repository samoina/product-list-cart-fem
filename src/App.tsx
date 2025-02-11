import { useHookstate } from '@hookstate/core';
import CartCard from './lib/components/CartCard';
import CartOrder from './lib/components/EmptyCartOrder';

import { GlobalCounter } from './lib/store/Global';
import SelectedCartOrder from './lib/components/SelectedCartOrder';

import { useProductList } from './hooks/useProductList';

interface Image {
	thumbnail: string;
	mobile: string;
	tablet: string;
	desktop: string;
}
interface Product {
	_id: string;
	image: Image;
	name: string;
	price: number;
	category: string;
}

function App() {
	const counter = useHookstate(GlobalCounter).get();

	const { data, isLoading, error } = useProductList();
	console.log(data);

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error fetching products</p>;

	return (
		<div className="parent grid grid-cols-1 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
			<div className="contains-header grid grid-cols-1 md:col-span-2 lg:col-span-3">
				<h1 className="text-rose-900 font-bold text-3xl pb-3">Desserts</h1>

				<div className="md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3">
					{data?.map((product: Product) => {
						return <CartCard key={product.name} product={product} />;
					})}
				</div>
			</div>

			<div className="flex flex-col items-center gap-2 p-6 bg-white md:col-span-1 md:mt-12">
				{counter > 0 ? <SelectedCartOrder /> : <CartOrder />}
			</div>
		</div>
	);
}

export default App;
