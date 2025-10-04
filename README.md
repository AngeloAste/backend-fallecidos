# Backend Fallecidos API

API REST desarrollada con NestJS para la gestión de registros de personas fallecidas en Chile.

## Tecnologías

- **Framework**: NestJS 11
- **ORM**: TypeORM 0.3.27
- **Base de datos**: PostgreSQL
- **Documentación**: Swagger/OpenAPI
- **Validación**: class-validator + class-transformer
- **Lenguaje**: TypeScript 5

## Características

- ✅ CRUD completo de registros de fallecidos
- ✅ Búsqueda avanzada con múltiples filtros
- ✅ Paginación de resultados
- ✅ Validación de datos
- ✅ Documentación automática con Swagger
- ✅ TypeORM con PostgreSQL
- ✅ CORS habilitado
- ✅ Seed de datos iniciales

## Requisitos Previos

- Node.js 18+
- Docker y Docker Compose (opcional pero recomendado)
- PostgreSQL 12+ (si no usas Docker)
- npm o yarn

## Instalación y Ejecución

### Opción 1: Con Docker Compose (Recomendado)

#### Windows

```powershell
# Clonar el repositorio
git clone https://github.com/AngeloAste/backend-fallecidos.git
cd backend-fallecidos

# Instalar dependencias
npm install

# Configurar variables de entorno
copy .env.example .env

# Levantar PostgreSQL con Docker Compose
docker-compose up -d

# Esperar a que PostgreSQL esté listo (aproximadamente 10 segundos)
timeout /t 10

# Iniciar la aplicación en modo desarrollo
npm run start:dev
```

#### Linux/Mac

```bash
# Clonar el repositorio
git clone https://github.com/AngeloAste/backend-fallecidos.git
cd backend-fallecidos

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Levantar PostgreSQL con Docker Compose
docker-compose up -d

# Esperar a que PostgreSQL esté listo (aproximadamente 10 segundos)
sleep 10

# Iniciar la aplicación en modo desarrollo
npm run start:dev
```

### Opción 2: Sin Docker (PostgreSQL Local)

#### Windows

```powershell
# Instalar dependencias
npm install

# Configurar variables de entorno
copy .env.example .env
# Editar .env con tus credenciales de PostgreSQL

# Crear la base de datos (desde psql)
psql -U postgres
CREATE DATABASE fallecidos_db;
\q

# Iniciar la aplicación
npm run start:dev
```

#### Linux/Mac

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de PostgreSQL

# Crear la base de datos
createdb fallecidos_db
# O desde psql:
# psql -U postgres
# CREATE DATABASE fallecidos_db;

# Iniciar la aplicación
npm run start:dev
```

## Configuración

Edita el archivo `.env`:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=fallecidos_db
PORT=3000
```

La aplicación usa `synchronize: true` en desarrollo, lo que crea automáticamente las tablas.

## Comandos Docker Compose

### Windows

```powershell
# Levantar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Detener y eliminar volúmenes (elimina datos)
docker-compose down -v

# Verificar estado
docker-compose ps
```

### Linux/Mac

```bash
# Levantar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Detener y eliminar volúmenes (elimina datos)
docker-compose down -v

# Verificar estado
docker-compose ps
```

## Ejecución de la Aplicación

### Windows

```powershell
# Modo desarrollo
npm run start:dev

# Modo producción
npm run build
npm run start:prod
```

### Linux/Mac

```bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm run build
npm run start:prod
```

La API estará disponible en:
- **API**: http://localhost:3000
- **Swagger**: http://localhost:3000/api

## Seed de Datos

Para insertar datos de prueba:

```bash
# Método 1: Llamar al endpoint
curl http://localhost:3000/fallecidos/seed

# Método 2: Desde el navegador
http://localhost:3000/fallecidos/seed
```

Esto insertará 7 registros de ejemplo en la base de datos.

## Endpoints API

### Fallecidos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/fallecidos` | Listar todos con filtros opcionales |
| GET | `/fallecidos/:id` | Obtener por ID |
| POST | `/fallecidos` | Crear nuevo registro |
| PATCH | `/fallecidos/:id` | Actualizar registro |
| DELETE | `/fallecidos/:id` | Eliminar registro |
| GET | `/fallecidos/seed` | Insertar datos de prueba |

### Parámetros de Búsqueda (Query)

```
GET /fallecidos?q=juan&year=2023&region=metropolitana&page=1&pageSize=10
```

- `q` (string): Búsqueda por nombre, RUT o ubicación
- `year` (number): Año de fallecimiento
- `region` (string): Región
- `comuna` (string): Comuna
- `cemetery` (string): Cementerio
- `cause` (string): Causa de muerte (natural, accidente, otro)
- `page` (number): Número de página (default: 1)
- `pageSize` (number): Resultados por página (default: 10)

