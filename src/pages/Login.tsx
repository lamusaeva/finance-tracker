import { useForm } from "react-hook-form";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

type LoginForm = {
  email: string;
  password: string;
};

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) console.log(error.message);
    else navigate("/");
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center relative overflow-hidden">
      <div className="absolute w-80 h-80 bg-purple rounded-full blur-[120px] -top-20 -left-20 animate-pulse" style={{ opacity: 0.15 }} />
<div className="absolute w-64 h-64 bg-accent rounded-full blur-[120px] -bottom-16 -right-16 animate-pulse" style={{ opacity: 0.08 }} />
      <div className="relative z-10 bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-8 w-full max-w-sm">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-7 h-7 bg-[#242424] rounded-lg flex items-center justify-center text-accent text-xs font-bold">
            ₼
          </div>
          <span className="text-white font-semibold text-sm">Xərclər</span>
        </div>

        <h1 className="text-white text-xl font-semibold mb-1">Xoş gəldin 👋</h1>
        <p className="text-[#666] text-sm mb-7">Hesabına daxil ol</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="text-[#666] text-xs uppercase tracking-wider mb-1.5 block">
              Email
            </label>
            <input
              className="w-full bg-[#242424] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-accent transition-colors placeholder:text-[#666]"
              type="text"
              placeholder="ad@email.com"
              {...register("email", {
                required: "Email mütləqdir",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Düzgün email deyil",
                },
              })}
            />
            {errors.email && (
              <p className="text-[#f87171] text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-[#666] text-xs uppercase tracking-wider mb-1.5 block">
              Şifrə
            </label>
            <input
              className="w-full bg-[#242424] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-accent transition-colors placeholder:text-[#666]"
              type="password"
              placeholder="••••••••"
              {...register("password", { required: "Şifrə mütləqdir" })}
            />
            {errors.password && (
              <p className="text-[#f87171] text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-accent text-dark-bg font-semibold rounded-xl hover:opacity-90 transition-opacity mt-2"
            style={{ boxShadow: "0 0 24px rgba(197,241,53,0.3)" }}
          >
            Daxil ol
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
