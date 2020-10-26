import React from 'react';
import styled from 'styled-components'

export default styled(
	({title, children, className, ...rest}) => {
		// make sure all children are wrapped in a node
		const warppedChildren = React.Children.map(children, child => (typeof child === 'string' || typeof child === 'number') ? <span className='-label-wrapped-string-child'>{child}</span> : child)
		
		return <div className={`label ${className}`} {...rest}>
			<span className="label-title">{title}</span>
			<span className="label-text">{warppedChildren}</span>
		</div>
	})`
	display: flex;
	align-items: center;
	//line-height: 1.3em;
	font-size: 1em;
	${({right}) => `text-align: ${!!right ? 'right' : 'left'};`}
	
	.label-title,
	.label-text{
		text-overflow: ellipsis;
		color: currentColor;
		display: flex;
		align-items: center;
		line-height: 1em;		
	}

	.label-title{
		opacity: 0.6;
		margin-right: 0.3em;
	}

	.label-text{
		>*{
			display: flex;
			margin: 0 0.25em !important;
			&:first-child{ margin-left: 0 !important }
			&:last-child{ margin-right: 0 !important }
		}
	}

	& + .label{
		margin-top: 0.6em;
	}


	${({strong}) => !!strong && `
		.label-title{
			font-weight: bold;
			text-transform: uppercase;
		}
	`}
`