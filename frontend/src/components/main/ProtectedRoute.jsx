import { useUser } from "@/hooks/useUser";
import Loader from "@/components/main/Loader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (isLoading) return;

    if (!user || !user.role?.includes("admin")) {
      navigate("/", { replace: true });
    } else {
      setChecking(false);
    }
  }, [user, isLoading, navigate]);

  if (isLoading || checking) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader className="w-10 h-10" />
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;