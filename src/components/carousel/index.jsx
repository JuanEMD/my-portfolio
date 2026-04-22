import Image from "next/image";
import styles from "./carousel.module.css";

const Element = ({ data }) => {
    const { title, url } = data;

    const elementClass = ` text-center content-center ${styles['carousel--item']} scale-115 hover:scale-130`

    return (
        <div className={elementClass}>
            <Image className=" rounded-lg border border-primary" src={url} alt={title} width={140} height={140} />
        </div>
    )
}

const Carousel = ({ items }) => {

    const carouselClass = "max-w-200 flex mt-10 mx-auto w-full overflow-x-hidden overflow-y-hidden p-5"
    const groupClass = `gap-5 animate-infinite-scroll pr-5 ${styles['carousel--group']} `

    return (
        <div className={carouselClass}>
            <div className={groupClass}>
                {items?.map((item) => {
                    return <Element key={item?.title} data={item} />
                })}
            </div>
            <div className={groupClass}>
                {items?.map((item) => {
                    return <Element key={item?.title} data={item} />
                })}
            </div>
        </div >
    );
}

export default Carousel;