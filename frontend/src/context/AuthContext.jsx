import { createContext, useState, useEffect } from 'react';
import { ROLES } from '../constants/roles';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      // First, try to get the user object (for full user data)
      const storedUser = localStorage.getItem('user');
      const storedRole = localStorage.getItem('role');
      
      console.log('Stored user:', storedUser); // Debug log
      console.log('Stored role:', storedRole); // Debug log
      
      if (storedUser) {
        // If we have a user object, parse it and extract role
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
        
        // Handle different possible role property names
        const userRole = (parsedUser.role || parsedUser.userRole || parsedUser.type)?.toLowerCase();
        console.log('User role from user object:', userRole); // Debug log
        setRole(userRole);
        
      } else if (storedRole) {
        // If we only have role (like from your current signin), use that
        console.log('Using stored role:', storedRole); // Debug log
        setRole(storedRole.toLowerCase());
        setIsAuthenticated(true);
        
        // Create a basic user object if needed
        setUser({
          role: storedRole.toLowerCase(),
          // Add other default user properties as needed
        });
      } else {
        // No authentication data found
        console.log('No user or role found in localStorage');
        setRole(null);
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      // Handle corrupted localStorage data
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      setRole(null);
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  // Optional: Add methods to update auth state
  const login = (userData) => {
    setUser(userData);
    setRole(userData.role?.toLowerCase());
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('role', userData.role?.toLowerCase());
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      role, 
      isAuthenticated, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;