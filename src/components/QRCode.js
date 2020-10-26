import React from 'react'
import styled from 'styled-components'
import { Button } from '@components'
import { downloadFile } from '@util/helpers'
import { QRCode } from "react-qr-svg"

export default styled(
	({value, size='20px', download, className, ...rest}) => 
		<div 
			className={className} 
			{...rest}
			>
			<QRCode 
				value={value} 
				style={{
					width: size, 
					height: size
				}}
			/>
			{download &&
				<span 
					className="options"
					>
					<Button 
						compact
						onClick={() => downloadFile(`${download}.txt`, value)}
						>
						Download Seed
					</Button>
				</span>
			}
		</div>
	)`
		position: relative;
		display: inline-flex;
		align-items: flex-end;

		>svg{
			display: block
		}

		>.options{
			display: block;
			margin-left: 1em;

			>.button{
				cursor: pointer;
			}
		}

		&:hover{
			.cover{
				//opacity: 1;
				//pointer-events: all;
			}
		}
	`