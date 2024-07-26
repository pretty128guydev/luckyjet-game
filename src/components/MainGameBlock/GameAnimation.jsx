import React, { Fragment, useEffect, useRef, useState } from "react";
import "./GameAnimation.css";

const GameAnimation = ({ flyAway, animationKey }) => {
    const [pathD, setPathD] = useState("M 0 347 Q 0 347 0 347");
    const [shadowPathD, setShadowPathD] = useState("M 0 347 Q 0 347 0 347");
    const [rocketPosition, setRocketPosition] = useState({ x: -20, y: 547 });
    const [direction, setDirection] = useState(1);
    const [distance, setDistance] = useState({ x: 0, y: 0 });
    const rocketRef = useRef(null);
    const pathRef = useRef(null);
    

    useEffect(() => {
        const totalFrames = 100;
        let frame = 0;
        let animationFrameId;
        let progress;
        let flag = 0;
        
        setInterval(function(){
            if(Math.random() > 0.5) {
                flag = 0;
            } else {
                flag = 1;
            }
        }, 1000)
        
        const animatePath = () => {
            // Math.random() * 0.2 + 0.8;
            if (frame <= totalFrames) {
                progress = frame / totalFrames
            } else {
                if(flag) {
                    progress += 0.0004 
                } else {
                    progress -= 0.0004
                }
                
            }   
            // else { 
            //     let speed = totalFrames / pow(e, frame); 

            //     let t;
            //     if(counterChange % 2 == 0) {
            //         t = Math.floor(Math.random() * 10)       
            //     }
            //     step ++;
            //     if(step == t) {
            //         counterChange += 1;
            //         step = 0;
            //     } else {
            //         if(counterChange % 2 == 1) {
            //             progress += speed;
            //         } else {
            //             progress -= speed;
            //         }
            //     }
                
            // }
            const controlPointX = 470.2918182957628 * progress;
            const controlPointY = frame <= totalFrames ? 347 : progress * 347;

            const floatingOffset = Math.sin(progress * Math.PI * 2) * 20;
            const endPointX = 637.9377274436442 * progress + distance.x;
            const endPointY = 121.68593835254131 + (347 - 121.68593835254131) * (1 - progress) + floatingOffset + distance.y;

            setPathD(`M 0 347 Q ${controlPointX} ${controlPointY} ${endPointX} ${endPointY}`);
            setRocketPosition({ x: endPointX * 1.5 - 30, y: endPointY + 130 })

            const shadowOffset = 5;
            const shadowControlPointX = controlPointX + shadowOffset;
            const shadowEndPointX = endPointX + shadowOffset;
            const shadowPath = `M 5 347 Q ${shadowControlPointX} ${controlPointY} ${shadowEndPointX} ${endPointY - 8} L ${shadowEndPointX} 347 Z`;
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
    }, [flyAway]);

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
                <svg className="svg_shadow" viewBox="0 0 637.9377274436442 350">
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
