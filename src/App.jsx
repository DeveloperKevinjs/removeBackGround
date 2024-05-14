import { useState } from 'react';
import './App.css';
import { FormDrop } from './Components/formDrop';
import { FormDropEdit } from './Components/formDropEdit';

function App() {
	const initial = { ready: 'ready', uploading: 'uploading', done: 'done' };

	const [imageStatus, setImageStatus] = useState(initial.ready);
	const [originalImage, setOriginalImage] = useState(null);
	const [modifiedImage, setModifiedImage] = useState(null);

	const updateImageStatus = value => {
		setImageStatus(value);
	};
	const updateOriginalImage = value => {
		setOriginalImage(value);
	};
	const updateModifiedImage = value => {
		setModifiedImage(value);
	};
	return (
		<div className='m-auto w-[90%] max-w-[1200px]'>
			<header className='p-6 '>
				<h1 className='font-semiboldbold text-center font-sans text-4xl text-red-600'>
					Remove the <span className='text-5xl text-white'>background</span>{' '}
					from your <span className='text-5xl text-white'>image</span>
				</h1>
			</header>
			<main className='flex justify-center'>
				{imageStatus === initial.ready || imageStatus === initial.uploading ? (
					<FormDrop
						imageStatus={imageStatus}
						updateImageStatus={updateImageStatus}
						updateOriginalImage={updateOriginalImage}
						updateModifiedImage={updateModifiedImage}
					></FormDrop>
				) : (
					imageStatus === initial.done && (
						<FormDropEdit
							originalImage={originalImage}
							modifiedImage={modifiedImage}
						></FormDropEdit>
					)
				)}
			</main>
		</div>
	);
}

export default App;
