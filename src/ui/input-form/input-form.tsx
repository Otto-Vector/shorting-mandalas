import React from 'react'
import styles from './input-form.module.scss'

import { Field, Form } from 'react-final-form'
import { Input } from '../common/form-type/form-type'
import { composeValidators, maxLength30, required } from '../../utils/validators'
import { Button } from '../common/button/button'
import { MaterialIcon } from '../common/material-icon/material-icon'


type OwnProps = {
    onSubmit: ( { title }: { title: string } ) => void
}

export const InputForm: React.FC<OwnProps> = ( { onSubmit } ) => {

    const initialValues = { title: '' }

    return (
        <Form
            onSubmit={ onSubmit }
            initialValues={ initialValues }
            render={
                ( { submitError, handleSubmit, pristine, form, submitting } ) => (
                    <form onSubmit={ handleSubmit }>
                        <div className={ styles.input }>
                            <Field name={ 'title' }
                                   placeholder={ 'Enter Word to mandalizator' }
                                   component={ Input }
                                   resetFieldBy={ form }
                                   type={ 'input' }
                                   validate={ composeValidators( required, maxLength30 ) }
                            />
                        </div>
                        <div className={ styles.buttonsPanel }>
                            <Button type={ 'submit' }
                                    disabled={ submitting }
                                    mode={ 'White' }
                                    title={ 'Clear results & New Search' }
                            >Done</Button>
                            <Button type={ 'reset' }
                                    disabled={ pristine || submitting }
                                    onClick={ () => {
                                        form.reset()
                                    } }
                                    title={ 'Restore all fields to default' }
                                    mode={ 'White' }
                            ><MaterialIcon icon_name={ 'close' }/></Button>
                        </div>
                        { submitError && <span className={ styles.onError }>{ submitError }</span> }
                    </form>
                )
            }/>
    )
}
