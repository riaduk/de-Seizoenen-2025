document.addEventListener('DOMContentLoaded', () => {
    const audioToggle = document.querySelector('.navbar__audio-toggle');
    const video = document.getElementById('intro-video');
    let audioDescActive = false;

    function isMobile() {
        return window.innerWidth <= 768;
    }

    function setAudioDescState(active) {
        audioToggle.setAttribute('aria-pressed', active ? 'true' : 'false');
        audioToggle.textContent = active ? 'Audiodescriptie uitzetten' : 'Audiodescriptie aanzetten';

        if (active) {
            document.body.classList.add('audio-desc-enabled');
        } else {
            document.body.classList.remove('audio-desc-enabled');
        }

        const mobile = isMobile();

        document.querySelectorAll('.hover-audio-target').forEach(target => {
            const box = target.querySelector('.audio-description-box');
            if (!box) return;

            const audio = box.querySelector('.hover-audio-player');
            if (audio && !active) {
                audio.pause();
                // Do not reset audio.currentTime to preserve its place
                // Only reset if changing between two different audio players
            }

            if (mobile) {
                box.style.display = active ? 'flex' : 'none';
                target.classList.remove('hover-audio-enabled');
            } else {
                box.style.display = ''; // Let CSS handle hover visibility
                if (active) {
                    target.classList.add('hover-audio-enabled');
                } else {
                    target.classList.remove('hover-audio-enabled');
                }
            }
        });

        announceChange(active ? 'Audiodescriptie aanzetten' : 'Audiodescriptie uitzetten');
    }

    const hoverAudioPlayers = document.querySelectorAll('.hover-audio-target .hover-audio-player');

    hoverAudioPlayers.forEach(audio => {
        // When an audio starts, pause all other audio elements
        audio.addEventListener('play', () => {
            hoverAudioPlayers.forEach(otherAudio => {
                if (otherAudio !== audio) {
                    otherAudio.pause();
                    otherAudio.currentTime = 0;
                }
            });

            if (audio.closest('.audio-description-box').style.display !== 'none') {
                video.currentTime = audio.currentTime;
                video.play();
            }
        });

        audio.addEventListener('timeupdate', () => {
            if (audio.closest('.audio-description-box').style.display !== 'none') {
                video.currentTime = audio.currentTime;
            }
        });

        audio.addEventListener('pause', () => {
            if (audio.closest('.audio-description-box').style.display !== 'none') {
                video.pause();
            }
        });
    });

    // Toggle button logic
    if (audioToggle) {
        audioToggle.addEventListener('click', () => {
            audioDescActive = !audioDescActive;
            setAudioDescState(audioDescActive);
        });

        audioToggle.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                audioDescActive = !audioDescActive;
                setAudioDescState(audioDescActive);
            }
        });
    }

    // Handle screen resize
    window.addEventListener('resize', () => {
        setAudioDescState(audioDescActive);
    });

    // Apply correct state on load
    setAudioDescState(audioDescActive);

    // Keyboard focus styling
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
});
