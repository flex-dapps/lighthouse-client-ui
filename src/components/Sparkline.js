import React from 'react';
import styled from 'styled-components'
import { Sparklines, SparklinesCurve } from 'react-sparklines';

export default styled(
	({data=[], className}) => <span className={className}>
		<Sparklines data={data} margin={0}>
			<SparklinesCurve style={{ stroke: "var(--color-primary-1)", strokeWidth: '0.5', fill: "none"}} />
		</Sparklines>
	</span> 
	)`
	width: 100%;
	height: 100%;
	position: relative;

	>svg{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	`