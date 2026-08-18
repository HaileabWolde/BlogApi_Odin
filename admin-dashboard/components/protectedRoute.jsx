// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token')

    if (!token) {
        return <Navigate to="/login" replace />
    }

    // Decode token payload
    const decoded = JSON.parse(atob(token.split('.')[1]))

    // Check if token is expired
    if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('token')
        return <Navigate to="/login" replace />
    }

    // Check role
    if (decoded.role !== 'AUTHOR' && decoded.role !== 'ADMIN') {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute