import { createGlobalStyle } from 'styled-components'

import OpenSauceSans_Light from '@fonts/OpenSauceSans-Light.ttf'
import OpenSauceSans_Regular from '@fonts/OpenSauceSans-Regular.ttf'
import OpenSauceSans_Bold from '@fonts/OpenSauceSans-Bold.ttf'
import Archivo_Bold from '@fonts/Archivo-Bold.ttf'

// fonts
export const Fonts = createGlobalStyle`	
	@font-face {
		font-family: 'OpenSauce';
		font-style: light;
		font-weight: 300;
		font-display: auto;
		src: url(${OpenSauceSans_Light}) format('truetype');
	}

	@font-face {
		font-family: 'OpenSauce';
		font-style: normal;
		font-weight: 400;
		font-display: auto;
		src: url(${OpenSauceSans_Regular}) format('truetype');
	}

	@font-face {
		font-family: 'OpenSauce';
		font-style: bold;
		font-weight: 700;
		font-display: auto;
		src: url(${OpenSauceSans_Bold}) format('truetype');
	}

	@font-face {
		font-family: 'Archivo';
		font-style: bold;
		font-weight: 700;
		font-display: auto;
		src: url(${Archivo_Bold}) format('truetype');
	}

	body,
	input,
	select,
	textarea{
		font-family: 'OpenSauce', sans-serif;
		font-weight: 400;
		line-height: 1.4em;
		//letter-spacing: -0.045em;
	}
`

// vars
export const Vars = createGlobalStyle`	
	:root {
		// primary
		--color-primary-1: #5E41D5;
		--color-primary-2: #A841D5;
		--color-primary-3: #D541B8;

		// greys
		--color-light: #FFFFFF;
		--color-grey-25: #F8F8F8;
		--color-grey-50: #F1F1F1;
		--color-grey-100: #e1e1e1;
		--color-grey-200: #c8c8c8;
		--color-grey-300: #acacac;
		--color-grey-400: #919191;
		--color-grey-500: #6e6e6e;
		--color-grey-600: #404040;
		--color-grey-700: #303030;
		--color-grey-800: #292929;
		--color-grey-900: #212121;
		--color-grey-950: #141414;
		--color-dark: #000000;

		// gradients
		--color-gradient-iridescent: linear-gradient(300.55deg, #FF9B63 -2.05%, rgba(255, 138, 113, 0) 41.4%), conic-gradient(from 180deg at 49.97% 107.52%, #F3AA89 0deg, #01B8FC 31.88deg, #73EDFF 101.25deg, #4F2CE9 168.75deg, #EF23D1 251.25deg, #F1629A 309.38deg, #F3AA89 360deg)
		--color-gradient-sharkskin: background: conic-gradient(from 180deg at 49.97% 107.52%, #5F6A7A -94.2deg, #5D6978 61.87deg, #6B7880 142.88deg, #2A2C30 181.71deg, #1F1F23 221.19deg, #5F6A7A 265.8deg, #5D6978 421.87deg);
		--color-gradient-purp: linear-gradient(188.34deg, #5B24DE 24.76%, #CD52AD 96.35%);
		--color-gradient-purp-horizontal: linear-gradient(96.85deg, #5B24DE 10.72%, #CD52AD 97.21%);

		// status hex
		--color-status-success: #2ED47A;
		--color-status-concern: #FFB800;
		--color-status-failure: #FF4D00;
		--color-status-neutral: #17B1DC;

		// status rgb 
		--color-status-success-rgb: 46, 212, 122;
		--color-status-concern-rgb: 255, 184, 0;
		--color-status-failure-rgb: #FF4D00;
		--color-status-neutral-rgb: #17B1DC;

		// fonts
		--font-size-xxxlarge: 5rem;
		--font-size-xxlarge: 3.6rem;
		--font-size-xlarge: 2.8rem;
		--font-size-large: 2.1rem;
		--font-size-medium: 1.6rem;
		--font-size-normal: 1.4rem;
		--font-size-small: 12px;
		--font-size-xsmall: 10px;
		--font-size-xxsmall: 9px;
	}
`

