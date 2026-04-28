import clsx from "clsx"

/* =========================================================
IMAGE COMPONENTS (MDXImage & Image)

This file handles all image rendering in MDX.

It provides two components:

1. MDXImage → automatic replacement for Markdown images
   ![alt](src)

2. Image → advanced custom component with:

   * alignment
   * caption
   * sizing control

Purpose:

* Ensure consistent styling
* Support both local and external images
* Provide better layout control in docs
========================================================= */

/* =========================================================
BASIC MDX IMAGE (AUTO-MAPPED)

Used for standard Markdown images:
![alt](src)

Features:

* Handles external and local images
* Applies consistent styling (rounded, spacing)
* Lightweight and simple

NOTE:

* Does not use next/image for simplicity
* Can be upgraded later if needed
========================================================= */

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
       CHECK IF EXTERNAL IMAGE
    ========================= */

    const isExternal = src.startsWith("http")

    /* =========================
       EXTERNAL IMAGE
    
       - Direct <img> usage
       - No width/height enforcement
    ========================= */

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
       LOCAL IMAGE
    
       - Applies default dimensions
       - Ensures layout consistency
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

/* =========================================================
ADVANCED IMAGE COMPONENT

Used explicitly in MDX: <Image src="/img.png" align="center" caption="..." />

Features:

* Alignment control (left, center, right)
* Optional caption
* Width control
* External + local support
* Semantic <figure> + <figcaption>

Layout:

   <figure>
     <img />
     <figcaption />
   </figure>
========================================================= */

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

    /* =========================
       CHECK IF EXTERNAL IMAGE
    ========================= */

    const isExternal = src.startsWith("http")

    /* =========================
       ALIGNMENT STYLES
    
       Controls horizontal positioning
    ========================= */

    const alignment = {
        left: "mr-auto",
        center: "mx-auto",
        right: "ml-auto",
    }

    /* =========================
       CONTAINER STYLES
    
       Uses flex to align image + caption
    ========================= */

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

            {/* =================================================
                IMAGE ELEMENT

                - Handles external and local images
                - Applies alignment styles
                - Supports width override
            ================================================= */}

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

            {/* =================================================
                CAPTION     

                - Rendered only if provided
                - Styled as muted secondary text
                - Centered for readability
            ================================================= */}

            {caption && (
                <figcaption className="text-sm text-muted-foreground mt-2 text-center">
                    {caption}
                </figcaption>
            )}
        </figure>
    )
}
