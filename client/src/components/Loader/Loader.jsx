import React from 'react'
import './Loader.css'

const Loader = () => {
    return (
        <>
            <div
                className="loader"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '20px 0',
                    padding: '20px',
                }}
            >
                <div
                    style={{
                        width: '80px',
                        height: '80px',
                        border: '8px solid rgba(0, 0, 0, 0.1)',
                        borderTop: '8px solid var(--primary-color)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                    }}
                ></div>
            </div>

        </>


    )
}

export default Loader