import { twMerge } from "tailwind-merge"

const Card = ({ className, children, ...props }) => (
  <div className={twMerge("rounded-lg border bg-white shadow-sm", className)} {...props}>
    {children}
  </div>
)

const CardContent = ({ className, children, ...props }) => (
  <div className={twMerge("p-6", className)} {...props}>
    {children}
  </div>
)

export { Card, CardContent }