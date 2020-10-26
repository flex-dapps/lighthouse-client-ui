import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { filter } from 'lodash'
import { Host, Validator, Account } from '@archetypes'
import routeMappings from './_routeMappings'
import WidgetTemplate from './_widgetTemplate'

export default styled(
	({route='', ...rest}) => {
		const [ widgetMappings, setWidgetMappings ] = useState([])

		// on route change, update the widget set
		useEffect(() => {
			const widgets = routeMappings[route]?.header||[]
			
			const availableWidgets = {
				health: <Host.Partial.Health.Minimal/>,
				mainnet: <Host.Partial.Eth.Minimal/>,
				beacon: <Host.Partial.Beacon.Minimal/>,
				validators: <Validator.Partial.Overview.Minimal/>,
				mnemonic: <Validator.Partial.Mnemonic.Minimal/>,
				account: <Account.Status.Minimal/>,
			}

			const _items = Object.keys(availableWidgets)
				.map(name => (
					{
						component: availableWidgets[name],
						visible: widgets.includes(name)
					}
				))
			setWidgetMappings(_items)
		}, [route])

		return <header 
			{...rest}
			data-visible={filter(widgetMappings, {visible: true}).length > 0 ? 'true' : 'false'}
			>
			<div className="inner">
				{widgetMappings.map((widget, i) => <WidgetTemplate key={i} {...widget}/>)}
			</div>
		</header>
	})`
	border-bottom: 1px solid var(--color-grey-50);
	transform: translateY(0);
	transition: all 0.3s ease-in-out;

	.inner{
		display: flex;
		margin: 0 auto;
		max-width: 114rem;
	}
	
	.widget{
		border: none;
		border-left: 1px solid var(--color-grey-50);
		border-right: 1px solid var(--color-grey-50);
		min-width: calc(100% / 6);

		> * {
			border: none;
		}
		
		& + .widget{
			border-left: none;
		}
	}

	&[data-visible='false']{
		transition: all 0.15s ease-in-out;
		transform: translateY(-110%);
	}
	`