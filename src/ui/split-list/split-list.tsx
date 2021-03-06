import React, { useState } from 'react'
import styles from './split-list.module.scss'
import {
    listLayersToOne,
    toOneFibonacciDigit,
} from '../../engine/fibbo-algorithms'
import { MaterialIcon } from '../common/material-icon/material-icon'
import { Button } from '../common/button/button'


type OwnPropsType = {
    label: string
    inputValue: number[]
    infoText?: string
}

export const SplitList: React.FC<OwnPropsType> = (
    {
        label,
        inputValue,
        infoText= ''
    } ) => {
    const [ expand, setExpand ] = useState( false )
    const [ info, setInfo ] = useState( false )
    const splitValue = listLayersToOne( inputValue )

    const fiboSumm = ( val: number[] ) => toOneFibonacciDigit( val.reduce( ( a, b ) => a + b ) )

    type arrToString = ( arg: number[], arg2: boolean ) => string
    type infoType = { size: arrToString, summ: arrToString, text: (s: string, b: boolean)=>string }

    const inform: infoType = {
        size: ( v, b ) => b ? `(${ v.length }) ` : '',
        summ: ( v, b ) => b ? ` = ${ fiboSumm( v ) }` : '',
        text: ( s, b ) => b ? `  :  ${ s }` : '',
    }

    return (
        <div className={ styles.component }>
            <div className={ `${ styles.expansionPanel } ${ expand && styles.expansionPanel_expand }` }>
                <h4 className={ styles.expansionPanel__header } onClick={ () => setExpand( !expand ) }>
                    <span className={ styles.expansionPanel__indicator }>
                       <MaterialIcon icon_name={ 'expand_more' }/>
                    </span>
                    { label + inform.text(infoText,info)}
                </h4>
                <div className={ styles.expansionPanel__content }>
                    { expand && <Button colorMode={ 'lightBlue' } onClick={ () => setInfo( !info ) }>Info</Button> }
                    <div style={ { margin: '.5rem' } }/>
                    {
                        splitValue.map( ( val ) =>
                            <p className={ styles.expansionPanel__text } key={ val.join( '' ) }>
                                { `${ inform.size( val, info ) }${ val.join( '' ) }${ inform.summ( val, info ) }` }
                            </p>,
                        )
                    }
                </div>

            </div>


        </div>
    )
}
