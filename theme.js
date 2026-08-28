(function () {
    const storageKey = "idea-lab-theme";
    const root = document.documentElement;

    function getInitialTheme() {
        try {
            const savedTheme = localStorage.getItem(storageKey);
            if (savedTheme === "dark" || savedTheme === "light") {
                return savedTheme;
            }
        } catch (error) {}

        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    }

    function applyTheme(theme) {
        const isDark = theme === "dark";
        root.classList.toggle("dark", isDark);
        root.style.colorScheme = theme;

        document.querySelectorAll("[data-theme-icon]").forEach(icon => {
            icon.textContent = isDark ? "light_mode" : "dark_mode";
        });

        document.querySelectorAll("[data-theme-toggle]").forEach(button => {
            button.setAttribute(
                "aria-label",
                isDark ? "Switch to light theme" : "Switch to dark theme"
            );
            button.setAttribute("aria-pressed", String(isDark));
        });
    }

    applyTheme(getInitialTheme());

    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll("[data-theme-toggle]").forEach(button => {
            button.addEventListener("click", () => {
                const nextTheme = root.classList.contains("dark") ? "light" : "dark";
                try {
                    localStorage.setItem(storageKey, nextTheme);
                } catch (error) {}
                applyTheme(nextTheme);
            });
        });

        applyTheme(root.classList.contains("dark") ? "dark" : "light");
    });
})();
