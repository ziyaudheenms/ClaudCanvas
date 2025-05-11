"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

export default function page() {
     const router = useRouter()
    return (
        <div style={{ 
            textAlign: 'center', 
            marginTop: '50px', 
            fontFamily: 'Arial, sans-serif', 
            color: '#333' 
        }}>
            <h1 style={{ 
                fontSize: '2.5rem', 
                color: '#ff4d4f', 
                marginBottom: '20px' 
            }}>
                Payment Failed
            </h1>
            <p style={{ 
                fontSize: '1.2rem', 
                marginBottom: '10px' 
            }}>
                We're sorry, but your payment could not be processed.
            </p>
            <p style={{ 
                fontSize: '1rem', 
                color: '#555', 
                marginBottom: '30px' 
            }}>
                Please try again or contact support if the issue persists.
            </p>
            <button
                onClick={() => router.push("/")}
                style={{
                    padding: '12px 25px',
                    fontSize: '1rem',
                    backgroundColor: '#ff4d4f',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseOver={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.15)';
                }}
                onMouseOut={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                }}
            >
                Go Back to Home
            </button>
        </div>
    );
}