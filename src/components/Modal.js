import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'
import { ReactComponent as IconWrong } from '@assets/wrong.svg';

const Container = styled(
	({className, ...rest}) => {
		
		const [ content, setContent ] = useState(null)
		const [ isOpen, setOpen ] = useState(false)

		const inputEl = useRef(null);

		const open = content => {
			setContent(content)
			setOpen(true)
		}

		const close = () => {
			setOpen(false)
		}

		useEffect(() => {
			inputEl.current.open = props => open(props)
			inputEl.current.close = () => close()
		}, [])
		

		return <article ref={inputEl} className={`modal-container ${className}`} {...rest} data-open={isOpen} onClick={() => close()}>
			<div className="modal-background"/>
			<div className="modal" onClick={e => e.stopPropagation()}>
				<IconWrong className='modal-close' onClick={() => close()}/>
				{content}
			</div>
		</article>
	})`
		position: fixed;
		top: 0;
		left: 0;
		display: block;
		padding: 0;
		margin: 0;
		height: 100vh;
		width: 100vw;
		overflow: hidden;
		opacity: 0;
		pointer-events: none;
		transition: all 0.2s ease-out;

		.modal-background{
			position: absolute;
			top: 0;
			right: 0;
			height: 100%;
			width: 100%;
			transition: all 0.2s ease-out;
			background: rgba(0,0,0,0);
			z-index: 1;
			cursor: ew-resize;
		}

		.modal{
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			height: auto;
			width: 100%;
			max-width: 100rem;
			background: white;
			box-shadow: 0 0 0 rgba(0,0,0,0);
			transition: all 0.2s ease-out;
			z-index: 2;
			line-height: 1.6em;

			.modal-close{
				position: absolute;
				top: 0;
				right: 0;
				font-size: var(--font-size-xlarge);
				cursor: pointer;
				transform: translate(50%, -50%);
				color: var(--color-grey-300);
				background: white;
				border-radius: 50%;
				transition: all 0.2s;

				&:hover{
					color: var(--color-grey-500)
				}
			}

			.modal-title{
				font-size: var(--font-size-xlarge);
				margin-top: 0;
			}

			.modal-subtitle{
				font-size: var(--font-size-medium);
			}

			.modal-content{
				font-size: var(--font-size-normal);
			}
		}

		&[data-open='true']{
			opacity: 1;
			pointer-events: all;

			.modal-background{
				background: rgba(0,0,0,0.7);
			}

			.modal{
				//width: 100%;
				//max-width: 80vh;
				box-shadow: 0 0 3rem rgba(0,0,0,0.7);
				//padding: 2rem;

				.modal-close{
					//opacity: 1;
				}
			}
		}
	`

Container.open = props => document.querySelector('.modal-container')?.open(props)
Container.close = props => document.querySelector('.modal-container')?.close(props)

export default Container