import React from 'react';
import { Switch, Route, useLocation } from 'wouter';
import { queryClient } from './lib/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider } from '@/hooks/use-auth';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import FrontSplash from '@/components/front/FrontSplash';
import Home from '@/pages/home';
import About from '@/pages/about';
import Programs from '@/pages/programs';
import Startups from '@/pages/startups';
import Events from '@/pages/events';
import Partners from '@/pages/partners';
import News from '@/pages/news';
import CoI from '@/pages/coi';
import Reports from '@/pages/reports';
import FAQs from '@/pages/faqs';
import Gallery from '@/pages/gallery';
import Facilities from '@/pages/facilities';
import Careers from '@/pages/careers';
import Circulars from '@/pages/circulars';
import Initiatives from '@/pages/initiatives';
import Team from '@/pages/team';
import Apply from '@/pages/apply';
import Contact from '@/pages/contact';
import Admin from '@/pages/admin';
import NotFound from '@/pages/not-found';
import AdminLogin from './components/admin/AdminLogin';

// Scroll to top component
function ScrollToTop() {
	const [location] = useLocation();

	React.useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

	return null;
}

function Router() {
	const [location] = useLocation();
	const isAdminRoute = location === '/admin';

	return (
		<AuthProvider>
			<ScrollToTop />
			<div className="min-h-screen flex flex-col">
				{!isAdminRoute && <Navbar />}
				<main className="flex-grow">
					<Switch>
						<Route path="/" component={Home} />
						<Route path="/home" component={Home} />
						<Route path="/about" component={About} />
						<Route path="/programs" component={Programs} />
						<Route path="/apply" component={Apply} />
						<Route path="/programs/apply" component={Apply} />
						<Route path="/portfolios" component={Startups} />
						<Route path="/events" component={Events} />
						<Route path="/partners" component={Partners} />
						<Route path="/news" component={News} />
						<Route path="/coi" component={CoI} />
						<Route path="/reports" component={Reports} />
						<Route path="/faqs" component={FAQs} />
						<Route path="/gallery" component={Gallery} />
						<Route path="/facilities" component={Facilities} />
						<Route path="/careers" component={Careers} />
						<Route path="/circulars" component={Circulars} />
						<Route path="/initiatives" component={Initiatives} />
						<Route path="/team" component={Team} />
						<Route path="/contact" component={Contact} />
						<Route path="/login" component={AdminLogin} />
						<Route path="/admin" component={Admin} />
						<Route component={NotFound} />
					</Switch>
				</main>
				{!isAdminRoute && <Footer />}
			</div>
		</AuthProvider>
	);
}

function App() {
	const [showSplash, setShowSplash] = React.useState(true);

	return (
		<QueryClientProvider client={queryClient}>
			<TooltipProvider>
				<Toaster />
				<Router />
				{/* {showSplash ? <FrontSplash onFinish={() => setShowSplash(false)} /> : <Router />} */}
			</TooltipProvider>
		</QueryClientProvider>
	);
}

export default App;
