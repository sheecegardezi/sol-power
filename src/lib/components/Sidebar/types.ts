import type { Icon } from 'lucide-svelte';
import type { ComponentType } from 'svelte';

export interface MenuItem {
	name: string;
	route: string;
	icon: ComponentType<Icon>;
}
