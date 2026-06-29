import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { RootLayout } from "./layouts/RootLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Toaster } from "./components/ui/sonner";
import { ScrollToTop } from "./components/ScrollToTop";
import { HomePage } from "./pages/customer/HomePage";
import { ProductListingPage } from "./pages/customer/ProductListingPage";
import { ProductDetailPage } from "./pages/customer/ProductDetailPage";
import { CategoriesPage } from "./pages/customer/CategoriesPage";
import { CartPage } from "./pages/customer/CartPage";
import { CheckoutPage } from "./pages/customer/CheckoutPage";
import { OrderConfirmationPage } from "./pages/customer/OrderConfirmationPage";
import { OrderHistoryPage } from "./pages/customer/OrderHistoryPage";
import { ProfilePage } from "./pages/customer/ProfilePage";
import { WishlistPage } from "./pages/customer/WishlistPage";
import { SearchPage } from "./pages/customer/SearchPage";
import { NotificationsPage } from "./pages/customer/NotificationsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { SellerDashboardPage } from "./pages/seller/SellerDashboardPage";
import { SellerProductsPage } from "./pages/seller/SellerProductsPage";
import { SellerProductFormPage } from "./pages/seller/SellerProductFormPage";
import { SellerOrdersPage } from "./pages/seller/SellerOrdersPage";
import { SellerCustomersPage } from "./pages/seller/SellerCustomersPage";
import { SellerAnalyticsPage } from "./pages/seller/SellerAnalyticsPage";
import { SellerSettingsPage } from "./pages/seller/SellerSettingsPage";
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { AdminUsersPage } from "./pages/admin/AdminUsersPage";
import { AdminSellersPage } from "./pages/admin/AdminSellersPage";
import { AdminProductsPage } from "./pages/admin/AdminProductsPage";
import { AdminCategoriesPage } from "./pages/admin/AdminCategoriesPage";
import { AdminOrdersPage } from "./pages/admin/AdminOrdersPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { SignupPage } from "./pages/auth/SignupPage";
const Placeholder = ({ title }) => <div className="flex h-[50vh] items-center justify-center">
    <h1 className="text-2xl font-bold">{title} Page (Coming Soon)</h1>
  </div>;
function App() {
  return <ThemeProvider defaultTheme="system" attribute="class">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductListingPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
            <Route element={<ProtectedRoute allowedRoles={["CUSTOMER", "ADMIN", "SELLER"]} />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/orders" element={<OrderHistoryPage />} />
            </Route>
            <Route path="/about" element={<Placeholder title="About" />} />
            <Route path="/contact" element={<Placeholder title="Contact" />} />
            <Route path="/terms" element={<Placeholder title="Terms" />} />
            <Route path="/privacy" element={<Placeholder title="Privacy" />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
          </Route>
          <Route path="/seller" element={<ProtectedRoute allowedRoles={["SELLER", "ADMIN"]} />}>
            <Route element={<DashboardLayout />}>
              <Route path="dashboard" element={<SellerDashboardPage />} />
              <Route path="products" element={<SellerProductsPage />} />
              <Route path="products/new" element={<SellerProductFormPage />} />
              <Route path="products/edit/:id" element={<SellerProductFormPage />} />
              <Route path="orders" element={<SellerOrdersPage />} />
              <Route path="customers" element={<SellerCustomersPage />} />
              <Route path="analytics" element={<SellerAnalyticsPage />} />
              <Route path="settings" element={<SellerSettingsPage />} />
            </Route>
          </Route>
          <Route path="/admin" element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            <Route element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="sellers" element={<AdminSellersPage />} />
              <Route path="products" element={<AdminProductsPage />} />
              <Route path="categories" element={<AdminCategoriesPage />} />
              <Route path="orders" element={<AdminOrdersPage />} />
            </Route>
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>;
}
export {
  App as default
};
