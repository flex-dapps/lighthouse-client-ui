import React, { Fragment } from 'react';
import styled from 'styled-components'
import { Widget } from '@components'
import { ValidatorStore } from '@store'
import { ReactComponent as IconValidators } from '@assets/validators.svg';
import WidgetTemplate from './_WidgetTemplate'

const Component = props => {
	const { state } = ValidatorStore()
	return <WidgetTemplate.Content
		icon={<IconValidators/>} 
		title={<Fragment>Validator<br/>Count</Fragment>} 
		value={`${Object.keys(state.validators).length}`} 
	/>
}

const Full = props => <WidgetTemplate {...props}>
	<WidgetTemplate.Header 
		left='Validators' 
		right='01'
	/>
	<Component/>
	<WidgetTemplate.Footer/>
</WidgetTemplate>	
	
const Minimal = styled(
	props => {
		const { state } = ValidatorStore()
		return <Widget.Minimal
			title='Validators'
			subtitle={`Required: ${state.network?.eth_per_validator*Object.keys(state.validators).length} ETH`}
			info={`+${(state.reward?.eth||0).toFixed(3)} ETH ${state.horizon} `}
			{...props}
			extra={
				<span 
					className='-count'
					>
					x{Object.keys(state.validators).length}
				</span>
			}
		/>
	})`
	.-count{
		opacity: 0.1;
		margin-top: -0.15em;
		line-height: 1em;
		font-size: var(--font-size-xlarge);
		font-weight: 600;
	}
	`


Component.Full = Full
Component.Minimal = Minimal

export default Component