import { useEffect } from "react";

const identificatorTypes = {
    "id": "#",
    "class": ".",
}

const cleanElementName = (element) => element.replace(/^[#.]/, "");

export const useAnimationObserver = ({ targetElements = [], options = {}, defaultAnimation = "animate-fade-up" }) => {
    useEffect(() => {
        const getTargetElementAnimation = (target) => {
            const targetAnimation = targetElements.find((targetElement) => {
                const elementName = cleanElementName(targetElement.element);
                const matchesTarget = targetElement.identificatorType === "class"
                    ? target.classList.contains(elementName)
                    : target.id === elementName;

                return matchesTarget && targetElement.animation;
            });

            return targetAnimation ? targetAnimation.animation : defaultAnimation;
        }

        const callback = (entries) => {
            entries.forEach(entry => {
                if (entry.intersectionRatio > 0) {
                    entry.target.classList.add(getTargetElementAnimation(entry.target));
                    observer.unobserve(entry.target);
                }
            })
        }

        const observer = new IntersectionObserver(callback, options);

        targetElements.forEach(targetElement => {
            const identificator = identificatorTypes[targetElement.identificatorType] || identificatorTypes["id"];
            const targets = document.querySelectorAll(`${identificator}${cleanElementName(targetElement.element)}`);

            targets.forEach(target => {
                observer.observe(target);
            })
        })

        return () => observer.disconnect();
    }, [targetElements, options, defaultAnimation])
}