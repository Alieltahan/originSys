import { useCallback, useContext, useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { utils, writeFileXLSX } from 'xlsx';
import { calculateAge } from '../../utils/CalcAge';
import { rowPerPage } from './Table.config';
import SaveTableData from '../SaveTableData';
import { DataContext } from '../../hooks/Context/DataContext';

/**
 * @param {String} rowId
 * @param {Fn} handleRowChange
 * @returns Table
 */
const TableComponent = ({ rowId, handleRowChange }) => {
	const { data } = useContext(DataContext);

	/**
	 * @returns Table rows data
	 */
	const rows = useMemo(
		() =>
			data.map((d) => {
				return {
					id: d.id,
					first_name: d.first_name,
					last_name: d.last_name,
					age: d.date_of_birth,
					city: d.address.city,
					phone_number: d.phone_number,
					plan: d.subscription.plan,
					plan_status: d.subscription.status,
				};
			}),
		[data],
	);

	/**
	 * @returns Table columns header
	 */
	const columns = useMemo(
		() => [
			{
				field: 'id',
				headerName: 'ID',
				width: 70,
			},
			{
				field: 'first_name',
				headerName: 'First Name',
				width: 130,
			},
			{
				field: 'last_name',
				headerName: 'Last Name',
				width: 130,
			},
			{
				field: 'city',
				headerName: 'City',
				width: 160,
			},
			{
				field: 'age',
				headerName: 'Age',
				width: 130,
				renderCell: (params) => calculateAge(params.row.age),
			},
			{
				field: 'phone_number',
				headerName: 'Phone Number',
				width: 210,
				sortable: false,
				filterable: false,
			},
			{
				field: 'plan',
				headerName: 'Plan',
				width: 100,
				type: 'singleSelect',
				valueOptions: [
					'Essential',
					'Premium',
					'Starter',
					'Professional',
					'Gold',
					'Student',
					'Diamond',
					'Free Trial',
					'Bronze',
					'Business',
					'Platinum',
					'Standard',
				],
				editable: true,
			},
			{
				field: 'plan_status',
				headerName: 'Plan Status',
				width: 110,
				type: 'singleSelect',
				valueOptions: ['Active', 'Idle', 'Pending', 'Blocked'],
				editable: true,
			},
			{
				field: 'actions',
				headerName: 'Save',
				type: 'actions',
				renderCell: (params) => (
					<SaveTableData {...{ params, rowId }} />
				),
			},
		],
		[rowId],
	);

	/**
	 * @returns exported excel file.
	 */
	const handleExport = useCallback(() => {
		const ws = utils.json_to_sheet(rows);
		const wb = utils.book_new();
		utils.book_append_sheet(wb, ws, 'Data');
		writeFileXLSX(wb, 'SheetJSReact.xlsx');
	}, [rows]);

	const renderDataGrid = () => {
		return (
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={rowPerPage}
				rowsPerPageOptions={[rowPerPage]}
				onCellEditCommit={(params) => handleRowChange(params.id)}
			/>
		);
	};

	const renderExportButton = () => {
		return (
			<Button
				sx={{ m: 'auto' }}
				variant='contained'
				onClick={handleExport}
			>
				Export to Excel
			</Button>
		);
	};

	if (!data.length) return <h1 style={{ margin: 'auto' }}>Loading....</h1>;

	return (
		<div
			style={{
				height: 400,
				width: '90%',
				display: 'flex',
				flexDirection: 'column',
				margin: 'auto',
			}}
		>
			{renderDataGrid()}
			{renderExportButton()}
		</div>
	);
};

export default TableComponent;
