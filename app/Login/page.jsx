import React from 'react';

const LoginPage = () => {
    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <div style={styles.tag} className='bg-gradient-to-r from-[#FF0080] to-[#FF8C00]'>ClaudCanvas</div>
                <h2 style={styles.title}>Welcome Back</h2>
                <form style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label htmlFor="username" style={styles.label}>Username</label>
                        <input type="text" id="username" name="username" style={styles.input} placeholder="Enter your username" />
                    </div>
                    <div style={styles.inputGroup}>
                        <label htmlFor="password" style={styles.label}>Password</label>
                        <input type="password" id="password" name="password" style={styles.input} placeholder="Enter your password" />
                    </div>
                    <button type="submit" style={styles.button} className='bg-gradient-to-r from-[#FF0080] to-[#FF8C00]'>Login</button>
                </form>
                <p style={{ marginTop: '15px', textAlign: 'center', color: '#555' }}>
                    Don't have an account? <a href="/signUp" style={{ color: '#2575fc', textDecoration: 'none' }}>Sign Up</a>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
        fontFamily: 'Arial, sans-serif',
    },
    formContainer: {
        width: '100%',
        maxWidth: '400px',
        padding: '30px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '12px',
        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
        position: 'relative',
    },
    tag: {
        position: 'absolute',
        top: '-20px',
        left: '50%',
        transform: 'translateX(-50%)',
        // background: 'linear-gradient(135deg, #ff7eb3, #ff758c)',
        color: '#fff',
        padding: '5px 15px',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: 'bold',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    title: {
        marginBottom: '20px',
        textAlign: 'center',
        color: '#333',
        fontSize: '24px',
        fontWeight: 'bold',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    label: {
        marginBottom: '5px',
        display: 'block',
        color: '#555',
        fontSize: '14px',
    },
    input: {
        width: '100%',
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '16px',
        transition: 'border-color 0.3s',
    },
    inputFocus: {
        borderColor: '#6a11cb',
    },
    button: {
        padding: '12px 20px',
        // backgroundColor: '#6a11cb',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#2575fc',
    },
};

export default LoginPage;