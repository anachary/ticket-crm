
import 'jsdom-global/register'; //at the top of file, even before importing React
import React from 'react'
import Enzyme, {mount,shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { RegistrationForm } from './RegistrationForm.comp.js'
import {useDispatch} from 'react-redux'
Enzyme.configure({adapter: new Adapter()})

describe('RegistrationForm',()=>{
       
    it('It works', ()=>{
        const useDispatchSpy = jest.spyOn(redux, 'useDispatch'); 
        const mockDispatchFn = jest.fn()
        useDispatchSpy.mockReturnValue(mockDispatchFn);

        //action
        wrapper.shallow(<RegistrationForm />)

        //assert
        expect(mockDispatchFn).toHaveBeenCalledWith(expectedAction);

        //teardown
        useDispatchSpy.mockClear();

    })


})
