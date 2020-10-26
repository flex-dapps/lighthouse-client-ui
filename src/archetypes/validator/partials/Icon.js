import React from 'react'
import styled from 'styled-components'
import { stringToHex } from '@util/helpers'

export default styled(
	({id, ...props}) => {
		return <span {...props}/>
	})`
	display: block;
	border-radius: 50%;
	width: 1em;
	height: 1em;
	min-width: 1em;
	min-height: 1em;
	background: linear-gradient(45deg, #${({id}) => stringToHex(id.substr(0, 5))}, #${({id}) => stringToHex(id.slice(-5))})
		
	`