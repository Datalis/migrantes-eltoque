import { sveltekit } from '@sveltejs/kit/vite';
import svg from '@poppanator/sveltekit-svg';
import { imagetools } from 'vite-imagetools';
import { compression } from 'vite-plugin-compression2'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		imagetools({
			removeMetadata: true,
			
		}),
		svg({
			includePaths: ['./src/lib/assets/images/'],
			svgoOptions: {
				multipass: true,
				plugins: [
					{
						name: 'preset-default',
						params: { overrides: { removeViewBox: false } }
					},
				]
			}
		}),
		compression({
			algorithm: 'gzip'
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		port: 2000
	}
};

export default config;
