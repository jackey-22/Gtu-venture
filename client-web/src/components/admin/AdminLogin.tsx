import React, { useState, useRef } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock, User } from 'lucide-react';
import { Toast } from 'primereact/toast';
import { navigate } from 'wouter/use-browser-location';
import { fetchPost } from '@/utils/fetch.utils';

export default function AdminLogin() {
	const { login } = useAuth();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const toast = useRef(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		// Simulate API call delay
		// await new Promise((resolve) => setTimeout(resolve, 500));

		try {
			const response = await fetchPost({
				pathName: 'auth/login',
				body: JSON.stringify({ username, password }),
			});

			if (response?.success) {
				login(response.data);
				navigate('/admin');
			} else {
				setError(response?.message || 'Login failed');
			}
		} catch {
			setError('Something Went Wrong!');
		} finally {
			setLoading(false);
		}

		const success = login(user);
		if (!success) {
			setError('Invalid username or password');
		}
		setLoading(false);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
			<Toast ref={toast} />
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<div className="mx-auto mb-4 w-12 h-12 bg-gtu-primary rounded-full flex items-center justify-center">
						<Lock className="w-6 h-6 text-white" />
					</div>
					<CardTitle className="text-2xl font-bold text-gtu-primary">
						GTU Ventures Admin
					</CardTitle>
					<CardDescription>
						Enter your credentials to access the admin panel
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="username">Username</Label>
							<div className="relative">
								<User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
								<Input
									id="username"
									type="text"
									placeholder="Enter username"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									className="pl-10"
									required
								/>
							</div>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<div className="relative">
								<Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
								<Input
									id="password"
									type="password"
									placeholder="Enter password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="pl-10"
									required
								/>
							</div>
						</div>
						{error && (
							<Alert variant="destructive">
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}
						<Button
							type="submit"
							className="w-full bg-gtu-primary hover:bg-gtu-primary/90"
							disabled={loading}
						>
							{loading ? 'Signing in...' : 'Sign In'}
						</Button>
					</form>
					{/* <div className="mt-4 text-center text-sm text-muted-foreground">
						<p>Demo credentials:</p>
						<p>
							<strong>Username:</strong> admin
						</p>
						<p>
							<strong>Password:</strong> gtu2024
						</p>
					</div> */}
				</CardContent>
			</Card>
		</div>
	);
}
