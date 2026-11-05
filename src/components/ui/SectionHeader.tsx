import { cn } from "@/lib/utils";

type Props = {
  /** Route shown in the signature label, like "/projects" */
  route: string;
  title: string;
  description?: string;
  className?: string;
};

/**
 * Section heading. The `GET /route` label is the site's signature detail,
 * a nod to the REST work, and appears only here.
 */
export default function SectionHeader({ route, title, description, className }: Props) {
  return (
    <div data-reveal-group className={cn("mb-14 md:mb-20", className)}>
      <p data-reveal className="mb-5 font-mono text-meta text-ink-muted">
        <span className="text-accent">GET</span> <span data-scramble>{route}</span>
      </p>
      <h2
        data-reveal
        className="max-w-[18ch] text-[40px] font-medium leading-[0.98] tracking-[-0.04em] text-ink md:text-6xl lg:text-[72px]"
      >
        {title}
      </h2>
      {description && (
        <p data-reveal className="mt-6 max-w-[36rem] text-lg leading-[1.6] text-ink-secondary">
          {description}
        </p>
      )}
    </div>
  );
}
