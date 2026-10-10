"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type GalleryImage = { src: string; alt: string; width: number; height: number };

type Props = {
  images: GalleryImage[];
  openLabel: (alt: string) => string;
  closeLabel: string;
};

/**
 * Lightbox memakai <dialog>.showModal(): Esc menutup, fokus terkunci di dalam
 * dialog, dan fokus kembali ke tombol pemicu saat ditutup.
 */
export function Gallery({ images, openLabel, closeLabel }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState<GalleryImage>();

  function open(image: GalleryImage) {
    setCurrent(image);
    dialogRef.current?.showModal();
  }

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2">
        {images.map((image) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => open(image)}
              aria-label={openLabel(image.alt)}
              className="block w-full overflow-hidden rounded-md border border-border"
            >
              <Image
                src={image.src}
                alt=""
                width={image.width}
                height={image.height}
                sizes="(min-width: 640px) 45vw, 100vw"
                className="aspect-video w-full object-cover object-top"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={current?.alt}
        onClose={() => setCurrent(undefined)}
        onClick={(e) =>
          e.target === dialogRef.current && dialogRef.current?.close()
        }
        className="m-auto max-h-[92dvh] w-[min(96vw,1200px)] overflow-auto rounded-md bg-bg p-3 text-fg backdrop:bg-black/70"
      >
        <button
          type="button"
          autoFocus
          onClick={() => dialogRef.current?.close()}
          className="mb-3 ml-auto block h-10 rounded-pill bg-accent px-5 text-sm font-medium text-on-accent"
        >
          {closeLabel}
        </button>
        {current && (
          <Image
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            sizes="96vw"
            className="h-auto w-full rounded-sm"
          />
        )}
      </dialog>
    </>
  );
}
