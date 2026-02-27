# 🛒 GlobiShop - Frontend

> **E-commerce moderno y completo desarrollado con Angular 20**

GlobiShop es una plataforma de comercio electrónico full-stack con un frontend robusto construido en Angular. Ofrece una experiencia de compra completa con gestión de productos, carrito de compras, checkout, autenticación de usuarios y un panel de administración completo.

---

## 📋 Tabla de Contenidos

- [Tecnologías](#-tecnologías)
- [Características](#-características)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Rutas de la Aplicación](#-rutas-de-la-aplicación)
- [Instalación](#-instalación)
- [Scripts Disponibles](#-scripts-disponibles)
- [Arquitectura](#-arquitectura)

---

## 🚀 Tecnologías

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **Angular** | 20.1.0 | Framework principal |
| **TypeScript** | 5.8.2 | Lenguaje de programación |
| **TailwindCSS** | 4.1.18 | Estilos y diseño responsivo |
| **RxJS** | 7.8.0 | Programación reactiva |
| **SweetAlert2** | 11.26.4 | Alertas y notificaciones |
| **PostCSS** | 8.5.6 | Procesamiento de CSS |

---

## ✨ Características

### Para Usuarios
- 🏠 **Página de inicio** con productos destacados
- 🔍 **Catálogo de productos** con filtros y búsqueda
- 🛍️ **Carrito de compras** lateral interactivo
- 💳 **Proceso de checkout** seguro
- 👤 **Perfil de usuario** con historial de pedidos
- 🔐 **Sistema de autenticación** completo (login, registro, verificación, recuperación)
- 💬 **Chatbot** de asistencia
- 📱 **Diseño responsivo** para todos los dispositivos

### Para Administradores
- 📊 **Dashboard** con estadísticas y métricas
- 📦 **Gestión de productos** (CRUD completo)
- 📋 **Gestión de pedidos** y estados
- 👥 **Gestión de usuarios** y roles
- 🏷️ **Gestión de categorías**

### Características Técnicas
- ⚡ **Lazy Loading** de módulos para mejor rendimiento
- 🔒 **Guards** para protección de rutas
- 🔄 **Interceptors** para manejo de autenticación y errores
- 🎨 **Tema oscuro/claro** configurable
- 📡 **Servicios centralizados** para lógica de negocio
- 🧩 **Componentes reutilizables**

---

## 📁 Estructura del Proyecto

```
frontend-globishop/
│
├── src/
│   ├── app/
│   │   ├── core/                    # Funcionalidades core de la app
│   │   │   ├── guards/              # Protección de rutas
│   │   │   │   ├── auth.guard.ts    # Guard para rutas autenticadas
│   │   │   │   └── admin.guard.ts   # Guard para rutas de admin
│   │   │   │
│   │   │   ├── interceptors/        # Interceptores HTTP
│   │   │   │   ├── auth.interceptor.ts    # Añade token a requests
│   │   │   │   └── error.interceptor.ts   # Manejo global de errores
│   │   │   │
│   │   │   └── services/            # Servicios principales
│   │   │       ├── auth.service.ts       # Autenticación
│   │   │       ├── cart.service.ts       # Carrito de compras
│   │   │       ├── product.service.ts    # Productos
│   │   │       ├── order.service.ts      # Pedidos
│   │   │       ├── profile.service.ts    # Perfil de usuario
│   │   │       ├── admin.service.ts      # Operaciones admin
│   │   │       ├── category.service.ts   # Categorías
│   │   │       ├── chatbot.service.ts    # Chatbot
│   │   │       └── theme.service.ts      # Temas (dark/light)
│   │   │
│   │   ├── features/                # Módulos funcionales
│   │   │   │
│   │   │   ├── auth/                # Autenticación
│   │   │   │   ├── login/           # Inicio de sesión
│   │   │   │   ├── register/        # Registro de usuarios
│   │   │   │   ├── verify/          # Verificación de email
│   │   │   │   ├── recover-password/  # Recuperación de contraseña
│   │   │   │   └── auth.routes.ts   # Rutas de autenticación
│   │   │   │
│   │   │   ├── shop/                # Tienda
│   │   │   │   ├── product-list/    # Listado de productos
│   │   │   │   └── product-detail/  # Detalle de producto
│   │   │   │
│   │   │   ├── cart/                # Carrito de compras
│   │   │   ├── checkout/            # Proceso de pago
│   │   │   ├── profile/             # Perfil de usuario
│   │   │   │
│   │   │   ├── admin/               # Panel de administración
│   │   │   │   ├── admin-layout/         # Layout del admin
│   │   │   │   ├── admin-dashboard/      # Dashboard principal
│   │   │   │   ├── admin-products/       # CRUD productos
│   │   │   │   ├── admin-orders/         # Gestión de pedidos
│   │   │   │   ├── admin-users/          # Gestión de usuarios
│   │   │   │   ├── admin-categories/     # Gestión de categorías
│   │   │   │   └── admin.routes.ts       # Rutas del admin
│   │   │   │
│   │   │   └── public/              # Páginas públicas
│   │   │       ├── home/            # Página de inicio
│   │   │       ├── about/           # Acerca de
│   │   │       ├── help/            # Ayuda
│   │   │       ├── blog/            # Blog
│   │   │       ├── work/            # Trabaja con nosotros
│   │   │       ├── shipping/        # Info de envíos
│   │   │       ├── returns/         # Devoluciones
│   │   │       ├── thank-you/       # Confirmación de compra
│   │   │       ├── not-found/       # Página 404
│   │   │       └── legal/           # Páginas legales
│   │   │           ├── terms/       # Términos y condiciones
│   │   │           ├── privacy/     # Política de privacidad
│   │   │           ├── promotions/  # Términos de promociones
│   │   │           └── accessibility/  # Accesibilidad
│   │   │
│   │   ├── shared/                  # Componentes compartidos
│   │   │   ├── components/
│   │   │   │   ├── navbar/          # Barra de navegación
│   │   │   │   ├── footer/          # Pie de página
│   │   │   │   ├── cart-sidebar/    # Sidebar del carrito
│   │   │   │   ├── chatbot/         # Widget de chatbot
│   │   │   │   ├── hero/            # Sección hero
│   │   │   │   └── page-header/     # Encabezado de página
│   │   │   │
│   │   │   ├── directives/          # Directivas personalizadas
│   │   │   └── pipes/               # Pipes personalizados
│   │   │
│   │   ├── app.component.ts         # Componente raíz
│   │   ├── app.routes.ts            # Configuración de rutas
│   │   └── app.config.ts            # Configuración de la app
│   │
│   ├── index.html                   # HTML principal
│   ├── main.ts                      # Punto de entrada
│   └── styles.css                   # Estilos globales
│
├── public/                          # Archivos estáticos
├── angular.json                     # Configuración de Angular
├── package.json                     # Dependencias
├── tsconfig.json                    # Configuración TypeScript
└── tailwind.config.js               # Configuración Tailwind
```

---

## 🗺️ Rutas de la Aplicación

### Rutas Públicas
| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | Redirect → `/home` | Redirección a inicio |
| `/home` | `HomeComponent` | Página principal |
| `/products` | `ProductListComponent` | Catálogo de productos |
| `/products/:id` | `ProductDetailComponent` | Detalle de producto |
| `/about` | `AboutComponent` | Acerca de nosotros |
| `/help` | `HelpComponent` | Centro de ayuda |
| `/blog` | `BlogComponent` | Blog |
| `/work-with-us` | `WorkComponent` | Trabaja con nosotros |
| `/shipping-info` | `ShippingComponent` | Información de envíos |
| `/returns` | `ReturnsComponent` | Política de devoluciones |
| `/legal/terms` | `TermsComponent` | Términos y condiciones |
| `/legal/privacy` | `PrivacyComponent` | Política de privacidad |
| `/legal/promotions` | `PromotionsComponent` | Términos de promociones |
| `/legal/accessibility` | `AccessibilityComponent` | Accesibilidad |
| `/checkout/success` | `ThankYouComponent` | Confirmación de compra |

### Rutas de Autenticación (`/auth/*`)
| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/auth/login` | `LoginComponent` | Inicio de sesión |
| `/auth/register` | `RegisterComponent` | Registro de usuario |
| `/auth/verify` | `VerifyComponent` | Verificación de email |
| `/auth/recover-password` | `RecoverPasswordComponent` | Recuperar contraseña |

### Rutas Protegidas (requieren autenticación)
| Ruta | Componente | Guard | Descripción |
|------|-----------|-------|-------------|
| `/profile` | `ProfileComponent` | `authGuard` | Perfil de usuario |
| `/checkout` | `CheckoutComponent` | `authGuard` | Proceso de pago |

### Rutas de Administración (`/admin/*`)
**Requieren rol de administrador** - Protegidas por `adminGuard`

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/admin` | Redirect → `/admin/dashboard` | Redirección al dashboard |
| `/admin/dashboard` | `AdminDashboardComponent` | Panel de control |
| `/admin/products` | `AdminProductsComponent` | Gestión de productos |
| `/admin/orders` | `AdminOrdersComponent` | Gestión de pedidos |
| `/admin/users` | `AdminUsersComponent` | Gestión de usuarios |
| `/admin/categories` | `AdminCategoriesComponent` | Gestión de categorías |

### Ruta 404
| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/**` | `NotFoundComponent` | Página no encontrada |

---

## 🔧 Instalación

### Prerrequisitos
- Node.js (v18 o superior)
- npm (v9 o superior)
- Angular CLI (v20 o superior)

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/Jossxph/frontend-globishop.git
cd frontend-globishop
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
Crear archivo de configuración para la API backend (si aplica)

4. **Iniciar servidor de desarrollo**
```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200`

---

## 📜 Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| **Desarrollo** | `npm start` | Inicia servidor de desarrollo |
| **Build** | `npm run build` | Compila para producción |
| **Watch** | `npm run watch` | Compila en modo desarrollo con watch |
| **Test** | `npm test` | Ejecuta pruebas unitarias |

---

## 🏗️ Arquitectura

### Patrón de Diseño
El proyecto sigue una **arquitectura modular** basada en las mejores prácticas de Angular:

- **Core Module**: Servicios singleton, guards e interceptors
- **Feature Modules**: Módulos funcionales con lazy loading
- **Shared Module**: Componentes, directivas y pipes reutilizables

### Flujo de Datos
```
Componente → Service → HTTP Interceptor → Backend API
                ↓
            RxJS Observable
                ↓
        Actualización de UI
```

### Guards y Seguridad

#### `authGuard`
- Protege rutas que requieren autenticación
- Redirige a `/auth/login` si no hay sesión activa
- Usado en: `/profile`, `/checkout`

#### `adminGuard`
- Protege rutas del panel de administración
- Verifica rol de administrador
- Redirige a `/home` si no tiene permisos
- Usado en: todas las rutas `/admin/*`

### Interceptors

#### `authInterceptor`
- Añade automáticamente el token JWT a todas las peticiones HTTP
- Maneja la renovación de tokens

#### `errorInterceptor`
- Captura y maneja errores HTTP globalmente
- Muestra notificaciones al usuario
- Gestiona errores 401 (no autorizado) y 403 (prohibido)

---

## 📦 Servicios Principales

| Servicio | Responsabilidad |
|----------|----------------|
| `AuthService` | Autenticación, login, registro, logout |
| `CartService` | Gestión del carrito de compras |
| `ProductService` | CRUD de productos, búsqueda, filtros |
| `OrderService` | Gestión de pedidos |
| `ProfileService` | Datos del perfil de usuario |
| `AdminService` | Operaciones administrativas |
| `CategoryService` | Gestión de categorías |
| `ChatbotService` | Asistente virtual |
| `ThemeService` | Cambio de tema claro/oscuro |

---

## 🎨 Estilos y Diseño

- **TailwindCSS 4.x** para estilos utility-first
- **Diseño responsivo** mobile-first
- **Tema oscuro/claro** configurable
- **Animaciones suaves** con CSS transitions
- **Componentes accesibles** (WCAG 2.1)

---

## 📄 Licencia

Este proyecto es parte de un trabajo académico.

---

## 👨‍💻 Autor

**Jossxph**
- GitHub: [@Jossxph](https://github.com/Jossxph)

---
