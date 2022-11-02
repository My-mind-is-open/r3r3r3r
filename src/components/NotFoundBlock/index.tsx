


import React from 'react';

import styles from './NotFoundBlock.module.scss';

const NotFoundblock: React.FC = () => {



	return (
		<div className={styles.root}>
			<h1 className={styles.span}>😔</h1><br /><br />
			<h2 className={styles.hhh}>Ничего не найдено </h2>
			<br />
			<p> К сожалению данная страница отсутствует в нашем интернет магазине</p>
		</div>

	)
}

export default NotFoundblock;