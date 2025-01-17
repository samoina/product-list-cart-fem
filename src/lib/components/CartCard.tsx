import cartIcon from '../../assets/images/icon-add-to-cart.svg';
import { GlobalCounter, GlobalOrder } from '../store/Global';
import { useHookstate } from '@hookstate/core';
import { useState } from 'react';

interface Product {
	name: string;
	category: string;
	price: number;
	image: {
		thumbnail: string;
		mobile: string;
		tablet: string;
		desktop: string;
	};
}

interface CartCardProps {
	product: Product;
}

const CartCard: React.FC<CartCardProps> = ({ product }) => {
	//add global state to keep track of the specific order amount per product
	const globalCounter = useHookstate(GlobalCounter);
	const globalOrder = useHookstate(GlobalOrder);

	const [localCounter, setLocalCounter] = useState(0);
	const [showCounterControls, setShowCounterControls] = useState(false);

	const handleIncrement = () => {
		//update the local & global counter
		setLocalCounter((lc) => lc + 1);
		globalCounter.set((gc) => gc + 1);

		//update the cart using .set() which takes in a function that returns the new state
		globalOrder.set((prevOrder) => {
			const existingProduct = prevOrder.findIndex(
				(mealitem) => mealitem.name === product.name
			);

			if (existingProduct !== -1) {
				prevOrder[existingProduct].quantity += 1;
				return prevOrder;
			}

			//if the product does not exist in the order array, add it to the array plus 1 qty

			const totalUserOrder = product.price * localCounter;
			return [
				...prevOrder,
				{ name: product.name, price: product.price, quantity: 1, total: totalUserOrder },
			];
		});

		console.log(`Added new product to order: ${product.name}`);
	};

	const handleDecrement = () => {
		if (localCounter > 0) {
			setLocalCounter((lc) => lc - 1);
			globalCounter.set((gc) => gc - 1);
		}

		globalOrder.set((prevOrder) => {
			//get the index of the eisting product in the order array
			const existingProduct = prevOrder.findIndex(
				(mealItem) => mealItem.name === product.name
			);

			//if there is an existing product, check if the quantity is greater than 1, and if it is subtract 1. if i is not more than 1, remove the product from the order using splice
			if (existingProduct !== -1) {
				if (prevOrder[existingProduct].quantity > 1) {
					prevOrder[existingProduct].quantity -= 1;
				} else {
					//splice removes a specified number of elements at a specified position in an array, and returns the removed elements.
					prevOrder.splice(existingProduct, 1);
				}
				return prevOrder;
			} else {
				return prevOrder;
			}
		});
	};

	const handleAddToCartClick = () => {
		//change the state of the counter controls
		setShowCounterControls(true);

		console.log(`Added new product to order: ${product.name}`);
	};

	return (
		<div className="grid grid-cols-1 gap-6 relative">
			<picture>
				<source media="(min-width: 1024px)" srcSet={product.image.desktop} />
				<source media="(min-width: 768px)" srcSet={product.image.tablet} />
				<img
					className="rounded-lg"
					src={product.image.mobile}
					alt={product.name}
				/>
			</picture>

			{showCounterControls ? (
				<div className="flex justify-between bg-brownActive text-white w-[50%] absolute bottom-[90px] pb-2 rounded-3xl justify-self-center md:w-[70%]">
					<button
						className="border border-white ml-4 mt-4 rounded-full w-4 h-4 flex items-center justify-center hover:bg-white hover:text-brownActive"
						onClick={() => handleDecrement()}
					>
						-
					</button>
					<span className="mt-3 font-semibold">{localCounter}</span>
					<button
						className="mr-4 mt-4 rounded-full w-4 h-4 border border-white flex items-center justify-center hover:bg-white hover:text-brownActive"
						onClick={() => handleIncrement()}
					>
						+
					</button>
				</div>
			) : (
				// Add to cart button
				<button
					className="p-2 rounded-3xl border border-rose-300 justify-center font-semibold w-[50%] bg-white absolute bottom-[90px] flex justify-self-center md:w-[70%] hover:bg-brownActive hover:text-white"
					onClick={() => handleAddToCartClick()}
					type="button"
				>
					<img src={cartIcon} alt="cart icon" className="pr-2 text-white" /> Add
					to Cart
				</button>
			)}

			<div className="flex flex-col gap-1 pb-3">
				<p className="text-rose-300 text-sm font-medium">{product.category}</p>
				<p className="text-rose-500 font-bold">{product.name}</p>
				<p className="text-rose-800 font-bold">$ {product.price.toFixed(2)}</p>
			</div>
		</div>
	);
};
export default CartCard;
