import React from 'react'
import { Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

export const UpdateCompany = ({buttonDisabled, handleOnSubmit}) => {
    return (
        <Form  autoComplete="off" onSubmit={handleOnSubmit}>
            <div className='text-center width=100% mt-4'>
                <Button type="submit" disabled={buttonDisabled}>Save</Button>
            </div>
        </Form>
    )
}

UpdateCompany.propTypes={
    buttonDisabled:PropTypes.bool.isRequired,
    handleOnSubmit:PropTypes.func.isRequired
}