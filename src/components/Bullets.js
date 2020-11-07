import React from 'react';
import styled from 'styled-components'

const Bullets = styled(
	({type='ul', items=[], ...props}) => {
		let NodeType = type
		return <NodeType {...props}>
			{items.map((item, i) => <li key={i}>{item}</li>)}
		</NodeType>
	})`
	font-size: var(--font-size-medium);
	font-weight: 300;
	line-height: 1.6em;
	padding: 0 1em;
	position: relative;

	li{
		margin-bottom: 0.5em;
	}
	`

Bullets.Numbered = styled(
	props => {
		return <Bullets type='ol' {...props}/>
	})`
	list-style: none;
	padding: 0;
	
	li{
		display: flex;
		align-items: center;
		counter-increment: my-awesome-counter;
		&:before {
			content: counter(my-awesome-counter);
			margin-right: 0.8em;
			border: 1px solid currentColor;
			width: var(--font-size-medium);
			height: var(--font-size-medium);
			display: inline-block;
			text-align: center;
			border-radius: 50%;
			font-size: var(--font-size-small);
			line-height: var(--font-size-medium);
			background: white;
		}
	}
`
export default Bullets