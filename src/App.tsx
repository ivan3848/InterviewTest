import { Button, CircularProgress, Container } from "@mui/material";
import { useEffect, useState } from "react";
import getImages from "./apiService";
import "./App.css";
import { Photo } from "./DataTypes";
import ImageTemplate from "./ImageTemplate";

function App() {
	const [data, setData] = useState<Photo[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [itemsToShow, setItemsToShow] = useState<number>(12);

	const fetchData = async () => {
		try {
			const response = await getImages();
			setData(response);
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError("An unknown error occurred");
			}
		} finally {
			setLoading(false);
		}
	};

	const removeImage = (id: number) => {
		setData((prevData) => prevData.filter((item) => item.id !== id));
	};

	useEffect(() => {
		fetchData();
	}, []);

	if (loading) {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					marginTop: "100px",
				}}
			>
				<CircularProgress size={200} />;
			</div>
		);
	}

	if (error) {
		return <div>{error}</div>;
	}

	if (!data) {
		return <div>No hay datos para mostrar</div>;
	}

	const showMoreItems = () => setItemsToShow(itemsToShow + 12);

	return (
		<>
			<Container
				maxWidth="xl"
				sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
			>
				{data
					.filter((_, index) => index < itemsToShow)
					.map((item) => (
						<ImageTemplate key={item.id} data={item} onRemove={removeImage} />
					))}
				<Button
					fullWidth
					onClick={showMoreItems}
					variant="outlined"
					color="info"
					sx={{ marginX: 15, marginTop: 5 }}
				>
					Mostrar Mas Imágenes
				</Button>
			</Container>
		</>
	);
}

export default App;
