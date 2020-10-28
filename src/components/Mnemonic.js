import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'
import { Button } from '@components'
import { ReactComponent as IconRefresh } from '@assets/refresh.svg';
import { ReactComponent as IconCheck } from '@assets/check.svg';
import { ReactComponent as IconWrong } from '@assets/wrong.svg';


const bip39 = require('bip39');


// component to generate a phrase
const Word = styled(
	({prefix, children, className, ...rest}) => {
		return <div className={`mnemonic -word ${className}`} {...rest}>
			<div className="inner">
				<span className='prefix'>{prefix}</span>
				<div className='children'>{children}</div>
			</div>
		</div>
	})`
	font-size: var(--font-size-medium);
	align-items: center;
	margin-bottom: 1em;

	.inner{
		border-bottom: 1px solid var(--color-grey-200);
		display: flex;
		align-items: center;
		justify-contebt: space-between;
	}

	.prefix,
	.children{
		padding: 1em 0.5em;
		line-height: 1em;
	}

	.prefix{
		padding-right: 0.35em;
		width: 2em;
	}
	
	.children{
		font-size: var(--font-size-medium);
		border: none;
		background: none;
		padding-left: 0.25em;
		width: calc(100% - 2em)
	}
	`

const StaticWord = styled(
	({number, word, className, ...rest}) => {
		return <Word className={`-static ${className}`} prefix={number.toString().padStart(2, '0')}>{word}</Word>
	})`
	.prefix{
		color: var(--color-grey-200);
	}
	`

const EditableWord = styled(
	({number, word, onChange=()=>{}, className, ...rest}) => {
		const [ value, setValue ] = useState('')
		const inputRef = useRef()

		const checkValue = val => {
			val = val.trim().toLowerCase()
			setValue(val)
			onChange(number, val === word)
		}

		useEffect(() => {
			checkValue(value)
		}, []) // eslint-disable-line

		return <Word 
			className={`-static ${className}`} 
			prefix={
				value.length > 0
					? value === word ? <IconCheck className='correct'/> : <IconWrong className='error'/>
					: <span className='number'>{number >= 10 ? number : `0${number}`}</span>
			}
			onClick={() => inputRef?.current.focus()}
			>
			<input 
				value={value} 
				onChange={e => checkValue(e.target.value)}
				placeholder='?'
				ref={inputRef}
			/>
		</Word>
	})`

	.prefix .number{
		color: var(--color-grey-200);
	}

	svg{
		&.correct{
			color: var(--color-status-success)
		}

		&.error{
			color: var(--color-status-failure)
		}
	}
	
	input{
		width: 100%;
		font-size: inherit;
		padding: 0;
		margin: 0;
		border: none;
		background: none;
	}
	`



const Generate = styled(
	({phrase, entrpoy=128, onChange=()=>{}, onCopy=()=>{}, className, ...rest}) => {
		
		const [ wordList, setWordList ] = useState([])
		const [ processing, setProcessing ] = useState(false)
		const wordListEl = useRef()

		const generateMnemonic = _phrase => {
			setProcessing(true)
			setTimeout(() => setProcessing(false), 500)
			_phrase = !!_phrase ? _phrase : bip39.generateMnemonic(entrpoy)
			setWordList(_phrase.trim().split(' '))
			onChange(_phrase)
		}

		useEffect(() => {
			generateMnemonic(phrase)
		}, []) // eslint-disable-line

		return <div className={`mnemonic -generate ${className}`}>

			<div className="-list" ref={wordListEl}>
				{wordList.map((word, i) => <StaticWord key={i} number={i+1} word={word}/>)}
			</div>
			
			<div className="-controls">

				<Button.Action 
					icon={<IconRefresh animate={processing === true ? 'spin-fast' : null}/>}
					onClick={() => generateMnemonic()}
					className='reload'
					>
					Generate new
				</Button.Action>

				<span className="right">
					
				</span>
			</div>
		</div>
	})`

	.-controls{
		padding: 1rem 0 0 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: var(--font-size-xsmall);

		.reload{
			color: var(--color-primary-1);
		}

		>.right{
			display: flex;
			
			>*{
				margin-left: 1.6rem;
			}

			.button-action{
				>*{
					color: var(--color-grey-500);
				}

				.icon{
					color: var(--color-grey-700);
				}
			}
		}
	}

	.-list{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		>.-word{
			width: 15%;
		}
	}
	
	`

const Confirm = styled(
	({phrase, onConfirm=()=>{}, onChange=()=>{}, onError=()=>{}, onNoPhrase=()=>{}, onWordSuccess=()=>{}, className}) => {
		
		const [ words, setWords ] = useState([])

		const checkWords = _words => {
			let correct = true
			for (var i = 0; i < _words.length; i++) {
				if(_words[i].correct !== true){
					correct = false
				}
			}

			if(correct === true){
				onConfirm()
			}
		}

		const handleChange = (index, correct) => {
			const _words = words.map(word => {
				if(word.index === index){
					word.correct = correct
				}
				return word
			})

			setWords(_words)
			checkWords(_words)
			onChange({
				confirmed: _words.filter(({correct}) => correct === true).length,
				total: _words.length
			})
		}

		useEffect(() => {
			if(!phrase) {
				onNoPhrase()
			}else{
				const phraseSplit = phrase.trim().split(' ')
				const length = phraseSplit.length
				if(!length){
					onNoPhrase()
				}else{
					setWords(phraseSplit.map((word, i) => {
						return {
							index: i+1,
							word: word,
							correct: false
						}
					}))

					onChange({
						confirmed: 0,
						total: length
					})
				}
			}
		}, [])// eslint-disable-line

		return <div className={className}>
			<div className="-list">
				{words.map(({word, index}, i) => 
					<EditableWord 
						key={i} 
						number={index}
						word={word}
						onChange={handleChange}
					/>
				)}
			</div>
		</div>
	})`
	
	.-list{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		>.-word{
			width: 15%;
		}
	}
	`


export default {
	Generate,
	Confirm
}
