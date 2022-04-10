import React from 'react'
import classes from './button.module.scss'

type OwnProps = {
    disabled?: boolean,
    onClick?: () => void,
    mode?: 'Orange' | 'Blue'| 'LightBlue' | 'Pink' | 'Gray' | 'White' | 'NoFill'
    type?: 'button' | 'submit' | 'reset'
    title?: string
}

export const Button: React.FC<OwnProps> = (
    {
        disabled, onClick, title,
        mode = 'NoFill', type = 'button', children
    } ) => {

    return <button className={ classes.button + ' ' + classes['button' + mode] }
                   disabled={ disabled }
                   onClick={ onClick }
                   type={ type }
                   title={title}
    >{ // отображаем то что внутри тега button
        children
    }
    </button>
}

