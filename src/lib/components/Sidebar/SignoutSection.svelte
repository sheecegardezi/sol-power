<script lang="ts">
	//components
	import * as Avatar from '$lib/components/ui/avatar';
	import Exit from 'svelte-radix/Exit.svelte';
	import ModeToggle from '../ModeToggle/ModeToggle.svelte';
	import { Separator } from '$lib/components/ui/separator';
	//types
	import type { User } from 'lucia';
	// other
	import { enhance } from '$app/forms';

	export let user: User;

	function getInitials(name: string) {
		return (
			(name?.match(/(\b\S)?/g) ?? []) // Use optional chaining and nullish coalescing
				.join('')
				.match(/(^\S|\S$)?/g) ??
			[] // Use optional chaining and nullish coalescing
				.join('')
		);
	}

	$: userInitials = getInitials(user.name);
</script>

<div class="flex w-full flex-col gap-y-2">
	<ModeToggle />
	<Separator class="my-3" />

	<div class="flex items-center gap-x-2">
		<Avatar.Root class="border-2">
			<Avatar.Image src={user.avatarUrl} alt="profile" />
			<Avatar.Fallback>{userInitials}</Avatar.Fallback>
		</Avatar.Root>
		<div class="hidden md:block">
			<p class="mb-0 font-medium leading-tight">{user.name}</p>
			<p class="text-sm text-muted-foreground">00001</p>
		</div>
	</div>

	<form method="post" action="/signout" use:enhance>
		<button
			type="submit"
			class="flex w-full select-none items-center gap-x-2 rounded-md px-2 py-3 text-base text-destructive outline-none transition-colors hover:bg-muted data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50"
		>
			<Exit size={20} />
			<span class="hidden md:block">Logout</span>
		</button>
	</form>
</div>
