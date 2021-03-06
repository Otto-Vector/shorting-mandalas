import React from 'react'
import classes from './button.module.scss'

type OwnProps = {
    disabled?: boolean,
    onClick?: () => void,
    colorMode?: 'orange' | 'blue' | 'lightBlue' | 'pink' | 'gray' | 'white' | 'noFill'
    type?: 'button' | 'submit' | 'reset'
    title?: string
    rounded?: boolean
}

export const Button: React.FC<OwnProps> = (
    {
        disabled, onClick, title,
        colorMode = 'noFill', rounded,
        type = 'button', children,
    } ) => {

    return <button className={
        `${ classes.button } ${ classes['button_' + colorMode] } ${ rounded && classes.button_rounded }`
    }
                   disabled={ disabled }
                   onClick={ onClick }
                   type={ type }
                   title={ title }
    >{ // отображаем то что внутри тега button
        children
    }
    </button>
}

