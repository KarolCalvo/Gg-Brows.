
document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // MENÚ MÓVIL ACCESIBLE
    // =========================================

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        const closeMenu = () => {
            mainNav.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menú");
        };

        const openMenu = () => {
            mainNav.classList.add("active");

            menuToggle.setAttribute("aria-expanded", "true");
            menuToggle.setAttribute("aria-label", "Cerrar menú");
        };

        menuToggle.addEventListener("click", () => {

            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }

        });

        // Cerrar al seleccionar una sección
        mainNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", closeMenu);

        });

        // Cerrar con Escape
        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                closeMenu();
                menuToggle.focus();
            }

        });

        // Cerrar si se hace clic fuera del menú
        document.addEventListener("click", event => {

            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            if (
                isOpen &&
                !mainNav.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }

        });

        // Al regresar a escritorio, restablecer el menú
        window.addEventListener("resize", () => {

            if (window.innerWidth > 768) {
                closeMenu();
            }

        });

    }


    // =========================================
    // AÑO AUTOMÁTICO
    // =========================================

    const year = document.getElementById("currentYear");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    // =========================================
    // SELECCIONAR SERVICIO AUTOMÁTICAMENTE
    // =========================================

    const serviceSelect = document.getElementById("servicio");

    document.querySelectorAll("[data-service]").forEach(link => {

        link.addEventListener("click", () => {

            if (!serviceSelect) return;

            const wanted = link.dataset.service;

            const option = [...serviceSelect.options].find(item => {

                return (
                    item.value.trim() === wanted ||
                    item.textContent.trim() === wanted
                );

            });

            if (option) {
                serviceSelect.value = option.value;
            }

        });

    });


    // =========================================
    // CONFIGURACIÓN DE WHATSAPP
    // =========================================

    // Escribe aquí tu número real.
    // Ejemplo: 50688888888
    // Sin espacios, guiones ni signo +

    const WHATSAPP_NUMBER = "TU_NUMERO_AQUI";


    // =========================================
    // ENLACE DIRECTO A WHATSAPP
    // =========================================

    const whatsappLink = document.getElementById("whatsappLink");

    if (whatsappLink) {

        if (WHATSAPP_NUMBER !== "TU_NUMERO_AQUI") {

            whatsappLink.href =
                `https://wa.me/${WHATSAPP_NUMBER}`;

            whatsappLink.target = "_blank";
            whatsappLink.rel = "noopener noreferrer";

        } else {

            whatsappLink.href = "#contacto";

        }

    }


    // =========================================
    // FORMULARIO DE CONTACTO
    // =========================================

    const form = document.getElementById("contactForm");

    if (form) {

        form.addEventListener("submit", event => {

            event.preventDefault();

            // Validar los campos obligatorios
            if (!form.reportValidity()) {
                return;
            }

            // Verificar número de WhatsApp
            if (
                WHATSAPP_NUMBER === "TU_NUMERO_AQUI" ||
                !/^\d{8,15}$/.test(WHATSAPP_NUMBER)
            ) {

                alert(
                    "Configura tu número de WhatsApp en el archivo script.js."
                );

                return;

            }

            const data = new FormData(form);

            const nombre = data.get("nombre");
            const telefono = data.get("telefono");
            const servicio = data.get("servicio");
            const mensajeUsuario = data.get("mensaje");

            const message = [

                "Hola, deseo solicitar información en GG Browns.",

                `Nombre: ${nombre}`,

                `Teléfono: ${telefono}`,

                `Tratamiento: ${servicio}`,

                `Mensaje: ${mensajeUsuario || "Sin comentarios"}`

            ].join("\n");

            const url =
                `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

            // Abrir WhatsApp
            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

        });

    }

});

