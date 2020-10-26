import React, { Fragment } from 'react';
import styled from 'styled-components'
import { Field } from '@components'
import { numberToMaxDb, format } from '@util/helpers'
import { ValidatorStore, AppStore } from '@store'
import WidgetTemplate from './_WidgetTemplate'
import { StakingPeriods } from '@app/App.config'

const Component = props => {
	const { state } = ValidatorStore()

	return <WidgetTemplate.Content
		title={<Fragment>Reward<br/>Calculator</Fragment>} 
		value={`+ ${numberToMaxDb(state.reward?.eth, 3)} ETH`} 
		info={`${numberToMaxDb(state.reward?.percent, 3)}% ${state?.horizon}`}
	/>
}

const Full = styled(
	props => {
		const { state, set } = ValidatorStore()
		const { state: appState } = AppStore()

		return <WidgetTemplate {...props}>
			<WidgetTemplate.Header 
				left='Returns' 
				right='02'
			/>
			<Component/>
			<WidgetTemplate.Footer 
				left={
					<Field.Select 
						className='-horizon-select'
						value={state?.horizon}
						title={'Choose the horizon'} 
						options={Object.values(StakingPeriods)} 
						small
						onChange={key => set('horizon', key)}
						style={{
							padding: '0.5em 0 0 0',
						}}
					/>
				}
				right={`${format.currency(appState.locale, state?.currency, state.reward?.fiat)}`}
			/>
		</WidgetTemplate>	
	})
	`
		.-horizon-select{
			.-title{
				font-size: var(--font-size-small);
				margin-bottom: 0;

			}
			.-container{
				border-bottom: none;
				select{
					padding: 0.5em 0 0 0;
				}
			}

		}
	`

Component.Full = Full

export default Component