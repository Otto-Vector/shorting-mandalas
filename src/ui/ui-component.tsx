import React, { useState } from 'react'
import styles from './ui.module.scss'
import {
    modificationToNormal,
    splitMinuses,
    toOneFibonacciDigit,
    wordToArrayOfNumbers,
} from '../engine/fibbo-algorithms'
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
    const [ splitValue, setSplitValue ] = useState( splitMinuses(numArray) )
    const summary = numArray.reduce( ( a, b ) => a + b )
    const fiboSummary = toOneFibonacciDigit( summary )

    const onSubmit = ( { title }: {title: string}): void => {
        const modTitle = modificationToNormal( title )
        setInputValue( modTitle)
        setSplitValue(splitMinuses(wordToArrayOfNumbers( modTitle)))
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
            {splitValue.map((val)=> <p>{val.join('')+' = '+toOneFibonacciDigit(val.reduce((a,b)=>a+b))+' ('+val.length+')'}</p>)}
        </div>
    )
}
