
import { Navigate, Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function FullPageSpinner() {
  return (
    <div className="grid min-h-screen place-items-center bg-white text-brand">
      <Loader2 className="animate-spin" size={28} />
    </div>
  );
}

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <FullPageSpinner />;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export function GuestRoute() {
  const { user, loading } = useAuth();

  if (loading) return <FullPageSpinner />;

  return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
}
