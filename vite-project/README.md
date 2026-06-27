# ShoppyGlobe E-Commerce Application

ShoppyGlobe is a premium, modern, responsive React e-commerce application built using **React (Vite)**, **Redux Toolkit**, **React Router v6** (using `createBrowserRouter`), and **Vanilla CSS**.

---

## 🔗 GitHub Repository Link
> **[(https://github.com/roshnikri03/ShoppyGlobe-E-commerce-React-Application)]**  

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version 18+ is recommended).

### Installation
1. Extract the project folder.
2. Open your terminal and navigate to the project directory:
   ```bash
   cd "React_project 2"
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running Locally
To launch the local development server with Vite:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### Building for Production
To compile a production bundle and run build checks:
```bash
npm run build
```

---

## 🛠️ Tech Stack & Features

- **Framework**: React 19 + Vite (Fast HMR, optimized bundling).
- **Routing**: React Router v6 using `createBrowserRouter` for dynamic path resolution, Outlet layouts, and nested router parameters.
- **State Management**: Redux Toolkit for unified global state:
  - `cartSlice`: Manages cart items, additions, subtractions (restricted to min 1), removals, and cart clearance.
  - `searchSlice`: Drives a real-time global filter on the product catalog from the Header component.
- **Data Fetching**: 
  - Custom React Hook `useFetchProducts` inside `src/hooks/useFetchProducts.js` to handle API list queries with loading and error handlers.
  - Dynamic route detail queries on mount for single products inside the `ProductDetail` component.
- **Performance Optimization**:
  - Code-splitting with `React.lazy` and `Suspense` for all top-level routes (Home, Details, Cart, Checkout, 404).
  - Native image lazy-loading (`loading="lazy"`) to limit initial page load weight.
- **Styling**: Pure CSS with custom theme design system (HSL color tokens, dark mode/light mode awareness, mobile-first responsive grid layouts, and glassmorphism cards).

---

## 📂 Project Structure

```
src/
├── assets/          # Static elements/images
├── components/      # Reusable UI elements
│   ├── Header.jsx        # Sticky glassmorphism header, search field, & cart badge
│   ├── Header.css
│   ├── ProductItem.jsx   # Single product card with image lazy loading & Add CTA
│   ├── ProductItem.css
│   ├── ProductList.jsx   # Product grid, loading spinners, & search filters
│   ├── CartItem.jsx      # Cart row with +/- quantities & remove buttons
│   ├── CartItem.css
│   ├── LoadingSpinner.jsx# Suspense / load state spinner
│   └── ErrorDisplay.jsx  # Reusable detailed error UI component
├── hooks/           # Custom React hooks
│   └── useFetchProducts.js # Custom hook fetching from 'https://dummyjson.com/products'
├── pages/           # Page routes (Lazy loaded)
│   ├── Home.jsx          # Landing page layout with Hero section
│   ├── Home.css
│   ├── ProductDetail.jsx # Product detail fetching & reviews/specs display
│   ├── ProductDetail.css
│   ├── Cart.jsx          # Active cart overview & total cost calculation
│   ├── Cart.css
│   ├── Checkout.jsx      # Dummy user info form & redirect confirmation page
│   ├── Checkout.css
│   └── NotFound.jsx      # Dynamic 404 route with path & error logging details
│       └── NotFound.css
├── redux/           # Global state slices
│   ├── store.js          # Root Redux store
│   ├── cartSlice.js      # Cart actions, reducers, and selectors
│   └── searchSlice.js    # Search query reducer & selectors
├── App.jsx          # Shell layout outlet
├── App.css
├── main.jsx         # Router & Redux providers configuration
└── index.css        # Theme stylesheet & layout foundation
```

---

## 💡 Key Design Implementations

1. **Props Validation**: Every reusable component utilizes `PropTypes` to validate input shapes, ensuring runtime stability.
2. **Search Logic**: Product listing reads the Redux search state from the store and filters results case-insensitively across categories, brands, and titles in real time.
3. **Cart Constraints**: Adjusting cart quantities is handled via Redux selectors, validating that item counts never fall below `1`.
4. **Checkout flow**: Order placement triggers an action to clear the cart, displays a success window, and automatically redirects the client home using `useNavigate` after a 2.5s timer.
5. **Technical 404 Detail**: The custom `NotFound` component utilizes React Router's `useRouteError` combined with `useLocation` to print technical routing details on screen.
