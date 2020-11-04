import React, { Fragment } from 'react';
import styled from 'styled-components'
import { Field } from '@components'
import { numberToMaxDb, format } from '@util/helpers'
import { ValidatorStore, AppStore } from '@store'
import WidgetTemplate from './_WidgetTemplate'

const Component = props => {
	
	const { state } = ValidatorStore()

	return <WidgetTemplate.Content
		//icon={<IconPlus/>} 
		title={<Fragment>Stake<br/>Required</Fragment>} 
		value={`${numberToMaxDb(state.stakeRequired)} ETH`} 
		info={`${Object.keys(state.validators).length} validators x ${state.network?.eth_per_validator} ETH`}
	/>
}

const Full = styled(
	props => {
		const { state } = ValidatorStore()
		const { state: appState, set: appSet } = AppStore()

		return <WidgetTemplate {...props}>
			<WidgetTemplate.Header 
				left='Investment' 
				right='01'
			/>
			<Component/>
			<WidgetTemplate.Footer 
				left={
					<Field.Select 
						className={'-currency-select'}
						value={state?.currency}
						title={'Choose Currency'} 
						options={Object.keys(state?.rates||{}).map(key => ({key: key, value: key}))} 
						small
						onChange={key => appSet('currency', key)}
					/>
				}
				right={`${format.currency(appState.locale, state?.currency, state?.cost)}`}
			/>
		</WidgetTemplate>	
	})`
		.-currency-select{
			.-title{
				font-size: var(--font-size-xsmall);
				margin-bottom: 0;
			}
			.-container{
				border-bottom: none;
				select{
					padding: 0.4em 0 0 0;
				}
			}
		}
	`

Component.Full = Full

export default Component