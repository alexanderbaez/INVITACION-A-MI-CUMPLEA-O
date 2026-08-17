/* =====================================================
   CONFIGURACIÓN
   ===================================================== */

/*
 * =====================================================
 * 👇 DATOS QUE TENÉS QUE MODIFICAR
 * =====================================================
 */

const FECHA_EVENTO = "Aug 25, 2026 18:30:00";

const NUMERO_WHATSAPP = "5492644629511";


/*
 * =====================================================
 * CONFIGURACIÓN DE LA EXPLOSIÓN
 * =====================================================
 */

const EXPLOSION_CONFIG = {

    /*
     * Cantidad de partículas.
     */
    particulas: 180,

    /*
     * Distancia mínima y máxima.
     */
    distanciaMin: 90,
    distanciaMax: 520,

    /*
     * Tamaño de las partículas.
     */
    tamanoMin: 3,
    tamanoMax: 10,

    /*
     * DURACIÓN AUMENTADA.
     *
     * Antes:
     * 650 - 1150 ms
     *
     * Ahora:
     * 1000 - 1800 ms
     *
     * Esto hace que las partículas
     * permanezcan visibles mucho más tiempo.
     */
    duracionMin: 1000,
    duracionMax: 1800,

    /*
     * Cantidad de humo.
     */
    humo: 28

};


/*
 * =====================================================
 * CONFIGURACIÓN DEL CONFETI
 * =====================================================
 */

const CONFETI_CONFIG = {

    duracionLluvia: 2200,

    intervalo: 220,

    explosionInicial: 70,

    lateralPorOleada: 7,

    superiorPorOleada: 4,

    ticksLateral: 150,

    ticksSuperior: 160,

    ticksExplosion: 160

};


/* =====================================================
   ELEMENTOS
   ===================================================== */

const overlay =
    document.getElementById("overlay");


const audio =
    document.getElementById("musicaCumple");


/* =====================================================
   SWIPER
   ===================================================== */

const swiperElement =
    document.querySelector(".mySwiper");


let swiper = null;


if (
    swiperElement &&
    typeof Swiper !== "undefined"
) {

    swiper = new Swiper(
        ".mySwiper",
        {

            loop: true,

            centeredSlides: true,

            slidesPerView: 1,

            spaceBetween: 15,

            grabCursor: true,

            autoplay: {

                delay: 4000,

                disableOnInteraction: false,

                pauseOnMouseEnter: true

            },

            pagination: {

                el: ".swiper-pagination",

                clickable: true

            },

            navigation: {

                nextEl: ".swiper-button-next",

                prevEl: ".swiper-button-prev"

            },

            effect: "slide",

            speed: 650

        }
    );

}


/* =====================================================
   APERTURA DE LA INVITACIÓN
   ===================================================== */

let invitacionIniciada = false;


function iniciarInvitacion() {

    /*
     * Evitamos que el botón pueda ejecutar
     * la animación dos veces.
     */

    if (invitacionIniciada) {

        return;

    }


    invitacionIniciada = true;


    if (!overlay) {

        return;

    }


    /*
     * Bloqueamos el scroll durante
     * toda la animación.
     */

    document.body.style.overflow =
        "hidden";


    /* =================================================
       AUDIO
       ================================================= */

    if (audio) {

        audio.volume = 0.35;


        audio.play().catch(error => {

            console.log(
                "El navegador bloqueó el audio:",
                error
            );

        });

    }


    /* =================================================
       EXPLOSIÓN
       ================================================= */

    lanzarExplosion();


    /*
     * Polvo.
     */

    setTimeout(() => {

        crearPolvo();

    }, 100);


    /*
     * =================================================
     * CONFETI
     * =================================================
     */

    setTimeout(() => {

        lanzarConfetiPotente();

    }, 180);


    /*
     * =================================================
     * SALIDA DEL OVERLAY
     * =================================================
     *
     * ANTES:
     * 280 ms
     *
     * AHORA:
     * 1900 ms
     *
     * Esto es fundamental.
     *
     * La explosión necesita tiempo para
     * desarrollarse antes de sacar el overlay.
     */

    setTimeout(() => {

        overlay.classList.add(
            "opening-finished"
        );


        /*
         * Esperamos a que termine
         * la transición del overlay.
         */

        setTimeout(() => {

            document.body.style.overflow =
                "auto";

        }, 750);

    }, 1900);

}


