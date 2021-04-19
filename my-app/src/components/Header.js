import React from 'react';
import Button from 'react-bootstrap/Button';

export const Header = ({initData}) => {
    return(
        <div className="header">
            <Button variant="primary" onClick={(e) => initData()} className="custom-btn">
                Init Data
            </Button>
            <h4>Promotion Management</h4>
            <div></div>
        </div>
    )
};