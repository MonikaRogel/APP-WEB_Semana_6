document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Formulario cargado correctamente');

    // ===== ELEMENTOS DEL DOM =====
    const form = document.getElementById('registrationForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');
    const statusText = document.getElementById('statusText');

    // Campos del formulario
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const ageInput = document.getElementById('age');
    const messageInput = document.getElementById('message');

    // Elementos de feedback
    const feedbacks = {
        fullName: document.getElementById('nameFeedback'),
        email: document.getElementById('emailFeedback'),
        password: document.getElementById('passwordFeedback'),
        confirmPassword: document.getElementById('confirmFeedback'),
        age: document.getElementById('ageFeedback'),
        message: document.getElementById('messageFeedback')
    };

    // Elementos del medidor de contraseña
    const passwordStrength = document.getElementById('passwordStrength');
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');

    // Contador de caracteres
    const charCount = document.getElementById('charCount');

    // ===== ESTADO DE VALIDACIÓN =====
    const validationState = {
        fullName: false,
        email: false,
        password: false,
        confirmPassword: false,
        age: false,
        message: false
    };

    // ===== EXPRESIONES REGULARES =====
    const REGEX = {
        name: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}(?:\s+[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}){0,}$/,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/
    };

    // ===== GENERAR PARTÍCULAS =====
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        for (let i = 0; i < 40; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.width = `${Math.random() * 4 + 2}px`;
            particle.style.height = particle.style.width;
            particle.style.background = i % 3 === 0 ? '#667eea' : i % 3 === 1 ? '#764ba2' : '#f093fb';
            particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particlesContainer.appendChild(particle);
        }
    }

    // ===== FUNCIÓN PARA MOSTRAR/OCULTAR CONTRASEÑA =====
    function togglePasswordVisibility(inputId, button) {
        const input = document.getElementById(inputId);
        const icon = button.querySelector('i');
        if (input.type === 'password') {
            input.type = 'text';
            icon.className = 'fas fa-eye-slash';
        } else {
            input.type = 'password';
            icon.className = 'fas fa-eye';
        }
    }

    // ===== FUNCIONES PRINCIPALES =====
    
    // Función para capitalizar nombre
    function capitalizeName(name) {
        return name
            .toLowerCase()
            .replace(/\b\w/g, char => char.toUpperCase())
            .replace(/\s+/g, ' ')
            .trim();
    }

    // Función para validar todos los campos
    function validateAllFields() {
        const fields = [
            { name: 'fullName', value: fullNameInput.value },
            { name: 'email', value: emailInput.value },
            { name: 'password', value: passwordInput.value },
            { name: 'confirmPassword', value: confirmPasswordInput.value },
            { name: 'age', value: ageInput.value },
            { name: 'message', value: messageInput.value }
        ];

        let allValid = true;
        fields.forEach(field => {
            if (!validateField(field.name, field.value)) {
                allValid = false;
            }
        });
        
        return allValid;
    }

    // Función para validar un campo individual
    function validateField(fieldName, value) {
        let isValid = false;
        let message = '';
        let icon = '';

        switch(fieldName) {
            case 'fullName':
                if (!value.trim()) {
                    message = 'El nombre es obligatorio';
                    icon = '✗';
                } else if (value.length < 3) {
                    message = 'Mínimo 3 caracteres';
                    icon = '✗';
                } else if (!REGEX.name.test(value)) {
                    message = 'Solo letras y espacios permitidos';
                    icon = '✗';
                } else {
                    isValid = true;
                    message = 'Nombre válido';
                    icon = '✓';
                }
                break;

            case 'email':
                if (!value.trim()) {
                    message = 'El email es obligatorio';
                    icon = '✗';
                } else if (!REGEX.email.test(value)) {
                    message = 'Formato de email inválido';
                    icon = '✗';
                } else {
                    isValid = true;
                    message = 'Email válido';
                    icon = '✓';
                }
                break;

            case 'password':
                if (!value) {
                    message = 'La contraseña es obligatoria';
                    icon = '✗';
                } else if (value.length < 8) {
                    message = 'Mínimo 8 caracteres';
                    icon = '✗';
                } else if (!/[a-z]/.test(value)) {
                    message = 'Necesita una minúscula';
                    icon = '✗';
                } else if (!/[A-Z]/.test(value)) {
                    message = 'Necesita una mayúscula';
                    icon = '✗';
                } else if (!/\d/.test(value)) {
                    message = 'Necesita un número';
                    icon = '✗';
                } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
                    message = 'Necesita un símbolo especial';
                    icon = '✗';
                } else {
                    isValid = true;
                    message = 'Contraseña segura';
                    icon = '✓';
                }
                break;

            case 'confirmPassword':
                if (!value) {
                    message = 'Confirma tu contraseña';
                    icon = '✗';
                } else if (value !== passwordInput.value) {
                    message = 'Las contraseñas no coinciden';
                    icon = '✗';
                } else {
                    isValid = true;
                    message = 'Contraseñas coinciden';
                    icon = '✓';
                }
                break;

            case 'age':
                const age = parseInt(value);
                if (!value.trim()) {
                    message = 'La edad es obligatoria';
                    icon = '✗';
                } else if (isNaN(age) || age < 0) {
                    message = 'Edad inválida';
                    icon = '✗';
                } else if (age < 18) {
                    message = 'Debes ser mayor o igual a 18 años';
                    icon = '✗';
                } else if (age > 120) {
                    message = 'Edad no válida';
                    icon = '✗';
                } else {
                    isValid = true;
                    message = 'Edad válida';
                    icon = '✓';
                }
                break;

            case 'message':
                if (!value.trim()) {
                    message = 'El mensaje es obligatorio';
                    icon = '✗';
                } else if (value.length < 10) {
                    message = 'Mínimo 10 caracteres';
                    icon = '✗';
                } else if (value.length > 500) {
                    message = 'Máximo 500 caracteres';
                    icon = '✗';
                } else {
                    isValid = true;
                    message = 'Mensaje válido';
                    icon = '✓';
                }
                break;
        }

        // Actualizar estado
        validationState[fieldName] = isValid;

        // Actualizar estilo del input
        const input = document.getElementById(fieldName);
        if (input) {
            input.classList.remove('valid', 'invalid');
            if (value.trim().length > 0) {
                input.classList.add(isValid ? 'valid' : 'invalid');
            }
        }

        // Actualizar mensaje de feedback
        const feedback = feedbacks[fieldName];
        if (feedback) {
            feedback.textContent = `${icon} ${message}`;
            feedback.className = `feedback-message ${isValid ? 'feedback-success' : 'feedback-error'}`;
        }

        // Actualizar botón de enviar
        updateSubmitButton();

        return isValid;
    }

    // Función para actualizar fortaleza de contraseña
    function updatePasswordStrength(password) {
        let score = 0;
        
        // Longitud
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        
        // Complejidad
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;
        
        // Definir niveles
        const levels = [
            { color: '#ff5858', text: 'Muy débil', width: '20%' },
            { color: '#fa709a', text: 'Débil', width: '40%' },
            { color: '#fbbf24', text: 'Regular', width: '60%' },
            { color: '#34d399', text: 'Fuerte', width: '80%' },
            { color: '#43e97b', text: 'Muy fuerte', width: '100%' }
        ];
        
        const levelIndex = Math.min(score, 4);
        const level = levels[levelIndex];
        
        // Actualizar visualización
        strengthFill.style.width = level.width;
        strengthFill.style.backgroundColor = level.color;
        strengthText.textContent = level.text;
        strengthText.style.color = level.color;
    }

    // Función para actualizar botón de enviar
    function updateSubmitButton() {
        const allValid = Object.values(validationState).every(v => v);
        submitBtn.disabled = !allValid;
        
        if (allValid) {
            showFormStatus('success', '✅ ¡Todo listo! Puedes crear tu cuenta');
        } else {
            const invalidCount = Object.values(validationState).filter(v => !v).length;
            if (invalidCount > 0) {
                showFormStatus('info', `⚠️ Completa ${invalidCount} campo(s) más`);
            } else {
                showFormStatus('info', 'Completa todos los campos obligatorios');
            }
        }
    }

    // Función para mostrar estado del formulario
    function showFormStatus(type, text) {
        formStatus.className = `form-status status-${type}`;
        statusText.textContent = text;
    }

    // Función para simular envío
    function simulateSubmission() {
        // Deshabilitar botón
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
        
        // Mostrar estado
        showFormStatus('info', '⏳ Creando tu cuenta, por favor espera...');
        
        // Simular tiempo de procesamiento
        setTimeout(() => {
            // Mostrar éxito
            showFormStatus('success', '✅ ¡Cuenta creada con éxito! Bienvenido/a');
            
            // Mostrar datos en consola
            console.log('📊 DATOS REGISTRADOS:');
            console.log('Nombre:', fullNameInput.value);
            console.log('Email:', emailInput.value);
            console.log('Edad:', ageInput.value);
            console.log('Mensaje:', messageInput.value.substring(0, 50) + '...');
            
            // Restaurar botón
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-rocket"></i> Cuenta creada';
            
            // Resetear después de 3 segundos
            setTimeout(() => {
                resetForm();
                showFormStatus('info', '📝 Formulario listo para nuevo registro');
                submitBtn.innerHTML = '<i class="fas fa-rocket"></i> Crear cuenta';
            }, 3000);
            
        }, 1500);
    }

    // Función para resetear formulario
    function resetForm() {
        // Limpiar inputs
        form.reset();
        
        // Limpiar clases de validación
        document.querySelectorAll('.form-input').forEach(input => {
            input.classList.remove('valid', 'invalid');
        });
        
        // Limpiar mensajes de feedback
        Object.values(feedbacks).forEach(feedback => {
            feedback.textContent = '';
            feedback.className = 'feedback-message';
        });
        
        // Resetear estado de validación
        Object.keys(validationState).forEach(key => {
            validationState[key] = false;
        });
        
        // Resetear medidor de contraseña
        passwordStrength.classList.remove('show');
        strengthFill.style.width = '0%';
        strengthText.textContent = 'Escribe para medir';
        strengthText.style.color = '#a0aec0';
        
        // Resetear contador de caracteres
        charCount.textContent = '0';
        charCount.style.color = '';
        
        // Restablecer el mensaje informativo para el campo de mensaje
        const messageFeedback = document.getElementById('messageFeedback');
        messageFeedback.textContent = 'ℹ️ Mínimo 10 caracteres, máximo 500';
        messageFeedback.className = 'feedback-message feedback-info';
        
        // Actualizar botón
        updateSubmitButton();
    }

    // ===== INICIALIZACIÓN =====
    function initForm() {
        // Crear partículas
        createParticles();
        
        // Mostrar mensaje informativo inicial en el campo de mensaje
        const messageFeedback = document.getElementById('messageFeedback');
        messageFeedback.textContent = 'ℹ️ Mínimo 10 caracteres, máximo 500';
        messageFeedback.className = 'feedback-message feedback-info';
        
        // ===== TOGGLE VISIBILIDAD CONTRASEÑA =====
        document.getElementById('togglePassword').addEventListener('click', function() {
            togglePasswordVisibility('password', this);
        });
        
        document.getElementById('toggleConfirmPassword').addEventListener('click', function() {
            togglePasswordVisibility('confirmPassword', this);
        });
        
        // ===== AUTO-CAPITALIZACIÓN DE NOMBRE =====
        fullNameInput.addEventListener('blur', function() {
            if (this.value.trim()) {
                this.value = capitalizeName(this.value);
                validateField('fullName', this.value);
            }
        });
        
        // ===== VALIDACIÓN EN TIEMPO REAL =====
        fullNameInput.addEventListener('input', function() {
            validateField('fullName', this.value);
        });
        
        emailInput.addEventListener('input', function() {
            validateField('email', this.value);
        });
        
        passwordInput.addEventListener('input', function() {
            const value = this.value;
            validateField('password', value);
            
            // Mostrar/ocultar medidor
            if (value.length > 0) {
                passwordStrength.classList.add('show');
                updatePasswordStrength(value);
            } else {
                passwordStrength.classList.remove('show');
                strengthFill.style.width = '0%';
                strengthText.textContent = 'Escribe para medir';
                strengthText.style.color = '#a0aec0';
            }
            
            // Validar confirmación si hay valor
            if (confirmPasswordInput.value) {
                validateField('confirmPassword', confirmPasswordInput.value);
            }
        });
        
        confirmPasswordInput.addEventListener('input', function() {
            validateField('confirmPassword', this.value);
        });
        
        ageInput.addEventListener('input', function() {
            validateField('age', this.value);
        });
        
        // Evento focus para el campo de mensaje (para quitar el mensaje informativo)
        messageInput.addEventListener('focus', function() {
            // Si el mensaje actual es el informativo, lo limpiamos
            const messageFeedback = document.getElementById('messageFeedback');
            if (messageFeedback.textContent.includes('Mínimo 10')) {
                messageFeedback.textContent = '';
            }
        });
        
        messageInput.addEventListener('input', function() {
            const length = this.value.length;
            charCount.textContent = length;
            
            // Cambiar color según longitud
            if (length > 450) {
                charCount.style.color = '#ff5858';
            } else if (length > 300) {
                charCount.style.color = '#fa709a';
            } else if (length > 0) {
                charCount.style.color = '#43e97b';
            } else {
                charCount.style.color = '';
            }
            
            validateField('message', this.value);
        });
        
        // ===== ENVÍO DEL FORMULARIO =====
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateAllFields()) {
                simulateSubmission();
            } else {
                showFormStatus('error', '❌ Por favor, corrige los errores antes de enviar');
            }
        });
        
        // ===== BOTÓN REINICIAR =====
        document.getElementById('resetBtn').addEventListener('click', function() {
            resetForm();
        });
        
        // Inicializar estado
        updateSubmitButton();
        
        console.log('✅ Todos los event listeners configurados');
    }

    // Iniciar formulario
    initForm();
});