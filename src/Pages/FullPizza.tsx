import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';


const FullPizza: React.FC = () => {
	const [pizza, setPizza] = useState<{
		imageUrl: string;
		title: string;
		price: number;
	}>();
	const { id } = useParams();


	React.useEffect(() => {

		async function fetchPizza() {
			try {
				const { data } = await axios.get('https://6322105afd698dfa29065926.mockapi.io/items/' + id)
				setPizza(data);
			} catch (error) {
				alert(error);
			}
		}

		fetchPizza();
	}, []);

	if (!pizza) {
		return <>Dowload....</>
	}
	return (
		<div className="fullcontainer">
			< img width="300px" src={pizza.imageUrl} />
			<h1>{pizza.title}</h1>
			<h2>{pizza.price} Rub</h2>

		</div >


	);
};

export default FullPizza
