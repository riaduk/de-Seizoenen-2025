/**
 * Main JavaScript entry point
 */
document.addEventListener('DOMContentLoaded', () => {
    // Project data - centralized list of all projects
    const projectsData = [
        { title: 'Mercy Killing', url: 'mercykilling.html' },
        { title: 'Op de wachtlijst', url: 'op_de_wachtlijst.html' },
        { title: 'Bang voor beperking', url: 'bangvoorbeperking.html' },
        { title: 'SAMen dansen met CEMI', url: 'samen_dansen_met_cemi.html' },
        { title: 'SAMen inclusief onderwijs', url: 'samen_inclusief_onderwijs.html' },
        { title: 'Inclusiecharter', url: 'inclusiecharter.html' },
        { title: 'Workouts Sam', url: 'workouts_sam.html' },
        { title: '#sayyes', url: 'sayyes.html' },
        { title: '#mijnassistent', url: 'mijnassistent.html' },
    ];

    // Core functionality that should run on all pages
    const core = {
        init: function () {
            this.updateCopyrightYear();
        },

        // Update copyright year in footer
        updateCopyrightYear: function () {
            const yearElement = document.getElementById('current_year');
            if (yearElement) {
                yearElement.textContent = new Date().getFullYear();
            }
        },
    };

    // Navigation functionality
    const navigation = {
        init: function () {
            this.setupNavigation();
            this.populateProjectsDropdown();
        },

        setupNavigation: function () {
            const navbarToggle = document.querySelector('.navbar__toggle');
            const navbarMenu = document.querySelector('.navbar__menu');
            const dropdownItems = document.querySelectorAll('.navbar__item--has-children');

            if (!navbarToggle || !navbarMenu) {
                return;
            }

            // Function to check if we're on mobile
            const isMobile = () => window.innerWidth <= 768;

            // Hamburger menu toggle
            navbarToggle.addEventListener(
                'click',
                () => {
                    navbarToggle.classList.toggle('is-active');
                    navbarMenu.classList.toggle('is-active');
                },
                { passive: true }
            );

            // Dropdown toggles
            dropdownItems.forEach(item => {
                const link = item.querySelector('.navbar__link');

                if (link) {
                    link.addEventListener('click', e => {
                        e.preventDefault(); // Prevent navigation
                        e.stopPropagation(); // Prevent event bubbling

                        // Close other dropdowns
                        dropdownItems.forEach(otherItem => {
                            if (otherItem !== item) {
                                otherItem.classList.remove('is-active');
                            }
                        });

                        // Toggle current dropdown
                        item.classList.toggle('is-active');
                    });
                }
            });

            // Close menu when clicking outside
            document.addEventListener(
                'click',
                e => {
                    if (!e.target.closest('.navbar')) {
                        dropdownItems.forEach(item => item.classList.remove('is-active'));
                        navbarToggle.classList.remove('is-active');
                        navbarMenu.classList.remove('is-active');
                    }
                },
                { passive: true }
            );

            // Handle window resize
            window.addEventListener(
                'resize',
                () => {
                    if (!isMobile()) {
                        // Keep menu functionality but reset active states
                        dropdownItems.forEach(item => item.classList.remove('is-active'));
                    }
                },
                { passive: true }
            );
        },

        // Populate the projects dropdown with items from the projectsData array
        populateProjectsDropdown: function () {
            const dropdown = document.querySelector('.navbar__dropdown');

            if (!dropdown) return;

            // Clear existing dropdown items
            dropdown.innerHTML = '';

            // Get current page path to handle relative URLs correctly
            const currentPath = window.location.pathname;

            // Determine if we need a path prefix
            let pathPrefix = '';

            // If we're already in the projects folder, don't add prefix
            if (currentPath.includes('/projects/')) {
                pathPrefix = '';
            }
            // If we're at the root or index.html, add projects/ prefix
            else {
                pathPrefix = 'projects/';
            }

            // Add each project to the dropdown
            projectsData.forEach(project => {
                const listItem = document.createElement('li');
                listItem.className = 'navbar__dropdown-item';

                const link = document.createElement('a');
                link.className = 'navbar__link';

                // Handle external URLs (starting with http or https)
                if (project.url.startsWith('http')) {
                    link.href = project.url;
                } else {
                    link.href = pathPrefix + project.url;
                }

                link.textContent = project.title;

                listItem.appendChild(link);
                dropdown.appendChild(listItem);
            });
        },
    };

    // Project page functionality
    const projectPage = {
        init: function () {
            // Check if we're on a project page
            const isProjectPage = document.querySelector('.project__container');
            if (!isProjectPage) return;

            this.setupProjectButton();
        },

        setupProjectButton: function () {
            const button = document.querySelector('.project__btn');

            // Skip if no button or if it's a link button
            if (!button || button.classList.contains('project__btn--link')) return;

            const intro = document.querySelector('.project__intro');
            const image = document.querySelector('.project__image');
            const video = document.querySelector('.project__video');
            const blockquote = document.querySelector('.project__blockquote');
            const navbar = document.querySelector('.navbar');

            if (!button || !intro || !image) return;

            // Check if we have a video or a blockquote
            const hasVideo = video !== null;
            const hasBlockquote = blockquote !== null;

            if (!hasVideo && !hasBlockquote) return;

            // Create a flag to track if video is playing
            let videoPlaying = false;

            // Function to set up YouTube API
            const setupYouTubeAPI = () => {
                // Only setup YouTube API if we have a video element
                if (!hasVideo) return;

                // Create YouTube API script if it doesn't exist
                if (!window.YT) {
                    const tag = document.createElement('script');
                    tag.src = 'https://www.youtube.com/iframe_api';
                    const firstScriptTag = document.getElementsByTagName('script')[0];
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                }
            };

            // Initialize YouTube player once API is ready
            let player;
            if (hasVideo) {
                window.onYouTubeIframeAPIReady = function () {
                    // Extract video ID from iframe src
                    const videoSrc = video.src;
                    const videoId = videoSrc.match(/(?:youtube\.com\/embed\/|youtu\.be\/)([^\/\?&]+)/)?.[1];

                    if (!videoId) return;

                    // Replace iframe with a div for the API player
                    const playerDiv = document.createElement('div');
                    playerDiv.id = 'youtube-player';
                    playerDiv.style.width = '100%';
                    playerDiv.style.height = '100vh';
                    video.parentNode.insertBefore(playerDiv, video);
                    video.remove();

                    // Create player
                    player = new YT.Player('youtube-player', {
                        videoId: videoId,
                        playerVars: {
                            autoplay: 0,
                            controls: 1,
                            rel: 0,
                            showinfo: 0,
                        },
                        events: {
                            onStateChange: onPlayerStateChange,
                        },
                    });
                };
            }

            // Handle player state changes
            function onPlayerStateChange(event) {
                if (event.data === YT.PlayerState.PLAYING) {
                    // Video started playing
                    videoPlaying = true;
                    if (navbar) navbar.style.display = 'none';
                } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
                    // Video paused or ended
                    videoPlaying = false;
                    if (navbar) navbar.style.display = '';
                }
            }

            // Load YouTube API if needed
            if (hasVideo) {
                setupYouTubeAPI();
            }

            // Button click event
            button.addEventListener('click', () => {
                // Hide intro, image, and button
                intro.style.display = 'none';
                image.style.display = 'none';
                button.style.display = 'none';

                if (video) {
                    // Handle video case
                    const playerDiv = document.getElementById('youtube-player');
                    if (playerDiv) {
                        playerDiv.style.zIndex = '10';
                        // Play video if player is ready
                        if (player && typeof player.playVideo === 'function') {
                            player.playVideo();
                            if (navbar) navbar.style.display = 'none';
                        }
                    } else {
                        // If player not ready yet, show original iframe
                        video.style.zIndex = '10';
                        // Add API parameters
                        if (!video.src.includes('enablejsapi=1')) {
                            video.src = video.src + (video.src.includes('?') ? '&' : '?') + 'enablejsapi=1&autoplay=1';
                        }
                        if (navbar) navbar.style.display = 'none';
                    }
                } else if (blockquote) {
                    // Show blockquote
                    blockquote.classList.add('visible');
                }
            });
        },
    };

    // HomePage specific functionality
    const homePage = {
        init: function () {
            // Check if we're on the homepage
            const isHomePage = document.querySelector('.hero') || document.querySelector('.carousel__container');

            if (isHomePage) {
                // Only initialize carousel if it exists
                if (document.querySelector('.carousel__container')) {
                    this.setupCarousel();
                }
            }
        },

        // Carousel functionality
        setupCarousel: function () {
            const carousel = document.querySelector('.carousel__container');
            if (!carousel) return;

            const slides = document.querySelectorAll('.carousel__container__video');
            if (!slides.length) return;

            let currentSlide = 0;
            let isScrolling = false;

            // Accessibility: Update slide attributes
            function updateSlideAccessibility() {
                slides.forEach((slide, index) => {
                    slide.setAttribute('aria-hidden', index !== currentSlide);
                    slide.setAttribute('aria-current', index === currentSlide ? 'true' : 'false');
                });
            }

            // Keyboard Controls for Carousel
            document.addEventListener('keydown', event => {
                if (event.target.closest('.carousel__container')) {
                    switch (event.key) {
                        case 'ArrowRight':
                            currentSlide = (currentSlide + 1) % slides.length;
                            scrollToSlide(currentSlide);
                            updateSlideAccessibility();
                            break;
                        case 'ArrowLeft':
                            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                            scrollToSlide(currentSlide);
                            updateSlideAccessibility();
                            break;
                    }
                }
            });

            // Function to check if device is in portrait mode
            function isPortrait() {
                return window.matchMedia('(orientation: portrait)').matches;
            }

            // Function to update video sources based on orientation
            function updateVideoSources() {
                slides.forEach(slide => {
                    const video = slide.querySelector('video');
                    if (!video) return;

                    // Store original sources if not yet stored
                    if (!video.dataset.landscapeSrc) {
                        video.dataset.landscapeSrc = video.src;
                        // Create portrait source path by replacing the directory
                        const filename = video.src.split('/').pop();
                        video.dataset.portraitSrc = `video/small/${filename}`;
                    }

                    // Set appropriate source based on orientation
                    video.src = isPortrait() ? video.dataset.portraitSrc : video.dataset.landscapeSrc;

                    // If this is the active slide, reload and play
                    if (slide.classList.contains('active')) {
                        video.load();
                        video.play().catch(() => {});
                    }
                });
            }

            // Initialize first slide immediately
            if (slides[0]) {
                slides[0].classList.add('active');
                const firstVideo = slides[0].querySelector('video');
                if (firstVideo) {
                    firstVideo.play().catch(() => {});
                }
            }

            // Update video sources initially
            updateVideoSources();

            // Listen for orientation changes
            window.addEventListener(
                'orientationchange',
                () => {
                    setTimeout(updateVideoSources, 100); // Small delay to ensure orientation has changed
                },
                { passive: true }
            );

            // Also check on resize as some devices may not trigger orientationchange
            window.addEventListener(
                'resize',
                () => {
                    updateVideoSources();
                },
                { passive: true }
            );

            // Create dots navigation
            const header = document.querySelector('.header');
            if (header) {
                const dotsContainer = document.createElement('div');
                dotsContainer.className = 'carousel__dots';
                slides.forEach((_, index) => {
                    const dot = document.createElement('button');
                    dot.className = 'carousel__dot';
                    if (index === 0) dot.classList.add('active');
                    dot.addEventListener('click', () => goToSlide(index));
                    dotsContainer.appendChild(dot);
                });
                header.appendChild(dotsContainer);
            }

            // Get navigation elements
            const prevButton = document.querySelector('.carousel__arrow--prev');
            const nextButton = document.querySelector('.carousel__arrow--next');

            // Scroll handler
            carousel.addEventListener(
                'scroll',
                () => {
                    if (!isScrolling) {
                        const scrollPosition = carousel.scrollLeft;
                        currentSlide = Math.round(scrollPosition / carousel.offsetWidth);

                        // Update active states based on scroll position
                        slides.forEach((slide, index) => {
                            if (index === currentSlide) {
                                slide.classList.add('active');
                                const video = slide.querySelector('video');
                                if (video) video.play().catch(() => {});
                            } else {
                                slide.classList.remove('active');
                                const video = slide.querySelector('video');
                                if (video) video.currentTime = 0;
                            }
                        });

                        // Update dots
                        document.querySelectorAll('.carousel__dot').forEach((dot, i) => {
                            dot.classList.toggle('active', i === currentSlide);
                        });
                    }
                },
                { passive: true }
            );

            function goToSlide(index) {
                isScrolling = true;
                if (index < 0) {
                    index = slides.length - 1;
                } else if (index >= slides.length) {
                    index = 0;
                }

                currentSlide = index;
                const targetSlide = slides[currentSlide];

                // Calculate exact scroll position
                const scrollPosition = targetSlide.offsetLeft;
                carousel.scrollTo({
                    left: scrollPosition,
                    behavior: 'smooth',
                });

                // Reset all videos and remove active class
                slides.forEach(slide => {
                    const video = slide.querySelector('video');
                    if (video) {
                        video.currentTime = 0;
                    }
                    slide.classList.remove('active');
                });

                // Play current video and add active class
                const currentVideo = targetSlide.querySelector('video');
                if (currentVideo) {
                    currentVideo.play();
                }
                targetSlide.classList.add('active');

                // Update dots
                document.querySelectorAll('.carousel__dot').forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });

                // Reset isScrolling after animation completes
                setTimeout(() => {
                    isScrolling = false;
                }, 500);
            }

            // Add click event listeners to buttons
            if (prevButton) {
                prevButton.addEventListener(
                    'click',
                    () => {
                        goToSlide(currentSlide - 1);
                    },
                    { passive: true }
                );
            }

            if (nextButton) {
                nextButton.addEventListener(
                    'click',
                    () => {
                        goToSlide(currentSlide + 1);
                    },
                    { passive: true }
                );
            }

            // Handle keyboard navigation
            document.addEventListener('keydown', e => {
                if (e.key === 'ArrowLeft') {
                    goToSlide(currentSlide - 1);
                } else if (e.key === 'ArrowRight') {
                    goToSlide(currentSlide + 1);
                }
            });

            // Add touch support
            let touchStartX = 0;
            let touchEndX = 0;

            carousel.addEventListener(
                'touchstart',
                e => {
                    touchStartX = e.changedTouches[0].screenX;
                },
                { passive: true }
            );

            carousel.addEventListener(
                'touchend',
                e => {
                    touchEndX = e.changedTouches[0].screenX;
                    handleSwipe();
                },
                { passive: true }
            );

            // Handle swipe function
            function handleSwipe() {
                const SWIPE_THRESHOLD = 50;
                if (touchStartX - touchEndX > SWIPE_THRESHOLD) {
                    goToSlide(currentSlide + 1);
                } else if (touchEndX - touchStartX > SWIPE_THRESHOLD) {
                    goToSlide(currentSlide - 1);
                }
            }
        },
    };

    // Animation observer for about page
    const animateOnScroll = () => {
        const titles = document.querySelectorAll('.about__main__title');
        const texts = document.querySelectorAll('.about__main__text');
        const subtitles = document.querySelectorAll('.about__main__subtitle');

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        titles.forEach(title => observer.observe(title));
        texts.forEach(text => observer.observe(text));
        subtitles.forEach(subtitle => observer.observe(subtitle));
    };

    // Initialize all components
    // Footer generation functionality
    const footerGeneration = {
        socialMediaLinks: [
            {
                platform: 'LinkedIn',
                url: 'https://www.linkedin.com/in/luk-dewulf-7b19935/',
                icon: '../img/some_icons/linkedin.svg',
                alt: 'LinkedIn link',
                target: '_blank',
            },
            {
                platform: 'X',
                url: 'https://x.com/Dewulfluk',
                icon: '../img/some_icons/x.svg',
                alt: 'X profiel',
                target: '_blank',
            },
            {
                platform: 'YouTube',
                url: 'http://www.youtube.com/@DewulfLuk',
                icon: '../img/some_icons/youtube.svg',
                alt: 'YouTube link',
                target: '_blank',
            },
            {
                platform: 'Instagram',
                url: 'https://www.instagram.com/dewulfluk/',
                icon: '../img/some_icons/instagram.svg',
                alt: 'Instagram link',
                target: '_blank',
            },
            {
                platform: 'TikTok',
                url: 'https://www.tiktok.com/@luk.dewulf4',
                icon: '../img/some_icons/tiktok.svg',
                alt: 'TikTok link',
                target: '_blank',
            },
        ],

        init: function () {
            this.generateProjectPageFooter();
        },

        generateProjectPageFooter: function () {
            // Check if we're on a project page and footer doesn't exist
            if (document.querySelector('.project__main') && !document.querySelector('.footer')) {
                const footer = document.createElement('footer');
                footer.className = 'footer';
                footer.setAttribute('role', 'contentinfo');

                // Generate footer HTML dynamically
                footer.innerHTML = `
                    <div class="footer__container">
                        <div class="footer__info">
                            <h2 class="visually-hidden">Contact informatie</h2>
                            <p>Contact</p>
                            <p>
                                <svg class="footer__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.01394 6.87134C1.34749 10.0618 3.85967 13.8597 7.01471 17.0147C10.1698 20.1698 13.9676 22.682 17.1581 22.0155C19.782 21.4674 21.1215 20.0697 21.8754 18.8788C22.1355 18.4678 22.0042 17.9344 21.6143 17.6436L17.9224 14.8897C17.5243 14.5928 16.9685 14.633 16.6174 14.9842L14.6577 16.9438C14.6577 16.9438 12.7529 16.3246 10.2288 13.8006C7.70482 11.2766 7.08564 9.37175 7.08564 9.37175L9.04529 7.4121C9.39648 7.06091 9.43671 6.5052 9.13975 6.10709L6.38585 2.4151C6.09505 2.02525 5.56163 1.89395 5.15068 2.15407C3.9597 2.90794 2.56203 4.24747 2.01394 6.87134Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <a href="tel:+32477616997">+32 (0)477/61.69.97</a> &nbsp; &#124; &nbsp;
                                <svg class="footer__icon" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path class="cls-1" d="M6.47,10.71a2,2,0,0,0-2,2h0V35.32a2,2,0,0,0,2,2H41.53a2,2,0,0,0,2-2h0V12.68a2,2,0,0,0-2-2H6.47Zm33.21,3.82L24,26.07,8.32,14.53" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" />
                                </svg>
                                <a href="mailto:info@deseizoenen.be" target="_top">info&#64;deseizoenen.be</a>
                            </p>
                            <p>&copy; De Seizoenen <span id="current_year"></span></p>
                        </div>
                        <div class="footer__social">
                            <h2 class="visually-hidden">Sociale media</h2>
                            <p>Follow us</p>
                            <div class="footer__social-icons">
                                ${this.socialMediaLinks
                                    .map(
                                        link => `
                                    <a class="footer__social-link" href="${link.url}" ${link.target ? `target="${link.target}"` : ''}>
                                        <img src="${link.icon}" alt="${link.alt}" loading="lazy" />
                                    </a>
                                `
                                    )
                                    .join('')}
                            </div>
                        </div>
                    </div>
                `;

                // Append footer after the main content
                document.querySelector('.project__main').insertAdjacentElement('afterend', footer);

                // Update copyright year
                core.updateCopyrightYear();
            }
        },
    };

    core.init();
    navigation.init();
    homePage.init();
    projectPage.init();
    footerGeneration.init();
    animateOnScroll();
});
