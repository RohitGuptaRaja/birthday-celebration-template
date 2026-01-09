import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import Confetti from "./Confetti";
import "./MessageCard.css";

function MessageCard({ isActive }) {
  const [curtainsOpened, setCurtainsOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const curtainLeftRef = useRef(null);
  const curtainRightRef = useRef(null);
  const curtainHintRef = useRef(null);
  const messageContentRef = useRef(null);

  // ✅ FIX: names as strings
  const recipientName = "Anjali";
  const senderName = "Rohit";

  const message = `My Cutie Pie ${recipientName} 💖,

Happy Birthday to the most beautiful cutie girl 🥰,
not just by looks, but by heart and soul.

You came into my life like a blessing,
and every day with you feels special.
Your smile is my peace,
your happiness is my priority.

I hope this year gives you
everything your heart desires 💫

Happy Birthday! 🎉

— ${senderName} ❤️`;

  // 🎉 Confetti when page becomes active
  useEffect(() => {
    if (isActive) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  // ✅ FIXED curtain open handler
  const handleOpenCurtains = () => {
    if (curtainsOpened) return;

    console.log("CURTAIN CLICKED"); // 🔥 DEBUG (remove later)

    setCurtainsOpened(true);

    // ✅ SAFE mobile detection
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const isSmallMobile = window.matchMedia("(max-width: 480px)").matches;

    const duration = isSmallMobile ? 1.1 : isMobile ? 1.3 : 1.5;
    const rotationAngle = isSmallMobile ? 8 : isMobile ? 10 : 12;

    // Hide hint
    if (curtainHintRef.current) {
      gsap.to(curtainHintRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    const tl = gsap.timeline();

    tl.to(
      curtainLeftRef.current,
      {
        x: "-100%",
        rotationY: -rotationAngle,
        duration,
        ease: "power3.inOut",
      },
      0
    );

    tl.to(
      curtainRightRef.current,
      {
        x: "100%",
        rotationY: rotationAngle,
        duration,
        ease: "power3.inOut",
      },
      0
    );

    // Fade curtains out
    tl.to(
      [curtainLeftRef.current, curtainRightRef.current],
      {
        opacity: 0,
        duration: 0.4,
      },
      duration - 0.3
    );

    // Show message
    tl.to(
      messageContentRef.current,
      {
        opacity: 1,
        scale: 1,
        duration: isMobile ? 0.7 : 0.9,
        ease: "back.out(1.2)",
      },
      duration - 0.2
    );
  };

  return (
    <section className="message">
      <h2>💌 A Message From My Heart</h2>

      <div className="curtain-container">
        <div className="curtain-rod"></div>

        <div
          className={`curtain-wrapper ${curtainsOpened ? "opened" : ""}`}
          onClick={handleOpenCurtains}
          onTouchEnd={handleOpenCurtains}   // ✅ IMPORTANT
          role="button"
          aria-label="Tap to open curtains"
        >
          <div ref={curtainLeftRef} className="curtain curtain-left" />
          <div ref={curtainRightRef} className="curtain curtain-right" />

          {!curtainsOpened && (
            <div ref={curtainHintRef} className="curtain-hint">
              ✨ Tap to Open ✨
            </div>
          )}
        </div>

        <div ref={messageContentRef} className="message-content">
          <p className="typed-text">{message}</p>
        </div>
      </div>

      {showConfetti && <Confetti />}
    </section>
  );
}

export default MessageCard;
