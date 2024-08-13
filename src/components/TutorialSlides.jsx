import React, { useState } from "react";
import {
    tutorialBackdrop,
    tutorialSlide,
    tutorialImage,
    slideEnter,
    slideExit,

} from "../css/components/TutorialSlides.css.ts"; // 수정된 import 경로

function TutorialSlides({ onComplete }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);
    const [startX, setStartX] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    
    const slides = [
        {
            title: "가입 완료",
            message: "코매칭에 오신 것을 환영합니다!",
            image: " ",
            actionText: "눌러서 시작하기 →",
        },
        {
            title: "충전하기",
            message: "부스에 오셔서 포인트를 충전해요",
            image: " ",
            actionText: "눌러서 다음으로 →",
        },
        {
            title: "매칭하기",
            message: "원하는 옵션을 고르고 매칭해요",
            image: " ",
            actionText: "눌러서 다음으로 →",
        },
        {
            title: "단체미팅",
            message: "소개팅과 미팅까지 빠르고 편리하게",
            image: " ",
            actionText: "시작하기 →",
        },
    ];
    const handleStart = (event) => {
        const startPosX = event.touches ? event.touches[0].clientX : event.clientX;
        setStartX(startPosX);
    };

    const handleMove = (event) => {
        const currentPosX = event.touches ? event.touches[0].clientX : event.clientX;
        const diffX = currentPosX - startX;

        // Update the translateX state to move the slide along with the drag
        if (Math.abs(diffX) > 5) {
            setTranslateX(diffX);
        }
    };

    const handleEnd = () => {
        const threshold = slideRef.current.offsetWidth / 4; // Slide threshold (e.g., 25% of the slide width)
        if (translateX > threshold) {
            handleSwipe();
        } else {
            setTranslateX(0); // Reset the position if threshold is not met
        }
    };
    const handleSwipe = () => {
        setIsSwiping(true);
        setTimeout(() => {
            if (currentSlide < slides.length - 1) {
                setCurrentSlide(currentSlide + 1);
            } else {
                onComplete();
            }
            setIsSwiping(false);
        }, 300); // duration of the slide transition
    };

    return (
        <div className={tutorialBackdrop}>
            <div
                className={`${tutorialSlide} ${isSwiping ? slideExit : slideEnter}`}
                onClick={handleSwipe}
            >
                <h3>{slides[currentSlide].title}</h3>
                <h2>{slides[currentSlide].message}</h2>
                <div className={tutorialImage}>{slides[currentSlide].image}</div>
                <h2>{slides[currentSlide].actionText}</h2>
            </div>
        </div>
    );
}

export default TutorialSlides;
