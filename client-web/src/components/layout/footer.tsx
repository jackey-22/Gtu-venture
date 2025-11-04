import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Twitter, Linkedin, Facebook } from 'lucide-react';

const programLinks = [
	{ name: 'Pre-incubation', href: '/programs#pre-incubation' },
	{ name: 'Incubation', href: '/programs#incubation' },
	{ name: 'Acceleration', href: '/programs#acceleration' },
	{ name: 'Innovation Labs', href: '/programs#innovation-labs' },
];

const quickLinks = [
	{ name: 'Home', href: '/home' },
	{ name: 'About', href: '/about' },
	{ name: 'Programs', href: '/programs' },
	{ name: 'Startups', href: '/startups' },
	{ name: 'Events', href: '/events' },
	{ name: 'News', href: '/news' },
];

const supportLinks = [
	{ name: 'Apply', href: '/apply' },
	{ name: 'FAQs', href: '/faqs' },
	{ name: 'Reports', href: '/reports' },
	{ name: 'Gallery', href: '/gallery' },
	{ name: 'Careers', href: '/careers' },
];

const aboutLinks = [
	{ name: 'Team', href: '/team' },
	{ name: 'Partners', href: '/partners' },
	{ name: 'Facilities', href: '/facilities' },
	{ name: 'Initiatives', href: '/initiatives' },
	{ name: 'Contact', href: '/contact' },
];

const additionalLinks = [
	{ name: 'CoE', href: '/coi' },
	{ name: 'Circulars', href: '/circulars' },
];

const socialLinks = [
	{ name: 'Twitter', href: '#', icon: Twitter },
	{ name: 'LinkedIn', href: '#', icon: Linkedin },
	{ name: 'Facebook', href: '#', icon: Facebook },
];

export default function Footer() {
	return (
		<footer className="bg-ink text-white" data-testid="footer">
			{/* Gradient bar */}
			<div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>

			<div className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
					{/* Brand */}
					<div className="md:col-span-2">
						<img src="/gtuv.png" alt="GTU Ventures" className="h-12 w-auto mb-6" />
						<p className="text-white/80 leading-relaxed max-w-md mb-6">
							Empowering Gujarat's next generation of entrepreneurs through
							innovation, mentorship, and community support.
						</p>
						<div className="flex space-x-4">
							{socialLinks.map((social) => {
								const Icon = social.icon;
								return (
									<motion.a
										key={social.name}
										href={social.href}
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.95 }}
										className="text-white/60 hover:text-white transition-colors"
										data-testid={`social-${social.name.toLowerCase()}`}
									>
										<Icon className="w-6 h-6" />
									</motion.a>
								);
							})}
						</div>
					</div>

					{/* Programs */}
					<div>
						<h4 className="text-lg font-semibold mb-4">Programs</h4>
						<ul className="space-y-2 text-white/80">
							{programLinks.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="hover:text-white transition-colors"
										data-testid={`footer-program-${link.name
											.toLowerCase()
											.replace(/\s+/g, '-')}`}
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Quick Links */}
					<div>
						<h4 className="text-lg font-semibold mb-4">Quick Links</h4>
						<ul className="space-y-2 text-white/80">
							{quickLinks.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="hover:text-white transition-colors"
										data-testid={`footer-quick-${link.name.toLowerCase()}`}
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Support */}
					<div>
						<h4 className="text-lg font-semibold mb-4">Support</h4>
						<ul className="space-y-2 text-white/80">
							{supportLinks.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="hover:text-white transition-colors"
										data-testid={`footer-support-${link.name.toLowerCase()}`}
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* About */}
					<div>
						<h4 className="text-lg font-semibold mb-4">About</h4>
						<ul className="space-y-2 text-white/80">
							{aboutLinks.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="hover:text-white transition-colors"
										data-testid={`footer-about-${link.name.toLowerCase()}`}
									>
										{link.name}
									</Link>
								</li>
							))}
							{additionalLinks.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="hover:text-white transition-colors"
										data-testid={`footer-additional-${link.name.toLowerCase()}`}
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Bottom */}
				<div className="border-t border-white/10 pt-8">
					<div className="flex flex-col lg:flex-row justify-between items-center gap-4">
						<div className="text-white/60 text-sm">
							© 2025 GTU Ventures. All rights reserved.
						</div>
						<div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-white/80">
							<div className="flex items-center gap-4">
								<span
									data-testid="contact-phone"
									className="flex items-center gap-2"
								>
									<span className="text-white/60">📞</span> 9909910798
								</span>
								<span
									data-testid="contact-email"
									className="flex items-center gap-2"
								>
									<span className="text-white/60">✉️</span> info@gtuventures.com
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
