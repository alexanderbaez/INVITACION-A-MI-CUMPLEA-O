// ==========================================
// CONFIGURACIÓN DE LA FECHA DEL EVENTO
// IMPORTANTE: Mes en INGLÉS y hora formato 24hs (00 a 23)
// Ejemplo: Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec
// ==========================================
const FECHA_EVENTO = "Aug 25, 2026 18:30:00"; 

// Configuración de Swiper
const swiper = new Swiper(".mySwiper", {
    loop: true,
    autoplay: { delay: 3000, disableOnInteraction: false },
    pagination: { el: ".swiper-pagination", clickable: true },
});

// Función de Inicio: Audio + Confeti
function iniciarInvitacion() {
    const audio = document.getElementById('musicaCumple');
    audio.play().catch(e => console.log("Audio play blocked"));
    document.getElementById('overlay').style.transform = 'translateY(-100%)';
    lanzarConfetiOriginal();
}

function lanzarConfetiOriginal() {
    var duration = 3 * 1000;
    var end = Date.now() + duration;
    (function frame() {
        confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 } });
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
}

// Lógica de Fuegos Artificiales
function lanzarFuegosArtificiales() {
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        var particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

// Reloj Adaptativo
const targetDate = new Date(FECHA_EVENTO).getTime();

const timerInterval = setInterval(() => {
    const now = new Date().getTime();
    const diff = targetDate - now;

    // Elementos del DOM
    const dEl = document.getElementById("days");
    const hEl = document.getElementById("hours");
    const mEl = document.getElementById("minutes");
    const sEl = document.getElementById("seconds");

    if (diff <= 0) {
        clearInterval(timerInterval);
        document.getElementById("countdown").innerHTML = "<h2 style='color:#2ed573; margin:0; font-size: 1.5rem;'>¡LLEGÓ EL DÍA! 🎂</h2>";
        document.getElementById("countdown-title").innerText = "¡ESTAMOS DE FIESTA!";
        lanzarFuegosArtificiales();
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    if(dEl) dEl.innerText = d < 10 ? "0"+d : d;
    if(hEl) hEl.innerText = h < 10 ? "0"+h : h;
    if(mEl) mEl.innerText = m < 10 ? "0"+m : m;
    if(sEl) sEl.innerText = s < 10 ? "0"+s : s;
}, 1000);

// Lógica del Modal
function abrirModal() {
    document.getElementById("modalAsistencia").style.display = "block";
    document.body.style.overflow = "hidden";
}
function cerrarModal() {
    document.getElementById("modalAsistencia").style.display = "none";
    document.body.style.overflow = "auto";
}
window.onclick = function(event) {
    if (event.target == document.getElementById("modalAsistencia")) cerrarModal();
}
function togglePersonas() {
    const asistencia = document.getElementById("asistencia").value;
    document.getElementById("seccion-personas").style.display = (asistencia === "No") ? "none" : "block";
}
function enviarAsistencia() {
    const nombre = document.getElementById("nombre").value.trim();
    const asistencia = document.getElementById("asistencia").value;
    const personas = document.getElementById("personas").value;
    if (!nombre || !asistencia || (asistencia === "Sí" && !personas)) {
        alert("Por favor, completa los campos requeridos.");
        return;
    }
    let mensaje = `👋 ¡Hola! Soy *${nombre}*.\n\n`;
    if (asistencia === "Sí") {
        mensaje += `✅ Confirmo mi asistencia al cumple de Maximo.\n👥 ${personas}.\n\n¡Nos vemos! 🎉`;
    } else {
        mensaje += `❌ No podré asistir al cumple.\n🙏 ¡Que lo pasen lindo!`;
    }
    window.open(`https://wa.me/5492644629511?text=${encodeURIComponent(mensaje)}`, '_blank');
}