import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Header() {
  console.log("Rendering Header component");
  return (
    <header className="w-full bg-white shadow p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <SignedOut>
          <RedirectToSignIn signInFallbackRedirectUrl={"/"} />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
