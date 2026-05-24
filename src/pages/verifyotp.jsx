import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MailCheck, RefreshCw, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const optregex = /^[0-9]+$/;

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const isComplete = useMemo(() => otp.length === 4, [otp]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!isComplete) {
      setMessage("Enter the 4 digit code to continue.");
      return;
    }

    setMessage("OTP ready to verify. Connect this to your API next.");
  }

  function handleResend() {
    setOtp("");
    setMessage("A fresh code has been sent to your email.");
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[linear-gradient(135deg,#f7fbff_0%,#eef7f4_50%,#fff5ec_100%)] px-4 py-10 font-sans text-[#17202a]">
      <section
        className="w-full max-w-[460px] rounded-lg border border-[#17202a14] bg-white/95 p-6 shadow-[0_24px_70px_rgba(24,43,58,0.16)] sm:p-8"
        aria-labelledby="otp-title"
      >
        <Link
          className="mb-7 inline-flex items-center gap-2 text-sm font-black text-[#1c7c72] no-underline transition hover:text-[#15655d]"
          to="/signup"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to sign up
        </Link>

        <div className="mb-6 flex items-start gap-4">
          <div className="grid size-13 shrink-0 place-items-center rounded-lg bg-[#eef7f4] text-[#1c7c72] shadow-[inset_0_0_0_1px_rgba(28,124,114,0.12)]">
            <MailCheck className="size-7" aria-hidden="true" />
          </div>
          <div>
            <p className="mb-2 text-sm font-black uppercase tracking-normal text-[#ff9f43]">
              Email verification
            </p>
            <h1
              className="text-[2rem] leading-[1.1] tracking-normal text-[#132d40]"
              id="otp-title"
            >
              Check your inbox
            </h1>
          </div>
        </div>

        <p className="mb-7 leading-[1.55] text-[#637180]">
          Enter the 4 digit code we sent to your email address to finish setting
          up your account.
        </p>

        <form className="grid gap-6" onSubmit={handleSubmit}>
          <div className="grid justify-items-center gap-3">
            <InputOTP
              maxLength={4}
              pattern={optregex}
              value={otp}
              onChange={setOtp}
              containerClassName="justify-center"
              aria-label="One-time password"
            >
              <InputOTPGroup className="gap-2 rounded-none">
                <InputOTPSlot
                  index={0}
                  className="size-14 rounded-lg border border-[#d3dde4] bg-white text-xl text-[#132d40] shadow-[0_8px_22px_rgba(29,56,73,0.08)] first:rounded-lg first:border last:rounded-lg data-[active=true]:border-[#1c7c72] data-[active=true]:ring-[#1c7c72]/20"
                />
                <InputOTPSlot
                  index={1}
                  className="size-14 rounded-lg border border-[#d3dde4] bg-white text-xl text-[#132d40] shadow-[0_8px_22px_rgba(29,56,73,0.08)] first:rounded-lg first:border last:rounded-lg data-[active=true]:border-[#1c7c72] data-[active=true]:ring-[#1c7c72]/20"
                />
                <InputOTPSlot
                  index={2}
                  className="size-14 rounded-lg border border-[#d3dde4] bg-white text-xl text-[#132d40] shadow-[0_8px_22px_rgba(29,56,73,0.08)] first:rounded-lg first:border last:rounded-lg data-[active=true]:border-[#1c7c72] data-[active=true]:ring-[#1c7c72]/20"
                />
                <InputOTPSlot
                  index={3}
                  className="size-14 rounded-lg border border-[#d3dde4] bg-white text-xl text-[#132d40] shadow-[0_8px_22px_rgba(29,56,73,0.08)] first:rounded-lg first:border last:rounded-lg data-[active=true]:border-[#1c7c72] data-[active=true]:ring-[#1c7c72]/20"
                />
              </InputOTPGroup>
            </InputOTP>

            <div className="flex items-center gap-2 text-sm font-medium text-[#637180]">
              <ShieldCheck
                className="size-4 text-[#1c7c72]"
                aria-hidden="true"
              />
              <span>Codes expire after 10 minutes.</span>
            </div>
          </div>

          {message && (
            <p
              className="rounded-lg border border-[#dbe4ea] bg-[#f7fbff] px-3.5 py-3 text-center text-sm font-semibold text-[#52616e]"
              role="status"
            >
              {message}
            </p>
          )}

          <Button
            className="min-h-[52px] cursor-pointer rounded-lg bg-[#1c7c72] text-base font-black text-white hover:-translate-y-px hover:bg-[#15655d] hover:shadow-[0_12px_28px_rgba(29,56,73,0.14)]"
            disabled={!isComplete}
            type="submit"
          >
            Verify OTP
          </Button>
        </form>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 rounded-lg border border-[#dbe4ea] bg-[#f3f7f8] p-4 text-center sm:flex-row sm:text-left">
          <p className="m-0 text-sm font-semibold text-[#52616e]">
            Did not receive the code?
          </p>
          <Button
            className="h-9 cursor-pointer gap-2 px-3 font-black text-[#1c7c72] hover:text-[#15655d]"
            type="button"
            variant="ghost"
            onClick={handleResend}
          >
            <RefreshCw className="size-4" aria-hidden="true" />
            Resend
          </Button>
        </div>
      </section>
    </main>
  );
}

export default VerifyOtp;
