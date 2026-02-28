# GlobisHop Frontend - AI Coding Agent Guidelines

## Project Overview
**FrontendGlobishop** is an **Angular 20 e-commerce frontend** with standalone components, lazy-loaded feature modules, and modern state management using Signals. The app serves as a complete shopping platform with public catalog, user authentication, admin dashboard, and cart management.

### Tech Stack
- **Framework**: Angular 20.1 (standalone components, no NgModules)
- **Styling**: Tailwind CSS 4.1 + PostCSS
- **State Management**: Angular Signals + RxJS BehaviorSubjects
- **Testing**: Jasmine 5.8 + Karma
- **HTTP**: @angular/common/http with functional interceptors
- **Routing**: Feature-based lazy loading with function-based guards

---

## Architecture Patterns

### 1. **Standalone Component Structure**
All components are standalone with inline templates. Example pattern from `app.component.ts`:
```typescript
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CartSidebarComponent],
  template: `<!-- inline template -->`
})
```
**Key Point**: Don't add `declarations` arrays or create traditional NgModules.

### 2. **Feature-Based Routing**
Routes are organized by feature with lazy loading in `app.routes.ts`:
- **Public routes**: home, products, about, legal/* (no auth required)
- **Protected routes**: checkout, profile (guarded by `authGuard`)
- **Admin routes**: /admin/* (guarded by `adminGuard`) - lazy-loaded from `features/admin/admin.routes.ts`
- **Auth routes**: /auth/* - lazy-loaded from `features/auth/auth.routes.ts`

Implement new routes by adding to the appropriate feature `.routes.ts` file, then import in `app.routes.ts`.

### 3. **Service Architecture**
All services in `core/services/` use `providedIn: 'root'` (singleton pattern):
- **AuthService**: JWT authentication, localStorage persistence with `BehaviorSubject<currentUser>`
- **CartService**: Uses **Signals** for reactivity - `signal<any[]>()`, `computed()` for total/count
- **ProductService**: HTTP calls to `/api/public/products`
- **CategoryService, OrderService, AdminService**: Similar patterns with API endpoints

**Signals vs BehaviorSubjects**: 
- Use **Signals** for new state (CartService model)
- BehaviorSubjects used in AuthService for backward compatibility
- Convert with `toObservable()` for template async pipe usage

### 4. **Guards & Interceptors**
- **Function-based guards** in `core/guards/`:
  - `authGuard`: Redirects to login with SweetAlert2 toast if not authenticated
  - `adminGuard`: Similar pattern but checks admin role
- **HTTP Interceptors** in `core/interceptors/`:
  - `authInterceptor`: Clones requests and adds `Authorization: Bearer ${token}` header
  - `errorInterceptor`: Global error handling

**Registration**: Guards and interceptors are injected in `app.config.ts` using functional API.

---

## Development Workflows

### **Start Development Server**
```bash
npm start
# Runs angular serve on http://localhost:4200
```

### **Run Tests**
```bash
npm test
# Launches Karma with Chrome launcher, watches for changes
# All `*.spec.ts` files execute automatically
```

### **Build for Production**
```bash
npm build
# Creates optimized build with hash names and budgets (500kB initial, 4kB per component style)
```

### **Key Commands**
- `npm run watch`: Build in watch mode for development
- Component generation: Use Angular CLI via VS Code terminal

---

## Critical Patterns & Conventions

### **1. State Persistence**
AuthService uses localStorage pattern - always restore user on app bootstrap:
```typescript
private currentUserSubject = new BehaviorSubject<any>(
  JSON.parse(localStorage.getItem('user') || 'null')
);
```
Same for CartService loading cart items on init.

### **2. API Endpoints**
Backend runs on `http://localhost:8080/api`:
- **Public products**: `GET /api/public/products`, `/api/public/products/:id`
- **Auth**: `POST /api/auth/login`, `/api/auth/register`
- **Reviews**: `GET /api/reviews/product/:id`, `POST /api/reviews/create`
- **Admin**: Protected by `adminGuard`

### **3. Error Handling**
- Guard redirects use SweetAlert2 toasts (example: `toast: true, position: 'top-end'`)
- Interceptor handles HTTP errors globally
- Parse JSON safely: catch blocks and logout on corrupt data (see `auth.service.ts` getUser())

### **4. Component Styling**
- **Tailwind only** - no component CSS unless necessary
- CSS files exist only when component-scoped styles needed (e.g., `admin-layout.css`)
- Template classes use Tailwind utility-first: `class="bg-card border border-theme rounded-2xl"`
- Custom animations: `animate-fade-in`, `animate-pulse` (defined in global `styles.css`)

### **5. Testing Structure**
Pattern from `navbar.spec.ts`:
```typescript
describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar]  // Import standalone component
    }).compileComponents();
    
    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

### **6. Reactive Patterns**
**For RxJS**:
- Use `.pipe(tap(), map())` for side effects and transformations
- Use `.subscribe()` in components only when necessary (prefer async pipe in templates)

**For Signals**:
- Use `.signal()` for writable state
- Use `.computed()` for derived values (CartService: `total = computed(...)`)
- Convert to observable with `.toObservable()` for template use

---

## File Organization Reference

```
src/app/
├── core/
│   ├──services/         # All API communication (*.service.ts)
│   ├──guards/          # Function-based route guards
│   └──interceptors/    # HTTP interceptors (auth token, errors)
├── features/
│   ├──admin/          # Admin dashboard - lazy-loaded
│   ├──auth/           # Login/Register - lazy-loaded
│   ├──shop/           # Product browsing
│   ├──cart/           # Shopping cart
│   ├──checkout/       # Payment flow
│   ├──profile/        # User profile
│   └──public/         # Static pages (home, about, blog, legal, etc.)
├── shared/
│   ├──components/     # Reusable UI (navbar, footer, cart-sidebar, chatbot)
│   ├──directives/     # Custom directives (fade-on-scroll)
│   └──pipes/          # Custom pipes (nl2br for line breaks)
├── app.routes.ts      # Root routing configuration
├── app.config.ts      # Root configuration with guards & interceptors
└── app.component.ts   # Root component (shows/hides chatbot based on route)
```

---

## Common Tasks & Patterns

### **Add a New Page**
1. Create component in appropriate feature folder
2. Add route to feature `.routes.ts`
3. Import in `app.routes.ts` if top-level, or feature routes if nested
4. Use navbar/footer shared components

### **Add API Call**
1. Create service method in `core/services/` with RxJS operators
2. Call from component and handle with `.subscribe()` or async pipe
3. No explicit error handling needed (global `errorInterceptor` handles it)

### **Add Authentication to Route**
1. Use existing `authGuard` in route definition (already in place for checkout, profile)
2. For admin routes, use `adminGuard`
3. Guards return `true`/`false` and handle redirects

### **Manage Cart & Checkout**
- CartService provides `.addToCart()`, `.removeFromCart()`, `.cartItems()` signal
- Cart persists to localStorage automatically
- Total/count are computed properties - use in templates directly

### **Styling New Components**
1. Add Tailwind classes directly to template
2. Use existing Tailwind tokens: `bg-main`, `bg-card`, `text-primary`, `border-theme`
3. If component-specific CSS needed, create `.css` file and import

---

## Debugging Tips

1. **Auth issues**: Check localStorage for `token` and `user` keys in DevTools
2. **Routing**: Verify guards return `true`/`false` and routes in feature `.routes.ts` files
3. **API calls**: Network tab shows requests with `Authorization: Bearer` header if interceptor working
4. **Signals**: Use `console.log(cartService.cartItems())` to read signal value
5. **Tests**: Ensure newly added services/components have matching `.spec.ts` files

---

## Do's and Don'ts

**✅ DO:**
- Use standalone components everywhere
- Create lazy-loaded feature routes
- Persist auth token/user in localStorage with error handling
- Use Tailwind for styling
- Write Jasmine specs for new services/components
- Use `inject()` for dependency injection in services

**❌ DON'T:**
- Create NgModules or use `declarations` arrays
- Mix traditional and standalone components
- Store sensitive data in localStorage (JWT is OK, passwords are not)
- Add external CSS frameworks beyond Tailwind
- Skip `.spec.ts` files for testable code
- Use template variables for complex logic (calculate in component class)

---

## External API Integration Points

- **Backend**: `http://localhost:8080/api/` (authentication, products, orders, admin)
- **Email verification**: Part of auth flow (register → verify email → login)
- **Payments**: Integrated via checkout component
- **Chatbot**: Separate component, `showChatbot` visibility controlled by AppComponent

---

## Questions & Iteration

Review the sections above for clarity. The following areas may need clarification:
- Specific API endpoint documentation (request/response schemas)
- Admin dashboard features and permissions model
- Payment gateway integration details
- Chatbot implementation specifics
