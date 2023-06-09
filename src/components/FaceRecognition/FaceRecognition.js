import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl , box }) => {
	return (
		<div style={{ position: 'relative' , zIndex: '100' , width: '300px' , height: 'auto' }} className='center'>
			<img id='inputImage' src={imageUrl} alt=''/>
			<div className='bounding-box' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
		</div>
	);
}

export default FaceRecognition;





