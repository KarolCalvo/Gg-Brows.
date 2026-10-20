document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. NAVEGACIÓN Y MENÚ HAMBURGUESA ACCESIBLE
    // ==========================================================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    // Imprimir evidencia en la consola del menú
    console.log("Elemento menuToggle encontrado:", menuToggle);
    console.log("Elemento navLinks encontrado:", navLinks);

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            // Alterna la clase para mostrar u ocultar el menú en pantallas estrechas
            navLinks.classList.toggle('nav-activo');

            // Verifica si el menú quedó abierto
            const estaAbierto = navLinks.classList.contains('nav-activo');

            // Actualiza el atributo aria-expanded para cumplir con la accesibilidad (WCAG)
            menuToggle.setAttribute('aria-expanded', estaAbierto);
        });

        // Cerrar menú móvil al hacer clic en un enlace de navegación
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-activo');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ==========================================================================
    // 2. VALIDACIÓN Y FORMULARIO DE CONTACTO
    // ==========================================================================
    const formCita = document.getElementById('formCita');
    const mensajeExito = document.getElementById('mensajeExito');

    // Imprimir evidencia en la consola del formulario
    console.log("Elemento formCita encontrado:", formCita);
    console.log("Elemento mensajeExito encontrado:", mensajeExito);

    if (formCita) {
        // Captura de los controles de entrada
        const nombre = document.getElementById('nombre');
        const email = document.getElementById('email');
        const telefono = document.getElementById('telefono');
        const servicio = document.getElementById('servicio');
        const fecha = document.getElementById('fecha');
        const mensaje = document.getElementById('mensaje');

        // Expresión regular para validación estricta de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // --- Funciones Auxiliares para Manejo de Errores ---
        function mostrarError(input, idError, msg) {
            const errorSpan = document.getElementById(idError);
            input.classList.add('invalid');
            input.classList.remove('valid');
            if (errorSpan) {
                errorSpan.textContent = msg;
                errorSpan.style.display = 'block';
            }
        }

        function limpiarError(input, idError) {
            const errorSpan = document.getElementById(idError);
            input.classList.remove('invalid');
            input.classList.add('valid');
            if (errorSpan) {
                errorSpan.textContent = '';
                errorSpan.style.display = 'none';
            }
        }

        // --- Funciones Individuales de Validación ---
        function validarNombre() {
            const val = nombre.value.trim();
            if (val === '') {
                mostrarError(nombre, 'error-nombre', 'El nombre completo es obligatorio.');
                return false;
            }
            if (val.length < 3) {
                mostrarError(nombre, 'error-nombre', 'El nombre debe tener al menos 3 caracteres.');
                return false;
            }
            limpiarError(nombre, 'error-nombre');
            return true;
        }

        function validarEmail() {
            const val = email.value.trim();
            if (val === '') {
                mostrarError(email, 'error-email', 'El correo electrónico es obligatorio.');
                return false;
            }
            if (!emailRegex.test(val)) {
                mostrarError(email, 'error-email', 'Ingrese un correo electrónico válido (ej. usuario@dominio.com).');
                return false;
            }
            limpiarError(email, 'error-email');
            return true;
        }

        function validarTelefono() {
            const val = telefono.value.trim();
            if (val === '') {
                mostrarError(telefono, 'error-telefono', 'El número de teléfono es obligatorio.');
                return false;
            }
            if (val.length < 8) {
                mostrarError(telefono, 'error-telefono', 'Ingrese un número telefónico válido (mínimo 8 dígitos).');
                return false;
            }
            limpiarError(telefono, 'error-telefono');
            return true;
        }

        function validarServicio() {
            if (!servicio.value) {
                mostrarError(servicio, 'error-servicio', 'Por favor, selecciona un servicio.');
                return false;
            }
            limpiarError(servicio, 'error-servicio');
            return true;
        }

        function validarFecha() {
            if (!fecha.value) {
                mostrarError(fecha, 'error-fecha', 'Selecciona una fecha preferida.');
                return false;
            }
            limpiarError(fecha, 'error-fecha');
            return true;
        }

        function validarMensaje() {
            const val = mensaje.value.trim();
            if (val === '') {
                mostrarError(mensaje, 'error-mensaje', 'El mensaje o nota adicional es obligatorio.');
                return false;
            }
            if (val.length < 10) {
                mostrarError(mensaje, 'error-mensaje', 'El mensaje debe tener al menos 10 caracteres.');
                return false;
            }
            limpiarError(mensaje, 'error-mensaje');
            return true;
        }

        // --- Escuchadores de Eventos para Validación en Tiempo Real (blur/change) ---
        if (nombre) nombre.addEventListener('blur', validarNombre);
        if (email) email.addEventListener('blur', validarEmail);
        if (telefono) telefono.addEventListener('blur', validarTelefono);
        if (servicio) servicio.addEventListener('change', validarServicio);
        if (fecha) fecha.addEventListener('change', validarFecha);
        if (mensaje) mensaje.addEventListener('blur', validarMensaje);

        // --- Evento Submit del Formulario ---
        formCita.addEventListener('submit', (event) => {
            // Previene el envío POST del navegador y evita el error HTTP 405
            event.preventDefault();

            // Evalúa todas las validaciones
            const vNombre = validarNombre();
            const vEmail = validarEmail();
            const vTelefono = validarTelefono();
            const vServicio = validarServicio();
            const vFecha = validarFecha();
            const vMensaje = validarMensaje();

            // Comprueba que todos los campos sean válidos
            if (vNombre && vEmail && vTelefono && vServicio && vFecha && vMensaje) {
                
                // Muestra el mensaje de éxito en pantalla
                if (mensajeExito) {
                    mensajeExito.style.display = 'block';
                    mensajeExito.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }

                // EVIDENCIA SEGURA: Se confirma la validación sin exponer datos sensibles en consola
                console.log("Evento submit: Formulario validado con éxito.");

                // Limpia los campos del formulario y remueve las clases de estado
                formCita.reset();
                [nombre, email, telefono, servicio, fecha, mensaje].forEach(campo => {
                    if (campo) campo.classList.remove('valid');
                });

                // Oculta el mensaje tras 7 segundos
                setTimeout(() => {
                    if (mensajeExito) mensajeExito.style.display = 'none';
                }, 7000);

            } else {
                console.warn("Evento submit: Formulario bloqueado por campos inválidos.");
                if (mensajeExito) mensajeExito.style.display = 'none';
            }
        });
    }
});