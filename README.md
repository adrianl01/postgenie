# PostGenie - AI Social Media Assistant (MVP)

Proyecto starter para un **AI Social Media Assistant** (PostGenie).
Genera texto e hashtags para posts usando la API de OpenAI.

## Qué contiene
- Frontend: Next.js (App Router) + TypeScript + Tailwind (setup files included).
- Backend: API route `/api/generate` que llama a OpenAI (usa variable de entorno `OPENAI_API_KEY`).
- Componentes: PostForm, PostPreview, Navbar.
- Ejemplo de prompt y estructura para integrar generación e imágenes.

## Setup
1. Copia el repositorio y corre `npm install`.
2. Añade `OPENAI_API_KEY` en `.env.local`.
3. `npm run dev` para desarrollo.

## Notas
- Este proyecto es una base. Para producción agrega autenticación, base de datos (Supabase/Prisma), manejo de costes y límites.
- El endpoint de OpenAI está implementado con `fetch` y requiere la clave en `OPENAI_API_KEY`.

