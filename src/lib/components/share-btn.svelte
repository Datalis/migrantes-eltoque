<script>
	import ShareIcon from '$lib/assets/images/share.svg?component';
	import FacebookIcon from '$lib/assets/images/facebook.svg?component';
	import TwitterIcon from '$lib/assets/images/twitter.svg?component';
	import TelegramIcon from '$lib/assets/images/telegram.svg?component';
	import WhatsappIcon from '$lib/assets/images/whatsapp.svg?component';
	import { page } from '$app/stores';

	let isExpanded = false;

	$: url = $page.route.id || '/';
</script>

<div class="share-btn-wrapper" class:expanded={isExpanded}>
	<a
		href="https://facebook.com/sharer/sharer.php?u=https%3A%2F%2Flatravesia.eltoque.com{encodeURIComponent(url)}"
		target="_blank"
		rel="noopener noreferrer"
	>
		<FacebookIcon width="24" height="24" />
	</a>
	<a
		href="whatsapp://send?text=%20https%3A%2F%2Flatravesia.eltoque.com{encodeURIComponent(url)}"
		target="_blank"
		rel="noopener noreferrer"
	>
		<WhatsappIcon width="24" height="24" />
	</a>
	<a
		href="https://telegram.me/share/url?url=https%3A%2F%2Flatravesia.eltoque.com{encodeURIComponent(url)}"
		target="_blank"
		rel="noopener noreferrer"
	>
		<TelegramIcon width="24" height="24" />
	</a>
	<a
		href="https://twitter.com/intent/tweet/?url=https%3A%2F%2Flatravesia.eltoque.com{encodeURIComponent(url)}"
		target="_blank"
		rel="noopener noreferrer"
	>
		<TwitterIcon width="24" height="24" />
	</a>
	<button class="share-btn" on:click={() => (isExpanded = !isExpanded)}>
		<ShareIcon width="28" height="28" />
	</button>
</div>

<style>
	.share-btn-wrapper {
		position: fixed;
		bottom: 24px;
		right: 24px;
		z-index: 1000;
		@apply flex flex-col items-center;
	}
	@media (max-width: 768px) {
		.share-btn-wrapper {
			bottom: 12px;
			right: 12px;
		}
	}
	.share-btn-wrapper.expanded a {
		opacity: 1;
	}
	.share-btn-wrapper.expanded a:nth-child(4) {
		bottom: 58px;
		transition-delay: 0;
	}
	.share-btn-wrapper.expanded a:nth-child(3) {
		bottom: calc(54px * 2);
		transition-delay: 50ms;
	}
	.share-btn-wrapper.expanded a:nth-child(2) {
		bottom: calc(54px * 3);
		transition-delay: 100ms;
	}
	.share-btn-wrapper.expanded a:nth-child(1) {
		bottom: calc(54px * 4);
		transition-delay: 150ms;
	}

	.share-btn-wrapper .share-btn {
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.share-btn-wrapper a {
		width: 38px;
		height: 38px;
		padding: 4px;
		position: absolute;
		opacity: 0;
		z-index: 0;
		transition: opacity 300ms ease-in-out, bottom 100ms ease-in-out;
		bottom: 0;
		will-change: transform;
		@apply border border-light bg-dark rounded-full flex items-center justify-center;
	}

	:global(.share-btn-wrapper a svg) {
		@apply fill-light;
	}

	.share-btn-wrapper .share-btn {
		z-index: 1;
		@apply bg-accent rounded-full p-2 shadow-lg;
	}

	:global(.share-btn-wrapper .share-btn svg) {
		@apply fill-light;
	}
</style>
