import React from 'react';
import styled from 'styled-components'

export default styled(
	({title, children, className, vertical, ...rest}) => <hr className={`divider ${className}`} {...rest}/>
	)`
	opacity: 0.15;
	border: none;

	${({vertical}) => !!vertical 
		? `
			display: inline-block;
			border-left: 1px solid currentColor;
			height: 1em;
			width: 0;
			margin: auto 1em;
		`
		: `
			display: block;
			border-bottom: 1px solid currentColor;
			height: 0;
			width: 100%;
			margin: 1em 0;
		`
	}

	${({compact, vertical}) => {
		const spacing = !!compact ? '1em' : '2em'
		return !!vertical ? `margin: auto ${spacing};` : `margin: ${spacing} 0;`
	}}
	
	`