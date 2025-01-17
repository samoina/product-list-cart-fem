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
};

const InitialOrder: OrderItem[] = [];
export const GlobalOrder = hookstate(InitialOrder);
