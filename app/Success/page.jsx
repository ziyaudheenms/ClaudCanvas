"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
function page() {
    const router = useRouter()
return (
    <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        backgroundColor: '#f0f8ff', 
        fontFamily: 'Arial, sans-serif' 
    }}>
        <div style={{ 
            padding: '20px', 
            borderRadius: '10px', 
            backgroundColor: '#ffffff', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
            textAlign: 'center' 
        }}>
            <h1 style={{ color: '#4caf50' }}>Payment Successful!</h1>
            <p style={{ fontSize: '18px', color: '#555' }}>
                Thank you for your purchase. Your payment has been processed successfully.
            </p>
            <button 
                style={{ 
                    marginTop: '20px', 
                    padding: '10px 20px', 
                    fontSize: '16px', 
                    color: '#fff', 
                    backgroundColor: '#4caf50', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer' 
                }}
                onClick={() => {
                    router.push("/")
                }}
            >
                Go to Homepage
            </button>
        </div>
    </div>
)
}

export default page