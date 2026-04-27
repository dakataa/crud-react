import {useEffect, useRef} from "react";
import LottiePlayer from "lottie-web/build/player/esm/lottie.min.js";
import {AnimationConfigWithData, AnimationConfigWithPath, AnimationConfig} from "lottie-web";


const LottieAnimation = ({
                       animationData,
                       path,
                       options,
                       width,
                       height,
                       className,
                       ...props
                   }: Omit<AnimationConfigWithPath, "container"> & Omit<AnimationConfigWithData, "container"> & {
    width?: number | `${number}%`;
    height?: number | `${number}%`;
    className?: string;
    options?: AnimationConfig;

}) => {
    const elementRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!elementRef.current) {
            return;
        }

        const autoPlay = options?.autoplay !== undefined ? options?.autoplay : true;
        const animation = LottiePlayer.loadAnimation({
            renderer: 'svg',
            loop: false,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid meet'
            },
            animationData: animationData,
            path: path,
            container: elementRef.current,
            ...(options || {}),
            autoplay: false
        });

        let visibilityObserver = null;
        if(autoPlay) {
            visibilityObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animation.play();
                    }
                });
            });

            visibilityObserver.observe(elementRef.current);
        }

        return () => {
            visibilityObserver?.disconnect();

            animation.destroy();
        }
    }, []);

    return (
        <div className={className} ref={elementRef} style={{width: width, height: height}}>
        </div>
    )
}

export default LottieAnimation;
