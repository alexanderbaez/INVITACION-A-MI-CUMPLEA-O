// =========================================================
// CONFIGURACIÓN
// =========================================================

const FECHA_EVENTO =
    "Aug 25, 2026 18:30:00";


const NUMERO_WHATSAPP =
    "5492644629511";


const NOMBRE_CUMPLEANERO =
    "Maximo";


const EDAD =
    "5";


// =========================================================
// AUDIO
// =========================================================

const audio =
    document.getElementById(
        "musicaCumple"
    );


// =========================================================
// SWIPER
// =========================================================

const swiper =
    new Swiper(
        ".mySwiper",
        {

            loop: true,

            speed: 650,

            grabCursor: true,

            centeredSlides: true,

            slidesPerView: 1,

            spaceBetween: 18,

            autoHeight: true,

            autoplay: {

                delay: 4200,

                disableOnInteraction: false,

                pauseOnMouseEnter: true

            },

            pagination: {

                el:
                    ".swiper-pagination",

                clickable: true

            },

            navigation: {

                nextEl:
                    ".swiper-button-next",

                prevEl:
                    ".swiper-button-prev"

            }

        }
    );


// =========================================================
// INICIAR INVITACIÓN
// =========================================================

function iniciarInvitacion() {


    if (audio) {

        audio.volume = 0.45;

        audio.play().catch(() => {

            console.log(
                "El navegador bloqueó el audio."
            );

        });

    }


    const overlay =
        document.getElementById(
            "overlay"
        );


    const truck =
        document.getElementById(
            "openingTruck"
        );


    /*
       Animación especial del Monster Truck.

       Primero aceleramos.
       Después hacemos un pequeño salto.
    */

    if (truck) {

        truck.style.animation =
            "none";

        truck.offsetHeight;

        truck.style.transition =
            "transform .75s cubic-bezier(.2,.8,.2,1)";

        truck.style.transform =
            "translateX(-50%) translateX(120px) translateY(-20px) rotate(8deg)";

    }


    lanzarConfetiOriginal();


    setTimeout(() => {

        overlay.style.transform =
            "translateY(-100%)";


    }, 650);


    setTimeout(() => {

        overlay.style.display =
            "none";


    }, 1500);

}


// =========================================================
// CONFETI
// =========================================================

function lanzarConfetiOriginal() {


    const duration =
        3500;


    const end =
        Date.now() + duration;


    function frame() {


        confetti({

            particleCount: 4,

            angle: 60,

            spread: 60,

            origin: {
                x: 0
            }

        });


        confetti({

            particleCount: 4,

            angle: 120,

            spread: 60,

            origin: {
                x: 1
            }

        });


        if (
            Date.now() < end
        ) {

            requestAnimationFrame(
                frame
            );

        }

    }


    frame();

}


// =========================================================
// FUEGOS ARTIFICIALES
// =========================================================

let fuegosLanzados =
    false;


function lanzarFuegosArtificiales() {


    if (fuegosLanzados) {

        return;

    }


    fuegosLanzados =
        true;


    const duration =
        15000;


    const animationEnd =
        Date.now() + duration;


    const defaults = {

        startVelocity: 30,

        spread: 360,

        ticks: 60,

        zIndex: 0

    };


    function randomInRange(
        min,
        max
    ) {

        return (
            Math.random()
            *
            (max - min)
            +
            min
        );

    }


    const interval =
        setInterval(
            () => {


                const timeLeft =
                    animationEnd
                    -
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
                    50
                    *
                    (timeLeft / duration);


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
                                    Math.random()
                                    -
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
                                    Math.random()
                                    -
                                    .2

                            }

                        }
                    )

                );


            },
            250
        );

}


// =========================================================
// CUENTA REGRESIVA
// =========================================================

const targetDate =
    new Date(
        FECHA_EVENTO
    ).getTime();


let timerInterval;


