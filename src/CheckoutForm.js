import React from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import styled from "styled-components";

import { Input, NarrowInput, Button } from "./FormElements";

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: center;
    margin-bottom: 1em;
`;

const FormStyle = styled.form`
    display: flex;
    flex-direction: column;
    width: 500px;
    align-items: center;
    margin: 0 auto;
    padding-bottom: 50px;
`;

const Flex1 = styled.div`
    flex: 1;
`;

const Form = reduxForm({
    form: "checkout"
})(({ handleSubmit }) => (
    <FormStyle onSubmit={handleSubmit}>
        <Row>
            <Flex1>
                <Field
                    name="firstName"
                    component={NarrowInput}
                    placeholder="First Name"
                />
            </Flex1>
            <Flex1>
                <Field
                    name="lastName"
                    component={NarrowInput}
                    placeholder="Last Name"
                />
            </Flex1>
        </Row>
        <Row>
            <Field name="email" component={Input} placeholder="Email" />
        </Row>
        <Row>
            <Button type="submit" label="Get Tickets" />
        </Row>
    </FormStyle>
));

class Checkout extends React.Component {
    submit = values => console.log(values);

    render() {
        const { items } = this.props;

        return (
            <div>
                <h1>Checkout {items.length} tickets</h1>

                <Form />
                <Link to="/cart">Back</Link>
            </div>
        );
    }
}

export default Checkout;
