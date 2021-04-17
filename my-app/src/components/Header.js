import React from 'react'

export const Header = ({initData}) => {
    return(
        <div className="header">
            <button type="button" onClick= {(e) => initData()} className="btn btn-danger" style={{marginRight: '10px'}}>Init Data</button>
            <h3>Promotion Management</h3>
        </div>
    )
}