// base/reset 
export const Base = createGlobalStyle`	
	*{
		box-sizing: border-box;
		-webkit-font-smoothing: antialiased;
		color: inherit;
	}

	html,body {
		padding: 0;
		margin: 0;
		min-width: 1080px;
		scroll-behavior: smooth;
	}

	strong{
		font-weight: 600
	}

	a{
		text-decoration: none;
		transition: all 0.15s
	}
	
	hr{
		opacity: 0.15;
		height: 0;
		border: none;
		border-bottom: 1px solid currentColor;
	}

	*:focus{
		outline: none;
	}

	svg{
		width: 1em;
		height: 1em;

		&:not([defaultcolor='true']){
			path[fill]{
				fill: currentColor !important;
			}
		}
	}
`

// layout
export const Layout = createGlobalStyle`	
	#root{
		position: relative;
		min-height: 100vh; 
		
		>.header{
			width: 100%;
			z-index: 9999;
			position: relative;

			.inner{
				margin: 0 auto;
			}
		}

		.global-notifications{
			z-index: 9998;
			top: 7rem;
		}

		.field + .amount{
			margin-top: 2.7rem;
		}
	}
`

// theme
export const Components = createGlobalStyle`	
	:root{
		// notification
		--notification--title--font-size: var(--font-size-normal);
		--notification--text--font-size: var(--font-size-normal);
		--notification--border-radius: 1.4rem;
		--notification--success--color: var(--color-white);
		--notification--success--background-color: var(--color-status-success);
		--notification--success--border-color: var(--color-status-success);
		--notification--warning--color: var(--color-white);
		--notification--warning--background-color: var(--color-status-concern);
		--notification--warning--border-color: var(--color-status-concern);
		--notification--error--color: var(--color-white);
		--notification--error--background-color: var(--color-status-failure);
		--notification--error--border-color: var(--color-status-failure);
		--notification--default--color: var(--color-white);
		--notification--default--background-color: #2A3848;
		--notification--default--border-color: #3A4B60;

		// toggle
		--field--toggle--off--background-color: var(--color-grey-500);
		--field--toggle--off--indicator-color: var(--color-light);
		--field--toggle--off--icon-color: var(--color-grey-400);
		--field--toggle--on--background-color: var(--color-primary-1);
		--field--toggle--on--indicator-color: var(--color-light);
		--field--toggle--on--icon-color: var(--color-primary-1);

		// alerts
		--alert--title--font-size: var(--font-size-normal);
		--alert--subtitle--font-size: var(--font-size-small);
		--alert--concern--background-color: rgba(var(--color-status-concern-rgb), 0.2);;
		--alert--concern--border-color: var(--color-status-concern);

		// flipper
		--flipper--pagintation--color: var(--color-primary-1);
	}

	html{
		font-size: 10px;
	}

	body{
		color: var(--color-dark);
		background: white;
	}

	p{
		font-size: var(--font-size-normal)
	}

	.button{
		.-button-wrapped-string-child{
			margin-bottom: -0.1em;
		}
	}

	@keyframes spin {
	    from {transform:rotate(0deg);}
	    to {transform:rotate(360deg);}
	}

	svg[animate^='spin']{
		transform-origin: 50% 50%;
		animation-name: spin;
		animation-duration: 1000ms;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	}

	svg[animate='spin-fast']{
		animation-duration: 500ms;;
	}

	svg[animate='spin-slow']{
		animation-duration: 2000ms;;
	}

	.button{
		svg:last-child{ transition: transform 0.12s }
		&:not([disabled]):hover{
			svg:last-child{ transform: translatex(0.12em)}
		}
	}

	.paper > svg {
		width: auto;
		height: auto;
	}


	// define all uses of 'Archivo' font
	.field > .-title-text,
	.tabbed-nav-item{
		font-family: 'Archivo', serif;
		font-weight: 300;
		text-transform: uppercase
	}
`