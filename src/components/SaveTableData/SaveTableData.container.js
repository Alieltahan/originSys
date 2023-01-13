import SaveTableDataComponent from './SaveTableData.component';

const SaveTableDataContainer = ({ params, rowId }) => {
	const containerProps = () => {
		return { params, rowId };
	};

	return <SaveTableDataComponent {...containerProps()} />;
};

export default SaveTableDataContainer;
