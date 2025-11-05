import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { fetchPost } from '@/utils/fetch.utils';

export default function Apply() {
	const [form, setForm] = useState<any>({
		startupName: '',
		idea: '',
		email: '',
		cofounderEmail: '',
		state: '',
		city: '',
		fundingRaised: '',
		fundingAgency: '',
		website: '',
		mobile: '',
		registered: '',
		stage: '',
		incubatedElsewhere: '',
		supportNeeded: [],
		teamSize: '',
		pitchDeck: '',
	});

	const supportOptions = [
		'Mentorship',
		'Funding',
		'Workspace',
		'Legal & IP',
		'Technology & Prototyping',
		'Networking',
		'Market Access',
	];

	function update(key: string, value: any) {
		setForm((s: any) => ({ ...s, [key]: value }));
	}

	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(e?: React.FormEvent) {
		if (e) e.preventDefault();
		if (!form.startupName || !form.email || !form.mobile) {
			toast({
				title: 'Missing fields',
				description: 'Please fill Startup name, email and mobile number',
			});
			return;
		}

		setIsSubmitting(true);
		try {
			const data = await fetchPost({
				pathName: 'user/submit-application',
				body: JSON.stringify(form),
			});

			if (data?.success || data?.message?.toLowerCase().includes('success')) {
				toast({
					title: 'Application submitted',
					description: "Thanks — we'll review and be in touch.",
				});
				setForm({
					startupName: '',
					idea: '',
					email: '',
					cofounderEmail: '',
					state: '',
					city: '',
					fundingRaised: '',
					fundingAgency: '',
					website: '',
					mobile: '',
					registered: '',
					stage: '',
					incubatedElsewhere: '',
					supportNeeded: [],
					teamSize: '',
					pitchDeck: '',
				});
			} else {
				toast({
					title: 'Error',
					description: data?.message || 'Failed to submit application. Please try again.',
					variant: 'destructive',
				});
			}
		} catch (error) {
			console.error('Error submitting application:', error);
			toast({
				title: 'Error',
				description: 'Failed to submit application. Please try again.',
				variant: 'destructive',
			});
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div className="min-h-screen pt-7">
			<section className="pt-20 pb-5">
				<div className="max-w-screen-2xl px-6 lg:px-16 text-start">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-start"
					>
						<h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-2">Apply Now</h1>
						<p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
							Apply for startup support at GTU Ventures — complete the form to apply
							for incubation support.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Main two-column section (form + eligibility/info) */}
			<section className="py-14">
				<div className="max-w-screen-2xl mx-auto px-6 lg:px-20">
					<div className="grid grid-cols-1 lg:[grid-template-columns:60%_40%] gap-12">
						{/* Form - left (~60%) */}
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6 }}
						>
							<Card>
								<CardContent className="p-8">
									<h2 className="text-2xl font-bold text-foreground mb-4">
										Apply for Startup support at GTU Ventures
									</h2>
									<p className="text-muted-foreground mb-6">
										Please complete the form below to apply for incubation
										support.
									</p>

									<form onSubmit={handleSubmit} className="space-y-4">
										<div>
											<label className="block text-sm font-medium mb-2">
												Startup Name*
											</label>
											<Input
												placeholder="Your startup name"
												value={form.startupName}
												onChange={(e) =>
													update('startupName', e.target.value)
												}
											/>
										</div>

										<div>
											<label className="block text-sm font-medium mb-2">
												Describe your idea briefly*
											</label>
											<Textarea
												className="min-h-[120px]"
												placeholder="Brief description"
												value={form.idea}
												onChange={(e) => update('idea', e.target.value)}
											/>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div>
												<label className="block text-sm font-medium mb-2">
													Email*
												</label>
												<Input
													placeholder="you@company.com"
													value={form.email}
													onChange={(e) =>
														update('email', e.target.value)
													}
												/>
											</div>
											<div>
												<label className="block text-sm font-medium mb-2">
													Email Address of cofounder
												</label>
												<Input
													placeholder="cofounder@company.com"
													value={form.cofounderEmail}
													onChange={(e) =>
														update('cofounderEmail', e.target.value)
													}
												/>
											</div>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
											<div>
												<label className="block text-sm font-medium mb-2">
													State*
												</label>
												<select
													className="w-full p-3 rounded border"
													value={form.state}
													onChange={(e) =>
														update('state', e.target.value)
													}
												>
													<option value="">Select State</option>
													<option>Gujarat</option>
													<option>Maharashtra</option>
												</select>
											</div>
											<div>
												<label className="block text-sm font-medium mb-2">
													District / city*
												</label>
												<Input
													placeholder="City"
													value={form.city}
													onChange={(e) => update('city', e.target.value)}
												/>
											</div>
											<div>
												<label className="block text-sm font-medium mb-2">
													Mobile Number*
												</label>
												<Input
													placeholder="Mobile"
													value={form.mobile}
													onChange={(e) =>
														update('mobile', e.target.value)
													}
												/>
											</div>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
											<div>
												<label className="block text-sm font-medium mb-2">
													Have you raised any funding for your startup?
												</label>
												<Input
													placeholder="If yes, mention amount"
													value={form.fundingRaised}
													onChange={(e) =>
														update('fundingRaised', e.target.value)
													}
												/>
											</div>
											<div>
												<label className="block text-sm font-medium mb-2">
													Funding Agency/Investor name
												</label>
												<Input
													placeholder="Investor name"
													value={form.fundingAgency}
													onChange={(e) =>
														update('fundingAgency', e.target.value)
													}
												/>
											</div>
											<div>
												<label className="block text-sm font-medium mb-2">
													Website
												</label>
												<Input
													placeholder="https://example.com/"
													value={form.website}
													onChange={(e) =>
														update('website', e.target.value)
													}
												/>
											</div>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
											<div>
												<label className="block text-sm font-medium mb-2">
													Is your startup registered?
												</label>
												<select
													className="w-full p-3 rounded border"
													value={form.registered}
													onChange={(e) =>
														update('registered', e.target.value)
													}
												>
													<option value="">Enter stage of startup</option>
													<option value="Not Registered">
														Not Registered
													</option>
													<option value="Proprietorship">
														Proprietorship
													</option>
													<option value="Partnership Firm">
														Partnership Firm
													</option>
													<option value="LLP">
														Limited Liability Partnership
													</option>
													<option value="Private Limited Company">
														Private Limited Company
													</option>
													<option value="One person company">
														One person company (OPC)
													</option>
												</select>
											</div>
											<div>
												<label className="block text-sm font-medium mb-2">
													Enter stage of startup
												</label>
												<select
													className="w-full p-3 rounded border"
													value={form.stage}
													onChange={(e) =>
														update('stage', e.target.value)
													}
												>
													<option value="">Select</option>
													<option>Idea</option>
													<option>Prototype / MVP</option>
												</select>
											</div>
											<div>
												<label className="block text-sm font-medium mb-2">
													Is your Startup Incubated with any other
													Incubation Center
												</label>
												<Input
													placeholder="Yes or No (If yes, name)"
													value={form.incubatedElsewhere}
													onChange={(e) =>
														update('incubatedElsewhere', e.target.value)
													}
												/>
											</div>
										</div>

										<div>
											<div className="mb-2 font-medium">
												Which of the following Support would you like to
												avail? (Tick as Many)
											</div>
											<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
												{supportOptions.map((opt) => (
													<label
														key={opt}
														className="inline-flex items-center space-x-2"
													>
														<input
															type="checkbox"
															checked={form.supportNeeded.includes(
																opt
															)}
															onChange={() => {
																const next =
																	form.supportNeeded.includes(opt)
																		? form.supportNeeded.filter(
																				(s: string) =>
																					s !== opt
																		  )
																		: [
																				...form.supportNeeded,
																				opt,
																		  ];
																update('supportNeeded', next);
															}}
														/>
														<span>{opt}</span>
													</label>
												))}
											</div>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
											<div>
												<label className="block text-sm font-medium mb-2">
													Team Size
												</label>
												<Input
													placeholder="Team size"
													value={form.teamSize}
													onChange={(e) =>
														update('teamSize', e.target.value)
													}
												/>
											</div>
											<div className="md:col-span-2">
												<label className="block text-sm font-medium mb-2">
													Pitch-deck Link
												</label>
												<Input
													placeholder="https://drive.google.com/..."
													value={form.pitchDeck}
													onChange={(e) =>
														update('pitchDeck', e.target.value)
													}
												/>
											</div>
										</div>

										<div className="flex items-center justify-between">
											<div className="text-sm text-muted-foreground">
												By submitting, you agree to our terms and privacy
												policy.
											</div>
											<Button
												type="submit"
												disabled={isSubmitting}
												className="bg-primary text-primary-foreground px-6 py-3 rounded-full"
											>
												{isSubmitting
													? 'Submitting...'
													: 'Submit Application'}
											</Button>
										</div>
									</form>
								</CardContent>
							</Card>
						</motion.div>

						{/* Eligibility + info - right (~40%) */}
						<motion.div
							initial={{ opacity: 0, x: 30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6 }}
							className="space-y-6"
						>
							<Card>
								<CardContent className="p-6">
									<h3 className="text-xl font-semibold mb-3">
										Eligibility to Apply for Incubation Support
									</h3>
									<p className="text-sm text-muted-foreground mb-3">
										Anyone with an innovative idea, proof of concept (PoC), or
										working prototype that aligns with societal, technological,
										or market needs can apply. You are eligible if you fall into
										any of the following categories:
									</p>
									<ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
										<li>
											Individual Innovators (students, graduates,
											professionals, or citizens) with an original idea or
											PoC.
										</li>
										<li>
											Students (UG/PG/PhD) from any recognized institution
											working on innovative solutions.
										</li>
										<li>
											Researchers or Faculty Members pursuing
											commercialization of research or innovation.
										</li>
										<li>
											Startups (registered or unregistered) working on a
											prototype, MVP, or ready-to-scale product/service.
										</li>
										<li>
											Companies registered as Private Limited, LLP, or
											Partnership, preferably less than 10 years old with a
											turnover under INR 100 Cr (as per DPIIT norms).
										</li>
									</ol>
								</CardContent>
							</Card>

							<Card>
								<CardContent className="p-6">
									<h3 className="text-xl font-semibold mb-3">Need help?</h3>
									<p className="text-sm text-muted-foreground mb-4">
										If you have questions about eligibility or the application
										process, reach out to our team.
									</p>
									<div className="space-y-3">
										<div className="flex items-start gap-3">
											<MapPin className="w-5 h-5 text-primary mt-1" />
											<div>
												<div className="font-medium">Address</div>
												<div className="text-sm text-muted-foreground">
													AIC GISC, Gujarat Technological University,
													Ahmedabad
												</div>
											</div>
										</div>
										<div className="flex items-start gap-3">
											<Mail className="w-5 h-5 text-primary mt-1" />
											<div>
												<div className="font-medium">Email</div>
												<div className="text-sm text-muted-foreground">
													info@gtuventures.com
												</div>
											</div>
										</div>
										<div className="flex items-start gap-3">
											<Phone className="w-5 h-5 text-primary mt-1" />
											<div>
												<div className="font-medium">Phone</div>
												<div className="text-sm text-muted-foreground">
													+91 9909910798
												</div>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					</div>
				</div>
			</section>
		</div>
	);
}
