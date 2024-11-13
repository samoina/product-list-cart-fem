import products from '../data.json';
import emptyCartIcon from './assets/images/illustration-empty-cart.svg';
import cartIcon from './assets/images/icon-add-to-cart.svg';

function App() {
	return (
		<div className="parent grid grid-cols-1 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
			<div className="contains-header grid grid-cols-1 md:col-span-2 lg:col-span-3">
				<h1 className="text-rose-900 font-bold text-3xl pb-3">Desserts</h1>

				<div className="md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3">
					{products.map((product) => {
						return (
							<div
								className="grid grid-cols-1 gap-6 relative"
								key={crypto.randomUUID()}
							>
								<picture>
									<source
										media="(min-width: 1024px)"
										srcSet={product.image.desktop}
									/>
									<source
										media="(min-width: 768px)"
										srcSet={product.image.tablet}
									/>
									<img
										className="rounded-lg"
										src={product.image.mobile}
										alt={product.name}
									/>
								</picture>

								<button className="p-2 rounded-3xl border border-rose-300 flex justify-center font-semibold w-[50%] bg-white absolute bottom-[90px] justify-self-center md:w-[70%]">
									<img src={cartIcon} alt="cart icon" className="pr-2" /> Add to
									Cart
								</button>

								<div className="flex flex-col gap-1 pb-3">
									<p className="text-rose-300 text-sm font-medium">
										{product.category}
									</p>
									<p className="text-rose-500 font-bold">{product.name}</p>
									<p className="text-rose-800 font-bold">
										$ {product.price.toFixed(2)}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			<div className="flex flex-col items-center gap-2 p-6 bg-white md:col-span-1 md:mt-12">
				{' '}
				<h2 className="text-rose-800 font-bold text-2xl self-start">
					Your Cart <span>(0)</span>
				</h2>
				<img src={emptyCartIcon} alt="" />
				<p className="text-rose-500 font-semibold">
					Your added items will appear here
				</p>
			</div>
		</div>
	);
}

export default App;
