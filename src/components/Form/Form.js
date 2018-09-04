import React, {Component} from 'react';
import axios from 'axios';
import Input from './Input/Input';
import css from './Form.css';

class Form extends Component {

    state = {
        formFields: {
            email: {
                elementType: 'input',
                inputType: 'email',
                inputName: 'email',
                inputId: 'email',
                label: 'E-mail',
                value: '',
                validation: {
                    required: true,
                    regex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i 
                    //all types of email (google standard)
                },
                valid: false,
                activated: false
            },
            password: {
                elementType: 'input',
                inputType: 'password',
                inputName: 'password',
                inputId: 'password',
                label: 'Password',
                value: '',
                validation: {
                    required: true,
                    regex: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]+){6,}$/
                    //6 or more signs, 1 lowercase, 1 uppercase, 1 number
                },
                valid: false,
                activated: false
            },
            remember: {
                elementType: 'checkbox',
                inputType: 'checkbox',
                inputName: 'remember',
                inputId: 'remember',
                label: 'Remember me',
                value: 'false',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        formMessage: '',
        authSuccess: false
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if(!this.state.formIsValid) {
            this.setState({formMessage: 'invalid email / invalid password'});
        } else {
            const formData = {};
    
            for(let formElement in this.state.formFields) {
                formData[formElement] = this.state.formFields[formElement].value;
            }
    
            axios.get('server.json', formData)
                .then((response) => {
                    if(response.data.email === formData.email && response.data.password === formData.password) {
                        this.setState({formMessage: 'Login successful!', authSuccess: true})
                    } else {
                        this.setState({formMessage: 'Invalid e-mail or password.'})
                    }
                })
                .catch((error) => {
                    this.setState({formMessage: 'Something went wrong (request error).'})
                });
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.regex) {
            isValid = rules.regex.test(value.trim()) && isValid;
        }

        return isValid;
    }

    inputChanged = (e, inputIdent) => {
        this.state.formMessage = '';

        const updatedFormFields = {
            ...this.state.formFields
        }
        const updatedFormItem = {
            ...updatedFormFields[inputIdent]
        }
        updatedFormItem.value = e.target.value;
        updatedFormItem.valid = this.checkValidity(updatedFormItem.value, updatedFormItem.validation);
        updatedFormItem.activated = true;
        updatedFormFields[inputIdent] = updatedFormItem;

        let formIsValidFlag = true;
        for(let inputIdent in updatedFormFields) {
            formIsValidFlag = updatedFormFields[inputIdent].valid && formIsValidFlag;
        }
        this.setState({formFields: updatedFormFields, formIsValid: formIsValidFlag});
    }

    render() {
        const formElementsArray = [];
        let messageClass = [css.Msg];
        let hideClass = [];

        for (let key in this.state.formFields) {
            formElementsArray.push({
                id: key,
                config: this.state.formFields[key]
            })
        };

        if(!this.state.formIsValid || !this.state.authSuccess) {
            messageClass.push(css.MsgError);
        } else {
            messageClass.push(css.MsgSuccess);
            hideClass.push(css.hidden);
        }

        return (
            <form className={css.Form} onSubmit={this.handleSubmit}>
                <fieldset className={hideClass}>
                    {formElementsArray.map(formElement => (
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            inputType={formElement.config.inputType}
                            inputName={formElement.config.inputName}
                            inputId={formElement.config.inputId}
                            value={formElement.config.value}
                            label={formElement.config.label}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            activated={formElement.config.activated}
                            changed={(e) => this.inputChanged(e, formElement.id)} />
                    ))}
                    <input type="submit" id="form-submit" value="Login" />
                </fieldset>
                <p className={messageClass.join(' ')}>{this.state.formMessage}</p>
            </form>
        );
    }
}

export default Form;