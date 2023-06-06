import React from 'react';
import Tilt from 'react-parallax-tilt';
import lphoto from './Logo1280.jpg';

const Logo = () => {
	return (
			<Tilt className='clogo br2 shadow-2' style={{ height: '200px' , width: '200px' }}>
				<img src={lphoto} alt='hier comes the logoooo' />
    		</Tilt>
	);
}

export default Logo;




