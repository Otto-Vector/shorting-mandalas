import React, { useState } from 'react'
import styles from './split-list.module.scss'
import {
    splitMinuses,
    toOneFibonacciDigit,
} from '../../engine/fibbo-algorithms'


type OwnPropsType = {
    label: string
    inputValue: number[]
}

export const SplitList: React.FC<OwnPropsType> = (
    {
        label,
        inputValue,
    } ) => {
    const [ expand, setExpand ] = useState( false )
    const splitValue = splitMinuses( inputValue )

    const fiboSumm = (val: number[]) => toOneFibonacciDigit( val.reduce( ( a, b ) => a + b ))

    return (
        <div className={ styles.component }>
            <div className={ `${ styles.expansionPanel } ${ expand && styles.expansionPanelExpand }` }>
                <h4 className={ styles.expansionPanelHeader } onClick={ () => setExpand( !expand ) }>
                    <span className={ styles.expansionPanelIndicator }>
                        <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 2L9 9L16 2" stroke="#8E96B7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </span>
                    { label }
                </h4>
                <div className={styles.expansionPanelContent}>
                    { expand &&
                     splitValue.map( ( val ) =>
                        <p className={ styles.expansionPanelText }>{ `${val.join( '' )} = ${fiboSumm(val)} ( ${val.length} ) `}</p> )
                    }
                </div>

            </div>


        </div>
    )
}
