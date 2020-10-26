import React from 'react'
import styled from 'styled-components'

export default styled(
	({children, className}) => <div 
		className={`grid ${className}`}
		>
		{React.Children.map(children, (child, i) => <span key={i}>{child}</span>)}
	</div>
	)`
	display: flex;
	flex-wrap: wrap;
	align-items: stretch;
	margin: 0 calc(0rem - var(--grid--spacing, 0.4rem));

	> span {
		width: ${({cols=1}) => 100/cols}%;
		display: block;
		padding: var(--grid--spacing, 0.4rem);

		>*{
			height: 100%;
		}

		// custom
		${({width=[]}) => width.map((w, i) => `&:nth-child(${i+1}){ width: ${w}% }`)}
	}

	& + .grid{

	}
	
	`