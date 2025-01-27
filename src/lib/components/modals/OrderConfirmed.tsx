import { useHookstate } from '@hookstate/core';
import OrderConfirmedImg from '/assets/images/icon-order-confirmed.svg';
//modal
import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogTitle,
	DialogDescription,
} from '@radix-ui/react-dialog';
import { GlobalCounter, globalState } from '../../store/Global';
import { GlobalOrder } from '../../store/Global';

/*
1. import dialog from radix-ui
2. create Global state to contain the confirmation modal state
3. initially set the state to false in the Dialog component


*/
const OrderConfirmed = () => {
	const { isConfirmationModalOpen } = useHookstate(globalState);

	//remember order is an array of objects so we need to loop thru it.
	const order = useHookstate(GlobalOrder);

	const handleNewOrder = () => {
		isConfirmationModalOpen.set(false);
		GlobalCounter.set(0);
		order.set([]);
	};

	return (
		<Dialog
			open={isConfirmationModalOpen.value}
			onOpenChange={(isOpen) => isConfirmationModalOpen.set(isOpen)}
		>
			<DialogTrigger asChild>
				<button
					type="button"
					className="bg-brownActive text-white py-2 rounded-3xl hover:bg-rose-800"
				>
					Confirm Order
				</button>
			</DialogTrigger>

			<DialogContent
				className="bg-white border border-red-500 w-full h-[92%] rounded-md space-y-4 
    fixed top-4 left-1/2 transform -translate-x-1/2 px-5 py-8"
			>
				<DialogTitle>
					<img src={OrderConfirmedImg} alt="Order Confirmed tick" />
					<h2 className="text-rose-900 font-bold text-5xl self-start py-2">
						Order Confirmed
					</h2>
				</DialogTitle>
				<DialogDescription className="text-rose-500">
					We hope you enjoy your food!
				</DialogDescription>

				<div className="order-items flex flex-col bg-rose-50 px-5 pt-8">
					{order.get().map((item, index) => (
						<div
							key={index}
							className="order-items flex justify-between items-center border-bottom-2 border-rose-300"
						>
							<img
								src={item.thumbnail}
								alt="thumbnail food image"
								className="w-14 h-14 rounded-lg"
							/>
							<div className="flex flex-col flex-1 gap-2 p-3">
								<p className="text-rose-500 text-sm font-bold">{item.name}</p>
								<div className="flex justify-between">
									<p className="text-brownActive font-bold">{item.quantity}x</p>
									<p className="text-rose-500">${item.price.toFixed(2)}</p>
									<p className="font-semibold">
										$
										{(Number(item.price.toFixed(2)) * item.quantity).toFixed(2)}
									</p>
								</div>
							</div>
						</div>
					))}

					<div className="order-total flex justify-between p-5 bg-rose-50">
						<p className="text-sm pt-2">Order Total</p>
						<p className="font-bold text-2xl">
							$
							{order
								.get()
								.reduce((total, item) => total + item.price * item.quantity, 0)
								.toFixed(2)}
						</p>
					</div>
				</div>
				<button
					type="button"
					onClick={handleNewOrder}
					className="bg-brownActive text-white py-3 rounded-3xl hover:bg-rose-800 w-full"
				>
					Start New Order
				</button>
			</DialogContent>
		</Dialog>
	);
};
export default OrderConfirmed;
