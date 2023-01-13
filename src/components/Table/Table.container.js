import { useState, useEffect } from 'react';
import axios from 'axios';
import TableComponent from './Table.component';
import { fetchSize, URL } from './Table.config';
import { DataContext } from '../../hooks/Context/DataContext';

const TableContainer = () => {
	const [data, setData] = useState([]);
	const [rowId, setRowId] = useState(null);

	useEffect(() => {
		axios
			.get(URL + fetchSize)
			.then((response) => {
				setData(response.data);
			})
			.catch((err) => alert(`Error while fetching: ` + err.message));
	}, []);

	const handleRowChange = (id) => {
		setRowId(id);
	};

	const handleDataUpdate = (id, plan, plan_status) => {
		const dataCopy = [...data];
		const rowIndex = dataCopy.findIndex((el) => el.id === id);
		dataCopy[rowIndex] = {
			...dataCopy[rowIndex],
			subscription: {
				...dataCopy[rowIndex].subscription,
				plan,
				status: plan_status,
			},
		};
		setData(dataCopy);
		setRowId(null);
	};

	const containerProps = () => {
		return { rowId, handleRowChange };
	};

	return (
		<DataContext.Provider value={{ data, handleDataUpdate }}>
			<TableComponent {...containerProps()} />
		</DataContext.Provider>
	);
};

export default TableContainer;
