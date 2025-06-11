// В sw.js

const CacheKey = 'CustomSL_Cache'

const cacheList = [
	'./',
	'manifest.json',
	'index.html',
	'assets/index.67b4f464.js',
	'favicon-512x512.png',
	'static/cdn.tailwindcss.js',
	'static/all.min.css',
	'static/fa-solid-900.woff2',
]

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CacheKey).then(async (cache) => {
			for( const item of cacheList ) {
				try {
					await cache.add(item)
				} catch(e) {
					console.error(e)
				}
			}
			
			return
			
			return cache.addAll([
				'./',
				'index.html',
				'assets/index.67b4f464.js',
				'favicon-512x512.png',
				'https://cdn.tailwindcss.com',
				'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
				'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.woff2',
			])
		})
	)
})

self.addEventListener('fetch', async (event) => {
	event.respondWith((async () => {
		
		const response = await caches.match(event.request)
		if ( response )
			return response
		
		return await fetch(event.request)
	})())
})
