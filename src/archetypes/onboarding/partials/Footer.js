import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import routeMappings from './_routeMappings'
import Progress from './Progress'

export default styled(
	({route='', ...rest}) => {
		const [ visible, setVisible ] = useState(false)

		// on route change, update the widget set
		useEffect(() => {
			setVisible(routeMappings[route]?.showProgress||false)
		}, [route])

		return <footer 
			{...rest}
			data-visible={visible}
			>
			<div className="inner">
				<Progress route={route}/>
			</div>
		</footer>
	})`
	border-top: 1px solid var(--color-grey-50);
	transform: translateY(0);
	transition: all 0.3s ease-in-out;
	width: 100%;

	.inner{
		display: flex;
		margin: 0 auto;
		width: 100%;
	}
	
	.widget{
		border: none;
		border-left: 1px solid var(--color-grey-50);
		border-right: 1px solid var(--color-grey-50);

		> * {
			border: none;
		}
		
		& + .widget{
			border-left: none;
		}

		&[data-visible='false']{
			transform: translateY(110%);
		}
	}

	&[data-visible='false']{
		transition: all 0.15s ease-in-out;
		transform: translateY(110%);
	}
	`