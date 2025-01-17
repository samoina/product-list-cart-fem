import { useHookstate } from '@hookstate/core';
import CartCard from './lib/components/CartCard';
import CartOrder from './lib/components/EmptyCartOrder';
import products from '../data.json';
import { GlobalCounter } from './lib/store/Global';
import SelectedCartOrder from './lib/components/SelectedCartOrder';

function App() {
	const counter = useHookstate(GlobalCounter).get();
	return (
		<div className="parent grid grid-cols-1 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
			<div className="contains-header grid grid-cols-1 md:col-span-2 lg:col-span-3">
				<h1 className="text-rose-900 font-bold text-3xl pb-3">Desserts</h1>

				<div className="md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3">
					{products.map((product) => {
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