/* =====================================================
   EXPLOSIÓN PROFESIONAL
   ===================================================== */

function lanzarExplosion() {

    if (!overlay) {

        return;

    }


    /*
     * Contenedor de la explosión.
     */

    const explosionLayer =
        document.createElement("div");


    explosionLayer.className =
        "explosion-layer";


    explosionLayer.style.position =
        "absolute";


    explosionLayer.style.inset =
        "0";


    explosionLayer.style.pointerEvents =
        "none";


    explosionLayer.style.zIndex =
        "4050";


    overlay.appendChild(
        explosionLayer
    );


    /* =================================================
       FLASH
       ================================================= */

    const flash =
        document.createElement("div");


    flash.className =
        "explosion-flash";


    explosionLayer.appendChild(
        flash
    );


    /* =================================================
       ONDA
       ================================================= */

    const wave =
        document.createElement("div");


    wave.className =
        "explosion-wave";


    explosionLayer.appendChild(
        wave
    );


    /* =================================================
       ANILLO
       ================================================= */

    const ring =
        document.createElement("div");


    ring.className =
        "explosion-ring";


    explosionLayer.appendChild(
        ring
    );


    /*
     * Activamos las animaciones después
     * de insertar los elementos.
     */

    requestAnimationFrame(() => {

        flash.classList.add(
            "active"
        );

        wave.classList.add(
            "active"
        );

        ring.classList.add(
            "active"
        );

    });


    /* =================================================
       PARTÍCULAS
       ================================================= */

    crearParticulasExplosion(
        explosionLayer
    );


    /* =================================================
       HUMO
       ================================================= */

    crearHumoExplosion(
        explosionLayer
    );


    /* =================================================
       SACUDIDA
       ================================================= */

    overlay.animate(

        [

            {
                transform:
                    "translate(0, 0) scale(1)"
            },

            {
                transform:
                    "translate(-10px, 4px) scale(1.01)"
            },

            {
                transform:
                    "translate(10px, -4px) scale(1.01)"
            },

            {
                transform:
                    "translate(-7px, 3px) scale(1.005)"
            },

            {
                transform:
                    "translate(7px, -3px) scale(1.005)"
            },

            {
                transform:
                    "translate(0, 0) scale(1)"
            }

        ],

        {

            duration: 520,

            easing:
                "cubic-bezier(.36,.07,.19,.97)"

        }

    );


    /*
     * Limpieza.
     *
     * El humo puede durar hasta
     * aproximadamente 2200 ms.
     *
     * Por eso no podemos eliminar
     * el contenedor a los 1500 ms.
     */

    setTimeout(() => {

        explosionLayer.remove();

    }, 2400);

}


/* =====================================================
   PARTÍCULAS DE EXPLOSIÓN
   ===================================================== */

