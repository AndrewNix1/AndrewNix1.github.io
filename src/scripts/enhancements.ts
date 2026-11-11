type Season = "spring" | "summer" | "autumn" | "winter";

const seasonMeta: Record<
  Season,
  {
    themeColor: string;
    particles: Array<{
      type: string;
      count: number;
      size: [number, number];
      duration: [number, number];
    }>;
  }
> = {
  spring: {
    themeColor: "#f6eee9",
    particles: [
      { type: "petal", count: 18, size: [5, 10], duration: [12, 22] },
      { type: "firefly", count: 5, size: [2, 4], duration: [8, 15] },
    ],
  },
  summer: {
    themeColor: "#eef4ed",
    particles: [
      { type: "firefly", count: 22, size: [2, 5], duration: [7, 16] },
      { type: "breeze", count: 5, size: [36, 80], duration: [13, 23] },
    ],
  },
  autumn: {
    themeColor: "#f3eee2",
    particles: [
      { type: "leaf", count: 20, size: [6, 13], duration: [12, 24] },
    ],
  },
  winter: {
    themeColor: "#edf1f4",
    particles: [
      { type: "snow", count: 32, size: [2, 6], duration: [10, 22] },
    ],
  },
};

function getStoredSeason(): Season | null {
  try {
    const value = localStorage.getItem("season-theme");
    return value === "spring" ||
      value === "summer" ||
      value === "autumn" ||
      value === "winter"
      ? value
      : null;
  } catch {
    return null;
  }
}

function getSeasonFromMonth(): Season {
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function createParticles(season: Season) {
  const container = document.querySelector<HTMLElement>("#season-particles");
  if (!container) return;

  container.replaceChildren();
  const fragment = document.createDocumentFragment();

  seasonMeta[season].particles.forEach((group) => {
    for (let index = 0; index < group.count; index += 1) {
      const particle = document.createElement("span");
      const size = randomBetween(group.size[0], group.size[1]);
      const duration = randomBetween(group.duration[0], group.duration[1]);

      particle.className = `particle particle--${group.type}`;
      particle.style.setProperty("--particle-x", `${randomBetween(2, 98)}%`);
      particle.style.setProperty("--particle-size", `${size}px`);
      particle.style.setProperty("--particle-duration", `${duration}s`);
      particle.style.setProperty("--particle-delay", `${randomBetween(-24, 0)}s`);
      particle.style.setProperty("--particle-drift", `${randomBetween(-90, 90)}px`);
      particle.style.setProperty("--particle-spin", `${randomBetween(180, 720)}deg`);
      particle.style.setProperty("--particle-opacity", `${randomBetween(0.28, 0.72)}`);
      fragment.appendChild(particle);
    }
  });

  container.appendChild(fragment);
}

function applySeason(season: Season, persist = true) {
  document.documentElement.dataset.season = season;

  document.querySelectorAll<HTMLButtonElement>("[data-season-choice]").forEach((button) => {
    const active = button.dataset.seasonChoice === season;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  const themeMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  themeMeta?.setAttribute("content", seasonMeta[season].themeColor);

  if (persist) {
    try {
      localStorage.setItem("season-theme", season);
    } catch {
      // The visual theme should still work if storage is unavailable.
    }
  }

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    createParticles(season);
  }
}

function setupSeasonSwitcher() {
  const initial =
    (document.documentElement.dataset.season as Season | undefined) ??
    getStoredSeason() ??
    getSeasonFromMonth();

  applySeason(initial, false);

  document.querySelectorAll<HTMLButtonElement>("[data-season-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      const season = button.dataset.seasonChoice as Season | undefined;
      if (season) applySeason(season);
    });
  });
}

function setupFloatingCards() {
  const canTilt =
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!canTilt) return;

  document.querySelectorAll<HTMLElement>(".float-card").forEach((card) => {
    let frame = 0;

    const setVariables = (event: PointerEvent) => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;

      card.style.setProperty("--tilt-x", `${((0.5 - y) * 4.2).toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${((x - 0.5) * 5.2).toFixed(2)}deg`);
      card.style.setProperty("--glow-x", `${(x * 100).toFixed(1)}%`);
      card.style.setProperty("--glow-y", `${(y * 100).toFixed(1)}%`);
    };

    card.addEventListener("pointermove", (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setVariables(event));
    });

    card.addEventListener("pointerleave", () => {
      cancelAnimationFrame(frame);
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
      card.style.setProperty("--glow-x", "50%");
      card.style.setProperty("--glow-y", "50%");
    });
  });
}

setupSeasonSwitcher();
setupFloatingCards();
