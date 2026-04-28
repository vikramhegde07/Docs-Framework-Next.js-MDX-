import clsx from "clsx"

type PropsMDXImage = {
    src?: string
    alt?: string
    width?: number
    height?: number
}

export function MDXImage({
    src = "",
    alt = "",
    width,
    height,
}: PropsMDXImage) {
    /* =========================
       EXTERNAL IMAGE
    ========================= */

    const isExternal = src.startsWith("http")

    if (isExternal) {
        return (
            <img
                src={src}
                alt={alt}
                className="rounded-lg my-4"
            />
        )
    }

    /* =========================
       LOCAL IMAGE (Next.js optimized)
    ========================= */
    return (
        <img
            src={src}
            alt={alt}
            width={width || 800}
            height={height || 400}
            className="rounded-lg my-4"
        />
    )
}

type PropsImageComponent = {
    src: string
    alt?: string
    width?: number
    height?: number
    align?: "left" | "center" | "right"
    caption?: string
}
export function Image({
    src,
    alt = "",
    width,
    height,
    align = "center",
    caption,
}: PropsImageComponent) {
    const isExternal = src.startsWith("http");

    console.log(caption);


    /* =========================
       ALIGNMENT STYLES
    ========================= */
    const alignment = {
        left: "mr-auto",
        center: "mx-auto",
        right: "ml-auto",
    }

    const containerClass = clsx(
        "my-6 flex flex-col",
        {
            "items-start": align === "left",
            "items-center": align === "center",
            "items-end": align === "right",
        }
    )

    return (
        <figure className={containerClass}>
            {/* =========================
               IMAGE
            ========================= */}
            {isExternal ? (
                <img
                    src={src}
                    alt={alt}
                    className={clsx(
                        "rounded-lg",
                        alignment[align]
                    )}
                    style={{
                        width: width ? `${width}px` : "auto",
                    }}
                />
            ) : (
                <img
                    src={src}
                    alt={alt}
                    width={width || 800}
                    height={height || 400}
                    className={clsx(
                        "rounded-lg",
                        alignment[align]
                    )}
                />
            )}

            {/* =========================
               CAPTION
            ========================= */}
            {caption && (
                <figcaption className="text-sm text-muted-foreground mt-2 text-center">
                    {caption}
                </figcaption>
            )}
        </figure>
    )
}