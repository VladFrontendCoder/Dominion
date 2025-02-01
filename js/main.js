// START TIMER

function startCountdown(targetDate) {
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            document.getElementById("days").textContent = days;
            document.getElementById("hours").textContent = hours;
            document.getElementById("minutes").textContent = minutes;
            document.getElementById("seconds").textContent = seconds;
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

const countdownDate = new Date("2025-03-02T00:00:00").getTime(); //Write the date when the timer should end
startCountdown(countdownDate);


// END TIMER


// START CODE TO MOVE THE IMAGE UNDER THE TITLE IN THE SECOND SECTION

const aboutWrap = document.querySelector('.about__wrap');
const aboutInfo = document.querySelector('.about__info');
const aboutImg = document.querySelector('.about__img');
const titleH2 = aboutInfo.querySelector('h2');

const mediaWidth = window.matchMedia('(max-width: 992px)');

function handleMobileChange(e) {
    if (e.matches) {
        titleH2.insertAdjacentElement('afterend', aboutImg);
    } else {
        aboutWrap.appendChild(aboutImg);
    }
}

mediaWidth.addEventListener('change', handleMobileChange);
handleMobileChange(mediaWidth);

// END CODE TO MOVE THE IMAGE UNDER THE TITLE IN THE SECOND SECTION


// START FUNCTION FOR THE SHOW MORE BUTTON

function initToggleBlock({
    containerSelector,
    itemSelector,
    moreText = 'Voir plus',
    lessText = 'Masquer',
    mobileMedia = '(max-width: 767px)',
    visibleCount = 3,
}) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const items = container.querySelectorAll(itemSelector);
    if (!items.length) return;
    let toggleButton = null;
    let isExpanded = false;

    const mediaQuery = window.matchMedia(mobileMedia);

    function hideExtraItems() {
        if (items.length > visibleCount) {
            for (let i = visibleCount; i < items.length; i++) {
                items[i].classList.add('hidden');
            }
        }
    }

    function showAllItems() {
        items.forEach(item => item.classList.remove('hidden'));
    }

    function createButtonIfNeeded() {
        if (!toggleButton && items.length > visibleCount) {
            toggleButton = document.createElement('button');
            toggleButton.textContent = moreText;
            toggleButton.className = 'toggle-button';
            container.insertAdjacentElement('afterend', toggleButton);

            toggleButton.addEventListener('click', () => {
                isExpanded = !isExpanded;
                if (isExpanded) {
                    showAllItems();
                    toggleButton.textContent = lessText;
                } else {
                    hideExtraItems();
                    toggleButton.textContent = moreText;
                }
            });
        }
    }

    function removeButtonIfExists() {
        if (toggleButton) {
            toggleButton.remove();
            toggleButton = null;
        }
    }

    function handleScreenChange(e) {
        if (e.matches) {
            createButtonIfNeeded();
            hideExtraItems();
            isExpanded = false;
            if (toggleButton) {
                toggleButton.textContent = moreText;
            }
        } else {
            removeButtonIfExists();
            showAllItems();
        }
    }

    mediaQuery.addEventListener('change', handleScreenChange);
    handleScreenChange(mediaQuery);
}

initToggleBlock({
    containerSelector: '.project-list',
    itemSelector: '.projectCard',
    moreText: 'Voir plus de réalisations',
    lessText: 'Masquer les réalisations',
});

initToggleBlock({
    containerSelector: '.eventGallery__list',
    itemSelector: 'a',
    moreText: 'Voir plus de photos',
    lessText: 'Cacher la photos',
});

// END FUNCTION FOR THE SHOW MORE BUTTON