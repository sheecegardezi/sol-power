<script lang="ts">
	import type { PageData } from './$types.js';
	import SignupForm from '$lib/components/Forms/SignupForm.svelte';
	export let data: PageData;
</script>

<div class="flex h-screen items-center justify-center">
	<SignupForm data={data.form} showBadge />
</div>
