// В sw.js

const CacheKey = 'CustomSL_Cache'

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CacheKey).then((cache) => {
			return cache.addAll([
				'./',
				'index.html',
				'assets/index.67b4f464.js',
				'static/cdn.tailwindcss.js',
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
