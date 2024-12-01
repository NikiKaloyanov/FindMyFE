# MEETMAP

1. За стартирането на приложението са необходими: 
   1. Node.js или подобрен runtime (Deno, Bun и др.)
   2. Package manager npm, yarn, bun или друг
2. За локално стартиране на приложението създайте .env файл в главната директория на проекта със следните ключове:
   VITE_API_BASE_URL=http://localhost
   VITE_API_BASE_PORT=:8080
   VITE_API_GOOGLE_MAPS_KEY= Ключ от Google Cloud Platform: Google Maps API
   VITE_API_GOOGLE_MAPS_ID= ID от Google Cloud Platform: Google Maps API
   VITE_API_APPWRITE_PROJECT_ID= ID от Appwrite
3. Стартирайте приложението чрез npm run dev / bun run dev

Приложението осъществява комуникацията между фронтенд проекта и базата, доставяйки данни между проектите, записвайки
данни за клиенти и управляването на токени и защита на проекта.