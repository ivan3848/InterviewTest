import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { Photo } from "./DataTypes";

interface Props {
	data: Photo;
	onRemove: (id: number) => void;
}

const ImageTemplate = ({ data, onRemove }: Props) => {
	const handleRemoveImage = () => onRemove(data.id);
	return (
		<Card sx={{ width: 400, height: 400, margin: 1 }}>
			<CardMedia
				component="img"
				height="250"
				image={data.img_src}
				alt={data.camera.full_name}
				sx={{ objectFit: "cover" }}
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{data.camera.full_name}
				</Typography>
			</CardContent>
			<CardActions>
				<Button
					onClick={handleRemoveImage}
					variant="outlined"
					color="error"
					title="Eliminar"
				>
					Eliminar
				</Button>
			</CardActions>
		</Card>
	);
};

export default ImageTemplate;
