import { Check, SaveAs } from '@mui/icons-material';
import { Box, CircularProgress, Fab } from '@mui/material';
import { green } from '@mui/material/colors';
import { useContext, useState } from 'react';
import { DataContext } from '../../hooks/Context/DataContext';

/**
 * @param {Object} params Object of editting row.
 * @param {Number} rowId
 * @returns
 */
const SaveTableDataComponent = ({ params, rowId }) => {
	const [loading, setLoading] = useState(false);
	const [success, setSucess] = useState(false);
	const { handleDataUpdate } = useContext(DataContext);

	//Fn to save/update the user action edits.
	const handleSave = () => {
		setLoading(true);
		setTimeout(() => {
			const { id, plan, plan_status } = params.row;
			handleDataUpdate(id, plan, plan_status);
			setSucess(true);
			setLoading(false);
		}, 500);

		setTimeout(() => {
			setSucess(false);
		}, 1000);
	};

	const renderSuccessButton = () => {
		return (
			<Fab
				sx={{
					width: 40,
					height: 40,
					bgcolor: green[500],
					'&:hover': { bgcolor: green[700] },
				}}
			>
				<Check />
			</Fab>
		);
	};

	const renderSaveButton = () => {
		return (
			<Fab
				sx={{
					width: 40,
					height: 40,
				}}
				disabled={params.id !== rowId || loading}
				onClick={handleSave}
			>
				<SaveAs />
			</Fab>
		);
	};

	const renderLoadingButton = () => {
		return (
			<CircularProgress
				size={52}
				sx={{
					color: green[500],
					position: 'absolute',
					top: -6,
					left: -6,
					zIndex: 1,
				}}
			/>
		);
	};

	return (
		<Box
			sx={{
				m: 1,
				position: 'relative',
			}}
		>
			{success ? renderSuccessButton() : renderSaveButton()}
			{loading && renderLoadingButton()}
		</Box>
	);
};

export default SaveTableDataComponent;