function crearParticulasExplosion(
    container
) {

    if (!container) {

        return;

    }


    const colores = [

        "#ffffff",

        "#ffd43b",

        "#ff3048",

        "#ff8a3d",

        "#ffef9a",

        "#ffb347",

        "#fff4c2"

    ];


    const cantidad =
        EXPLOSION_CONFIG.particulas;


    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        const particle =
            document.createElement("div");


        particle.className =
            "explosion-particle";


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            EXPLOSION_CONFIG.distanciaMin +
            Math.random() *
            (
                EXPLOSION_CONFIG.distanciaMax -
                EXPLOSION_CONFIG.distanciaMin
            );


        const tx =
            Math.cos(angle) *
            distance;


        const ty =
            Math.sin(angle) *
            distance;


        const size =
            EXPLOSION_CONFIG.tamanoMin +
            Math.random() *
            (
                EXPLOSION_CONFIG.tamanoMax -
                EXPLOSION_CONFIG.tamanoMin
            );


        const duration =
            EXPLOSION_CONFIG.duracionMin +
            Math.random() *
            (
                EXPLOSION_CONFIG.duracionMax -
                EXPLOSION_CONFIG.duracionMin
            );


        const rotation =
            (
                Math.random() *
                1080
            ) -
            540;


        particle.style.setProperty(
            "--tx",
            `${tx}px`
        );


        particle.style.setProperty(
            "--ty",
            `${ty}px`
        );


        particle.style.setProperty(
            "--size",
            `${size}px`
        );


        particle.style.setProperty(
            "--duration",
            `${duration}ms`
        );


        particle.style.setProperty(
            "--rotation",
            `${rotation}deg`
        );


        particle.style.setProperty(
            "--particle-color",
            colores[
                Math.floor(
                    Math.random() *
                    colores.length
                )
            ]
        );


        particle.style.marginLeft =
            `${(Math.random() * 14) - 7}px`;


        particle.style.marginTop =
            `${(Math.random() * 14) - 7}px`;


        container.appendChild(
            particle
        );


        setTimeout(() => {

            particle.remove();

        }, duration + 150);

    }

}


/* =====================================================
   HUMO DE LA EXPLOSIÓN
   ===================================================== */

function crearHumoExplosion(
    container
) {

    if (!container) {

        return;

    }


    const cantidad =
        EXPLOSION_CONFIG.humo;


    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        const smoke =
            document.createElement("div");


        smoke.className =
            "explosion-smoke";


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            40 +
            Math.random() *
            260;


        const tx =
            Math.cos(angle) *
            distance;


        const ty =
            Math.sin(angle) *
            distance;


        const size =
            40 +
            Math.random() *
            75;


        /*
         * Humo más lento.
         */

        const duration =
            1200 +
            Math.random() *
            1000;


        smoke.style.setProperty(
            "--tx",
            `${tx}px`
        );


        smoke.style.setProperty(
            "--ty",
            `${ty}px`
        );


        smoke.style.setProperty(
            "--size",
            `${size}px`
        );


        smoke.style.setProperty(
            "--duration",
            `${duration}ms`
        );


        container.appendChild(
            smoke
        );


        setTimeout(() => {

            smoke.remove();

        }, duration + 150);

    }

}


/* =====================================================
   POLVO MONSTER TRUCK
   ===================================================== */

