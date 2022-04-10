import React, { useState } from 'react'
import styles from './ui.module.scss'
import { modificationToNormal, toOneFibonacciDigit, wordToArrayOfNumbers } from '../engine/fibbo-algorithms'
import { InputForm } from './input-form/input-form'

type OwnPropsType = {
    defaultValInput?: string
}

export const UiComponent: React.FC<OwnPropsType> = (
    {
        defaultValInput = 'Благословение',
    } ) => {

    const [ inputValue, setInputValue ] = useState( defaultValInput )
    const numArray = wordToArrayOfNumbers( inputValue )
    const summary = numArray.reduce( ( a, b ) => a + b )
    const fiboSummary = toOneFibonacciDigit( summary )

    const onSubmit = ( { title }: {title: string}): void => {
        setInputValue( modificationToNormal( title ))
    }

    return (
        <div className={ styles.component }>
            <p>{ inputValue + ' = ' + numArray.join( '-' )+' = '+summary+' ('+fiboSummary+')'}</p>
            {/*<input type="text"*/}
            {/*       className={ styles.input }*/}
            {/*       value={ inputValue }*/}
            {/*       // onChange={ ( e ) => setInputValue( modificationToNormal( e.target.value ) ) }*/}
            {/*/>*/}
            <InputForm onSubmit={onSubmit} />
        </div>
    )
}
