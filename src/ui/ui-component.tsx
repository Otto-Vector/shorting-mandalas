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

    const [ textStringValue, setInputValue ] = useState( defaultValInput )
    const numArray = wordToArrayOfNumbers( textStringValue )
    const summary =toOneFibonacciDigit( numArray.reduce( ( a, b ) => a + b ))
    const reverseArray = numArray.slice().reverse()
    const onSubmit = ( { title }: { title: string } ): void => {
        setInputValue( modificationToNormal( title ) )
    }

    return (
        <div className={ styles.component }>
            <h2 className={styles.header}>{ textStringValue  }</h2>

            <InputForm onSubmit={ onSubmit }/>
            <SplitList label={ 'Обычное (-->) сужение'} inputValue={ numArray } infoText={textStringValue}/>
            <SplitList label={ 'Обратное (<--) сужение' } inputValue={ reverseArray } infoText={textStringValue}/>
            <SplitList label={ '-->.<-- сужение' } inputValue={ [...numArray,...reverseArray] } infoText={textStringValue}/>
            <SplitList label={ '<--.--> сужение' } inputValue={ [...reverseArray,...numArray] } infoText={textStringValue}/>
            <SplitList label={ '-->S<-- сужение' } inputValue={ [...numArray,summary,...reverseArray] } infoText={textStringValue}/>
            <SplitList label={ '<--S--> сужение' } inputValue={ [...reverseArray,summary,...numArray] } infoText={textStringValue}/>

        </div>
    )
}
