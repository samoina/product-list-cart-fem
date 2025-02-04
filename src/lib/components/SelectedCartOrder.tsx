import { useHookstate } from '@hookstate/core';
import {
	GlobalCounter,
	GlobalResetTrigger,
	GlobalState,
} from '../store/Global';
import { GlobalOrder } from '../store/Global';
import cancelIcon from '/assets/images/icon-remove-item.svg';
import carbonNeutral from '/assets/images/icon-carbon-neutral.svg';
import OrderConfirmedImg from '/assets/images/icon-order-confirmed.svg';
//modal
import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogTitle,
	DialogDescription,
	DialogOverlay,
} from '@radix-ui/react-dialog';

//keep track of the removed items
import { RemovedItemState } from '../store/Global';

const SelectedCartOrder = () => {
	const counter = useHookstate(GlobalCounter);

	//remember order is an array of objects so we need to loop thru it.
	const order = useHookstate(GlobalOrder);
	const { isConfirmationModalOpen } = useHookstate(GlobalState);
	//use this global state to listen to changes when a new order is made and then reset the local counters in the specific cartcards. the local reset trigger is for the specific cartcard
	const globalResetTrigger = useHookstate(GlobalResetTrigger);

	//handle the click of the x icon to remove the item from the order
	const handleXClick = (item: { name: string; price: number; quantity: number; }) => {
		console.log('handle clicked', item.name);
		//update global state for the removed item
		RemovedItemState.set(item.name);
		/*
1. remove the item from the global order
2. deduct the quantity & price
3. clear the local counter
		*/

		order.set((prevOrder) => {
			const existingProduct = prevOrder.findIndex(
				(mealItem) => mealItem.name === item.name
			);
			if (existingProduct !== -1) {
				prevOrder[existingProduct].quantity = 0;
				prevOrder[existingProduct].total -= prevOrder[existingProduct].price;
				if (prevOrder[existingProduct].quantity === 0) {
					prevOrder.splice(existingProduct, 1);
				}

				//update the global counter
				const totalQuantity = prevOrder.reduce(
					(total, item) => total + item.quantity,
					0
				);
				counter.set(totalQuantity);
			}
			return prevOrder;
		});
	};

	const handleNewOrder = () => {
		isConfirmationModalOpen.set(false);
		GlobalCounter.set(0);
		order.set([]);
		globalResetTrigger.set((prev) => prev + 1);
	};

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
							{/* on click */}
							<img
								className="rounded-full w-3 h-3 border border-rose-300 self-center hover:border-rose-500 cursor-pointer"
								src={cancelIcon}
								alt="Cancel sign"
								onClick={() => handleXClick(item)}
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

					<DialogOverlay className="fixed inset-0 bg-black/50">
						<DialogContent className="bg-white w-full md:w-[50%] lg:w-[40%] h-[92%] md:h-fit rounded-md space-y-4 px-5 py-8 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
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
											<p className="text-rose-500 text-sm font-bold">
												{item.name}
											</p>
											<div className="flex justify-between">
												<p className="text-brownActive font-bold">
													{item.quantity}x
												</p>
												<p className="text-rose-500">
													${item.price.toFixed(2)}
												</p>
												<p className="font-semibold">
													$
													{(
														Number(item.price.toFixed(2)) * item.quantity
													).toFixed(2)}
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
											.reduce(
												(total, item) => total + item.price * item.quantity,
												0
											)
											.toFixed(2)}
									</p>
								</div>
							</div>
							<button
								type="button"
								aria-label="Close to start new order"
								onClick={handleNewOrder}
								className="bg-brownActive text-white py-3 rounded-3xl hover:bg-rose-800 w-full"
							>
								Start New Order
							</button>
						</DialogContent>
					</DialogOverlay>
				</Dialog>
			</div>
		</>
	);
};
export default SelectedCartOrder;
