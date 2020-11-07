import React from 'react';
import styled from 'styled-components'
import { Sparklines, SparklinesLine } from 'react-sparklines';

export default styled(
	({data=[], min=0, max=100, limit=10, className, ...rest}) => <span className={className}>
		<Sparklines data={data} margin={0} min={min} max={max} limit={limit} {...rest}>
			<SparklinesLine style={{ stroke: "var(--color-grey-50)", strokeWidth: '1', fill: "var(--color-grey-100)"}} />
		</Sparklines>
	</span> 
	)`
	width: 100%;
	height: 100%;
	position: relative;
	display: block;

	>svg{
		position: absolute;
		top: 0;
		right: 0;
		width: 100%;
		height: 100%;

		circle{
			stroke: var(--color-grey-50) !important;
			stroke-width: 1 !important;
			fill-opacity: 1 !important;
			fill: var(--color-grey-50) !important;
			r: 1.5 !important;
			z-index: 2;
			position: relative;
		}
	}
	`