function crearPolvo() {

    const container =
        document.getElementById(
            "dustContainer"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    /*
     * Polvo visual.
     */

    for (
        let i = 0;
        i < 60;
        i++
    ) {

        const dust =
            document.createElement("div");


        dust.className =
            "dust";


        const x =
            Math.random() *
            80 +
            10;


        const y =
            -(
                Math.random() *
                80 +
                20
            );


        const duration =
            (
                Math.random() *
                1.5 +
                1.2
            ) +
            "s";


        dust.style.left =
            x + "%";


        dust.style.setProperty(
            "--x",
            (
                Math.random() *
                100 -
                50
            ) + "px"
        );


        dust.style.setProperty(
            "--y",
            y + "px"
        );


        dust.style.setProperty(
            "--duration",
            duration
        );


        dust.style.animationDelay =
            Math.random() *
            .8 +
            "s";


        container.appendChild(
            dust
        );

    }

}


/* =====================================================
   CONFETI
   ===================================================== */

function lanzarConfetiPotente() {

    if (
        typeof confetti !==
        "function"
    ) {

        console.warn(
            "La librería canvas-confetti no está cargada."
        );

        return;

    }


    /* =================================================
       EXPLOSIÓN CENTRAL
       ================================================= */

    confetti({

        particleCount:
            CONFETI_CONFIG.explosionInicial,

        spread: 140,

        startVelocity: 50,

        angle: 90,

        gravity: .8,

        ticks:
            CONFETI_CONFIG.ticksExplosion,

        scalar: 1.05,

        drift: 0,

        origin: {

            x: .5,

            y: .48

        }

    });


    /*
     * =================================================
     * SEGUNDA PEQUEÑA OLEADA
     * =================================================
     */

    setTimeout(() => {

        confetti({

            particleCount: 25,

            spread: 160,

            startVelocity: 40,

            gravity: .78,

            ticks: 150,

            scalar: 1.02,

            origin: {

                x: .5,

                y: .42

            }

        });

    }, 250);


    /* =================================================
       LLUVIA LATERAL
       ================================================= */

    const duration =
        CONFETI_CONFIG.duracionLluvia;


    const end =
        Date.now() +
        duration;


    function frame() {

        if (
            Date.now() >=
            end
        ) {

            return;

        }


        /* =============================================
           IZQUIERDA
           ============================================= */

        confetti({

            particleCount:
                CONFETI_CONFIG.lateralPorOleada,

            angle: 60,

            spread: 65,

            startVelocity: 38,

            gravity: .8,

            ticks:
                CONFETI_CONFIG.ticksLateral,

            scalar: .95,

            drift:
                Math.random() * .3,

            origin: {

                x: 0,

                y:
                    .3 +
                    Math.random() * .35

            }

        });


        /* =============================================
           DERECHA
           ============================================= */

        confetti({

            particleCount:
                CONFETI_CONFIG.lateralPorOleada,

            angle: 120,

            spread: 65,

            startVelocity: 38,

            gravity: .8,

            ticks:
                CONFETI_CONFIG.ticksLateral,

            scalar: .95,

            drift:
                Math.random() * -.3,

            origin: {

                x: 1,

                y:
                    .3 +
                    Math.random() * .35

            }

        });


        /* =============================================
           DESDE ARRIBA
           ============================================= */

        confetti({

            particleCount:
                CONFETI_CONFIG.superiorPorOleada,

            angle: 90,

            spread: 90,

            startVelocity: 18,

            gravity: .65,

            ticks:
                CONFETI_CONFIG.ticksSuperior,

            scalar: .85,

            origin: {

                x:
                    Math.random(),

                y: -.05

            }

        });


        /*
         * Siguiente oleada.
         */

        setTimeout(
            frame,
            CONFETI_CONFIG.interval
        );

    }


    /*
     * Comenzamos la lluvia.
     */

    frame();

}


/* =====================================================
   COMPATIBILIDAD
   ===================================================== */

function lanzarConfetiOriginal() {

    lanzarConfetiPotente();

}


/* =====================================================
   FECHA DEL EVENTO
   ===================================================== */

const targetDate =
    new Date(
        FECHA_EVENTO
    ).getTime();


/* =====================================================
   CONTADOR
   ===================================================== */

const timerInterval =
    setInterval(
        actualizarContador,
        1000
    );


actualizarContador();


function actualizarContador() {

    const now =
        Date.now();


    const diff =
        targetDate -
        now;


    const dEl =
        document.getElementById(
            "days"
        );


    const hEl =
        document.getElementById(
            "hours"
        );


    const mEl =
        document.getElementById(
            "minutes"
        );


    const sEl =
        document.getElementById(
            "seconds"
        );


    /*
     * =================================================
     * EL EVENTO YA LLEGÓ
     * =================================================
     */

    if (diff <= 0) {

        clearInterval(
            timerInterval
        );


        const countdown =
            document.getElementById(
                "countdown"
            );


        const title =
            document.getElementById(
                "countdown-title"
            );


        if (countdown) {

            countdown.innerHTML = `

                <div class="birthday-arrived">

                    🎂

                    <strong>
                        ¡LLEGÓ EL GRAN DÍA!
                    </strong>

                    🎉

                </div>

            `;

        }


        if (title) {

            title.innerText =
                "¡ESTAMOS DE FIESTA!";

        }


        lanzarFuegosArtificiales();


        return;

    }


    /*
     * =================================================
     * DÍAS
     * ================================================= */

    const days =
        Math.floor(
            diff /
            (
                1000 *
                60 *
                60 *
                24
            )
        );


    /*
     * =================================================
     * HORAS
     * ================================================= */

    const hours =
        Math.floor(
            (
                diff %
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            ) /
            (
                1000 *
                60 *
                60
            )
        );


    /*
     * =================================================
     * MINUTOS
     * ================================================= */

    const minutes =
        Math.floor(
            (
                diff %
                (
                    1000 *
                    60 *
                    60
                )
            ) /
            (
                1000 *
                60
            )
        );


    /*
     * =================================================
     * SEGUNDOS
     * ================================================= */

    const seconds =
        Math.floor(
            (
                diff %
                (
                    1000 *
                    60
                )
            ) /
            1000
        );


    /*
     * Actualización visual.
     */

    if (dEl) {

        dEl.innerText =
            String(days)
                .padStart(2, "0");

    }


    if (hEl) {

        hEl.innerText =
            String(hours)
                .padStart(2, "0");

    }


    if (mEl) {

        mEl.innerText =
            String(minutes)
                .padStart(2, "0");

    }


    if (sEl) {

        sEl.innerText =
            String(seconds)
                .padStart(2, "0");

    }

}


/* =====================================================
   FUEGOS ARTIFICIALES
   ===================================================== */

function lanzarFuegosArtificiales() {

    if (
        typeof confetti !==
        "function"
    ) {

        return;

    }


    const duration =
        12000;


    const animationEnd =
        Date.now() +
        duration;


    const defaults = {

        startVelocity: 30,

        spread: 360,

        ticks: 60,

        zIndex: 1000

    };


    function randomInRange(
        min,
        max
    ) {

        return Math.random() *
            (
                max -
                min
            ) +
            min;

    }


    const interval =
        setInterval(() => {

            const timeLeft =
                animationEnd -
                Date.now();


            if (
                timeLeft <= 0
            ) {

                clearInterval(
                    interval
                );

                return;

            }


            const particleCount =
                50 *
                (
                    timeLeft /
                    duration
                );


            confetti(

                Object.assign(
                    {},
                    defaults,
                    {

                        particleCount,

                        origin: {

                            x:
                                randomInRange(
                                    .1,
                                    .3
                                ),

                            y:
                                Math.random() -
                                .2

                        }

                    }
                )

            );


            confetti(

                Object.assign(
                    {},
                    defaults,
                    {

                        particleCount,

                        origin: {

                            x:
                                randomInRange(
                                    .7,
                                    .9
                                ),

                            y:
                                Math.random() -
                                .2

                        }

                    }
                )

            );

        }, 250);

}


/* =====================================================
   MODAL
   ===================================================== */

function abrirModal() {

    const modal =
        document.getElementById(
            "modalAsistencia"
        );


    if (!modal) {

        return;

    }


    modal.style.display =
        "block";


    document.body.style.overflow =
        "hidden";


    setTimeout(() => {

        document
            .getElementById("nombre")
            ?.focus();

    }, 200);

}


/* =====================================================
   CERRAR MODAL
   ===================================================== */

function cerrarModal() {

    const modal =
        document.getElementById(
            "modalAsistencia"
        );


    if (!modal) {

        return;

    }


    modal.style.display =
        "none";


    document.body.style.overflow =
        "auto";

}


/* =====================================================
   CERRAR MODAL AL TOCAR AFUERA
   ===================================================== */

window.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById(
                "modalAsistencia"
            );


        if (
            modal &&
            event.target === modal
        ) {

            cerrarModal();

        }

    }
);


