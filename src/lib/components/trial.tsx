<div className="order-items flex justify-between">
	<div className="flex flex-col gap-2 p-3">
		<p className="text-rose-500 text-sm font-bold">
			{/* here i need to find a dynamic way to display the name of the product. the one that has been clicked on needs to be sent to this component as a prop. */}
			{name}
		</p>
		<div className="flex justify-between gap-2">
			<p className="text-brownActive">1x</p>
			{/* I also need to get the price of the product that has been clicked on */}
			<p>${price.toFixed(2)}</p>
			<p className="font-semibold">${price.toFixed(2)}</p>
		</div>
	</div>
	<img
		className="rounded-full w-3 h-3 border border-rose-300 self-center"
		src={cancelIcon}
		alt="Cancel sign"
	/>
</div>;
