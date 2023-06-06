import React from 'react';
import Tilt from 'react-parallax-tilt';
import lphoto from './Logo1280.jpg';

const Logo2 = () => {
	return (
			<Tilt className='clogo br2 shadow-1' style={{ height: '30vh' , width: '30vw' }}><img src={lphoto} alt='hier comes the logoooo' /></Tilt>
	);
}


export default Logo2;