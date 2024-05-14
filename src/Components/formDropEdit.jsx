import { useEffect, useState } from 'react';
import 'two-up-element';
export const FormDropEdit = ({ originalImage, modifiedImage }) => {
	const [processingImage, setProcessingImage] = useState(true);
	const [tries, setTries] = useState(0);
	const [intervalId, setIntervalId] = useState(null);

	useEffect(() => {
		if (processingImage) {
			clearInterval(intervalId);
			const newIntervalId = setInterval(() => {
				setTries(prevTries => prevTries + 1);
				const img = new Image();
				img.src = modifiedImage;
				img.onload = () => {
					setProcessingImage(false);
					clearInterval(newIntervalId);
				};
			}, 500);
			setIntervalId(newIntervalId);
		}
	}, [processingImage, modifiedImage]);

	return (
		<div className='flex flex-col items-center justify-center'>
			<two-up>
				<img src={originalImage} alt='Image original' />
				{processingImage ? (
					<div className='flex flex-col items-center justify-center'>
						<p className='mt-4 text-center'>Procesando imagen...</p>
					</div>
				) : (
					<img
						src={modifiedImage}
						alt='Imagen sin fondo subida por el usuario'
					/>
				)}
			</two-up>

			<a
				download
				className='my-10 rounded-full bg-blue-600 px-4 py-2 text-xl font-bold text-white'
				href={modifiedImage}
			>
				Download image without background
			</a>
		</div>
	);
};