/* =====================================================
   ESCAPE
   ===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key !== "Escape"
        ) {

            return;

        }


        const modal =
            document.getElementById(
                "modalAsistencia"
            );


        if (
            modal &&
            modal.style.display ===
                "block"
        ) {

            cerrarModal();

        }

    }
);


/* =====================================================
   PERSONAS
   ===================================================== */

function togglePersonas() {

    const asistencia =
        document.getElementById(
            "asistencia"
        );


    const seccion =
        document.getElementById(
            "seccion-personas"
        );


    if (
        !asistencia ||
        !seccion
    ) {

        return;

    }


    if (
        asistencia.value === "No"
    ) {

        seccion.style.display =
            "none";

    } else {

        seccion.style.display =
            "block";

    }

}


/* =====================================================
   WHATSAPP - CONFIRMACIÓN
   ===================================================== */

function enviarAsistencia() {

    const nombre =
        document
            .getElementById("nombre")
            ?.value
            .trim();


    const asistencia =
        document
            .getElementById("asistencia")
            ?.value;


    const personas =
        document
            .getElementById("personas")
            ?.value;


    if (!nombre) {

        mostrarMensaje(
            "Por favor, ingresá tu nombre y apellido."
        );

        return;

    }


    if (!asistencia) {

        mostrarMensaje(
            "Seleccioná si vas a asistir."
        );

        return;

    }


    if (
        asistencia === "Sí" &&
        !personas
    ) {

        mostrarMensaje(
            "Seleccioná cuántas personas van a asistir."
        );

        return;

    }


    let mensaje =
        `🎉 *CONFIRMACIÓN DE ASISTENCIA* 🎉\n\n`;


    mensaje +=
        `Hola, soy *${nombre}*.\n\n`;


    if (
        asistencia === "Sí"
    ) {

        mensaje +=
            `✅ *Confirmo mi asistencia* al cumpleaños de *Maximo* por sus 5 añitos.\n\n`;


        mensaje +=
            `👥 *Cantidad de personas:* ${personas}\n\n`;


        mensaje +=
            `🏁 ¡Estamos listos para festejar!\n`;


        mensaje +=
            `🎂 ¡Nos vemos el 25 de agosto! 🎉`;

    } else {

        mensaje +=
            `❌ En esta oportunidad no voy a poder asistir al cumpleaños de *Maximo*.\n\n`;


        mensaje +=
            `🙏 Les deseo que pasen un hermoso día y disfruten muchísimo del festejo.\n\n`;


        mensaje +=
            `🎂 ¡Feliz cumple, Maximo! 🎉`;

    }


    const url =
        `https://wa.me/${NUMERO_WHATSAPP}?text=` +
        encodeURIComponent(
            mensaje
        );


    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );


    cerrarModal();

}


