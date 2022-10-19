function useObserver(target, cb) {
	var observer = new IntersectionObserver(cb, { rootMargin: "20px 0px -20px 0px" });
	observer.observe(target);
}

function setActiveMenu(menu) {
	var activeMenu = document.querySelector(".navbar__items-link.active");
	if (activeMenu) activeMenu.classList.remove("active");

	document.querySelector(`[data-link="${menu}"]`).classList.add("active");
}

function toggleMenu() {
	var navbar = document.querySelector("nav");

	if (navbar.classList.contains("navbar__expand")) {
		document.querySelector("#menu-backdrop").remove();
		navbar.classList.remove("navbar__expand");
	} else {
		var backdrop = document.createElement("div");
		backdrop.id = "menu-backdrop";
		backdrop.style.position = "fixed";
		backdrop.style.top = 0;
		backdrop.style.bottom = 0;
		backdrop.style.left = 0;
		backdrop.style.right = 0;
		backdrop.style.zIndex = 45;
		backdrop.onclick = toggleMenu;

		navbar.classList.add("navbar__expand");
		document.querySelector("body").append(backdrop);
	}
}

function animationContextListener(event) {
	event.preventDefault();
	const parent = document.createElement("div");
	parent.classList.add("centered-fixed", "type-container");

	document.querySelector("body").append(parent);
	typewritter(
		parent,
		[
			{ ACTION: "WRITE", PAYLOAD: "Dear,", SPEED: 50 },
			{ ACTION: "PAUSE", PAYLOAD: 150 },
			{ ACTION: "WRITE", PAYLOAD: "\tWhoever You Are.", SPEED: 50 },
			{ ACTION: "PAUSE", PAYLOAD: 300 },
			{ ACTION: "WRITE", PAYLOAD: "\n\nThank you for visiting my website.", SPEED: 50 },
			{ ACTION: "PAUSE", PAYLOAD: 150 },
			{ ACTION: "WRITE", PAYLOAD: "\nBut for the record, I spent zero effort on the security of this website.", SPEED: 50 },
			{ ACTION: "PAUSE", PAYLOAD: 150 },
			{ ACTION: "WRITE", PAYLOAD: "\n\nSo I beg you", SPEED: 50 },
			{ ACTION: "PAUSE", PAYLOAD: 500 },
			{ ACTION: "WRITE", PAYLOAD: "\nTolong jangan menyerang. . .", SPEED: 50 },
			{ ACTION: "WRITE", PAYLOAD: "🙏", SPEED: 0 },
			{ ACTION: "PAUSE", PAYLOAD: 150 },
			{ ACTION: "WRITE", PAYLOAD: "\n\nBest regards,", SPEED: 50 },
			{ ACTION: "PAUSE", PAYLOAD: 150 },
			{ ACTION: "WRITE", PAYLOAD: "\tKetua komin-", SPEED: 50 },
			{ ACTION: "PAUSE", PAYLOAD: 100 },
			{ ACTION: "DELETE", PAYLOAD: 12, SPEED: 20 },
			{ ACTION: "PAUSE", PAYLOAD: 100 },
			{ ACTION: "WRITE", PAYLOAD: "Ehhemm...", SPEED: 20 },
			{ ACTION: "PAUSE", PAYLOAD: 500 },
			{ ACTION: "DELETE", PAYLOAD: 9, SPEED: 25 },
			{ ACTION: "PAUSE", PAYLOAD: 150 },
			{ ACTION: "WRITE", PAYLOAD: "Hafid Riyadi.", SPEED: 50 },
			{ ACTION: "PAUSE", PAYLOAD: 300 },
		],
		() => {
			const container = document.createElement("div");
			container.classList.add("message__action");
			const okBtn = document.createElement("button");
			okBtn.classList.add("btn", "btn__primary");
			okBtn.textContent = "Siap! saya tidak akan menyerang 👍🏽";
			okBtn.onclick = () => parent.remove();
			const noBtn = document.createElement("button");
			noBtn.classList.add("btn", "btn__danger");
			noBtn.textContent = "Bruh! that's why they called me Hacker 😈";
			noBtn.onclick = () => {
				document.querySelector("#home").scrollIntoView();
				const body = document.querySelector("body");
				body.classList.add("crash");
				const impact = document.createElement("div");
				impact.classList.add("impact");
				parent.remove();
				document.querySelector("body").append(impact);
			};
			container.append(okBtn, noBtn);
			parent.append(container);
		}
	);
}

