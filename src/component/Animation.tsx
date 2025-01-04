import {useEffect, useRef} from "react";
import {default as LottiePlayer, AnimationConfigWithData, AnimationConfigWithPath, AnimationConfig} from "lottie-web";

const Animation = ({animationData, path, options, width, height, className, ...props}: AnimationConfigWithPath & AnimationConfigWithData & {
    width?: number | `${number}%`,
    height?: number | `${number}%`,
    className?: string,
    options?: AnimationConfig
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
