import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Circle = styled(
	({total=100, value, background, className}) => {
		const [percent, setPercent] = useState(0);
		
		useEffect(() => {
			setPercent(100/total*value)
		}, [total, value]);

		return <div 
			className={`process-circle ${className}`}
			>
			<CircularProgressbar 
				value={percent} 
				strokeWidth={6}
				styles={buildStyles({
					strokeLinecap: 'butt',
					textSize: '14px',
					pathTransitionDuration: 2,
					pathColor: 'var(--color-primary-1)',
					textColor: 'currentColor',
					trailColor: 'currentColor',
				  })}
			/>
			{background && 
				<span 
					className={'-progress-background'}
					>
					{background}
				</span>
			}
		</div>
	})`

	position: relative;
	//display: block;

	.CircularProgressbar{
		border-radius: 50%;
		font-size: 1em;

		${({size='1em'}) => `
			width: ${size};
			height: ${size};
		`}

		.CircularProgressbar-path{
			font-size: 1em;
			stroke-width: 1.8em;
		}
		
		.CircularProgressbar-trail{
			opacity: 0.05;
			stroke-width: 1.2em;
		}
	}

	.-progress-background{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	`

export default {
	Circle
}