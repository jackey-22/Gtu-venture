import React from 'react';
import * as LucideIcons from 'lucide-react';
import { ICON_ENUM, IconName } from '@/constants/icon.enum';
import { HelpCircle } from 'lucide-react';

export function getIconComponent(iconName: string | undefined | null): React.ComponentType<any> {
	if (!iconName) {
		return HelpCircle;
	}

	if (!ICON_ENUM.includes(iconName as IconName)) {
		console.warn(`Invalid icon name: ${iconName}. Using fallback icon.`);
		return HelpCircle;
	}

	const IconComponent = (LucideIcons as any)[iconName.trim()];

	if (!IconComponent) {
		console.warn(`Icon component not found: ${iconName}. Using fallback icon.`);
		return HelpCircle;
	}

	return IconComponent;
}

export function renderIcon(iconName: string | undefined | null, props?: any) {
	const IconComponent = getIconComponent(iconName);
	return <IconComponent {...props} />;
}
