import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit, onButtonClearInput, message }) => {
	return (
		<div style={{ position: 'relative' , zIndex: '100' }}>
			<p className='f4 white b'>
				{'This magic will detect faces!!!'}
			</p>
			<div className='center'>
				<div className='form pa2 br4 shadow-1'>
					<input className='f4 pa2 w-60' type='text' value={message} onChange={onInputChange} />
					<button className='f4 pa2 w-20 grow link dib white bg-light-purple' onClick={onButtonSubmit}>Detect</button>
					<button className='f4 pa2 ml2 w-15 grow link dib white bg-light-purple' onClick={onButtonClearInput}>Clear Input</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;







