import React from 'react';
import styled from 'styled-components'
import { statusColor } from '@app/App.status'

export default styled(
	({text, children, className}) => <span className={`pill ${className}`}>
		{text || children}
	</span> 
	)`
	
	padding: 0.4em 1em 0.35em;
	background: white;
	color: black;
	border-radius: 0.3em;
	display: inline;
	width: auto;
	background: grey;
	color: var(--color-light);
	text-transform: uppercase;
	font-size: inherit;
	margin: 0 0.3em;

	${({status}) => statusColor('background', status)}

	${({lifted}) => !!lifted && `
		box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1), 0px 4px 4px rgba(0, 0, 0, 0.05);
	`}

	${({small}) => !!small && `
		padding: 0.3em 0.7em 0.25em;
	`}

	${({large}) => !!large && `
		width: 2em;
		height: 2em;
	`}
	
	`