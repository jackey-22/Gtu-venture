import { createContext, useContext, useState, useEffect } from 'react';
import { fetchPost } from '../utils/fetch.utils';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

	useEffect(() => {
		setIsAuthenticated(!!localStorage.getItem('token'));
	}, []);

	const login = (user) => {
		localStorage.setItem('token', user.token);

		setIsAuthenticated(true);
	};

	const logout = async () => {
		const userId = localStorage.getItem('_id');
		await fetchPost({ pathName: 'auth/logout', body: JSON.stringify({ _id: userId }) });
		localStorage.clear();
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
