import React from 'react'
import './ui.module.scss'

type OwnPropsType = {
    defaultValInput?: string
}

export const UiComponent: React.FC<OwnPropsType> = (
    {
        defaultValInput= 'Благословение'
    }) => {

    return (
        <div className="container">
            <input type="text"
                   className="App-header"
            >{ defaultValInput }
            </input>
        </div>
    )
}
