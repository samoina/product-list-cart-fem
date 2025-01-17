import { useHookstate } from '@hookstate/core';
import { GlobalCounter } from '../store/Global';
import { GlobalOrder } from '../store/Global';
import cancelIcon from '/assets/images/icon-remove-item.svg';
import carbonNeutral from '/assets/images/icon-carbon-neutral.svg';

const SelectedCartOrder = () => {
	const counter = useHookstate(GlobalCounter);

	//remember order is an array of objects so we need to loop thru it.
	const order = useHookstate(GlobalOrder);

	return (
		<>
			{' '}
			<h2 className="text-brownActive font-bold text-2xl self-start">
				Your Cart <span>({counter.get()})</span>
			</h2>
			{/* Parent div for whole order */}
			<div className="flex flex-col gap-5">
				{/* loop thru the array and display each item */}
				<div className="order-items flex flex-col ">
					{order.get().map((item, index) => (
						<div
							key={index}
							className="order-items flex justify-between items-center "
						>
							<div className="flex flex-col flex-1 gap-2 p-3">
								<p className="text-rose-500 text-sm font-bold">{item.name}</p>
								<div className="flex justify-between">
									<p className="text-brownActive">{item.quantity}x</p>
									<p>${item.price.toFixed(2)}</p>
									<p className="font-semibold">
										$
										{(Number(item.price.toFixed(2)) * item.quantity).toFixed(2)}
									</p>
								</div>
							</div>
							<img
								className="rounded-full w-3 h-3 border border-rose-300 self-center"
								src={cancelIcon}
								alt="Cancel sign"
							/>
						</div>
					))}
				</div>

				<div className="order-total flex justify-between p-2">
					<p className="text-sm">Order Total</p>
					<p className="font-bold">
						$
						{order
							.get()
							.reduce((total, item) => total + item.price * item.quantity, 0)
							.toFixed(2)}
					</p>
				</div>

				<div className="carbon-neutral bg-rose-100 p-3 rounded">
					<p>
						{' '}
						<img
							className="inline pr-2"
							src={carbonNeutral}
							alt="Carbon neutral icon"
						/>
						This is a <span className="font-bold">carbon-neutral</span> delivery
					</p>
				</div>

				<button
					type="button"
					className="bg-brownActive text-white py-2 rounded-3xl hover:bg-rose-800"
				>
					Confirm Order
				</button>
			</div>
		</>
	);
};
export default SelectedCartOrder;
