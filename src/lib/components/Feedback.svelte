<script>
	import { _ } from "svelte-i18n";

	let submitted = false;

	async function toggleSubmitted() {
		// wait for 1 second in order to let the form carry out
		await new Promise((resolve) => setTimeout(resolve, 1000));
		submitted = true;
	}
</script>

<main>
	{#if submitted}
		<p class="thanks">{$_("pages.settings.feedback.thanks")}</p>
	{:else}
		<form
			id="form"
			action="https://formsubmit.co/nickrtrrtr@gmail.com"
			target="_blank"
			method="POST"
		>
			<label for="name">{$_("pages.settings.feedback.name")}</label>
			<input type="text" name="name" id="name" placeholder={$_("pages.settings.feedback.name")} />
			<label for="message">{$_("pages.settings.feedback.message_label")}</label>
			<textarea
				name="message"
				id="message"
				placeholder={$_("pages.settings.feedback.message")}
				required
			/>
			<button
				on:click={() => {
					toggleSubmitted();
				}}
				type="submit">{$_("pages.settings.feedback.submit")}</button
			>
			<input type="hidden" name="_subject" value="Schoppy: New feedback submission!" />
		</form>
	{/if}
</main>

<style>
	form {
		text-align: left;
		max-width: 400px;
		margin: auto;
		display: flex;
		flex-direction: column;
	}

	label {
		padding-block: 0.5rem;
	}

	textarea,
	input,
	button {
		border-radius: 1rem;
		padding: 0.4rem;
		font-size: 1rem;
		transition: 0.1s ease-in-out;
		width: unset !important;
		margin-bottom: 0.5rem;
	}

	textarea,
	input {
		border: 2px solid black;
		outline: none;
	}

	textarea {
		height: 100px !important;
		resize: none;
	}

	button {
		font-weight: bold;
		border: 1px solid var(--accent);
	}

	button:focus,
	button:hover {
		border-color: var(--minor);
	}

	textarea:hover,
	input:hover,
	textarea:focus,
	input:focus {
		border-color: var(--accent);
	}

	.thanks {
		font-weight: bold;
		color: limegreen;
	}

	@media only screen and (max-width: 900px) {
		input,
		textarea {
			width: 300px;
		}

		textarea {
			height: 150px;
		}
	}
</style>
