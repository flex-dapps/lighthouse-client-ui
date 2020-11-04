import React, { Fragment } from 'react';
import styled from 'styled-components'

const Row = styled(
	({left, right, className}) => {
		return <div className={`row ${className}`}>
				<span className={'column left'}>{left}</span>
				<span className={'column right'}>{right}</span>
			</div>
	})`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	font-size: var(--font-size-normal);

	.column{
		font-weight: inherit;
		&.left{ text-align: left }
		&.right{ text-align: right }
	}

	& + .row{}
`
const Template = styled(
	({children, className, ...rest}) => {
		return <div className={`side-panel-widget ${className}`} {...rest}>
			{children}
		</div>	
	})`
	width: 100%;
	display: block;
	line-height: 1.6rem;

	.-content{
		margin: 2.1rem 0 2.6rem;
	}
	`

Template.Header = styled(({className, ...props}) => <Row className={`-header ${className}`} {...props}/>)
	`
	color: var(--color-grey-200);
	align-items: flex-start;
	font-weight: 400;
	.column{
		&.left{ font-size: var(--font-size-medium); }
		&.right{ font-size: 2.1rem; }
	}
	`

Template.Content = styled(
	({icon='—', title, value, info, className, ...rest}) => {

		return <Row
			className={`-content ${className}`}
			left={
				<Fragment>
					<span className="-icon">{icon}</span>
					<span className="-title">{title}</span>
				</Fragment>
			}
			right={
				<Fragment>
					<span className="-value">{value}</span>
					<span className="-info">{info}</span>
				</Fragment>
			}
			{...rest}
		/>
	})
	`
	font-size: var(--font-size-medium);

	.column{
		line-height: 1em;
		
		&.left{
			font-size: var(--font-size-medium);
			position: relative;

			>*{
				display: block;
				line-height: 1.3em;
			}

			.-icon{
				//margin-bottom: 0.3rem;
			}
		}

		&.right{
			line-height: 1em;
			
			.-value{
				display: block;
				font-size: var(--font-size-xlarge);
				font-weight: bold;
				color: var(--color-primary-1);
				line-height: 1em;
			}

			.-info{
				display: block;
				font-size: var(--font-size-xsmall);
				color: var(--color-grey-500);
				line-height: 1em;
			}
		}
	}
	`

Template.Footer = styled(({className, ...props}) => <Row className={`-footer ${className}`} {...props}/>)
	`
	align-items: flex-end;
	.column{
		&.right{
			font-size: var(--font-size-medium);
			font-weight: 500;
			color: var(--color-grey-500)
		}
	}

	`


export default Template