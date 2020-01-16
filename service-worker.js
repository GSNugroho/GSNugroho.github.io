importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if(workbox) {
    console.log(`Workbox berhasil dimuat`);
} else {
    console.log(`Workbox gagal dimuat`);
}

// Precaching
workbox.precaching.precacheAndRoute([{
        url : '/',
        revision: '1'
    },
    {
        url : '/index.html',
        revision: '1'
    },
    {
        url : '/manifest.json',
        revision: '1'
    },
    {
        url : '/team.html',
        revision: '1'
    },
    {
        url : '/nav.html',
        revision: '1'
    },
    {
        url : '/css/materialize.min.css',
        revision: '1'
    },
    {
        url : '/icon/icon-48.png',
        revision: '1'
    },
    {
        url : '/icon/icon-96.png',
        revision: '1'
    },
    {
        url : '/icon/icon-192.png',
        revision: '1'
    },
    {
        url : '/icon/icon-512.png',
        revision: '1'
    },
    {
        url : '/js/api.js',
        revision: '1'
    },
    {
        url : '/js/db.js',
        revision: '1'
    },
    {
        url : '/js/idb.js',
        revision: '1'
    },
    {
        url : '/js/materialize.min.js',
        revision: '1'
    },
    {
        url : '/js/nav.js',
        revision: '1'
    },
    {
        url : '/pages/standing.html',
        revision: '1'
    },
    {
        url : '/pages/saved.html',
        revision: '1'
    },
    {
        url : '/pages/topskor.html',
        revision: '1'
    },
]);

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30hari
            }),
        ],
    }),
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate()
)

workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
        cacheName: 'google-font',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    new RegExp('.*\.js'),
    workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
    new RegExp('/css/materialize.min.css'),
    workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
    new RegExp('.*\.png'),
    workbox.strategies.cacheFirst()
);

self.addEventListener('push', function(event) {
    var body;
    if(event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body : body,
        icon : 'icon/icon-48.png',
        vibrate : [100, 50, 100],
        data : {
            dateOfArrival : Date.now(),
            primaryKey : 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});