import React, { Fragment, useEffect, useRef, useState } from "react";
import "./GameAnimation.css";

const GameAnimation = ({ flyAway, animationKey }) => {
    const [pathD, setPathD] = useState("M 0 347 Q 0 347 0 347");
    const [shadowPathD, setShadowPathD] = useState("M 0 347 Q 0 347 0 347");
    const [rocketPosition, setRocketPosition] = useState({ x: -100, y: 507 });
    const [dimensions, setDimensions] = useState({width: 0, height: 0, x: 0, y: 0});
    const rocketRef = useRef(null);
    const pathRef = useRef(null);
    const svgRocket = useRef(null);
    let rect;

    useEffect(() => {
        const totalFrames = 100;
        let frame = 0;
        let animationFrameId;
        let progress;
        let flag = 0;
        const svgContainer = svgRocket.current;

        const animatePath = () => {

            if(svgContainer) {
                rect = svgContainer.getBoundingClientRect();
            }

            if (frame <= totalFrames) {
                progress = frame / totalFrames

            } else {
                if (flag) {
                    if (progress < 0.97) {
                        progress += 0.0007
                    } else if(progress >= 0.97 && progress <= 0.9893) {
                        progress += 0.0001
                    }
                    else {
                        flag = 0;
                        progress -= 0.0007
                    }
                } else {
                    if (progress >= 0.94) {
                        progress -= 0.0007
                    } else if(progress < 0.94 && progress >= 0.92) {
                        progress -= 0.0001
                    }else {
                        flag = 1;
                        progress += 0.0007
                    }
                }
            }
            const controlPointX = rect.width * 0.5 * progress;
            const controlPointY = frame <= totalFrames ? rect.height : progress * rect.height;

            const floatingOffsetX = Math.sin(progress * Math.PI * 2) * 10;
            const floatingOffsetY = Math.cos(progress * Math.PI * 2) * 20;
            const endPointX = rect.width * 0.8 * progress + floatingOffsetX;
            const endPointY = 200*(progress) + (rect.height) * (1 - progress) + floatingOffsetY;


            const pathFloatingOffsetY = frame > 97 ? Math.sin(frame*0.02) * 10 : 0;
            const adjustedEndPointY = endPointY + pathFloatingOffsetY;
            const adjustedControlPointY = controlPointY + pathFloatingOffsetY;

            setPathD(`M 10 ${rect.height - 10} Q ${controlPointX} ${adjustedControlPointY} ${endPointX} ${adjustedEndPointY}`);
            setRocketPosition({ x: endPointX - 80, y: adjustedEndPointY - 80 })
            // console.log("progress ---> " + progress)
            // console.log("frame ---> " + frame)

            const shadowOffset = 5;
            const shadowControlPointX = controlPointX + shadowOffset;
            const shadowEndPointX = endPointX + shadowOffset;
            const shadowPath = `M 0 ${rect.height - 10} Q ${shadowControlPointX} ${adjustedControlPointY} ${shadowEndPointX} ${adjustedEndPointY - 6} L ${shadowEndPointX} ${rect.height - 10} Z`;
            setShadowPathD(shadowPath);

            frame++;
            animationFrameId = requestAnimationFrame(animatePath);


            // if(frame > 100) {
            //   setPathD(`M 0 347 Q ${controlPointX} ${controlPointY} ${endPointX + progress * 30} ${endPointY}`);
            // }
        };


        if (!flyAway) {
            frame = 0;
            animationFrameId = requestAnimationFrame(animatePath);
        }

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [flyAway, rect]);

    return (
        <div className="svg_container">
            <div
                style={{
                    position: "absolute",
                    bottom: 10,
                    left: 10,
                    width: "calc(100% - 10px)",
                    height: "calc(100% - 10px)"
                }}
                ref={svgRocket}
            >
                <div
                    className={`rocket-images  ${flyAway ? "fly-away" : ""}`}
                    ref={rocketRef}
                    style={{
                        position: "absolute",
                        opacity: 1,
                        width: "200px",
                        transform: `translate(${rocketPosition.x}px, ${rocketPosition.y}px)`
                    }}
                >
                    <div className="image-group">
                        <img src="https://lucky-jet.gamedev-atech.cc/assets/media/314943e8bfa7203475c32ae70f70dd8a.svg" className="sc-gsFSXq rocket" alt="Rocket" />
                        <img src="https://lucky-jet.gamedev-atech.cc/assets/media/50fe36d637617eef44b0b5786961bf49.webp" className="sc-kAyceB fire" alt="Image 2" />
                        <img src="https://lucky-jet.gamedev-atech.cc/assets/media/7a702f0aec3a535e1ba54a71c31bdfd1.webp" className="sc-imWYAI robot" alt="Image 3" />
                    </div>
                </div>
                <svg className="svg_shadow">
                    <defs>
                        <linearGradient id="grad" x1="0" x2="1" y1="0" y2="1">
                            <stop stopColor="#9d7aff" stopOpacity=".33"></stop>
                            <stop offset=".987" stopColor="#9d7aff" stopOpacity="0"></stop>
                        </linearGradient>
                        <linearGradient id="grad_stroke" x1="0" x2="1" y1="0" y2="1">
                            <stop stopColor="#9D7AFF"></stop>
                            <stop offset=".787" stopColor="#622BFC"></stop>
                            <stop offset="1" stopColor="#5c24fc" stopOpacity="0"></stop>
                        </linearGradient>
                    </defs>
                    <g>
                        <path ref={pathRef} d={pathD} fill="transparent" stroke="url(#grad_stroke)" className={`${flyAway ? "paused" : ""}`}>
                            <animate attributeName="rx" values="0;5;0" dur="2s" repeatCount="indefinite" />
                        </path>
                        <path d={shadowPathD} fill="url(#grad)"></path>
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default GameAnimation;
