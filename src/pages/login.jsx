import { useState } from "react";
import { Link } from "react-router-dom";

function SocialButton({ provider, label, onClick }) {
  const markColor = provider === "google" ? "bg-[#ea4335]" : "bg-[#1877f2]";

  return (
    <button
      className="flex min-h-12 cursor-pointer items-center justify-center gap-2.5 rounded-lg border border-[#d8e1e7] bg-white font-extrabold text-[#243442] transition hover:-translate-y-px hover:shadow-[0_12px_28px_rgba(29,56,73,0.14)]"
      type="button"
      onClick={onClick}
    >
      <span
        className={`grid h-[26px] w-[26px] place-items-center rounded-full font-black text-white ${markColor}`}
        aria-hidden="true"
      >
        {provider === "google" ? "G" : "f"}
      </span>
      <span>{label}</span>
    </button>
  );
}

function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
}) {
  return (
    <label
      className="grid gap-2 text-[0.94rem] font-extrabold text-[#263746]"
      htmlFor={id}
    >
      <span>{label}</span>
      <input
        className="min-h-12 w-full rounded-lg border border-[#d3dde4] bg-white px-3.5 text-[#17202a] outline-none transition focus:border-[#1c7c72] focus:shadow-[0_0_0_4px_rgba(28,124,114,0.13)]"
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
      />
    </label>
  );
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: true,
  });

  function updateField(field, value) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("login form submitted", formData);
  }

  function handleSocialAuth(provider) {
    console.log(`${provider} login selected`);
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[linear-gradient(135deg,#f7fbff_0%,#eef7f4_50%,#fff5ec_100%)] px-4 py-10 font-sans text-[#17202a]">
      <section
        className="w-full max-w-[460px] rounded-lg border border-[#17202a14] bg-white/95 p-6 shadow-[0_24px_70px_rgba(24,43,58,0.16)] sm:p-8"
        aria-labelledby="auth-title"
      >
        <Link
          className="mb-6 inline-flex items-center gap-2 text-sm font-black text-[#1c7c72] no-underline"
          to="/"
        >
          Back to home
        </Link>

        <div
          className="grid grid-cols-2 gap-1.5 rounded-lg border border-[#dbe4ea] bg-[#f3f7f8] p-1.5"
          aria-label="Authentication mode"
        >
          <Link
            className="grid min-h-[42px] place-items-center rounded-md bg-white font-extrabold text-[#132d40] no-underline shadow-[0_8px_20px_rgba(29,56,73,0.1)]"
            to="/login"
          >
            Login
          </Link>
          <Link
            className="grid min-h-[42px] place-items-center rounded-md font-extrabold text-[#52616e] no-underline"
            to="/signup"
          >
            Sign up
          </Link>
        </div>

        <div className="mb-6 mt-7">
          <h2
            className="mb-2.5 text-[2rem] leading-[1.1] tracking-normal text-[#132d40]"
            id="auth-title"
          >
            Welcome back
          </h2>
          <p className="m-0 leading-[1.55] text-[#637180]">
            Log in to manage saved downloads and keep your workspace in sync.
          </p>
        </div>

        <div className="grid gap-3">
          <SocialButton
            provider="google"
            label="Login with Google"
            onClick={() => handleSocialAuth("Google")}
          />
          <SocialButton
            provider="facebook"
            label="Login with Facebook"
            onClick={() => handleSocialAuth("Facebook")}
          />
        </div>

        <div className="my-6 flex items-center gap-3.5 text-sm font-bold text-[#7b8794] before:h-px before:flex-1 before:bg-[#dbe4ea] after:h-px after:flex-1 after:bg-[#dbe4ea]">
          <span>or use email</span>
        </div>

        <form className="grid gap-[18px]" onSubmit={handleSubmit}>
          <Field
            id="email"
            label="Email address"
            type="email"
            value={formData.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />

          <label
            className="grid gap-2 text-[0.94rem] font-extrabold text-[#263746]"
            htmlFor="password"
          >
            <span>Password</span>
            <div className="relative">
              <input
                className="min-h-12 w-full rounded-lg border border-[#d3dde4] bg-white px-3.5 pr-[72px] text-[#17202a] outline-none transition focus:border-[#1c7c72] focus:shadow-[0_0_0_4px_rgba(28,124,114,0.13)]"
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(event) =>
                  updateField("password", event.target.value)
                }
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 min-h-[34px] min-w-14 -translate-y-1/2 cursor-pointer rounded-md border-0 bg-[#eef7f4] text-[0.86rem] font-black text-[#1c5f58]"
                onClick={() => setShowPassword((current) => !current)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <label className="flex items-start gap-2.5 text-[0.92rem] leading-[1.35] text-[#52616e]">
              <input
                className="mt-0 h-[18px] w-[18px] accent-[#1c7c72]"
                type="checkbox"
                checked={formData.remember}
                onChange={(event) =>
                  updateField("remember", event.target.checked)
                }
              />
              <span>Remember me</span>
            </label>

            <button
              className="cursor-pointer whitespace-nowrap border-0 bg-transparent font-black text-[#1c7c72]"
              type="button"
            >
              Forgot password?
            </button>
          </div>

          <button
            className="min-h-[52px] cursor-pointer rounded-lg border-0 bg-[#1c7c72] font-black text-white transition hover:-translate-y-px hover:bg-[#15655d] hover:shadow-[0_12px_28px_rgba(29,56,73,0.14)]"
            type="submit"
          >
            Login
          </button>
        </form>

        <p className="mt-[22px] text-center text-[#637180]">
          New here?
          <Link
            className="ml-1.5 font-black text-[#1c7c72] no-underline"
            to="/signup"
          >
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
}
