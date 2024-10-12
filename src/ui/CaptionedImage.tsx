import { ReactNode } from "react";

export default function CaptionedImage({ imageSrc, title, link, children }: Readonly<{ imageSrc: string; title: string; link: string; children: ReactNode; }>) {
    return <>
        <div className=" p-1">
            <h2 className="text-center text-xl">{title}</h2>
            <p>{children}</p>
            <a href={link} className="underline text-blue-600 visited:text-purple-600">Read More</a>
        </div>
        <img src={imageSrc} alt={title} className="size-[400px] bg-black" />
    </>;
}