/* =====================================================
   MENSAJE DE VALIDACIÓN
   ===================================================== */

function mostrarMensaje(texto) {

    if (
        typeof Swal !==
        "undefined"
    ) {

        Swal.fire({

            icon: "warning",

            text: texto,

            confirmButtonText:
                "Entendido",

            confirmButtonColor:
                "#ff3048"

        });

        return;

    }


    alert(texto);

}


/* =====================================================
   COMPARTIR INVITACIÓN
   ===================================================== */

async function compartirInvitacion() {

    const url =
        window.location.href;


    const shareData = {

        title:
            "🎉 Maximo cumple 5 años",

        text:
            "🏁 ¡Prepará los motores! Te invito a festejar conmigo mi cumpleaños número 5. 🎂 ¡Te espero para compartir este día tan especial!",

        url

    };


    if (
        navigator.share
    ) {

        try {

            await navigator.share(
                shareData
            );

        } catch (error) {

            if (
                error?.name !==
                "AbortError"
            ) {

                console.log(
                    "No se pudo compartir:",
                    error
                );

            }

        }

        return;

    }


    try {

        await navigator.clipboard.writeText(
            url
        );


        mostrarMensaje(
            "¡Enlace copiado! Ahora podés compartir la invitación."
        );

    } catch (error) {

        mostrarMensaje(
            "Copiá el enlace de la invitación desde la barra del navegador."
        );

    }

}


/* =====================================================
   PREVENIR SCROLL DURANTE APERTURA
   ===================================================== */

document.body.style.overflow =
    "hidden";


/* =====================================================
   SEGURIDAD DE IMÁGENES
   ===================================================== */

document
    .querySelectorAll("img")
    .forEach(img => {

        img.setAttribute(
            "draggable",
            "false"
        );


        img.addEventListener(
            "contextmenu",
            event => {

                event.preventDefault();

            }

        );

    });