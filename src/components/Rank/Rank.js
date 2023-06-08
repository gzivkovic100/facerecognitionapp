import React from 'react';


const Rank = ({ name, entries }) => {
	return (
		<div style={{ position: 'relative' , zIndex: '100' }}>
			<div className='pt1 f3 white'>
				{`${name}, your current entry count is...`}
			</div>
			<div className='f2 white'>
					{entries}
			</div>
		</div>
	);
}

export default Rank;

