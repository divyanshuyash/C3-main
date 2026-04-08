type ContactButtonProps = {
  href: string;
  label: string;
  variant?: "light" | "ghost";
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export function ContactButton({
  href,
  label,
  variant = "light",
  className = "",
  onClick
}: ContactButtonProps) {
  return (
    <a
      className={`button button-${variant} ${className}`.trim()}
      href={href}
      onClick={onClick}
    >
      <span>{label}</span>
      <img
        alt=""
        aria-hidden="true"
        className="button-icon"
        height="18"
        src="/assets/arrow-up-right.svg"
        width="18"
      />
    </a>
  );
}