### Ejemplo de Request

**Crear un fallecido:**
```bash
POST /fallecidos
Content-Type: application/json

{
  "name": "Juan Pérez González",
  "rut": "12.345.678-9",
  "birthYear": 1950,
  "deathYear": 2023,
  "region": "metropolitana",
  "comuna": "santiago",
  "location": "Cementerio General",
  "cemeterySlug": "general",
  "cause": "natural",
  "epitaph": "Siempre en nuestros corazones"
}
```

**Respuesta:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Juan Pérez González",
  "rut": "12.345.678-9",
  "birthYear": 1950,
  "deathYear": 2023,
  "region": "metropolitana",
  "comuna": "santiago",
  "location": "Cementerio General",
  "cemeterySlug": "general",
  "cause": "natural",
  "epitaph": "Siempre en nuestros corazones",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Buscar fallecidos:**
```bash
GET /fallecidos?q=juan&year=2023&page=1&pageSize=10
```

**Respuesta:**
```json
{
  "items": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Juan Pérez González",
      "rut": "12.345.678-9",
      "birthYear": 1950,
      "deathYear": 2023,
      "region": "metropolitana",
      "comuna": "santiago",
      "location": "Cementerio General",
      "cemeterySlug": "general",
      "cause": "natural",
      "epitaph": "Siempre en nuestros corazones",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "total": 1,
  "page": 1,
  "pageSize": 10
}
```

## Estructura del Proyecto

```
backend-fallecidos/
├── src/
│   ├── fallecidos/
│   │   ├── dto/
│   │   │   ├── create-fallecido.dto.ts
│   │   │   └── update-fallecido.dto.ts
│   │   ├── entities/
│   │   │   └── fallecido.entity.ts
│   │   ├── fallecidos.controller.ts
│   │   ├── fallecidos.service.ts
│   │   └── fallecidos.module.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── test/
├── .env
├── package.json
└── tsconfig.json
```

## Modelo de Datos

### Entidad Fallecido

```typescript
{
  id: string (UUID);
  name: string;
  rut?: string;
  birthYear?: number;
  deathYear: number;
  region?: string;
  comuna?: string;
  location: string;
  cemeterySlug?: string;
  cause?: string;
  epitaph: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## Validaciones

- **name**: Requerido, máx 255 caracteres
- **rut**: Opcional, máx 20 caracteres
- **birthYear**: Opcional, entre 1800 y año actual
- **deathYear**: Requerido, entre 1800 y año actual
- **region**: Opcional, máx 100 caracteres
- **comuna**: Opcional, máx 100 caracteres
- **location**: Requerido, máx 255 caracteres
- **cemeterySlug**: Opcional, máx 100 caracteres
- **cause**: Opcional, máx 100 caracteres
- **epitaph**: Requerido

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Documentación Swagger

Accede a la documentación interactiva en: http://localhost:3000/api

Desde ahí puedes:
- Ver todos los endpoints disponibles
- Probar las APIs directamente
- Ver los esquemas de datos
- Descargar la especificación OpenAPI

## Scripts NPM

```bash
npm run start          # Iniciar aplicación
npm run start:dev      # Modo desarrollo con watch
npm run start:prod     # Modo producción
npm run build          # Compilar TypeScript
npm run lint           # Ejecutar linter
npm run format         # Formatear código con Prettier
npm run test           # Ejecutar tests unitarios
npm run test:e2e       # Ejecutar tests e2e
```

## Seguridad

⚠️ **Importante**:
- Cambiar `synchronize: true` a `false` en producción
- Usar migraciones en lugar de sincronización automática
- Configurar variables de entorno seguras
- Implementar autenticación/autorización según necesidad
- Validar y sanitizar todas las entradas

## Mejoras Futuras

- [ ] Autenticación JWT
- [ ] Rate limiting
- [ ] Caché con Redis
- [ ] Migraciones de base de datos
- [ ] Upload de imágenes
- [ ] Búsqueda full-text
- [ ] Logs estructurados
- [ ] Métricas y monitoring
- [ ] Docker + Docker Compose
- [ ] CI/CD pipeline

## Integración con Frontend

Para conectar con el frontend Next.js en `fallecidos-web`, actualiza el endpoint de API:

```typescript
// En fallecidos-web/app/page.tsx
const res = await fetch(`http://localhost:3000/fallecidos?${sp.toString()}`);
```

## Licencia

Proyecto privado

## Autor

Desarrollado para Angelo
