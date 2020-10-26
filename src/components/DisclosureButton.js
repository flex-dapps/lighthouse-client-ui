import React from 'react';
import styled from 'styled-components'
import { Button, Modal } from '@components'
import { ReactComponent as IconInfo } from '@assets/info.svg';

export default styled(
	({icon, text, children, ...rest}) => {

		return <Button 
			inline 
			heavy 
			onClick={() => Modal.open(children)}
			{...rest}
			>
			{icon ? icon : <IconInfo/>}
			{text ? text : 'View Important Discolsures'}
		</Button>
	})`
	color: var(--button--hover--color, #5E41D5);
	font-size: var(--font-size-small, 12px);
	opacity: 0.7;

	&:hover{
		opacity: 1
	}
	`