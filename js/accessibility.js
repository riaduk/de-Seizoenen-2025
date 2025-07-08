// Accessibility Enhancements

document.addEventListener('DOMContentLoaded', () => {
    // Keyboard Navigation Improvements
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea');
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.classList.add('focus-visible');
        });
        element.addEventListener('blur', () => {
            element.classList.remove('focus-visible');
        });
    });

    // Screen Reader Announcements
    function createLiveRegion() {
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('role', 'status');
        liveRegion.style.position = 'absolute';
        liveRegion.style.width = '1px';
        liveRegion.style.height = '1px';
        liveRegion.style.padding = '0';
        liveRegion.style.overflow = 'hidden';
        liveRegion.style.clip = 'rect(0, 0, 0, 0)';
        liveRegion.style.whiteSpace = 'nowrap';
        document.body.appendChild(liveRegion);
        return liveRegion;
    }

    const liveRegion = createLiveRegion();

    function announceChange(message) {
        liveRegion.textContent = message;
    }

    // Color Contrast Checker
    function checkColorContrast(foreground, background) {
        const getLuminance = color => {
            const rgb = color.match(/\d+/g).map(Number);
            const [r, g, b] = rgb.map(c => {
                c /= 255;
                return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
            });
            return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        };

        const contrastRatio = (color1, color2) => {
            const l1 = getLuminance(color1);
            const l2 = getLuminance(color2);
            const lighter = Math.max(l1, l2);
            const darker = Math.min(l1, l2);
            return (lighter + 0.05) / (darker + 0.05);
        };

        return contrastRatio(foreground, background) >= 4.5;
    }

    // Warn about low contrast elements
    function warnLowContrastElements() {
        const elements = document.querySelectorAll('*');
        elements.forEach(el => {
            const style = window.getComputedStyle(el);
            const foregroundColor = style.color;
            const backgroundColor = style.backgroundColor;

            if (!checkColorContrast(foregroundColor, backgroundColor)) {
                console.warn(`Low color contrast for element:`, el);
                el.classList.add('low-contrast-warning');
            }
        });
    }

    warnLowContrastElements();

    // --- Hover Audio Logic ---
    const hoverAudioTargets = document.querySelectorAll('.hover-audio-target');
    hoverAudioTargets.forEach(div => {
        function showBox() {
            document.querySelectorAll('.audio-description-box').forEach(box => {
                box.style.display = 'none';
                const audio = box.querySelector('.hover-audio-player');
                if (audio) {
                    audio.pause && audio.pause();
                    audio.currentTime = 0;
                }
            });
            const box = div.querySelector('.audio-description-box');
            if (box) {
                box.style.display = 'flex';
            }
        }
        function hideBox() {
            const box = div.querySelector('.audio-description-box');
            if (box) {
                box.style.display = 'none';
                const audio = box.querySelector('.hover-audio-player');
                if (audio) {
                    audio.pause && audio.pause();
                    audio.currentTime = 0;
                }
            }
        }
        div.addEventListener('mouseenter', showBox);
        div.addEventListener('mouseleave', hideBox);
        div.addEventListener('focus', showBox);
        div.addEventListener('blur', hideBox);
    });
});

// --- Audio/Video Sync for Intro Slide Only ---
const introAudio = document.getElementById('intro-audio');
const introVideo = document.getElementById('intro-video');
if (introAudio && introVideo) {
    introAudio.addEventListener('play', function () {
        if (Math.abs(introAudio.currentTime) < 0.05) {
            // start of audio
            introVideo.currentTime = 0;
        }
        introVideo.play();
    });
    introAudio.addEventListener('pause', function () {
        introVideo.pause();
    });
}