function formSubmitHandler(event) {
	event.preventDefault();
	this.reset();

	const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener("mouseenter", Swal.stopTimer);
			toast.addEventListener("mouseleave", Swal.resumeTimer);
		},
	});

	Toast.fire({
		icon: "success",
		title: "Pesan Berhasi Dikirim!",
	});
	return false;
}

document.querySelector("form").addEventListener("submit", formSubmitHandler);

document.addEventListener("scroll", function (event) {
	var navbar = document.querySelector("nav");
	var scrollTopBtn = document.querySelector("#scroll-top-btn");
	var { scrollY } = window;

	if (scrollY >= 85) {
		navbar.classList.add("navbar__active");
		scrollTopBtn.style.transform = "scale(1)";
	} else {
		navbar.classList.remove("navbar__active");
		scrollTopBtn.style.transform = "scale(0)";
	}
});

document.addEventListener("DOMContentLoaded", function () {
	document.querySelector(".preloader").remove();

	var menuToggle = document.querySelector("#menu-toggle-btn");

	var HOME_SECTION = document.querySelector("#home");
	var ABOUT_SECTION = document.querySelector("#about");
	var EXPERIENCES_SECTION = document.querySelector("#experiences");
	var EDUCATIONS_SECTION = document.querySelector("#educations");
	var ACHIVMENTS_SECTION = document.querySelector("#achivments");
	var CONTACT_SECTION = document.querySelector("#contact");

	var I18N_ITEMS = document.querySelectorAll("[data-i18n-key]");

	menuToggle.addEventListener("click", toggleMenu);

	var locale = localStorage.getItem("locale") ?? "id";
	document.querySelector("[data-translate-btn]").addEventListener("click", function () {
		locale = locale == "id" ? "en" : "id";
		localStorage.setItem("locale", locale);

		useLocalization(I18N_ITEMS, locale);
	});

	useLocalization(I18N_ITEMS, locale);

	useObserver(HOME_SECTION, (entries) => {
		entries.forEach((entry) => {
			const title = entry.target.querySelector("#home-section-title");
			const image = entry.target.querySelector("#home-section-image");

			if (entry.isIntersecting) {
				title.style.transform = "translateX(0)";
				image.style.transform = "translateX(0)";
			} else {
				title.style.transform = "translateX(-999px)";
				image.style.transform = "translateX(999px)";
			}
		});
	});

	useObserver(ABOUT_SECTION, (entries) => {
		entries.forEach((entry) => {
			const title = entry.target.querySelector("#about-section-title h1");
			const description = entry.target.querySelector("#about-section-description");
			const skills = entry.target.querySelectorAll("#about-section-skills .skill");

			if (entry.isIntersecting) {
				title.style.transform = "scale(1)";
				description.style.transform = "translateX(0)";
				skills.forEach((skill, index) => {
					const delay = 300 + 100 * index;
					skill.style.transform = "scale(1)";
					skill.style.transitionDelay = delay + "ms";
					skill.onmouseenter = () => (skill.style.transitionDelay = "0ms");
				});
			} else {
				title.style.transform = "scale(0)";
				description.style.transform = "translateX(-999px)";
				skills.forEach((skill, index) => {
					skill.style.transform = "scale(0)";
					skill.style.transitionDelay = "0ms";
				});
			}
		});
	});

	useObserver(EXPERIENCES_SECTION, (entries) => {
		entries.forEach((entry) => {
			const title = entry.target.querySelector("#experiences-section-title h1");
			const projects = entry.target.querySelectorAll("#experiences-section-projects > div");

			if (entry.isIntersecting) {
				title.style.transform = "scale(1)";
				projects.forEach((project, index) => {
					const delay = 300 + 100 * index;
					project.style.transform = "scale(1)";
					project.style.transitionDelay = delay + "ms";
				});
			} else {
				title.style.transform = "scale(0)";
				projects.forEach((project, index) => {
					project.style.transform = "scale(0)";
					project.style.transitionDelay = "0ms";
				});
			}
		});
	});

	useObserver(EDUCATIONS_SECTION, (entries) => {
		entries.forEach((entry) => {
			const title = entry.target.querySelector("#educations-section-title h1");
			const histories = entry.target.querySelectorAll("#educations-section-histories > div");

			if (entry.isIntersecting) {
				title.style.transform = "scale(1)";
				histories.forEach((history, index) => {
					const delay = 300 + 100 * index;
					history.style.transform = "scale(1)";
					history.style.transitionDelay = delay + "ms";
				});
			} else {
				title.style.transform = "scale(0)";
				histories.forEach((history, index) => {
					history.style.transform = "scale(0)";
					history.style.transitionDelay = "0ms";
				});
			}
		});
	});

	useObserver(ACHIVMENTS_SECTION, (entries) => {
		entries.forEach((entry) => {
			const title = entry.target.querySelector("#achivments-section-title h1");
			const achivments = entry.target.querySelectorAll("#achivments-section-lists > div");

			if (entry.isIntersecting) {
				title.style.transform = "scale(1)";
				achivments.forEach((history, index) => {
					const delay = 300 + 100 * index;
					history.style.transform = "scale(1)";
					history.style.transitionDelay = delay + "ms";
				});
			} else {
				title.style.transform = "scale(0)";
				achivments.forEach((history, index) => {
					history.style.transform = "scale(0)";
					history.style.transitionDelay = "0ms";
				});
			}
		});
	});

	useObserver(CONTACT_SECTION, (entries) => {
		entries.forEach((entry) => {
			const title = entry.target.querySelector("#contact-section-title h1");
			const form = entry.target.querySelector("#contact-section-form");
			const info = entry.target.querySelector("#contact-section-info");

			if (entry.isIntersecting) {
				title.style.transform = "scale(1)";
				form.style.transform = "translateX(0)";
				info.style.transform = "translateX(0)";
			} else {
				title.style.transform = "scale(0)";
				form.style.transform = "translateX(-999px)";
				info.style.transform = "translateX(999px)";
			}
		});
	});

	document.addEventListener("contextmenu", animationContextListener, { once: true });

	[("/img/animation/bomb.png", "/img/animation/explosion.gif")].forEach(function (item) {
		var img = new Image();
		img.src = item;
	});
	console.clear();
	console.log(`
	██╗  ██╗ █████╗  ██████╗██╗  ██╗███████╗██████╗          ██╗ ██████╗ ███╗   ██╗    ███╗   ███╗███████╗██╗  ██╗
	██║  ██║██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗         ██║██╔════╝ ████╗  ██║    ████╗ ████║██╔════╝██║ ██╔╝
	███████║███████║██║     █████╔╝ █████╗  ██████╔╝         ██║██║  ███╗██╔██╗ ██║    ██╔████╔██║███████╗█████╔╝
	██╔══██║██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗    ██   ██║██║   ██║██║╚██╗██║    ██║╚██╔╝██║╚════██║██╔═██╗
	██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║    ╚█████╔╝╚██████╔╝██║ ╚████║    ██║ ╚═╝ ██║███████║██║  ██╗
	╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝     ╚════╝  ╚═════╝ ╚═╝  ╚═══╝    ╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝

	`);
});

document.querySelectorAll(".navbar__items-link").forEach(function (items) {
	items.addEventListener("click", function (event) {
		setActiveMenu(this.dataset.link);
	});
});
