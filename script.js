document.addEventListener('DOMContentLoaded', () => {
    const ramos = document.querySelectorAll('.ramo');

    const requisitos = {
        "Análisis Estadístico II": ["Análisis Estadístico", "Matemática Aplicada I"],
        "Matemática Financiera y Actuarial": ["Análisis Estadístico", "Matemática Aplicada I"],
        "Microeconomía para Economistas": ["Matemática Aplicada I"],
        "Matemática Aplicada II": ["Matemática Aplicada I"],
        "Computación Científica Actuarial": ["Análisis Estadístico", "Matemática Aplicada I"],
        "Derecho Financiero, Seguros y Seguridad Social": ["Derecho Empresarial"],
        "Administración Financiera": ["Matemática Financiera y Actuarial"],
        "Dinero y Bancos": ["Análisis Estadístico II", "Administración Financiera"],
        "Análisis Numérico": ["Matemática Aplicada II"],
        "Estadística Actuarial": ["Análisis Estadístico II", "Matemática Aplicada II"],
        "Bases Actuariales de las Inversiones y Financiaciones": ["Matemática Financiera y Actuarial", "Estadística Actuarial"],
        "Biometría Actuarial": ["Análisis Numérico", "Estadística Actuarial"],
        "Teoría Actuarial de los Seguros Patrimoniales": ["Análisis Numérico", "Estadística Actuarial", "Matemática Financiera y Actuarial"],
        "Teoría Actuarial de los Seguros Personales": ["Biometría Actuarial"],
        "Teoría Actuarial de los Fondos y Planes de Jubilaciones, Pensiones y Salud": ["Teoría Actuarial de los Seguros Personales"],
        "Teoría del Equilibrio Actuarial": ["Teoría Actuarial de los Seguros Patrimoniales", "Teoría Actuarial de los Seguros Personales"],
        "Práctica Profesional del Actuario": ["Teoría Actuarial de los Seguros Patrimoniales", "Teoría Actuarial de los Seguros Personales", "Teoría Actuarial de los Fondos y Planes de Jubilaciones, Pensiones y Salud"],
        "Modelos y Proyecciones Actuariales": ["Bases Actuariales de las Inversiones y Financiaciones", "Teoría del Equilibrio Actuarial", "Computación Científica Actuarial"]
    };

    ramos.forEach(ramo => {
        ramo.textContent = ramo.getAttribute('data-nombre');

        ramo.addEventListener('click', () => {
            if (ramo.classList.contains('bloqueado')) return;

            ramo.classList.add('aprobado');
            verificarTramos();
            desbloquearRequisitos();
        });
    });

    function verificarTramos() {
        const tramo1 = document.querySelectorAll('#tramo-1 .ramo');
        const todosAprobados = Array.from(tramo1).every(r => r.classList.contains('aprobado'));
        const tramo2 = document.getElementById('tramo-2');
        if (todosAprobados) {
            tramo2.classList.remove('bloqueado');
            tramo2.querySelectorAll('.ramo').forEach(r => {
                if (!r.classList.contains('bloqueado'))
                    r.classList.remove('bloqueado');
            });
        }
    }

    function desbloquearRequisitos() {
        Object.keys(requisitos).forEach(ramoNombre => {
            const prereqs = requisitos[ramoNombre];
            const cumplido = prereqs.every(req => 
                document.querySelector(`.ramo[data-nombre="${req}"]`).classList.contains('aprobado')
            );
            if (cumplido) {
                const ramoTarget = document.querySelector(`.ramo[data-nombre="${ramoNombre}"]`);
                if (ramoTarget) {
                    ramoTarget.classList.remove('bloqueado');
                }
            }
        });
    }
});
