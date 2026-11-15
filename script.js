document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // MENÚ MÓVIL
    // ==============================

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    const menuIcon = menuToggle ? menuToggle.querySelector("span") : null;

    function cerrarMenu() {
        if (!menuToggle || !mainNav) return;

        menuToggle.classList.remove("active");
        mainNav.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");

        if (menuIcon) {
            menuIcon.textContent = "☰";
        }
    }

    function abrirMenu() {
        if (!menuToggle || !mainNav) return;

        menuToggle.classList.add("active");
        mainNav.classList.add("active");

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Cerrar menú");

        if (menuIcon) {
            menuIcon.textContent = "×";
        }
    }

    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            const menuAbierto = mainNav.classList.contains("active");
            if (menuAbierto) {
                cerrarMenu();
            } else {
                abrirMenu();
            }
        });

        // Cerrar al seleccionar un enlace
        mainNav.querySelectorAll("a").forEach((enlace) => {
            enlace.addEventListener("click", cerrarMenu);
        });

        // Cerrar con Escape
        document.addEventListener("keydown", (evento) => {
            if (evento.key === "Escape" && mainNav.classList.contains("active")) {
                cerrarMenu();
                menuToggle.focus();
            }
        });

        // Cerrar al cambiar a pantalla grande (Estándar moderno optimizado)
        const pantallaGrande = window.matchMedia("(min-width: 769px)");
        pantallaGrande.addEventListener("change", (evento) => {
            if (evento.matches) {
                cerrarMenu();
            }
        });
    }

    // ==============================
    // SELECCIONAR SERVICIO AUTOMÁTICAMENTE
    // ==============================

    const servicioSelect = document.getElementById("servicio");

    document.querySelectorAll("[data-service]").forEach((enlace) => {
        enlace.addEventListener("click", () => {
            const servicio = enlace.getAttribute("data-service");
            if (servicioSelect && servicio) {
                servicioSelect.value = servicio;
            }
        });
    });

    // ==============================
    // FORMULARIO DE WHATSAPP
    // ==============================

    const contactForm = document.getElementById("contactForm");
    const numeroWhatsApp = "50687893505"; // Número real configurado

    if (contactForm) {
        contactForm.addEventListener("submit", (evento) => {
            evento.preventDefault();

            if (!contactForm.reportValidity()) {
                return;
            }

            const nombre = document.getElementById("nombre")?.value.trim() || "";
            const telefono = document.getElementById("telefono")?.value.trim() || "";
            const servicio = document.getElementById("servicio")?.value || "";
            const mensaje = document.getElementById("mensaje")?.value.trim() || "";

            if (!nombre || !telefono || !servicio) {
                alert("Por favor, completa los campos obligatorios.");
                return;
            }

            const numeroLimpio = numeroWhatsApp.replace(/\D/g, "");

            if (
                numeroWhatsApp.includes("X") ||
                numeroLimpio.length < 8 ||
                numeroLimpio.length > 15
            ) {
                alert("Configura el número real de WhatsApp en el archivo script.js.");
                return;
            }

            const texto = `Hola, GG Browns Beauty Studio.\n\nMi nombre es: ${nombre}\nMi teléfono: ${telefono}\nServicio de interés: ${servicio}\n\nMensaje: ${mensaje || "Me gustaría obtener más información."}`;

            const url = `https://wa.me/${numeroLimpio}?text=${encodeURIComponent(texto)}`;

            const nuevaVentana = window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

            if (!nuevaVentana) {
                window.location.href = url;
            }
        });
    }

    // ==============================
    // AÑO AUTOMÁTICO DEL FOOTER
    // ==============================

    const currentYear = document.getElementById("currentYear");
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

});
