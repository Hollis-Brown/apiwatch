const CACHE_NAME = "apiwatch-v1"
const urlsToCache = ["/", "/static/js/bundle.js", "/static/css/main.css", "/manifest.json"]

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache)
    }),
  )
})

// Fetch event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      return response || fetch(event.request)
    }),
  )
})

// Push notification event
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "New API alert!",
    icon: "/icon-192.png",
    badge: "/icon-badge.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "View Details",
        icon: "/icon-view.png",
      },
      {
        action: "close",
        title: "Dismiss",
        icon: "/icon-close.png",
      },
    ],
  }

  event.waitUntil(self.registration.showNotification("APIWatch Alert", options))
})

// Notification click event
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/"))
  }
})
