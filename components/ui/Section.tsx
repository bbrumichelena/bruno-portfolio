import { cn } from "@/lib/utils";

type Bg = "void" | "primary" | "secondary";

/**
 * Contenedor de sección con ritmo de fondos coherente y espaciado premium.
 */
export function Section({
  id,
  bg = "primary",
  className,
  children,
  containerClassName,
}: {
  id?: string;
  bg?: Bg;
  className?: string;
  children: React.ReactNode;
  containerClassName?: string;
}) {
  const bgClass = {
    void: "bg-void",
    primary: "bg-primary",
    secondary: "bg-secondary",
  }[bg];

  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden py-20 md:py-28 lg:py-36",
        id && "scroll-mt-20",
        bgClass,
        className,
      )}
    >
      <div className={cn("container-site relative z-10", containerClassName)}>{children}</div>
    </section>
  );
}
