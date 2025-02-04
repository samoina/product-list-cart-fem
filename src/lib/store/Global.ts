import { hookstate } from '@hookstate/core';

export const GlobalCounter = hookstate(0);

//Ensure that the initial order is defined as an array to allow for multiple orders

//first define the interface for the product object

//then define the initial state of the order as an empty array

//finally, create a global state object using the hookstate function and pass in the initial order array

type OrderItem = {
	name: string;
	price: number;
	quantity: number;
	total: number;
	thumbnail: string;
};

type Global = {
	isConfirmationModalOpen: boolean;
};

const InitialOrder: OrderItem[] = [];
export const GlobalOrder = hookstate(InitialOrder);

export const GlobalState = hookstate<Global>({
	isConfirmationModalOpen: false,
});

//add global state to detect the change to  takin a new order and reset the local counters in the cartcards
export const GlobalResetTrigger = hookstate(0);

//add a global counters objects to track each products count
export const GlobalCounters = hookstate<{ [key: string]: number }>({});

//create Global state for the removed items
export const RemovedItemState = hookstate<string | null>(null);
