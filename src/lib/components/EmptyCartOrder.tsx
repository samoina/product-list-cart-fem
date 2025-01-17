import emptyCartIcon from '/assets/images/illustration-empty-cart.svg';
import { useHookstate } from '@hookstate/core';
import { GlobalCounter } from '../store/Global';

const CartOrder = () => {
	const counter = useHookstate(GlobalCounter);

	return (
		<>
			{' '}
			<h2 className="text-rose-800 font-bold text-2xl self-start">
				Your Cart <span>({counter.get()})</span>
			</h2>
			<img src={emptyCartIcon} alt="" />
			<p className="text-rose-500 font-semibold">
				Your added items will appear here
			</p>
		</>
	);
};
export default CartOrder;
