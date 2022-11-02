
import axios from 'axios';
import React from 'react';
import Sort from '../components/Sorc';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import { fetchPizzas, selectorPizzaData } from '../redux/slices/pizzasSlice';

import { setCategoryId, setCurrentPage, selectFilter } from '../redux/slices/filterSlice';
import { useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';

// import { SearchContext } from '../App';


const Home: React.FC = () => {


	const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

	const { items, status } = useSelector(selectorPizzaData);


	// const sortType = useSelector((state) => state.filter.sort.sortProperty);


	const dispath = useAppDispatch();

	// const { searchValue } = React.useContext(SearchContext);
	// const [isLoading, setIsloading] = React.useState(true);
	// const [items, setItems] = React.useState([]);


	const onChageCategory = (id: number) => {

		dispath(setCategoryId(id))

	}

	const onChangePage = (page: number) => {

		dispath(setCurrentPage(page))

	}


	const getPizzas = async () => {

		// setIsloading(true);

		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const sortBy = sort.sortProperty.replace('-', '');
		const category = categoryId > 0 ? `category=${categoryId}` : "";
		const search = searchValue ? `&search=${searchValue}` : '';


		dispath(
			fetchPizzas({
				order,
				sortBy,
				category,
				search,
				currentPage: String(currentPage),
			}))


		window.scrollTo(0, 0);

	}





	React.useEffect(() => {


		// if (window.location.search) {

		// }
		getPizzas();
		// axios.get(`https://6322105afd698dfa29065926.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
		// 	.then((res) => {
		// 		setItems(res.data);
		// 		setIsloading(false);
		// 	})
		// window.scrollTo(0, 0);

	}, [categoryId, sort.sortProperty, searchValue, currentPage]);





	// React.useEffect(() => {
	// 	setIsloading(true)
	// 	fetch(`https://6322105afd698dfa29065926.mockapi.io/items?page=${currentPage}&limit=4&
	// 	${category}&sortBy=${sortBy}&order=${order}${search}`)
	// 		.then((res) => {
	// 			return res.json();

	// 		}).then((arr) => {
	// 			setItems(arr);
	// 			setIsloading(false);
	// 		});
	// 	window.scrollTo(0, 0);

	// }, [categoryId, sort.sortProperty, searchValue, currentPage]);


	const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
	const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
	return (
		<div className='container'>
			<div className="content__top">
				<Categories value={categoryId} onChangeCategory={onChageCategory} />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>

			{
				status === 'error' ? <div className='content__error-info'>
					<h2>Произошла ошибка 😕</h2>
					<p> К сожалени, не удалось получить пиццы. Попробуйте зайти на сайт позже</p>
				</div> : <div className="content__items">

					{
						status === 'loading' ? skeletons : pizzas
					}

				</div>
			}

			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	)

}
export default Home;

