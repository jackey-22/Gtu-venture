import { useEffect } from 'react';

export default function Lightbox({
	src,
	alt,
	onClose,
}: {
	src: string;
	alt?: string;
	onClose: () => void;
}) {
	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === 'Escape') onClose();
		}
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [onClose]);

	return (
		<div
			className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
			onClick={onClose}
		>
			<div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
				<img src={src} alt={alt} className="w-full h-auto rounded shadow-lg" />
				<div className="text-right mt-2">
					<button onClick={onClose} className="px-3 py-2 bg-white rounded">
						Close
					</button>
				</div>
			</div>
		</div>
	);
}
