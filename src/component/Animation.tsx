import {useEffect, useRef} from "react";
import LottiePlayer from "lottie-web/build/player/esm/lottie.min.js";
import {AnimationConfigWithData, AnimationConfigWithPath, AnimationConfig} from "lottie-web";


const Animation = ({
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

        const animation = LottiePlayer.loadAnimation({
            renderer: 'svg',
            loop: false,
            autoplay: true,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid meet'
            },
            animationData: animationData,
            path: path,
            container: elementRef.current,
            ...(options || {})
        });

        return () => {
            animation.destroy();
        }
    }, []);

    return (
        <div className={className} ref={elementRef} style={{width: width, height: height}}>
        </div>
    )
}

export default Animation;
