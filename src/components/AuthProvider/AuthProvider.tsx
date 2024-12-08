import { Navigate } from 'react-router-dom';





export const AuthProvider = ({ children }: any) => {
  const isAuthenticated = localStorage.getItem('auth_data');

  if (!isAuthenticated) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
    
      {children}
    </>
  );
};