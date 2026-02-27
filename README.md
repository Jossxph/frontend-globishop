# 🛒 GlobiShop - Frontend

> **E-commerce moderno y completo desarrollado con Angular**

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
| **TailwindCSS** | 4.x | Estilos y diseño responsivo |
| **RxJS** | 7.8.0 | Programación reactiva |
| **SweetAlert2** | 11.x | Alertas y notificaciones |
| **Remix Icon** | Final | Set de iconos vectoriales |

---

## ✨ Características

### Para Usuarios
- 🏠 **Página de inicio** con productos destacados y banners interactivos.
- 🔍 **Catálogo de productos** con filtros avanzados por precio y categoría.
- 🛍️ **Carrito de compras** lateral interactivo y persistente.
- 💳 **Proceso de checkout** seguro con validaciones en tiempo real.
- 👤 **Perfil de usuario** con gestión de favoritos e historial de pedidos.
- 🔐 **Sistema de autenticación** completo (login, registro, verificación, recuperación).
- 🤖 **Chatbot Inteligente**: Asistente virtual capaz de navegar por la app, sugerir productos y gestionar accesos.
- 📱 **Diseño responsivo** optimizado para mobile-first.

### Para Administradores
- 📊 **Dashboard** con métricas clave y estadísticas de ventas.
- 📦 **Gestión de productos**: Control total sobre el inventario (CRUD).
- 📋 **Gestión de pedidos**: Monitoreo y actualización de estados de envío.
- 👥 **Gestión de usuarios**: Control de roles y accesos.
- 🏷️ **Gestión de categorías**: Organización dinámica del catálogo.

### Características Técnicas
- ⚡ **Lazy Loading**: Carga bajo demanda de módulos para optimizar el rendimiento inicial.
- 🔒 **Guards**: Protección robusta de rutas (`authGuard`, `adminGuard`).
- 🔄 **Interceptors**: Manejo centralizado de tokens JWT y errores HTTP.
- 🎨 **Tailwind CSS Utility-First**: Estilizado moderno sin archivos CSS redundantes.
- 📡 **Arquitectura Orientada a Servicios**: Lógica de negocio desacoplada de la UI.

---

## 📁 Estructura del Proyecto

```
frontend-globishop/
│
├── src/
│   ├── app/
│   │   ├── core/                    # Funcionalidades core de la app
│   │   │   ├── guards/              # Protección de rutas
│   │   │   ├── interceptors/        # Interceptores HTTP
│   │   │   └── services/            # Servicios principales (Auth, Cart, Chatbot, etc.)
│   │   │
│   │   ├── features/                # Módulos funcionales (Auth, Shop, Admin, Public)
│   │   │
│   │   ├── shared/                  # Componentes y utilidades compartidas
│   │   │   ├── components/          # Navbar, Footer, Chatbot, Hero, etc.
│   │   │   ├── directives/          # Animaciones y scroll
│   │   │   └── pipes/               # Transformación de datos
│   │   │
│   │   ├── layouts/                 # Layouts (MainLayout, AdminLayout)
│   │   ├── app.component.ts         # Componente raíz
│   │   └── app.routes.ts            # Configuración de rutas
```

---

## 🏗️ Mejoras Recientes

### 🤖 Chatbot V2.0 (GlobiAssist)
- **Navegación Inteligente**: El asistente ahora puede redirigirte a `/products`, `/login` o tu `/profile` mediante órdenes naturales.
- **Detección de Intenciones**: Procesa respuestas del backend para mostrar botones de acción condicionales (ej. "Ir al Login" si se detecta que el usuario no está autenticado).
- **UI Enriquecida**: Soporta indicadores de escritura, sugerencias rápidas ("Quick Questions") y mejores animaciones.

### 🏛️ Refactorización Arquitectónica
- **Centralización de Layout**: Se eliminó la redundancia de componentes globales. Ahora el `Navbar`, `Footer` y `Chatbot` se gestionan únicamente desde el `MainLayout` y `AppComponent`.
- **Desacoplamiento de Estilos**: Migración total a Tailwind CSS, eliminando archivos `.css` por componente para una base de código más limpia y mantenible.
- **Uso de templateUrl**: Se separaron los templates HTML de la lógica TS en componentes clave para mejorar la legibilidad.

----
