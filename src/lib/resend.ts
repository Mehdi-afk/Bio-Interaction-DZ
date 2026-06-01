import { Resend } from "resend";

// Lazy singleton — instantiated on first use so the module is safe to import
// at build time when RESEND_API_KEY may not be present.
let _resend: Resend | null = null;
export function getResend(): Resend {
  return (_resend ??= new Resend(process.env.RESEND_API_KEY));
}
