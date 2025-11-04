import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ICON_ENUM } from '@/constants/icon.enum';
import { getIconComponent } from '@/utils/icon.utils';

export function IconPicker({ value, onValueChange, placeholder = 'Select icon' }) {
	const [open, setOpen] = React.useState(false);
	const SelectedIcon = value ? getIconComponent(value) : null;

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between h-10"
				>
					<div className="flex items-center gap-2">
						{SelectedIcon ? <SelectedIcon className="w-4 h-4" /> : null}
						<span className="truncate">{value || placeholder}</span>
					</div>
					<ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
				</Button>
			</PopoverTrigger>

			<PopoverContent className="w-[350px] p-0" align="start">
				<Command>
					<CommandInput placeholder="Search icons..." />
					<CommandList className="max-h-64 overflow-y-auto">
						<CommandEmpty>No icon found.</CommandEmpty>
						<CommandGroup>
							{ICON_ENUM.map((icon) => {
								const Icon = getIconComponent(icon);
								return (
									<CommandItem
										key={icon}
										onSelect={() => {
											onValueChange?.(icon);
											setOpen(false);
										}}
										className="cursor-pointer flex gap-2"
									>
										<Icon className="h-4 w-4" />
										{icon}
										{value === icon && <Check className="ml-auto h-4 w-4" />}
									</CommandItem>
								);
							})}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
