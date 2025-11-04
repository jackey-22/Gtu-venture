import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { fetchGet } from '../../utils/fetch.utils';

interface NewsletterSubscription {
	_id: string;
	email: string;
	status: 'active' | 'unsubscribed';
	subscribedAt: string;
}

export default function NewsletterSubscriptionsCRUD() {
	const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchSubscriptions();
	}, []);

	const fetchSubscriptions = async () => {
		setLoading(true);
		try {
			const data = await fetchGet({ pathName: 'admin/get-newsletter-subscriptions' });
			setSubscriptions(data || []);
		} catch (error) {
			console.error('Error fetching newsletter subscriptions:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold">Newsletter Subscriptions</h2>
				<p className="text-muted-foreground">View all newsletter subscriptions</p>
			</div>

			{loading ? (
				<div className="flex justify-center items-center h-64">
					<div className="text-center">
						<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
						<p className="mt-3 text-primary">Loading Newsletter Subscriptions...</p>
					</div>
				</div>
			) : (
				<Card>
					<CardContent className="p-6">
						{subscriptions.length === 0 ? (
							<div className="text-center text-muted-foreground py-8">
								No newsletter subscriptions found
							</div>
						) : (
							<div className="overflow-x-auto">
								<table className="w-full">
									<thead>
										<tr className="border-b">
											<th className="text-left py-3 px-4 font-semibold">
												Email
											</th>
											<th className="text-left py-3 px-4 font-semibold">
												Status
											</th>
											<th className="text-left py-3 px-4 font-semibold">
												Subscribed At
											</th>
										</tr>
									</thead>
									<tbody>
										{subscriptions.map((subscription) => (
											<tr
												key={subscription._id}
												className="border-b hover:bg-gray-50"
											>
												<td className="py-3 px-4">{subscription.email}</td>
												<td className="py-3 px-4">
													<Badge
														variant={
															subscription.status === 'active'
																? 'default'
																: 'secondary'
														}
													>
														{subscription.status}
													</Badge>
												</td>
												<td className="py-3 px-4">
													{new Date(
														subscription.subscribedAt
													).toLocaleDateString()}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</CardContent>
				</Card>
			)}

			{subscriptions.length > 0 && (
				<div className="text-sm text-muted-foreground">
					Total subscriptions: {subscriptions.length}
				</div>
			)}
		</div>
	);
}
