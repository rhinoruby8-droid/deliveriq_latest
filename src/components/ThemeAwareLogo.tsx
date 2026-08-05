export function ThemeAwareLogo({ className }: { className?: string }) {
  return (
    <>
      <img
        src="/assets/logo-horizontal-light.png"
        alt="DeliverIQ Logo"
        className={`dark:hidden block ${className || ''}`}
      />
      <img
        src="/assets/logo-horizontal-dark.png"
        alt="DeliverIQ Logo"
        className={`hidden dark:block ${className || ''}`}
      />
    </>
  );
}
