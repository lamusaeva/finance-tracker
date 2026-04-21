import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../lib/supabase";
import { useModal } from "../../hooks/useModal";

function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const modal = useModal();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between px-7 py-3">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-[#202026] rounded-lg flex items-center justify-center text-[#c8f135] text-xs font-bold">
          ₼
        </div>
        <span className="text-white font-semibold text-sm">Xərclər</span>
      </div>

      <div className="flex items-center gap-1 bg-[#202026] rounded-full px-1.5 py-1.5">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-5 py-2 rounded-full text-sm transition-all ${isActive ? "bg-[#26262c] text-white font-medium" : "text-[#6b7280] hover:text-white"}`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            `px-5 py-2 rounded-full text-sm transition-all ${isActive ? "bg-[#26262c] text-white font-medium" : "text-[#6b7280] hover:text-white"}`
          }
        >
          Əməliyyatlar
        </NavLink>
      </div>

      <div className="relative flex items-center gap-3">
        <button
          onClick={() => modal.openModal()}
          className="flex items-center gap-2 bg-[#c8f135] text-[#13131a] text-sm font-semibold px-4 py-2 rounded-full hover:opacity-90 transition-opacity cursor-pointer"
        >
          <span className="text-lg leading-none">+</span>
          Əlavə et
        </button>
        <div
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-9 h-9 bg-[#202026] rounded-full flex items-center justify-center text-white text-sm font-semibold cursor-pointer hover:bg-[#26262c] transition-all"
        >
          {user?.email?.[0].toUpperCase()}
        </div>
        {menuOpen && (
          <div className="absolute right-0 top-11 bg-[#1c1c22] border border-[#2c2c32] rounded-xl py-1 w-44 z-50">
            <div className="px-4 py-2 text-xs text-[#6b7280] border-b border-[#2c2c32] truncate">
              {user?.email}
            </div>
            <div
              onClick={handleLogout}
              className="px-4 py-2.5 text-sm text-[#6b7280] hover:text-white hover:border-[#2c2c32] cursor-pointer transition-all rounded-b-xl"
            >
              Çıxış
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
