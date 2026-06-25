import { useMemo, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api from "../services/axios";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "sonner";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const passwordRules = [
  "At least 8 characters",
  "One uppercase letter",
  "One number or symbol",
];

const signupMessages = {
  "Email is required": "Email address is required.",
  "Please enter a valid Gmail address.": "Please enter a valid Gmail address.",
  "The email domain does not exist or cannot receive mail.":
    "This email address cannot receive mail. Please enter a valid email address.",
  "Email address format is rejected by the mail server.":
    "Please enter a valid email address.",
  "The recipient address was rejected by the mail server relay.":
    "This email address cannot receive mail. Please use another email address.",
  "OTP sent successfully": "OTP sent successfully.",
  "Failed to send OTP due to a server error.":
    "Unable to send OTP right now. Please try again later.",
  "Email already exists": "An account with this email already exists.",
  "This email is already registered": "This email is already registered",
};

const getSignupMessage = (message, fallback) => {
  if (!message) return fallback;
  return signupMessages[message] || message;
};

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
  error,
  registration,
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
        className={`min-h-12 w-full rounded-lg border bg-white px-3.5 text-[#17202a] outline-none transition focus:border-[#1c7c72] focus:shadow-[0_0_0_4px_rgba(28,124,114,0.13)] ${
          error ? "border-[#d64545]" : "border-[#d3dde4]"
        }`}
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? "true" : "false"}
        {...registration}
      />
      {error ? (
        <span className="text-[0.82rem] font-bold text-[#b42318]">
          {error.message}
        </span>
      ) : null}
    </label>
  );
}

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const TimeoutRef = useRef(null);
  const TimetakenRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    control,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      terms: false,
    },
  });
  const password = useWatch({ control, name: "password" }) || "";

  const passwordStrength = useMemo(() => {
    const checks = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[\d\W]/.test(password),
    ];

    return checks.filter(Boolean).length;
  }, [password]);

  const handleregisteration = async (data) => {
    if (loading) return;

    let shouldResetForm = false;
    const email = data.email.trim().toLowerCase();

    TimeoutRef.current = setTimeout(() => {
      TimetakenRef.current = Date.now();
      setLoading(true);
    }, 300);

    try {
      const response = await api.post("email/sendOtp", {
        name: data.name,
        email,
        password: data.password,
      });

      if (
        response.status === 200 &&
        response.data?.message === "OTP sent successfully"
      ) {
        const message = getSignupMessage(
          response.data?.message,
          "OTP sent successfully.",
        );
        toast.success(message, {
          position: "top-center",
        });
        console.log("success response:", response.data);
        sessionStorage.setItem("email", email);
        shouldResetForm = true;
        navigate("/signup/verifyotp", {
          replace: true,
          state: { email },
        });
      } else {
        const message = getSignupMessage(
          response.data?.message,
          "Unable to send OTP. Please try again.",
        );
        setError("email", { type: "server", message });
        toast.error(message, { position: "top-center" });
      }
    } catch (error) {
      console.error("Registration failed:", error);
      if (error.response) {
        const message = getSignupMessage(
          error.response.data?.message,
          error.response.status >= 500
            ? "Unable to send OTP right now. Please try again later."
            : "Please enter a valid email address.",
        );
        setError("email", { type: "server", message });
        toast.error(message, { position: "top-center" });
      } else {
        toast.error("Unable to connect. Please try again.", {
          position: "top-center",
        });
      }
    } finally {
      clearTimeout(TimeoutRef.current);

      if (TimetakenRef.current) {
        const timeTaken = Date.now() - TimetakenRef.current;
        const minimumLoadingTime = 400;

        if (timeTaken < minimumLoadingTime) {
          await new Promise((resolve) =>
            setTimeout(resolve, minimumLoadingTime - timeTaken),
          );
        }
      }
    }
    setLoading(false);
    TimetakenRef.current = null;
    if (shouldResetForm) {
      reset();
    }
  };

  function handleSocialAuth(provider) {
    console.log(`${provider} signup selected`);
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
          <ArrowLeft className="size-4" aria-hidden="true" />
        </Link>

        <div
          className="grid grid-cols-2 gap-1.5 rounded-lg border border-[#dbe4ea] bg-[#f3f7f8] p-1.5"
          aria-label="Authentication mode"
        >
          <Link
            className="grid min-h-[42px] place-items-center rounded-md font-extrabold text-[#52616e] no-underline"
            to="/login"
          >
            Login
          </Link>
          <Link
            className="grid min-h-[42px] place-items-center rounded-md bg-white font-extrabold text-[#132d40] no-underline shadow-[0_8px_20px_rgba(29,56,73,0.1)]"
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
            Create your account
          </h2>
          <p className="m-0 leading-[1.55] text-[#637180]">
            Sign up to save downloads, sync preferences, and continue across
            devices.
          </p>
        </div>

        <div className="grid gap-3">
          <SocialButton
            provider="google"
            label="Sign up with Google"
            onClick={() => handleSocialAuth("Google")}
          />
          <SocialButton
            provider="facebook"
            label="Sign up with Facebook"
            onClick={() => handleSocialAuth("Facebook")}
          />
        </div>

        <div className="my-6 flex items-center gap-3.5 text-sm font-bold text-[#7b8794] before:h-px before:flex-1 before:bg-[#dbe4ea] after:h-px after:flex-1 after:bg-[#dbe4ea]">
          <span>or use email</span>
        </div>

        <form
          className="grid gap-[18px]"
          noValidate
          onSubmit={(event) => {
            void handleSubmit(handleregisteration)(event);
          }}
        >
          <Field
            id="name"
            label="Full name"
            error={errors.name}
            registration={register("name", {
              required: "Full name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            placeholder="Your name"
            autoComplete="name"
          />

          <Field
            id="email"
            label="Email address"
            type="email"
            error={errors.email}
            registration={register("email", {
              required: "Email address is required",
              pattern: {
                value: /^[^\s@]+@gmail\.com$/i,
                message: "Enter a valid Gmail address",
              },
            })}
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
                className={`min-h-12 w-full rounded-lg border bg-white px-3.5 pr-[72px] text-[#17202a] outline-none transition focus:border-[#1c7c72] focus:shadow-[0_0_0_4px_rgba(28,124,114,0.13)] ${
                  errors.password ? "border-[#d64545]" : "border-[#d3dde4]"
                }`}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                autoComplete="new-password"
                aria-invalid={errors.password ? "true" : "false"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  validate: {
                    uppercase: (value) =>
                      /[A-Z]/.test(value) ||
                      "Password needs one uppercase letter",
                    numberOrSymbol: (value) =>
                      /[\d\W]/.test(value) ||
                      "Password needs one number or symbol",
                  },
                })}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 min-h-[34px] min-w-14 -translate-y-1/2 cursor-pointer rounded-md border-0 bg-[#eef7f4] text-[0.86rem] font-black text-[#1c5f58]"
                onClick={() => setShowPassword((current) => !current)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password ? (
              <span className="text-[0.82rem] font-bold text-[#b42318]">
                {errors.password.message}
              </span>
            ) : null}
          </label>

          <div className="grid gap-2" aria-label="Password strength">
            <div className="grid grid-cols-3 gap-1.5">
              <span
                className={`h-1.5 rounded-full ${passwordStrength >= 1 ? "bg-[#ff9f43]" : "bg-[#dbe4ea]"}`}
              />
              <span
                className={`h-1.5 rounded-full ${passwordStrength >= 2 ? "bg-[#ff9f43]" : "bg-[#dbe4ea]"}`}
              />
              <span
                className={`h-1.5 rounded-full ${passwordStrength >= 3 ? "bg-[#ff9f43]" : "bg-[#dbe4ea]"}`}
              />
            </div>
            <p className="m-0 text-[0.86rem] text-[#637180]">
              {passwordRules[passwordStrength - 1] || passwordRules[0]}
            </p>
          </div>

          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <label className="flex items-start gap-2.5 text-[0.92rem] leading-[1.35] text-[#52616e]">
              <input
                className="mt-0 h-[18px] w-[18px] accent-[#1c7c72]"
                type="checkbox"
                aria-invalid={errors.terms ? "true" : "false"}
                {...register("terms", {
                  required: "You must agree before signing up",
                })}
              />
              <span>I agree to the terms and privacy policy</span>
            </label>
            {errors.terms ? (
              <span className="text-[0.82rem] font-bold text-[#b42318]">
                {errors.terms.message}
              </span>
            ) : null}
          </div>

          <button
            className="min-h-[52px] cursor-pointer rounded-lg border-0 bg-[#1c7c72] font-black text-white transition hover:-translate-y-px hover:bg-[#15655d] hover:shadow-[0_12px_28px_rgba(29,56,73,0.14)]"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <p className="mr-2">Registering</p>
                <ThreeDots
                  visible={true}
                  height="40"
                  width="40"
                  color="#4fa94d"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            ) : (
              "Signup"
            )}
          </button>
        </form>

        <p className="mt-[22px] text-center text-[#637180]">
          Already have an account?
          <Link
            className="ml-1.5 font-black text-[#1c7c72] no-underline"
            to="/login"
          >
            Login
          </Link>
        </p>
      </section>
    </main>
  );
}
