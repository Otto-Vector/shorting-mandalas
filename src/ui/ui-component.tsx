import React, { useState } from 'react'
import styles from './ui.module.scss'
import {
    modificationToNormal,
    toOneFibonacciDigit,
    wordToArrayOfNumbers,
} from '../engine/fibbo-algorithms'
import { InputForm } from './input-form/input-form'
import { SplitList } from './split-list/split-list'

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

    const onSubmit = ( { title }: { title: string } ): void => {
        const modTitle = modificationToNormal( title )
        setInputValue( modTitle )
    }

    return (
        <div className={ styles.component }>
            <p>{ inputValue + ' = ' + numArray.join( '-' ) + ' = ' + summary + ' (' + fiboSummary + ')' }</p>

            <InputForm onSubmit={ onSubmit }/>
            <SplitList label={ 'Обычное сужение' } inputValue={ numArray }/>
            <SplitList label={ 'Обратное сужение' } inputValue={ numArray.slice().reverse() }/>
        </div>
    )
}
