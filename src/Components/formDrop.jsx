import { Cloudinary } from '@cloudinary/url-gen';
import { backgroundRemoval } from '@cloudinary/url-gen/actions/effect';
import Dropzone from 'dropzone';
import 'dropzone/dist/dropzone.css';
import { useEffect } from 'react';

export const FormDrop = ({
	imageStatus,
	updateImageStatus,
	updateOriginalImage,
	updateModifiedImage
}) => {
	const cloudinary = new Cloudinary({
		cloud: {
			cloudName: 'dbcew5tj5'
		},
		url: {
			secure: true
		}
	});

	useEffect(() => {
		const dropzone = new Dropzone('#dropzone', {
			uploadMultiple: false,
			acceptedFiles: '.img, .png, .jpg ',
			maxFiles: 1
		});
		dropzone.on('sending', (file, xhr, formData) => {
			updateImageStatus('uploading');
			formData.append('upload_preset', 'ml_default');
			formData.append('timestamp', Date.now() / 1000);
			formData.append('api_key', 146575935286861);
		});
		dropzone.on('success', (file, response) => {
			const { public_id: publicId, secure_url: url } = response;

			const imageWithOutBackground = cloudinary
				.image(publicId)
				.effect(backgroundRemoval());

			updateImageStatus('done');
			updateModifiedImage(imageWithOutBackground.toURL());
			updateOriginalImage(url);
		});
		dropzone.on('error', (file, response) => {
			console.log('Ha ido mal');
			console.log(response);
		});
	}, []);

	return (
		<form
			id='dropzone'
			action='https://api.cloudinary.com/v1_1/dbcew5tj5/image/upload'
			className='flex h-[300px] w-[600px] flex-col items-center justify-center rounded-lg 
                       border-2 border-dashed border-gray-300 text-white shadow-2xl'
		>
			{imageStatus === 'ready' && (
				<>
					<button className='pointer-events-none rounded-full bg-blue-600 px-6 py-4 text-xl text-white '>
						Upload files
					</button>
					<strong className='mt-4 text-lg '>or drop a file</strong>
				</>
			)}
			{imageStatus === 'uploading' && (
				<strong className='mt-4 text-lg '>Uploading files...</strong>
			)}
		</form>
	);
};
