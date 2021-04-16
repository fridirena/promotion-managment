import React from 'react'

export const Header = () => {

    const headerStyle = {

        width: '100%',
        padding: '2%',
        backgroundColor: "#ffcc99",
        color: 'white',
        textAlign: 'center'
    }

    return(
        <div style={headerStyle}>
            <h1>Promotion Management</h1>
        </div>
    )
}