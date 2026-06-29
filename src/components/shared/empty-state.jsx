import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionLink = "/products"
}) {
  return <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-10 px-6 text-center"
  >
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-[2rem] bg-muted/30 text-primary">
          <Icon className="h-10 w-10 stroke-[1.5]" />
        </div>
      </div>
      <h3 className="text-2xl font-black font-heading tracking-tight mb-3">
        {title}
      </h3>
      <p className="max-w-[280px] text-sm text-muted-foreground leading-relaxed mb-10">
        {description}
      </p>
      {actionLabel && <Button asChild className="rounded-full px-10 h-14 font-black tracking-tighter shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
          <Link to={actionLink}>
            {actionLabel}
          </Link>
        </Button>}
    </motion.div>;
}
export {
  EmptyState
};
