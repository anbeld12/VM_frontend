import { cva } from "class-variance-authority"

export const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        pending:
          "border-transparent bg-amber-100 text-amber-800 dark:bg-amber-900/10 dark:text-amber-500 hover:bg-amber-100/80",
        in_progress:
          "border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900/10 dark:text-blue-500 hover:bg-blue-100/80",
        completed:
          "border-transparent bg-emerald-100 text-emerald-800 dark:bg-emerald-900/10 dark:text-emerald-500 hover:bg-emerald-100/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)
