export const Button = ({
  as: Component = "button",
  className = "",
  size = "default",
  type,
  children,
  ...props
}) => {
  const baseClasses =
    "relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-primary text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 shadow-lg shadow-primary/25 transition-all";

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    default: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = `${baseClasses} ${sizeClasses[size] ?? sizeClasses.default} ${className}`;
  const buttonProps =
    Component === "button" ? { type: type ?? "button" } : undefined;

  return (
    <Component className={classes} {...buttonProps} {...props}>
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
    </Component>
  );
};
