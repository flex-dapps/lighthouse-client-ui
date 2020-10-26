import React from 'react';
import styled from 'styled-components'

export default styled(
	({component, visible, className, ...rest}) => 
		<span 
			className={`widget ${className}`} 
			data-visible={visible} 
			{...rest}
			>
			{component}
		</span>
	)`
	overflow: hidden;
	transition: all 0.3s ease-in-out;
	display: block;
	transform: translateY(0);

	&[data-visible='false']{
		transition: all 0.15s ease-in-out;
		transform: translateY(-110%);
	}

	>*{
		height: 100%;
		border: 1px solid var(--color-grey-50);
		border-top: none;
		border-bottom: none;
	}
	`