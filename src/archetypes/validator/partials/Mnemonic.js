import React from 'react';
import styled from 'styled-components'
import { Widget, Status, Button } from '@components'
import { ValidatorStore } from '@store'

const Minimal = styled(
	props => {
		const { trigger } = ValidatorStore()
		return <Widget.Minimal
			title='Mnemonic'
			subtitle={`Confirmed`}
			info={<Button inline onClick={() => trigger('mnemonic.download')}>Download</Button> }
			{...props}
			extra={<Status.Icon status='success'/>}
		/>
	})`

	.-right{
		.status-icon{
			font-size: 2em
		}
	}
	`

export default {
	Minimal
}