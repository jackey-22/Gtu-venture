import React from 'react';
import { motion } from 'framer-motion';

// Import logos from Public/startups using relative paths
const logos = [
	'/startups/1.jpg',
	'/startups/3.png',
	'/startups/7.png',
	'/startups/8.png',
	'/startups/9.jpg',
	'/startups/11.png',
	'/startups/12.jpg',
	'/startups/13.jpg',
	'/startups/14.jpg',
	'/startups/15.jpg',
	'/startups/16.jpg',
	'/startups/17.jpg',
	'/startups/18.png',
	'/startups/19.png',
	'/startups/20.jpg',
	'/startups/21.png',
	'/startups/22.png',
	'/startups/23.png',
	'/startups/24.png',
	'/startups/25.png',
	'/startups/26.png',
	'/startups/27.jpg',
];

export default function LogoWall() {
	return (
		<section className="py-12 bg-gradient-to-br from-white/60 to-gtu-base/5 border-b relative overflow-hidden">
			{/* subtle decorative blobs */}
			<div className="pointer-events-none absolute inset-0 -z-10">
				<div className="absolute -left-24 -top-16 w-72 h-72 bg-gradient-to-tr from-gtu-base/20 to-purple-200/10 rounded-full blur-3xl opacity-70" />
				<div className="absolute right-0 bottom-0 w-96 h-96 bg-gradient-to-br from-purple-100/10 to-gtu-light/10 rounded-full blur-3xl opacity-60" />
			</div>

			<div className="max-w-7xl mx-auto px-6 lg:px-16">
				<motion.div
					initial={{ opacity: 0, y: 12 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-6"
				>
					<h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
						Our Portfolio
					</h2>
					<p className="text-muted-foreground max-w-2xl mx-auto mt-2">
						Meet the startups shaping the future - curated and supported by GTU
						Ventures.
					</p>
				</motion.div>

				<div className="mt-8">
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, staggerChildren: 0.03 }}
						className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center"
					>
						{logos.map((src, idx) => (
							<motion.div key={src} whileHover={{ y: -6 }} className="relative group">
								<div className="w-full aspect-[3/2] bg-white/60 dark:bg-gray-900/40 rounded-2xl flex items-center justify-center overflow-hidden border border-transparent transition-all shadow-sm group-hover:shadow-md">
									{/* accent ring (absolute so it doesn't affect layout) */}
									<div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 group-hover:ring-purple-300/60 transition-all pointer-events-none" />

									<div className="p-6 flex items-center justify-center w-full h-full">
										<img
											src={src}
											alt={`startup-${idx + 1}`}
											className="max-h-16 md:max-h-20 lg:max-h-24 object-contain mx-auto"
										/>
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
