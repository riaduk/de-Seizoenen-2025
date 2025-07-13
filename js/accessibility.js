// Accessibility Enhancements

document.addEventListener('DOMContentLoaded', () => {
    // Audio Description Toggle Logic
    const audioToggle = document.querySelector('.navbar__audio-toggle');
    if (audioToggle) {
        // --- Mobile Audio Description Injection ---
        const audioDescriptions = {
            'carousel-project-mercy-killing': {
                html: `<div class="audio-description-box audio-description-box--mobile" role="region" aria-label="Audiodescriptie van Mercy Killing Project"><h4 class="audio-description-miniheader">Geniet nu van audiodescriptie</h4><audio class="hover-audio-player hover-audio-player--mini" src="audio/Home/Project highlights/mercy killing.mp3" controls aria-label="Audiodescriptie Mercy Killing Project"></audio></div>`,
            },
            'carousel-project-op-de-wachtlijst': {
                html: `<div class="audio-description-box audio-description-box--mobile" role="region" aria-label="Audiodescriptie van Op de wachtlijst Project"><h4 class="audio-description-miniheader">Geniet nu van audiodescriptie</h4><audio class="hover-audio-player hover-audio-player--mini" src="audio/Home/Project highlights/op de wachtlijst.mp3" controls aria-label="Audiodescriptie Op de wachtlijst Project"></audio></div>`,
            },
            'carousel-project-bang-voor-beperking': {
                html: `<div class="audio-description-box audio-description-box--mobile" role="region" aria-label="Audiodescriptie van Bang voor beperking Project"><h4 class="audio-description-miniheader">Geniet nu van audiodescriptie</h4><audio class="hover-audio-player hover-audio-player--mini" src="audio/Home/Project highlights/bang voor beperking.mp3" controls aria-label="Audiodescriptie Bang voor beperking Project"></audio></div>`,
            },
            'carousel-project-samen-dansen-met-cemi': {
                html: `<div class="audio-description-box audio-description-box--mobile" role="region" aria-label="Audiodescriptie van SAMen dansen met CEMI Project"><h4 class="audio-description-miniheader">Geniet nu van audiodescriptie</h4><audio class="hover-audio-player hover-audio-player--mini" src="audio/Home/Project highlights/samen dansen met cemi.mp3" controls aria-label="Audiodescriptie SAMen dansen met CEMI Project"></audio></div>`,
            },
            'carousel-project-samen-inclusief-onderwijs': {
                html: `<div class="audio-description-box audio-description-box--mobile" role="region" aria-label="Audiodescriptie van SAMen inclusief onderwijs Project"><h4 class="audio-description-miniheader">Geniet nu van audiodescriptie</h4><audio class="hover-audio-player hover-audio-player--mini" src="audio/Home/Project highlights/samen inclusief onderwijs.mp3" controls aria-label="Audiodescriptie SAMen inclusief onderwijs Project"></audio></div>`,
            },
            'carousel-project-inclusiecharter': {
                html: `<div class="audio-description-box audio-description-box--mobile" role="region" aria-label="Audiodescriptie van Inclusiecharter Project"><h4 class="audio-description-miniheader">Geniet nu van audiodescriptie</h4><audio class="hover-audio-player hover-audio-player--mini" src="audio/Home/Project highlights/inclusiecharter.mp3" controls aria-label="Audiodescriptie Inclusiecharter Project"></audio></div>`,
            },
            'carousel-project-workouts-sam': {
                html: `<div class="audio-description-box audio-description-box--mobile" role="region" aria-label="Audiodescriptie van Workouts Sam Project"><h4 class="audio-description-miniheader">Geniet nu van audiodescriptie</h4><audio class="hover-audio-player hover-audio-player--mini" src="audio/Home/Project highlights/workouts sam.mp3" controls aria-label="Audiodescriptie Workouts Sam Project"></audio></div>`,
            },
            'carousel-project-sayyes': {
                html: `<div class="audio-description-box audio-description-box--mobile" role="region" aria-label="Audiodescriptie van #Sayyes Project"><h4 class="audio-description-miniheader">Geniet nu van audiodescriptie</h4><audio class="hover-audio-player hover-audio-player--mini" src="audio/Home/Project highlights/sayyes.mp3" controls aria-label="Audiodescriptie #Sayyes Project"></audio></div>`,
            },
            'carousel-project-mijnassistent': {
                html: `<div class="audio-description-box audio-description-box--mobile" role="region" aria-label="Audiodescriptie van Mijnassistent Project"><h4 class="audio-description-miniheader">Geniet nu van audiodescriptie</h4><audio class="hover-audio-player hover-audio-player--mini" src="audio/Home/Project highlights/mijn assistent.mp3" controls aria-label="Audiodescriptie Mijnassistent Project"></audio></div>`,
            },
            'carousel-intro-over-de-seizoenen': {
                html: `<div class="audio-description-box audio-description-box--mobile" role="region" aria-label="Audiodescriptie van intro over de Seizoenen"><h4 class="audio-description-header">Geniet nu van audiodescriptie</h4><audio class="hover-audio-player" src="audio/Home/Carroussel/slide 1/intro.mp3" controls aria-label="Audiodescriptie intro over de Seizoenen"></audio></div>`,
            },
            'carousel-mercy-killing': {
                html: `<div class="audio-description-box audio-description-box--mobile" role="region" aria-label="Audiodescriptie van Mercy Killing"><h4 class="audio-description-header">Geniet nu van audiodescriptie</h4><audio class="hover-audio-player" src="audio/Home/Carroussel/slide 2/mercy killing.mp3" controls aria-label="Audiodescriptie Mercy Killing"></audio></div>`,
            },
            'carousel-samen-dansen-met-cemi': {
                html: `<div class="audio-description-box audio-description-box--mobile" role="region" aria-label="Audiodescriptie van SAMen dansen met CEMI"><h4 class="audio-description-header">Geniet nu van audiodescriptie</h4><audio class="hover-audio-player" src="audio/Home/Carroussel/slide 3/samen dansen met cemi.mp3" controls aria-label="Audiodescriptie SAMen dansen met CEMI"></audio></div>`,
            },
            'carousel-op-de-wachtlijst': {
                html: `<div class="audio-description-box audio-description-box--mobile" role="region" aria-label="Audiodescriptie van Op de wachtlijst"><h4 class="audio-description-header">Geniet nu van audiodescriptie</h4><audio class="hover-audio-player" src="audio/Home/Carroussel/slide 4/op de wachtlijst.mp3" controls aria-label="Audiodescriptie Op de wachtlijst"></audio></div>`,
            },
            'hero-de-seizoenen': {
                html: `<div class="audio-description-box audio-description-box--mobile" role="region" aria-label="Audiodescriptie van de Seizoenen"><h4 class="audio-description-header">Geniet nu van audiodescriptie</h4><audio class="hover-audio-player" src="audio/Home/Intro/de seizoenen.mp3" controls aria-label="Audiodescriptie van de Seizoenen"></audio></div>`,
            },
            banner: {
                html: `<div class="audio-description-box audio-description-box--mobile" role="region" aria-label="Audiodescriptie van banner"><h4 class="audio-description-header">Geniet nu van audiodescriptie</h4><audio class="hover-audio-player" src="audio/Home/Intro/een video.mp3" controls aria-label="Audiodescriptie van banner"></audio></div>`,
            },
            'about-header': {
                html: `<div class="audio-description-box audio-description-box--mobile" role="region" aria-label="Audiodescriptie over ons"><h4 class="audio-description-header">Geniet nu van audiodescriptie</h4><audio class="hover-audio-player" src="audio/About/over ons.mp3" controls aria-label="Audiodescriptie over ons"></audio></div>`,
            },
            'about-main-over-ons': {
                html: `<div class="audio-description-box audio-description-box--mobile" role="region" aria-label="Audiodescriptie over ons"><h4 class="audio-description-header">Geniet nu van audiodescriptie</h4><audio class="hover-audio-player" src="audio/About/inclusie is.mp3" controls aria-label="Audiodescriptie inclusie is"></audio></div>`,
            },
            'about-main-de-seizoenen': {
                html: `<div class="audio-description-box audio-description-box--mobile" role="region" aria-label="Audiodescriptie de Seizoenen"><h4 class="audio-description-header">Geniet nu van audiodescriptie</h4><audio class="hover-audio-player" src="audio/About/nothing about.mp3" controls aria-label="Audiodescriptie de Seizoenen"></audio></div>`,
            },
            'op-de-wachtlijst': {
                html: `<div class="audio-description-box audio-description-box--mobile" role="region" aria-label="Audiodescriptie van Op de Wachtlijst"><h4 class="audio-description-header">Geniet nu van audiodescriptie</h4><audio class="hover-audio-player" src="../audio/Projects/op de wachtlijst/op de wachtlijst.mp3" controls aria-label="Audiodescriptie Op de Wachtlijst"></audio></div>`,
            },
            bangvoorbeperking: {
                html: `<div class="audio-description-box audio-description-box--mobile" role="region" aria-label="Audiodescriptie van Bang voor beperking"><h4 class="audio-description-header">Geniet nu van audiodescriptie</h4><audio class="hover-audio-player" src="../audio/Projects/bang voor beperking/bang.mp3" controls aria-label="Audiodescriptie Bang voor beperking"></audio></div>`,
            },
            inclusiecharter: {
                html: `<div class="audio-description-box audio-description-box--mobile" role="region" aria-label="Audiodescriptie van Inclusiecharter"><h4 class="audio-description-header">Geniet nu van audiodescriptie</h4><audio class="hover-audio-player" src="../audio/Projects/inclusiecharter/inclusiecharter.mp3" controls aria-label="Audiodescriptie Inclusiecharter"></audio></div>`,
            },
            mercykilling: {
                html: `<div class="audio-description-box audio-description-box--mobile" role="region" aria-label="Audiodescriptie van Mercy Killing"><h4 class="audio-description-header">Geniet nu van audiodescriptie</h4><audio class="hover-audio-player" src="../audio/Projects/mercy killing/mercykilling.mp3" controls aria-label="Audiodescriptie Mercy Killing"></audio></div>`,
            },
            mijnassistent: {
                html: `<div class="audio-description-box audio-description-box--mobile" role="region" aria-label="Audiodescriptie van Mijn Assistent"><h4 class="audio-description-header">Geniet nu van audiodescriptie</h4><audio class="hover-audio-player" src="../audio/Projects/mijn assistent/mijn assistent.mp3" controls aria-label="Audiodescriptie Mijn Assistent"></audio></div>`,
            },
            samen_dansen_met_cemi: {
                html: `<div class="audio-description-box audio-description-box--mobile" role="region" aria-label="Audiodescriptie van SAMen dansen met CEMI"><h4 class="audio-description-header">Geniet nu van audiodescriptie</h4><audio class="hover-audio-player" src="../audio/Projects/samen dansen met cemi/samen dansen met cemi.mp3" controls aria-label="Audiodescriptie SAMen dansen met CEMI"></audio></div>`,
            },
            samen_inclusief_onderwijs: {
                html: `<div class="audio-description-box audio-description-box--mobile" role="region" aria-label="Audiodescriptie van SAMen inclusief onderwijs"><h4 class="audio-description-header">Geniet nu van audiodescriptie</h4><audio class="hover-audio-player" src="../audio/Projects/SAMen inclusief onderwijs/SAMen inclusief onderwijs.mp3" controls aria-label="Audiodescriptie SAMen inclusief onderwijs"></audio></div>`,
            },
            sayyes: {
                html: `<div class="audio-description-box audio-description-box--mobile" role="region" aria-label="Audiodescriptie van #sayyes"><h4 class="audio-description-header">Geniet nu van audiodescriptie</h4><audio class="hover-audio-player" src="../audio/Projects/sayyes/sayyes.mp3" controls aria-label="Audiodescriptie #sayyes"></audio></div>`,
            },
            workouts_sam: {
                html: `<div class="audio-description-box audio-description-box--mobile" role="region" aria-label="Audiodescriptie van Workouts Sam"><h4 class="audio-description-header">Geniet nu van audiodescriptie</h4><audio class="hover-audio-player" src="../audio/Projects/workouts Sam/workouts Sam.mp3" controls aria-label="Audiodescriptie Workouts Sam"></audio></div>`,
            },
        };
        function isMobile() {
            // Match CSS: @media (max-width: 48rem) => 768px
            return window.innerWidth <= 768;
        }
        function updateMobileAudioDescriptions(active) {
            document.querySelectorAll('[data-audio-id]').forEach(el => {
                const id = el.getAttribute('data-audio-id');
                const box = el.querySelector('.audio-description-box--mobile');
                const desktopBox = el.querySelector('.audio-description-box:not(.audio-description-box--mobile)');
                if (isMobile() && active && audioDescriptions[id] && box) {
                    box.innerHTML = audioDescriptions[id].html;
                    box.style.display = 'flex';
                    if (desktopBox) desktopBox.style.display = 'none';
                } else if (box) {
                    box.innerHTML = '';
                    box.style.display = 'none';
                    if (desktopBox) desktopBox.style.display = '';
                }
            });
        }
        // End Mobile Audio Injection
        function setAudioDescState(active) {
            audioToggle.setAttribute('aria-pressed', active ? 'true' : 'false');
            audioToggle.textContent = active ? 'Audiodescriptie uitzetten' : 'Audiodescriptie aanzetten';

            if (active) {
                document.body.classList.add('audio-desc-enabled');
            } else {
                document.body.classList.remove('audio-desc-enabled');
            }

            if (isMobile()) {
                // Hide all desktop boxes
                document.querySelectorAll('.audio-description-box:not(.audio-description-box--mobile)').forEach(box => {
                    box.style.display = 'none';
                });
                // Show and inject mobile boxes
                updateMobileAudioDescriptions(active);
            } else {
                // On desktop, let CSS handle visibility
                // Hide all mobile boxes and clear content
                document.querySelectorAll('.audio-description-box--mobile').forEach(box => {
                    box.style.display = 'none';
                    box.innerHTML = '';
                });
                if (!active) {
                    // Hide all audio description boxes
                    document.querySelectorAll('.audio-description-box').forEach(box => {
                        box.style.display = 'none';
                    });
                } else {
                    // Remove any inline display set previously, let CSS handle it
                    document.querySelectorAll('.audio-description-box').forEach(box => {
                        box.style.display = '';
                    });
                }
            }
            announceChange(active ? 'Audiodescriptie aanzetten' : 'Audiodescriptie uitzetten');
        }

        let audioDescActive = false;
        // Ensure correct state on resize (e.g., orientation change)
        window.addEventListener('resize', () => {
            updateMobileAudioDescriptions(audioDescActive);
        });
        // Also call once on load
        updateMobileAudioDescriptions(audioDescActive);
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

    // --- Hover Audio Logic ---
    const hoverAudioTargets = document.querySelectorAll('.hover-audio-target');
    hoverAudioTargets.forEach(div => {
        div.addEventListener('mouseleave', () => {
            const box = div.querySelector('.audio-description-box');
            if (box) {
                const audio = box.querySelector('.hover-audio-player');
                if (audio) {
                    audio.pause && audio.pause();
                    audio.currentTime = 0;
                }
            }
        });
        div.addEventListener('blur', () => {
            const box = div.querySelector('.audio-description-box');
            if (box) {
                const audio = box.querySelector('.hover-audio-player');
                if (audio) {
                    audio.pause && audio.pause();
                    audio.currentTime = 0;
                }
            }
        });
    });
});

// --- Audio/Video Sync for Intro Slide Only ---
const introAudio = document.getElementById('intro-audio');
const introVideo = document.getElementById('intro-video');
if (introAudio && introVideo) {
    introAudio.addEventListener('play', function (e) {
        // Prevent desktop box from showing when playing mobile audio
        if (isMobile() && e.target.closest('.audio-description-box--mobile')) {
            document.querySelectorAll('.audio-description-box.audio-description-box--right').forEach(box => (box.style.display = 'none'));
        }
        // Only restart video if audio is at the beginning
        if (Math.abs(introAudio.currentTime) < 0.05 && introVideo.currentTime > 0.05) {
            introVideo.currentTime = 0;
        }
        // Only play video if not already playing
        if (introVideo.paused) {
            introVideo.play();
        }
    });
    introAudio.addEventListener('pause', function () {
        if (!introVideo.paused) introVideo.pause();
    });
    // Optional: If the user pauses the video, also pause the audio
    introVideo.addEventListener('pause', function () {
        if (!introAudio.paused) introAudio.pause();
    });
}
