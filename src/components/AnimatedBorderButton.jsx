export const AnimatedBorderButton = ({
  as: Component = "button",
  children,
  className = "",
  type,
  ...props
}) => {
  const buttonProps =
    Component === "button" ? { type: type ?? "button" } : undefined;

  return (
    <Component
      className={`relative inline-flex items-center justify-center bg-transparent border border-border 
        text-foreground hover:border-primary/50 transition-all 
        duration-1000 focus:outline-none focus-visible:ring-2 
        focus-visible:ring-primary focus-visible:ring-offset-2 
        disabled:opacity-50 disabled:cursor-not-allowed group 
        px-8 py-4 text-lg font-medium rounded-full overflow-hidden
        animated-border ${className}`}
      {...buttonProps}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </Component>
  );
};