function actualizarContador() {


    const now =
        Date.now();


    const diff =
        targetDate - now;


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


    if (
        diff <= 0
    ) {


        if (timerInterval) {

            clearInterval(
                timerInterval
            );

        }


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

                <div style="
                    grid-column:1/-1;
                    padding:10px 0;
                    font-size:1.15rem;
                    font-weight:900;
                    color:#2ed573;
                ">

                    ¡LLEGÓ EL GRAN DÍA! 🎂

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


    const d =
        Math.floor(
            diff /
            (
                1000 *
                60 *
                60 *
                24
            )
        );


    const h =
        Math.floor(

            (
                diff %
                (
                    1000 *
                    60 *
                    60 *
                    24
                )

            )
            /
            (
                1000 *
                60 *
                60
            )

        );


    const m =
        Math.floor(

            (
                diff %
                (
                    1000 *
                    60 *
                    60
                )

            )
            /
            (
                1000 *
                60
            )

        );


    const s =
        Math.floor(

            (
                diff %
                (
                    1000 *
                    60
                )

            )
            /
            1000

        );


    if (dEl) {

        dEl.innerText =
            String(d)
            .padStart(2, "0");

    }


    if (hEl) {

        hEl.innerText =
            String(h)
            .padStart(2, "0");

    }


    if (mEl) {

        mEl.innerText =
            String(m)
            .padStart(2, "0");

    }


    if (sEl) {

        sEl.innerText =
            String(s)
            .padStart(2, "0");

    }

}


actualizarContador();


timerInterval =
    setInterval(
        actualizarContador,
        1000
    );


// =========================================================
// MODAL
// =========================================================

const modal =
    document.getElementById(
        "modalAsistencia"
    );


const asistencia =
    document.getElementById(
        "asistencia"
    );


const seccionPersonas =
    document.getElementById(
        "seccion-personas"
    );


function abrirModal() {


    if (!modal) {

        return;

    }


    modal.style.display =
        "block";


    document.body.style.overflow =
        "hidden";


    setTimeout(
        () => {


            const nombre =
                document.getElementById(
                    "nombre"
                );


            if (nombre) {

                nombre.focus();

            }


        },
        150
    );

}


function cerrarModal() {


    if (!modal) {

        return;

    }


    modal.style.display =
        "none";


    document.body.style.overflow =
        "";

}


// =========================================================
// CLICK AFUERA
// =========================================================

window.addEventListener(
    "click",
    (event) => {


        if (
            event.target === modal
        ) {

            cerrarModal();

        }

    }
);


// =========================================================
// ESC
// =========================================================

document.addEventListener(
    "keydown",
    (event) => {


        if (

            event.key === "Escape"

            &&

            modal

            &&

            modal.style.display ===
                "block"

        ) {

            cerrarModal();

        }

    }
);


// =========================================================
// ASISTENCIA
// =========================================================

if (asistencia) {

    asistencia.addEventListener(
        "change",
        actualizarSeccionPersonas
    );

}


function actualizarSeccionPersonas() {


    if (!seccionPersonas) {

        return;

    }


    if (
        asistencia.value === "No"
    ) {

        seccionPersonas.style.display =
            "none";

    } else {

        seccionPersonas.style.display =
            "block";

    }

}


// =========================================================
// WHATSAPP - CONFIRMACIÓN
// =========================================================

function enviarAsistencia() {


    const nombre =
        document.getElementById(
            "nombre"
        )
        .value
        .trim();


    const respuesta =
        document.getElementById(
            "asistencia"
        )
        .value;


    const personas =
        document.getElementById(
            "personas"
        )
        .value;


    if (!nombre) {

        alert(
            "Por favor, ingresá tu nombre y apellido."
        );

        return;

    }


    if (!respuesta) {

        alert(
            "Por favor, indicá si vas a asistir."
        );

        return;

    }


    if (
        respuesta === "Sí"
        &&
        !personas
    ) {

        alert(
            "Por favor, indicá cuántas personas asistirán."
        );

        return;

    }


    let mensaje;


    if (
        respuesta === "Sí"
    ) {


        mensaje =

`🏁 *CONFIRMACIÓN DE ASISTENCIA* 🎉

Hola, soy *${nombre}*.

Quiero confirmar mi asistencia al cumpleaños de *${NOMBRE_CUMPLEANERO}*, que festeja sus *${EDAD} añitos*. 🎂🚙💨

👥 *Cantidad de personas:* ${personas}

📅 *Fecha:* 25 de Agosto
🕡 *Horario:* 18:30 a 22:30 hs
📍 *Lugar:* Salón Sueños y Fantasías

¡Muchas gracias por la invitación! ❤️

¡Nos vemos para festejar juntos! 🎉🏁`;


    } else {


        mensaje =

`👋 *RESPUESTA A LA INVITACIÓN*

Hola, soy *${nombre}*.

Lamentablemente no voy a poder acompañar a *${NOMBRE_CUMPLEANERO}* en su cumpleaños de *${EDAD} añitos*. 🎂

Les deseo que pasen un hermoso día y disfruten muchísimo del festejo. ❤️🎉

¡Muchas gracias por la invitación!`;


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


// =========================================================
// COMPARTIR INVITACIÓN
// =========================================================

async function compartirInvitacion() {


    const url =
        window.location.href;


    const texto =

`🏁🎉 *¡ESTÁS INVITADO!* 🎉🏁

Maximo cumple *5 añitos* 🎂🚙💨

Te esperamos para compartir juntos una tarde llena de diversión, juegos y mucha alegría.

📅 *25 de Agosto*
🕡 *18:30 a 22:30 hs*
📍 *Salón Sueños y Fantasías*

💌 Abrí la invitación para conocer todos los detalles:

${url}`;


    /*
       Intentamos compartir:

       - Foto de Maximo
       - Texto
       - URL

       Los navegadores compatibles
       mostrarán el menú nativo
       de compartir.
    */

    try {


        const response =
            await fetch(
                "./image/mamo.jpeg"
            );


        const blob =
            await response.blob();


        const file =
            new File(

                [blob],

                "maximo-cumpleanos.jpg",

                {
                    type:
                        blob.type
                        ||
                        "image/jpeg"
                }

            );


        if (

            navigator.share

            &&

            navigator.canShare

            &&

            navigator.canShare({
                files: [file]
            })

        ) {


            await navigator.share({

                title:
                    `🎉 Cumpleaños de ${NOMBRE_CUMPLEANERO}`,

                text:
                    texto,

                url:
                    url,

                files:
                    [file]

            });


            return;

        }


    } catch (error) {


        console.log(
            "Compartir imagen no disponible:",
            error
        );

    }


    /*
       FALLBACK

       Si el navegador no permite
       compartir archivos, usamos
       WhatsApp.
    */

    const whatsappUrl =

        `https://wa.me/?text=` +

        encodeURIComponent(
            texto
        );


    window.open(
        whatsappUrl,
        "_blank",
        "noopener,noreferrer"
    );

}


// =========================================================
// VISIBILITY
// =========================================================

document.addEventListener(
    "visibilitychange",
    () => {


        if (
            document.hidden
        ) {

            swiper.autoplay.stop();

        } else {

            swiper.autoplay.start();

        }

    }
);