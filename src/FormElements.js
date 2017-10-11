import React from "react";
import styled from "styled-components";

const Button = ({ onClick, label }) => (
    <button onClick={onClick}>{label}</button>
);

const Input = styled.input`
    font-size: 14px;
    line-height: 1em;
    outline: 0;
    white-space: normal;
    padding: 0.5em 2em 0.5em 1em;
    color: rgba(0, 0, 0, 0.87);
    box-shadow: none;
    border: 1px solid rgba(34, 36, 38, 0.35);
    border-radius: 0.3rem;
    transition: box-shadow 0.1s ease, width 0.1s ease;
    box-shadow: none;
    width: 450px;
    &:hover {
        border-color: #96c8da;
        box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
    }
`;

export { Button, Input };
