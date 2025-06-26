"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = (props: ToasterProps) => {
  const { theme = "system" } = useTheme();

  // Ensure theme is one of the allowed values
  const sonnerTheme = (["light", "dark", "system"].includes(theme) ? theme : "system") as "light" | "dark" | "system";

  return (
    <Sonner
      theme={sonnerTheme}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
