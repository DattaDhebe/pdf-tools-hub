interface BrandLogoProps {
  eager?: boolean;
  className?: string;
  imageClassName?: string;
}

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function BrandLogo({
  eager = false,
  className,
  imageClassName,
}: BrandLogoProps) {
  return (
    <div
      className={joinClasses(
        'relative h-20 w-[18rem] overflow-visible sm:w-[22rem]',
        className,
      )}
    >
      <img
        src="/logo4-optimized-480.webp"
        srcSet="/logo4-optimized-360.webp 360w, /logo4-optimized-480.webp 480w, /logo4-optimized.webp 600w"
        sizes="(max-width: 640px) 240px, 288px"
        alt="DHEBE Studios"
        width={600}
        height={400}
        decoding="async"
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : undefined}
        className={joinClasses(
          'absolute left-0 top-1/2 h-40 w-auto max-w-none -translate-y-1/2 object-contain object-left sm:h-48',
          imageClassName,
        )}
      />
    </div>
  );
}
