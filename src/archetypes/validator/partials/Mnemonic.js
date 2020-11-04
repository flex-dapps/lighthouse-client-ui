import React from 'react';
import styled from 'styled-components'
import { Widget, Status, Button } from '@components'
import { ValidatorStore } from '@store'
import { ReactComponent as IconArrowRight } from '@assets/arrow_right.svg';

const Minimal = styled(
	props => {
		const { trigger } = ValidatorStore()
		return <Widget.Minimal
			title='Mnemonic'
			subtitle={`Confirmed`}
			info={<Button inline onClick={() => trigger('mnemonic.download')}>Download <IconArrowRight/></Button> }
			{...props}
			extra={<Status.Icon status='success'/>}
		/>
	})`

	.-right{
		.status-icon{
			font-size: 2em
		}
	}

	button .-button-wrapped-string-child{
		margin: 0 !important;
	}
	`

export default {
	Minimal
}