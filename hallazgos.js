// ============================================================
//  Auditoría Interna Especial — Servicio Walmart Chile
//  Datos: Informe Final v5 (28-07-2026) · §8 Hallazgos, §9 Patrones, §11 Plan
// ============================================================

// Los quince hallazgos, en orden de severidad descendente (orden del informe).
window.HALLAZGOS = [
  {
    code: 'HAL-002',
    tit: 'Causas terminadas reportadas como vigentes',
    cls: 'Incumplimiento contractual',
    sev: 'Crítica',
    deriva: 'OBS-002',
    criterio: 'Nivel 2 · Contrato',
    desc: 'Se reportaron al cliente 8.003 registros como causas vigentes al 8 de mayo de 2026, sobre una base construida a partir de lo abierto en el sistema de origen y sin contrastarla contra el Poder Judicial para confirmar cuáles causas seguían realmente vigentes. Más de la mitad del universo no correspondía: 4.389 causas y 4.980 imputados. El 23 de mayo el cliente identificó el defecto con precisión, y la segunda entrega se produjo veintiún días después, ya con el contraste contra el Poder Judicial en marcha. El destinatario calificó el hecho como «falla grave de control». La causa técnica del defecto de origen permanece abierta.',
    acciones: ['B', 'C', 'G'],
  },
  {
    code: 'HAL-015',
    tit: 'No existe una capa de control sobre la ejecución de los procesos',
    cls: 'Ausencia de diseño de control',
    sev: 'Crítica',
    deriva: 'OBS-028',
    criterio: 'Nivel 4 · Buenas prácticas',
    desc: 'En diecinueve de veintiocho procesos observados no existe punto de control, y ninguno de los veintiocho reúne umbral, alerta, responsable y frecuencia. La falta está en los siete procesos y en los cinco equipos. De las veintiocho fallas acreditadas, cuatro las advirtió la propia operación; nueve el cliente y quince esta revisión. Los equipos declararon setenta y cuatro elementos de control frente a los once registrados, y seis ya operaban sin figurar en el registro. Es el hallazgo que sostiene la conclusión general del encargo.',
    acciones: ['L'],
  },
  {
    code: 'HAL-004',
    tit: 'El indicador de asistencia de testigos se publica sin declarar su universo',
    cls: 'Deficiencia de diseño',
    sev: 'Alta',
    deriva: 'OBS-011',
    criterio: 'Nivel 4 · Buenas prácticas',
    desc: 'El cálculo es correcto y reproducible: la fórmula oficial da 45,6% frente al 45,2% publicado. El defecto es de presentación y de construcción. La lámina entregada al cliente publica 999 citaciones, 343 asistencias y 45,2% de forma contigua, y 343 sobre 999 da 34,3%. En la misma lámina conviven dos universos con 257 registros de diferencia. Y el denominador excluye a los testigos que ya no trabajan, que es la causa más frecuente de inasistencia.',
    acciones: ['A'],
  },
  {
    code: 'HAL-005',
    tit: 'El gobierno del contrato y de la relación no está bajo control',
    cls: 'Ausencia de diseño de control',
    sev: 'Alta',
    deriva: 'OBS-013 · 021 · 022 y un antecedente sin observación',
    criterio: 'Nivel 4 · Buenas prácticas',
    desc: 'Tres dimensiones del mismo defecto. Vigencia: el contrato venció el 31 de enero de 2026 y la prórroga se perfeccionó el 3 de febrero, con una cláusula de plazo que admite dos lecturas sin resolver. Exigibilidad: cuatro de los diez niveles de servicio tienen la multa «a definir» y nunca se definió; y el plazo de doce horas que el cliente espera no está pactado. Interlocución: no hay contraparte única y los reportes se distribuyen sin regla de destinatario.',
    acciones: ['E', 'M'],
  },
  {
    code: 'HAL-006',
    tit: 'La continuidad del universo de eventos no se gestionó ante los cambios de plataforma',
    cls: 'Ausencia de diseño de control',
    sev: 'Alta',
    deriva: 'OBS-006 · OBS-023',
    criterio: 'Nivel 4 · Buenas prácticas',
    desc: 'En cuatro meses el cliente modificó dos veces el origen de los eventos, y en ninguno de los dos casos el prestador levantó acta de impacto, acordó la interfaz ni estableció un plan de reconciliación. La trazabilidad se sostiene en una reconstrucción manual diaria por criterios sustitutos. No se afirma pérdida de información: el área sostiene que el consolidado diario recupera lo no notificado, y esa respuesta no está refutada.',
    acciones: ['D'],
  },
  {
    code: 'HAL-007',
    tit: 'No existe un proceso de actualización y control de vigencia de las causas',
    cls: 'Ausencia de diseño de control',
    sev: 'Alta',
    deriva: 'OBS-027',
    criterio: 'Nivel 4 · Buenas prácticas',
    desc: 'La actualización del estado procesal no está diseñada como proceso. La propia Dirección de Operaciones la declara «distribuida en distintos procesos sin coordinación», sin control de vigencia, sin fuente de verdad exclusiva y sin capacidad dimensionada. El instrumento interno vigente documenta funciones de notificación, no un control de vigencia. Es la causa de proceso de HAL-002, y su remediación está diseñada y no constituida.',
    acciones: ['B'],
  },
  {
    code: 'HAL-008',
    tit: 'Los controles de acceso a datos personales que el contrato exige no están implementados',
    cls: 'Incumplimiento contractual',
    sev: 'Alta',
    deriva: 'Sin observación de origen',
    criterio: 'Nivel 2 · Contrato',
    desc: 'La cláusula 11.4 del Contrato 2022 obliga a establecer controles de acceso a los datos personales y a restringirlos a quien necesariamente los requiera. Se verificaron cinco hechos que se apartan: claves vigentes en texto plano en un manual distribuido, repositorios con datos personales abiertos por enlace, cuentas genéricas compartidas sin trazabilidad, planillas con datos de imputados y testigos circulando por correo, y diecinueve casillas de notificación de revisión manual.',
    acciones: ['F'],
  },
  {
    code: 'HAL-009',
    tit: 'La cadena de citación del testigo no tiene aseguramiento',
    cls: 'Ausencia de diseño de control',
    sev: 'Alta',
    deriva: 'OBS-008 · 010 · 024 · 026',
    criterio: 'Nivel 4 · Buenas prácticas',
    desc: 'La citación atraviesa cuatro eslabones —preparación, citación, comparecencia y registro— y ninguno verifica al anterior. El control de preparación está suspendido y su columna registra 0%. El contacto se canaliza por intermediarios sin confirmación de recepción. No existe mecanismo para validar si los abogados realizaron el contacto. Y el testigo no tiene identidad propia en el registro. Las cuatro observaciones declaran suficiencia limitada; el conjunto se corrobora.',
    acciones: ['H'],
  },
  {
    code: 'HAL-010',
    tit: 'Los entregables al cliente se producen a mano y sin control sistémico',
    cls: 'Ausencia de diseño de control',
    sev: 'Alta',
    deriva: 'OBS-003 · 004 · 009 · 012',
    criterio: 'Nivel 4 · Buenas prácticas',
    desc: 'Cuatro procesos de tres frentes distintos producen los entregables mediante trabajo manual sobre planillas paralelas al sistema, sin documentación del flujo, sin registro de las transformaciones y sin verificación de integridad antes del envío. El documento emitido lo formula así: «la fidelidad del entregable descansa en el trabajo manual de una persona, no en un control». Y las correcciones no dejan rastro.',
    acciones: ['B'],
  },
  {
    code: 'HAL-011',
    tit: 'La información sobre la conformación del equipo legal no es exacta',
    cls: 'Incumplimiento contractual',
    sev: 'Alta',
    deriva: 'OBS-016',
    criterio: 'Nivel 4 · Buenas prácticas',
    desc: 'Se informó al cliente que todos los abogados que tramitan sus causas son internos. Los registros del propio prestador identifican del orden de treinta prestadores externos, uno de ellos una sociedad de cinco abogados. Dieciséis de treinta y uno no tienen indicadores ni multas pactadas, y el 43% no tiene acceso al sistema. La evidencia es suficiente para la inconsistencia y limitada para la intención, sobre la que no se concluye.',
    acciones: ['E'],
  },
  {
    code: 'HAL-012',
    tit: 'La cartera judicializada antes del cambio de modelo quedó sin regla',
    cls: 'Ausencia de diseño de control',
    sev: 'Alta',
    deriva: 'OBS-018',
    criterio: 'Nivel 4 · Buenas prácticas',
    desc: 'Cuando el modelo de intervención cambió, ningún instrumento previó qué hacer con las causas ya judicializadas. La laguna consta por omisión en el texto del anexo de 2018, firmado por ambas partes. El 44,6% de los registros informados al cliente —3.573 de 8.003— pertenece a ese universo sin regla. Y el acuerdo de 2020 que se invoca para suplirla fue desconocido por escrito por el cliente: «no contamos con respaldo escrito de ese acuerdo».',
    acciones: ['J'],
  },
  {
    code: 'HAL-013',
    tit: 'La criminalidad interna no es trazable y hay causas prescritas',
    cls: 'Incumplimiento contractual',
    sev: 'Alta',
    deriva: 'OBS-029',
    criterio: 'Nivel 4 · Buenas prácticas',
    desc: 'El contrato exige un protocolo para esta categoría y el protocolo no consta. La categoría no es trazable en el registro, de modo que no puede revisarse como conjunto. Las tres causas vigentes están paralizadas: una se encontraría prescrita y otra tiene audiencia sobre prescripción fijada para el 28 de julio de 2026. Es el único hallazgo del encargo cuyo efecto es irreversible: una acción penal extinguida no se recupera.',
    acciones: ['I'],
  },
  {
    code: 'HAL-001',
    tit: 'Denominaciones que no corresponden a la entidad medida',
    cls: 'Deficiencia de diseño',
    sev: 'Media',
    deriva: 'OBS-001',
    criterio: 'Nivel 4 · Buenas prácticas',
    desc: 'El modelo de reportería empleaba denominaciones jurídicas para nombrar entidades distintas de las que esos términos designan, sin definición documentada ni declaración de la unidad contada. El archivo del 8 de mayo sostiene dos magnitudes: 8.003 filas reales y 7.227 causas identificables. Explica entre el 5,9% y el 7,6% de la reducción del universo: no explica el descuadre que originó el encargo.',
    acciones: ['A'],
  },
  {
    code: 'HAL-003',
    tit: 'El indicador de cobertura ACD recorta su propio universo',
    cls: 'Ausencia de diseño de control',
    sev: 'Media',
    deriva: 'OBS-005',
    criterio: 'Nivel 4 · Buenas prácticas',
    desc: 'Coexisten tres definiciones vigentes e incompatibles, todas construyendo el denominador por inclusión. El campo que la implementa carece de valor en el 39,2% de los casos —1.535 de 3.913— y esos registros salen del universo sin contabilizarse como cobertura fallida. El indicador tiende por construcción al 100%. Y el campo que registraba por qué no se asistió se retiró de la vista del cliente por «ruido comercial» declarado, hecho que se consigna con cautela expresa.',
    acciones: ['A'],
  },
  {
    code: 'HAL-014',
    tit: 'Los procesos de seguridad en tienda operan sin procedimiento estandarizado',
    cls: 'Ausencia de diseño de control',
    sev: 'Media',
    deriva: 'OBS-019 · OBS-020',
    criterio: 'Nivel 4 · Buenas prácticas',
    desc: 'La vinculación de bandas mediante circuito cerrado carece de los controles esperables, y el control de las descargas en tienda no tiene protocolo: se realiza en base al criterio de cada guardia, lo que obliga al prestador a practicar revisiones adicionales. Parte de la materia excede su ámbito —los guardias no son su personal—, y por eso se le imputa no haber requerido el estándar ni documentado el retrabajo que su ausencia le traslada.',
    acciones: ['K'],
  },
];

// Los cuatro patrones por causa raíz (§9).
window.PATRONES = [
  {
    id: 'P1',
    tit: 'Ausencia de gobernanza de definiciones sobre los indicadores',
    hallazgos: ['HAL-001', 'HAL-003', 'HAL-004'],
    comun: 'Tres indicadores, tres procesos y tres equipos responsables distintos. En los tres casos ninguna función define, aprueba, versiona ni valida que un indicador declare lo que mide antes de publicarse.',
    riesgo: 'Ninguna cifra que el servicio reporta es interpretable por su receptor ni comparable entre períodos. El riesgo no es que un indicador esté mal: es que no hay forma de saber si lo está.',
    accion: 'Crear la función de gobernanza de definiciones, con diccionario único de indicadores, ficha obligatoria por indicador y control de salida previo a todo envío.',
  },
  {
    id: 'P2',
    tit: 'Ausencia de dueño del proceso que produce el dato',
    hallazgos: ['HAL-002', 'HAL-006', 'HAL-007', 'HAL-010'],
    comun: 'El estado procesal, el universo de eventos, la actualización del registro y la producción de los entregables no tienen responsable asignado: la función existe repartida entre roles, sin dueño, sin fuente de verdad y sin capacidad dimensionada.',
    riesgo: 'El dato se degrada sin que nadie lo advierta. Sin dueño, el universo vuelve a degradarse y el próximo descuadre lo detectará otra vez el cliente.',
    accion: 'Designar dueño por dato crítico y por entregable, con fuente de verdad exclusiva, flujo documentado, registro de transformaciones y conciliación periódica contra la fuente externa.',
  },
  {
    id: 'P3',
    tit: 'Obligaciones y compromisos vigentes sin control de cumplimiento',
    hallazgos: ['HAL-005', 'HAL-008', 'HAL-011', 'HAL-013'],
    comun: 'Cuatro obligaciones específicas y vigentes —el marco contractual, los controles de acceso a datos personales, la exactitud de lo informado sobre el servicio y el protocolo de criminalidad interna— y ninguna función con el encargo de verificar su cumplimiento.',
    riesgo: 'El instrumento que rige el servicio no está bajo control, y su incumplimiento se descubre cuando alguien lo revisa por otra razón. En criminalidad interna ese riesgo ya se materializó de forma irreversible.',
    accion: 'Establecer un control de cumplimiento contractual con inventario de obligaciones exigibles, responsable de verificarlas y alerta sobre vencimientos y plazos de caducidad.',
  },
  {
    id: 'P4',
    tit: 'Procesos sin verificación de que la instrucción llegue a destino',
    hallazgos: ['HAL-009', 'HAL-014'],
    comun: 'Dos cadenas que dependen de terceros —el testigo y el guardia de tienda— y en ninguna existe confirmación de que la instrucción llegó ni estándar que homogenice la ejecución. En ambas el prestador compensa con trabajo adicional que no está medido.',
    riesgo: 'El resultado depende de personas ajenas a la organización sobre las que no hay verificación. Cuando falla, no se puede establecer en qué eslabón se interrumpió la cadena: la falla no es diagnosticable.',
    accion: 'Implantar confirmación de recepción en cada eslabón que dependa de un tercero, y requerir formalmente el estándar donde la ejecución no es propia.',
  },
];

// Plan consolidado de remediación (§11): trece acciones para quince hallazgos.
window.PLAN = [
  { id: 'A', txt: 'Crear la función de gobernanza de definiciones de indicadores', cubre: 'HAL-001 · 003 · 004', resp: 'Dir. Mejora Continua, con validación de Dir. Legal', prio: 'Alta', plazo: 'Pendiente de asignación' },
  { id: 'B', txt: 'Designar dueño por dato crítico y por entregable; diseñar el proceso de control de vigencia y constituir el equipo dedicado ya diseñado', cubre: 'HAL-002 · 007 · 010', resp: 'Gerencia General · Dir. Legal y Compliance', prio: 'Alta', plazo: 'Pendiente de asignación' },
  { id: 'C', txt: 'Implantar la validación independiente contra el Poder Judicial como control previo a todo reporte de estado procesal', cubre: 'HAL-002', resp: 'Dir. Mejora Continua', prio: 'Crítica', plazo: 'Pendiente de asignación' },
  { id: 'D', txt: 'Establecer el procedimiento de gestión de cambios de origen de datos e implantar el identificador único del evento', cubre: 'HAL-006', resp: 'Dir. Tecnología y Sistemas', prio: 'Alta', plazo: 'Pendiente de asignación' },
  { id: 'E', txt: 'Establecer el control de cumplimiento contractual: inventario de obligaciones, opinión legal sobre la vigencia, parámetro de los niveles de servicio y alerta de vencimientos', cubre: 'HAL-005 · 011', resp: 'Dir. Legal y Compliance · Gerencia General', prio: 'Alta', plazo: 'Pendiente de asignación' },
  { id: 'F', txt: 'Rotar las credenciales verificadas, practicar el inventario de accesos y emitir la política de credenciales', cubre: 'HAL-008', resp: 'Dir. Tecnología y Sistemas · Dir. Legal y Compliance', prio: 'Alta', plazo: 'Rotación inmediata; el resto pendiente' },
  { id: 'G', txt: 'Establecer un procedimiento de tratamiento de las observaciones del cliente sobre la información entregada', cubre: 'HAL-002', resp: 'Dir. Customer Success · Dir. Legal y Compliance', prio: 'Crítica', plazo: 'Pendiente de asignación' },
  { id: 'H', txt: 'Implantar confirmación de recepción en la cadena del testigo y dar identidad al testigo en el registro', cubre: 'HAL-009', resp: 'Dir. Customer Success · Subg. Persecución Penal Especializada', prio: 'Alta', plazo: 'Pendiente de asignación' },
  { id: 'I', txt: 'Emitir el protocolo de criminalidad interna, hacer trazable la categoría y ejecutar las dos actuaciones procesales pendientes', cubre: 'HAL-013', resp: 'Subg. Persecución Penal Especializada', prio: 'Crítica', plazo: 'Inmediatas las dos actuaciones procesales' },
  { id: 'J', txt: 'Acordar con el cliente la regla aplicable a la cartera judicializada antes del cambio de modelo', cubre: 'HAL-012', resp: 'Dir. Legal y Compliance', prio: 'Alta', plazo: 'Pendiente de asignación' },
  { id: 'K', txt: 'Requerir formalmente el estándar de los procesos de seguridad en tienda y documentar el retrabajo', cubre: 'HAL-014', resp: 'Dir. Customer Success · frente CCTV y Seguridad', prio: 'Media', plazo: 'Pendiente de asignación' },
  { id: 'L', txt: 'Asignar dueño a la capa de control, seleccionar los elementos que se instrumentan y completar la matriz con los cuatro elementos por proceso', cubre: 'HAL-015', resp: 'Dir. Auditoría Interna (coord.) · áreas responsables', prio: 'Crítica', plazo: 'Pendiente de asignación' },
  { id: 'M', txt: 'Rediseñar el modelo de atención: contraparte única con el nivel de experiencia acordado y destinatario fijo por entregable', cubre: 'HAL-005', resp: 'Gerencia General · Dir. Customer Success', prio: 'Alta', plazo: 'Pendiente de asignación' },
];

// ============================================================
//  Plan de Implementación y Fortalecimiento del Servicio (v5 · 28-07-2026)
//  Quince acciones sobre cuatro ejes, con trazabilidad a 49 compromisos.
// ============================================================
window.EJES = [
  { n: 1, tit: 'Estrategia de persecución penal', desc: 'Responde a lo que el cliente solicitó expresamente: cierre formal de los memorandos de estrategia, ampliación de la detección y vinculación de bandas, tratamiento de las flagrancias y efecto disuasivo de la persecución.' },
  { n: 2, tit: 'Confiabilidad de la información', desc: 'Responde a lo que la auditoría acreditó: el estado procesal informado no coincidía con el registro judicial. Comprende el saneamiento ya ejecutado, la conciliación periódica contra la fuente judicial, la integridad del dato en el punto de captura y la continuidad del universo de eventos.' },
  { n: 3, tit: 'Testigos y audiencias', desc: 'Comprende la citación en tiempo y forma, el reporte de asistencia y la reactivación del control de preparación hoy suspendido.' },
  { n: 4, tit: 'Controles y gobernanza', desc: 'Comprende la capa de puntos de control acordada, la exigibilidad contractual de los niveles de servicio, la corrección de los indicadores que excluyen la falla que deben señalar, y la gobernanza de la relación con el cliente.' },
];

window.PLAN_IMPL = [
  {
    n: 1, eje: 1, estado: 'En curso',
    tit: 'Conducir la formalización de la estrategia de persecución penal presentada a Walmart',
    desc: 'La estrategia está formulada y presentada en tres piezas: los memorandos de febrero y abril de 2026 y el plan táctico de bandas remitido el 2 de julio, más los complementos de reincidencia, flagrancia y criterios de acuerdos reparatorios. Ninguna tiene respuesta formal escrita. ALTO conduce el proceso de revisión: recoge y resuelve las observaciones de Walmart, incorpora los ajustes que correspondan y gestiona su formalización. La suscripción final es bilateral.',
    obtiene: 'Hoy conviven tres criterios de selección y ninguno rige. Al aprobar, Walmart fija cuál se aplica y sabe qué casos se persiguen. Obtiene seis plazos exigibles por hito: 48 horas para el contacto con la tienda, día siete para la querella, un mes para la Orden de Investigar. Además, el servicio pasa a rendir cuenta por prisiones preventivas y penas efectivas, no por causas abiertas — la cifra que originó esta auditoría.',
    resp: 'Dirección Legal y Compliance',
    dep: 'Walmart: la revisión de la estrategia presentada está en su ámbito de decisión desde abril de 2026',
    entregable: 'Constancia escrita de la formalización de la estrategia, o registro fechado de las observaciones de Walmart y del tratamiento dado a cada una',
    indicador: 'Versiones de la estrategia con respuesta formal de Walmart: 0 de 2 → 2 de 2',
  },
  {
    n: 2, eje: 1, estado: 'En curso',
    tit: 'Aplicar los hitos de tramitación de bandas y extender el modelo a la tramitación masiva',
    desc: 'El plan táctico de bandas fija seis plazos verificables por hito de tramitación. La matriz remitida el 16 de julio desarrolla el flujo en dieciocho hitos, siete de ellos con plazo en días. ALTO pone en marcha esos hitos y monitorea su cumplimiento sobre los casos abiertos; presenta la matriz a Walmart para su formalización; y formula e implementa una matriz equivalente para la tramitación masiva, que despliega por decisión propia y sin requerir acuerdo previo.',
    obtiene: 'Los plazos del plan táctico cubren solo bandas. La tramitación masiva, que es el mayor volumen, no tiene ninguno. Walmart podrá tomar cualquier caso de banda y saber en qué hito va y si está dentro de plazo. Y tendrá lo mismo para masivo. El seguimiento deja de depender de preguntar caso a caso.',
    resp: 'Subgerencia de Persecución Penal Especializada',
    dep: 'Walmart: la formalización de la matriz está en su ámbito de decisión; la extensión a masivo no depende de Walmart',
    entregable: 'Matriz formalizada con Walmart, matriz equivalente implementada para tramitación masiva y reporte de cumplimiento de los hitos con plazo comprometido',
    indicador: 'Casos de banda con los hitos de plazo comprometido registrados: pendiente de levantamiento → 90%',
  },
  {
    n: 3, eje: 1, estado: 'Pendiente',
    tit: 'Implementar el protocolo de relacionamiento con fiscalías',
    desc: 'ALTO implementa un protocolo formal de relacionamiento con las fiscalías que incorpora alerta de inactividad a los sesenta días, registro de las solicitudes de entrevista y de sus rechazos, y minuta obligatoria de cada reunión sostenida. El protocolo permite reportar la gestión efectivamente realizada, y no solamente las entrevistas concretadas.',
    obtiene: 'Hoy solo se informan las entrevistas que se concretaron. Walmart no puede saber si el prestador gestionó y la fiscalía no accedió, o si no gestionó. Con el protocolo verá las solicitudes cursadas y también los rechazos. Cada reunión dejará minuta. Y una alerta avisará cuando una causa lleve sesenta días sin movimiento.',
    resp: 'Subgerencia de Persecución Penal Especializada',
    dep: null,
    entregable: 'Protocolo formalizado y primer reporte de gestión con solicitudes cursadas, entrevistas concretadas y rechazos registrados',
    indicador: 'Entrevistas con fiscal registradas con minuta: pendiente de levantamiento → 100%',
  },
  {
    n: 4, eje: 1, estado: 'Pendiente',
    tit: 'Establecer con Walmart una mesa de trabajo sobre la cartera judicializada preexistente',
    desc: 'ALTO propone y conduce una mesa de trabajo con Walmart para acordar y documentar el tratamiento de las causas judicializadas con anterioridad al cambio de modelo de intervención, considerando la entrada en operación de la nueva estrategia y los segmentos priorizados. El tratamiento acordado se formaliza por escrito.',
    obtiene: 'El 44,6% de las causas informadas es anterior a 2020. Ningún instrumento dice qué hacer con ellas, y el acuerdo verbal que se invocó Walmart lo desconoció por escrito. Con esta acción ambas partes fijan la regla por escrito: si se gestionan, si se cierran o si salen del universo informado. Walmart obtiene un universo reportado que reconoce como propio.',
    resp: 'Dirección Legal y Compliance',
    dep: 'Walmart: el tratamiento de la cartera preexistente requiere acuerdo bilateral',
    entregable: 'Acta de constitución de la mesa de trabajo e instrumento escrito que documente el tratamiento acordado',
    indicador: 'Regla escrita sobre la cartera preexistente: no existe → formalizada',
  },
  {
    n: 5, eje: 2, estado: 'Ejecutado',
    tit: 'Disponibilizar a Walmart la base estructurada por causa y el nuevo panel de reportería',
    desc: 'ALTO reconstruyó y depuró la base de causas vigentes y la estructuró tomando la causa como unidad de registro, en reemplazo del imputado. La base fue remitida a Walmart el 23 de julio de 2026 —2.838 causas vigentes, informando separadamente 3.023 imputados— y el nuevo panel de reportería fue liberado a producción ese mismo día con las definiciones validadas.',
    obtiene: 'Ya obtenido. Walmart recibió el 23 de julio la base estructurada por causa y el panel de reportería con las definiciones validadas. La cifra deja de mezclar causas con registros de imputado. La actualización periódica la asegura la acción 8.',
    resp: 'Dirección Legal y Compliance · Dirección de Mejora Continua',
    dep: null,
    entregable: 'Base remitida a Walmart y acta de liberación a producción del panel, ambas fechadas al 23 de julio de 2026',
    indicador: 'Unidad de registro informada a Walmart: imputado → causa',
  },
  {
    n: 6, eje: 2, estado: 'Pendiente',
    tit: 'Poner en operación el equipo dedicado de registro y actualización procesal',
    desc: 'ALTO definió el modelo del equipo dedicado —flujo de cuatro etapas y el Poder Judicial como fuente exclusiva— y adoptó la decisión de constituirlo. La acción comprende completar la incorporación de sus integrantes, definir la medida transitoria aplicable hasta su entrada efectiva en operación y emitir el primer reporte de producción.',
    obtiene: 'Hoy la actualización del estado la hacen personas que además tienen otras tareas. Que esté al día depende de que alguien tenga tiempo. Walmart obtiene un equipo cuya única función es esa, con el Poder Judicial como fuente exclusiva. Es la medida que ataca el origen del problema que motivó esta auditoría.',
    resp: 'Gerencia General · Dirección Legal y Compliance',
    dep: null,
    entregable: 'Equipo constituido, flujo de cuatro etapas documentado, medida transitoria definida y primer reporte de producción emitido',
    indicador: 'Causas actualizadas por el equipo dedicado: 0 → pendiente de levantamiento al entrar en operación',
  },
  {
    n: 7, eje: 2, estado: 'En curso',
    tit: 'Implementar controles de integridad del dato desde el origen del evento en WEOP',
    desc: 'ALTO despliega controles de integridad sobre el dato del evento desde su ingreso: identificador único que preserve la trazabilidad del evento a lo largo de las plataformas, traspaso automático entre ellas, formato horario de veinticuatro horas con validación, campos estructurados obligatorios, reglas automatizadas en reemplazo del marcado manual y marca de paso a control de detención al confirmarse el tribunal. WEOP es plataforma de Walmart: ALTO implementa los controles en el punto en que el evento ingresa a sus propias plataformas.',
    obtiene: 'Los eventos no tienen un identificador propio. La correspondencia entre el evento, la causa y el reporte se rehace a mano cada día, con el error que eso implica. Walmart podrá tomar un evento de su plataforma y seguirlo hasta la sentencia.',
    resp: 'Dirección de Tecnología y Sistemas · Dirección de Mejora Continua',
    dep: 'Walmart: las modificaciones dentro de WEOP y la parametrización de sus salidas requieren su concurrencia',
    entregable: 'Especificación funcional aprobada y evidencia de despliegue en producción de las seis medidas',
    indicador: 'Campo que determina el paso a control de detención con valor informado: 60,8% → 95%',
  },
  {
    n: 8, eje: 2, estado: 'Pendiente',
    tit: 'Institucionalizar la conciliación contra el Poder Judicial y establecer el protocolo de continuidad',
    desc: 'Dos componentes. (i) Conciliación: ALTO institucionaliza la contrastación periódica del estado procesal de sus registros contra el registro del Poder Judicial, de modo que deje de ser una revisión extraordinaria. (ii) Continuidad: un protocolo que resguarda la captura de eventos, el reporte diario de detenidos —con responsable formalmente designado— y la evidencia audiovisual frente a cambios o migraciones de plataforma.',
    obtiene: 'El estado que se informa sale del sistema del prestador y no se contrasta contra nada. La única verificación contra el Poder Judicial fue extraordinaria, a raíz de esta auditoría. Pasará a ser periódica y previa a la entrega. Walmart recibirá un estado ya verificado. Y un futuro cambio de plataforma dejará de hacer perder eventos y videos.',
    resp: 'Dirección de Mejora Continua · Dirección de Tecnología y Sistemas',
    dep: 'Walmart: la planificación de las migraciones de sus plataformas condiciona el componente de continuidad y fue solicitada sin respuesta a la fecha',
    entregable: 'Procedimiento de conciliación con periodicidad y responsable definidos, mapeo del reporte diario de detenidos y protocolo de resguardo de evidencia audiovisual',
    indicador: 'Conciliaciones ejecutadas conforme a la periodicidad definida: 0 → 100%',
  },
  {
    n: 9, eje: 3, estado: 'Pendiente',
    tit: 'Implementar el modelo integral de gestión de testigos',
    desc: 'ALTO despliega un modelo trazable de punta a punta: citación automatizada, equipo dedicado a la coordinación, registro de al menos dos testigos por evento —uno interno y uno externo—, kit informativo entregado al testigo, registro obligatorio de cada contacto de preparación, vinculación del testigo con su causa en el sistema de gestión y buzón único de notificaciones con gestión de tickets.',
    obtiene: 'La citación llega al trabajador a través de tres intermediarios y nadie confirma que llegó. Cuando no comparece, no se sabe en qué eslabón se cortó. Con esta acción cada eslabón confirma recepción y el testigo queda identificado en el sistema. Si un trabajador de Walmart no llega a un juicio, Walmart sabrá por qué.',
    resp: 'Dirección de Customer Success · Subgerencia de Persecución Penal Especializada',
    dep: null,
    entregable: 'Flujo de citación automatizado en operación, protocolo de doble testigo formalizado y campos obligatorios de registro desplegados',
    indicador: 'Testigos con contacto de preparación registrado en el sistema: pendiente de levantamiento → 90%',
  },
  {
    n: 10, eje: 3, estado: 'En curso',
    tit: 'Desplegar el nuevo panel de reportería y asistencia de testigos',
    desc: 'ALTO implementa un nuevo panel de asistencia de testigos que declara expresamente su fecha de corte, incorpora las mejoras ya comprometidas —con responsable y ticket asignados— y permite analizar la inasistencia diferenciando tipo de testigo, tienda y empresa de seguridad.',
    obtiene: 'El reporte mensual publica juntas tres cifras que no cuadran: 999 citaciones, 343 asistencias y 45,2% de asistencia. Tampoco declara hasta qué día están consideradas las audiencias. Con esta acción las cifras reconcilian o se declara por qué son universos distintos. Y podrá analizarse la inasistencia por tipo de testigo, tienda y empresa de seguridad.',
    resp: 'Dirección de Mejora Continua',
    dep: null,
    entregable: 'Panel desplegado con fecha de corte declarada, tickets comprometidos cerrados y primer diagnóstico de inasistencia emitido',
    indicador: 'Diagnóstico de inasistencia disponible: no → sí',
  },
  {
    n: 11, eje: 3, estado: 'Pendiente',
    tit: 'Formalizar el modelo de control de preparación previa de testigos',
    desc: 'ALTO adopta y documenta la decisión sobre el control de preparación previa: su reactivación con cobertura y responsable definidos, o su sustitución formal por otro mecanismo que cubra el mismo riesgo. La decisión se comunica al equipo con constancia. No se contempla mantener la situación actual de suspensión sin protocolo de reemplazo.',
    obtiene: 'Existe un control de preparación de testigos con columna propia en la base. Esa columna registra 0%: está suspendido por instrucción y sin reemplazo. Walmart obtiene una decisión escrita. Deja de haber un control que figura y no opera.',
    resp: 'Subgerencia de Persecución Penal Especializada',
    dep: null,
    entregable: 'Acto escrito de reactivación o de sustitución formal, con cobertura definida y constancia de comunicación al equipo',
    indicador: 'Aplicación del control sobre las audiencias del período: 0% → 100% si se reactiva',
  },
  {
    n: 12, eje: 4, estado: 'Pendiente',
    tit: 'Implementar y monitorear la matriz de puntos de control del servicio',
    desc: 'ALTO implementa la matriz de puntos de control del servicio, en la que cada control queda definido con umbral, alerta, responsable y frecuencia. La acción comprende verificar el estado de implementación de los controles comprometidos en las sesiones de revisión de flujos, resolver las condiciones que los habilitan y monitorear su operación efectiva, y no solo su definición.',
    obtiene: 'De las veintiocho fallas que esta auditoría acreditó, cuatro las detectó la propia operación. Las demás las advirtió Walmart o una revisión extraordinaria. Con esta acción cada proceso incorpora alertas con umbral y responsable obligado a actuar. Walmart deja de ser el mecanismo de detección del servicio que contrata.',
    resp: 'Dirección de Auditoría Interna (coordinación) · áreas responsables de cada proceso',
    dep: 'Walmart: una de las condiciones habilitantes es la formalización de la matriz de plazos',
    entregable: 'Matriz completa con los cuatro elementos por proceso y reporte del estado de implementación de los controles comprometidos',
    indicador: 'Procesos con punto de control que reúna los cuatro elementos: 0 de 28 → 15 de 28',
  },
  {
    n: 13, eje: 4, estado: 'Pendiente',
    tit: 'Formalizar los parámetros de medición y exigibilidad de los niveles de servicio',
    desc: 'Dos ámbitos diferenciados. ALTO implementa internamente la medición de los niveles de servicio que hoy carecen de parámetro y presenta a Walmart la métrica propuesta para cada uno. La fijación del parámetro exigible y su incorporación al instrumento contractual requieren acuerdo bilateral.',
    obtiene: 'Cuatro de los diez niveles de servicio tienen la multa fijada y el parámetro «a definir». Nunca se definió, así que la sanción figura y no puede aplicarse. El plazo de doce horas que Walmart espera tampoco está pactado en ninguna parte. Con esta acción cada nivel obtiene un umbral medible. Walmart pasa de multas nominales a compromisos exigibles.',
    resp: 'Dirección Legal y Compliance',
    dep: 'Walmart: la fijación del parámetro contractual exigible requiere acuerdo bilateral',
    entregable: 'Anexo o acuerdo escrito que fije plazo y métrica, y acta de validación del plan de fortalecimiento',
    indicador: 'Niveles de servicio con parámetro definido: 6 de 10 → 10 de 10',
  },
  {
    n: 14, eje: 4, estado: 'Pendiente',
    tit: 'Estandarizar los indicadores de cobertura de audiencias y de asistencia de testigos',
    desc: 'ALTO establece un denominador único para el indicador de cobertura de audiencias de control de detención y para el de asistencia de testigos, declara de forma explícita las exclusiones que cada uno aplica y comunica ambas fichas a Walmart, de modo que la lectura del indicador sea unívoca para ambas partes.',
    obtiene: 'La cobertura de audiencias y la asistencia de testigos se publican sin declarar qué dejan fuera. Uno de los dos mejora cuando el registro se deteriora: los eventos sin dato salen del denominador en vez de contarse como falla. Con esta acción Walmart podrá comparar un mes con otro. Y sabrá si una mejora es real o es un cambio de denominador.',
    resp: 'Dirección de Mejora Continua · Dirección Legal y Compliance',
    dep: null,
    entregable: 'Ficha de cada indicador con denominador único y exclusiones declaradas, comunicada formalmente a Walmart',
    indicador: 'Indicadores con denominador único y exclusiones declaradas: 0 de 2 → 2 de 2',
  },
  {
    n: 15, eje: 4, estado: 'Pendiente',
    tit: 'Fortalecer el modelo de gobernanza del servicio',
    desc: 'ALTO formaliza los componentes de gobernanza que hoy operan sin definición escrita: matriz de contrapartes y destinatarios por entregable, contraparte legal única con el nivel de experiencia acordado, actualización de la información entregada a Walmart sobre la conformación del equipo legal, controles aplicables a los prestadores externos, y protocolos de código de vestimenta y de criminalidad interna con constancia de difusión.',
    obtiene: 'Hoy Walmart debe dirigirse a distintos interlocutores según la materia. Los diecinueve reportes se distribuyen según una planilla interna, sin regla de destinatario. Obtiene una contraparte única para todos los frentes y un destinatario definido por entregable. Se corrige además la información entregada sobre la composición del equipo legal.',
    resp: 'Gerencia General · Dirección de Customer Success',
    dep: null,
    entregable: 'Matriz de contrapartes formalizada, contraparte única designada, comunicación de actualización a Walmart y protocolos emitidos con constancia de difusión',
    indicador: 'Entregables a Walmart con destinatario definido formalmente: 0 de 19 → 19 de 19',
  },
];

// ============================================================
//  Análisis cuantitativo — las tres bases entregadas
//  (Imputados tramitados y causas por entrega; desgloses del informe)
// ============================================================
window.BASES = [
  {
    id: 'may', fecha: '8 de mayo', tag: 'Primera entrega', imputados: 8003, causas: 7227,
    resumen: 'Base construida a partir de lo abierto en el sistema de origen y sin contrastarla contra el Poder Judicial para confirmar cuáles causas seguían realmente vigentes. El universo entregado contenía 8.003 registros.',
    bloques: [
      {
        tipo: 'status', tit: 'Lo que no correspondía', hal: 'HAL-002',
        nota: 'Más de la mitad del universo reportado eran causas ya terminadas que seguían informadas como vigentes, porque el estado procesal no se actualizaba en la plataforma. El 20 de mayo el analista de Walmart revisó 15 causas y encontró 13 concluidas en el Poder Judicial; el 23 de mayo llegó el reclamo formal del cliente.',
        bars: [
          { label: 'Causas que no correspondían', val: 4389, total: 7227, txt: '4.389 de 7.227' },
          { label: 'Imputados que no correspondían', val: 4980, total: 8003, txt: '4.980 de 8.003' },
        ],
      },
      {
        tipo: 'status', tit: 'La cartera antigua, sin regla escrita', hal: 'HAL-012',
        nota: 'Casi la mitad de los registros eran causas judicializadas antes del cambio de modelo (pre-2020), y ningún instrumento decía qué hacer con ellas: si se gestionaban, se cerraban o salían del universo informado. El acuerdo verbal que se invocó fue desconocido por escrito por el cliente.',
        bars: [
          { label: 'Registros anteriores a 2020', val: 3573, total: 8003, txt: '3.573 de 8.003 · 44,6%' },
        ],
      },
      {
        tipo: 'mags', tit: 'Dos magnitudes en el mismo archivo', hal: 'HAL-001',
        nota: '',
        items: [
          ['8.003', 'registros reales del archivo'],
          ['7.227', 'causas identificables'],
        ],
      },
    ],
  },
  {
    id: 'jun', fecha: '12 de junio', tag: 'Segunda entrega', imputados: 4321, causas: 3741,
    resumen: 'Segunda entrega, veintiún días después de la advertencia del cliente (23 de mayo). A partir de esa advertencia se comenzó a contrastar la información contra el Poder Judicial.',
    bloques: [
      {
        tipo: 'delta', tit: 'La caída frente al 8 de mayo',
        nota: 'El 14 de junio el cliente calificó la baja de 3.682 causas como «inaceptable» y «falla grave de control». El 15 de junio su propio analista, deduplicando RIT repetidos, situó el total en 4.090. La pérdida de confianza derivó en el encargo de auditoría.',
        rows: [
          { label: 'Imputados tramitados', from: '8.003', to: '4.321', delta: '−3.682', pct: '−46,0%' },
          { label: 'Causas', from: '7.227', to: '3.741', delta: '−3.486', pct: '−48,2%' },
        ],
      },
      {
        tipo: 'mags', tit: 'Qué explica la caída', hal: 'HAL-002',
        nota: 'La mayor parte de la caída corresponde a causas terminadas que se retiraron del universo al contrastarlo con el Poder Judicial. La causa técnica del defecto de origen permanece abierta: hay cuatro hipótesis concurrentes y ninguna está concluida. La confusión entre imputados y causas explica solo una fracción menor.',
        items: [
          ['46%', 'del universo del 8 de mayo no correspondía: causas terminadas informadas como vigentes'],
          ['21 días', 'entre el reclamo formal del cliente y la segunda entrega'],
          ['PJUD', 'se inició el contraste de la información contra el Poder Judicial'],
          ['4.090', 'recuento de Walmart al deduplicar RIT repetidos (15 de junio)'],
        ],
      },
    ],
  },
  {
    id: 'jul', fecha: '23 de julio', tag: 'Base reconstruida', imputados: 3023, causas: 2838, final: true,
    resumen: 'Base reconstruida y depurada durante la auditoría, ya estructurada por causa como unidad de registro: 2.838 causas vigentes, informando separadamente 3.023 imputados. En la depuración participó además un auditor externo independiente que revisó las bases — parte de la baja proviene de esa revisión. El panel de reportería se liberó a producción el mismo día con las definiciones validadas.',
    bloques: [
      {
        tipo: 'delta', tit: 'La caída frente al 12 de junio',
        nota: 'Corresponde a la depuración practicada durante el encargo, con verificación del estado procesal y revisión de un auditor externo independiente. Una tercera revisión interna (7 de julio) ya había situado la base en torno a 3.500.',
        rows: [
          { label: 'Imputados tramitados', from: '4.321', to: '3.023', delta: '−1.298', pct: '−30,0%' },
          { label: 'Causas', from: '3.741', to: '2.838', delta: '−903', pct: '−24,1%' },
        ],
      },
      {
        tipo: 'delta', tit: 'Cuánto bajamos entre la 1.ª y la 3.ª entrega',
        nota: 'Es la magnitud total del descuadre: más de la mitad del universo originalmente reportado no se sostuvo.',
        rows: [
          { label: 'Imputados tramitados', from: '8.003', to: '3.023', delta: '−4.980', pct: '−62,2%' },
          { label: 'Causas', from: '7.227', to: '2.838', delta: '−4.389', pct: '−60,7%' },
        ],
      },
      {
        tipo: 'mags', tit: 'Qué cambió de fondo',
        nota: 'Las correcciones constan documentadas y fechadas (acción 5 del plan, ejecutada). Corrigen el resultado; el mecanismo lo atacan las acciones 6 y 8, pendientes.',
        items: [
          ['causa', 'pasa a ser la unidad de registro ante el cliente, en vez del imputado'],
          ['externo', 'un auditor independiente revisó las bases durante la depuración'],
          ['23-07', 'acta de liberación a producción del panel con definiciones validadas'],
          ['0', 'conciliaciones periódicas institucionalizadas contra el Poder Judicial — pendiente (acción 8)'],
        ],
      },
    ],
  },
];

// ============================================================
//  Registro Maestro: las 29 observaciones en una línea.
//  Fuente: hoja "Dia 1 - Auditoria: Observaciones" (col. Descripción
//  corregida, fuente canónica) + Informe Final v5 (§8 deriva).
//  hal = hallazgo al que derivó; trat = tratamiento motivado distinto.
// ============================================================
window.REGISTRO_URL = 'https://docs.google.com/spreadsheets/d/1ZoItHoF_W16Ip-sH_1qs-9mYrl3XVHKKepAzgiJ8Z8E/edit';
window.OBSERVACIONES = [
  { code: 'OBS-001', tit: 'Reporte de causas vigentes WM', resumen: 'Ante la solicitud del listado de causas vigentes, se entregó un archivo construido por imputados y un panel cuyas denominaciones no correspondían a lo que contaban.', hal: 'HAL-001' },
  { code: 'OBS-002', tit: 'Estado procesal de las causas', resumen: 'Parte de las causas informadas como vigentes ya estaba terminada; el cliente lo detectó al contrastar el listado contra el Poder Judicial.', hal: 'HAL-002' },
  { code: 'OBS-003', tit: 'Cobertura ACD (% de asistencia)', resumen: 'Casos reportados «sin información» que sí contaban con la información completa para ir a la audiencia; error de reporte, no de cobertura.', hal: 'HAL-010' },
  { code: 'OBS-004', tit: 'Identificación de detenidos', resumen: 'La identidad del detenido no queda establecida en la captura del evento, y el evento con datos incompletos queda fuera del sistema de registro.', hal: 'HAL-010' },
  { code: 'OBS-005', tit: 'Qué significa 100% de cobertura ACD', resumen: 'Qué significa y cómo se sustenta el «100% de cobertura ACD»; se constató un problema en la marca del sistema y no en la entrega de la información.', hal: 'HAL-003' },
  { code: 'OBS-006', tit: 'Pérdida de información WEOP', resumen: 'El cliente reemplazó Alliance por WEOP sin aviso ni plan de migración; los eventos carecen de identificador único y la correspondencia se reconstruye a diario.', hal: 'HAL-006' },
  { code: 'OBS-007', tit: 'Pasa o no a control de detención', resumen: 'El campo que registra si el detenido pasó a control se completa al final de la jornada, y la ausencia de dato no se distingue de una derivación negativa.', trat: 'Tratamiento motivado distinto' },
  { code: 'OBS-008', tit: 'Preparación de testigos', resumen: 'El control «Gestión previa de testigos» está suspendido —«no aplicar hasta aviso»— sin protocolo de reemplazo; su columna registra 0%.', hal: 'HAL-009' },
  { code: 'OBS-009', tit: 'Cobertura de audiencias programadas', resumen: 'La asistencia a audiencias programadas no se estaba informando correctamente en la data; defecto advertido por el cliente.', hal: 'HAL-010' },
  { code: 'OBS-010', tit: 'Comparecencia de testigos', resumen: 'La base consolidada de comparecencia no es trazable a su fuente: completa 433 vacíos y contradice 46 registros sin regla documentada.', hal: 'HAL-009' },
  { code: 'OBS-011', tit: 'Base de asistencia y programación futura', resumen: 'El panel de testigos y las audiencias programadas estaban incompletos; defecto advertido por el cliente.', hal: 'HAL-004' },
  { code: 'OBS-012', tit: 'Reporte diario de detenidos', resumen: 'El reporte al cliente se cuadra mediante depuración manual diaria, sin control sistémico que garantice su integridad ni mapeo documentado.', hal: 'HAL-010' },
  { code: 'OBS-013', tit: 'SLA de información preliminar', resumen: 'El plazo de doce horas que el cliente espera para la información preliminar no está pactado en el instrumento contractual.', hal: 'HAL-005' },
  { code: 'OBS-014', tit: 'Litigación', resumen: 'Reclamo del cliente por desempeño deficiente de abogados en audiencias a las que asistió (nula participación, bajo nivel de alegatos).', trat: 'Tratamiento motivado distinto' },
  { code: 'OBS-015', tit: 'Código de vestimenta', resumen: 'Reclamo del cliente por un estándar de vestimenta inadecuado para el contexto judicial en audiencias a las que asistió.', trat: 'Tratamiento motivado distinto' },
  { code: 'OBS-016', tit: 'Conformación del equipo legal', resumen: 'Inconsistencia entre la respuesta entregada al cliente —todos los abogados internos— y los registros, que identifican prestadores externos.', hal: 'HAL-011' },
  { code: 'OBS-017', tit: 'Entrevistas con fiscales', resumen: 'Preocupación del cliente por el bajo nivel de interacción y relacionamiento con los fiscales a cargo de las causas.', trat: 'Tratamiento motivado distinto' },
  { code: 'OBS-018', tit: 'Cambio de estrategia penal', resumen: 'Los cambios del modelo de intervención se adoptaron sin disposición transitoria alguna sobre las causas ya judicializadas al momento del cambio.', hal: 'HAL-012' },
  { code: 'OBS-019', tit: 'Vinculación de bandas por CCTV', resumen: 'La vinculación de bandas mediante circuito cerrado opera sin proceso estandarizado ni los controles esperables.', hal: 'HAL-014' },
  { code: 'OBS-020', tit: 'Protocolo de descargas CCTV', resumen: 'No existe protocolo de resguardo probatorio del video: la retención más corta vence antes del momento procesal en que la prueba debe ofrecerse.', hal: 'HAL-014' },
  { code: 'OBS-021', tit: 'Contraparte legal fija', resumen: 'No existe una contraparte legal única establecida para la relación con el cliente.', hal: 'HAL-005' },
  { code: 'OBS-022', tit: 'Contrapartes y entregables por frente', resumen: 'Los reportes al cliente se distribuyen a un conjunto disperso de destinatarios registrado únicamente en una planilla interna.', hal: 'HAL-005' },
  { code: 'OBS-023', tit: 'Eventos de mesa de ayuda (tiendas piloto)', resumen: 'Las tiendas piloto dejaron de reportar en Alliance y los eventos de actividad criminal sin detenido perdieron trazabilidad y gestión.', hal: 'HAL-006' },
  { code: 'OBS-024', tit: 'Vinculación de testigos en Alliance', resumen: 'La lista de testigos no es verificable contra la causa: el vínculo se reconstruye a mano y el testigo carece de identificador único.', hal: 'HAL-009' },
  { code: 'OBS-025', tit: 'Personas relacionadas (sin BBDD)', resumen: 'No existe base maestra de personas relacionadas; el efecto es de eficiencia operativa y no afecta la información entregada al cliente.', trat: 'Oportunidad de mejora' },
  { code: 'OBS-026', tit: 'Citación de testigos', resumen: 'La citación se dirige al encargado de la tienda y no al testigo, y falla justo en el supuesto que concentra más inasistencias.', hal: 'HAL-009' },
  { code: 'OBS-027', tit: 'Actualización de causas', resumen: 'No existe un proceso de actualización y control de vigencia de las causas: las funciones están distribuidas sin coordinación ni capacidad dimensionada.', hal: 'HAL-007' },
  { code: 'OBS-028', tit: 'Puntos de control', resumen: 'La operación ejecuta sus procesos sin umbrales, alertas ni responsables que detecten desviaciones durante la ejecución.', hal: 'HAL-015' },
  { code: 'OBS-029', tit: 'Criminalidad interna', resumen: 'Consulta del cliente por la antigüedad de una causa de criminalidad interna que continuaría en tramitación.', hal: 'HAL-013' },
];

// Gobernanza del plan (§4).
window.PLAN_GOB = [
  { tit: 'Dueño único', desc: 'La ejecución integral queda radicada en la Gerencia General, que responde por su avance ante el comité corporativo. La coordinación y el reporte consolidado no se delegan.' },
  { tit: 'Seguimiento', desc: 'Comité de seguimiento quincenal con los responsables de cada acción y la Dirección de Auditoría Interna como observadora. Revisión mensual ante el comité corporativo.' },
  { tit: 'Reporte al cliente', desc: 'Informe mensual de avance, con el estado de cada acción, la evidencia de cierre de las completadas y la declaración expresa de las que dependen de una respuesta del cliente.' },
  { tit: 'Escalamiento', desc: 'Una acción sin avance verificable en dos comités consecutivos escala al comité corporativo. Las acciones con dependencia externa escalan a la Gerencia General para gestión directa con el cliente.' },
];

// ============================================================
//  Remediaciones definitivas (estructura final; serán ~8).
//  Cada una replica la plantilla del documento de Remediación 1.
// ============================================================
window.REMS = [
  {
    n: 1,
    corto: 'Conciliación preventiva de las causas vigentes reportadas a Walmart',
    // Seguimiento: etapas completadas (etapaDone) y etapa en curso (etapa) sobre
    // la secuencia Diseño → Aprobación → Implementación → Evidencia → Validación → Cierre.
    seg: {
      etapaDone: 1,
      etapa: 2,
      docEstado: 'Documento emitido',
      remEstado: 'Remediación no iniciada',
      fechaObjetivo: 'Por definir',
      plazo: 'Sin fecha comprometida',
      efectividad: 'Tres indicadores con meta 100%, medidos desde la implementación',
    },
    tit: 'Implementar un proceso preventivo de conciliación y actualización de las causas vigentes reportadas a Walmart',
    resumen: 'A más tardar el 25 de cada mes, la Unidad de Registro y Actualización ejecutará una conciliación y actualización obligatoria, previa a cada reporte de causas vigentes a Walmart (primeros 5 días del mes). El informe final contendrá todas —y solamente— las causas asociadas a Walmart con querella presentada que, revisado su expediente, no registren un hito procesal de término. El control lo ejecuta un equipo con funciones, capacidad y mecanismos de continuidad formalmente definidos.',
    pasos: [
      { t: 'Descarga del universo preliminar', tc: 'Descarga del universo', d: 'Desde el panel se descarga la base de causas que, conforme a los sistemas internos de ALTO, cuentan con querella presentada y no tienen resultado o estado de término registrado. Esa base constituye el universo preliminar sujeto a revisión.' },
      { t: 'Verificación de integridad del universo', tc: 'Verificación de integridad', d: 'Se verifica que la descarga incluya todas las causas que cumplen las condiciones. Las que debían estar y no aparecen se incorporan al informe y se regularizan en los sistemas internos.', formula: 'Vigentes del período anterior + nuevas causas con querella − causas con hito de término ± ajustes justificados = universo vigente del período actual' },
      { t: 'Revisión contra el Poder Judicial', tc: 'Revisión contra el PJUD', d: 'Validada la integridad, se revisa el 100% de las causas contra el PJUD completando dos campos por causa: Espejo PJUD (estado resumido de la carátula) y Estado procesal validado por ALTO (determinado por un profesional especializado sobre el historial del expediente, con un catálogo formalizado de hitos procesales).' },
      { t: 'Tratamiento de inconsistencias y discrepancias', tc: 'Inconsistencias y discrepancias', d: 'Inconsistencia atribuible a ALTO: el expediente acredita el término pero no fue registrado internamente — la causa se actualiza y se excluye del universo antes de emitir. Discrepancia del PJUD: la carátula no coincide con el expediente — se informa la diferencia acreditándola con la actuación o resolución que la funda. Todo queda identificado, clasificado y respaldado. La conciliación es condición obligatoria para emitir el reporte.' },
    ],
    reporteria: [
      { t: 'Panel estático', d: 'Muestra, a la fecha de corte, el número de causas con querella y sin resultado registrado, y el número de imputados en tramitación asociados. Es estático y resumido; desde él se descarga la base que se somete a conciliación.' },
      { t: 'Informe final en Excel', d: 'La base del panel complementada con la verificación de integridad y la revisión PJUD. Contiene como mínimo: información de los sistemas internos, RUC, Espejo PJUD, Estado procesal validado por ALTO, causas incorporadas por omisión, clasificación de inconsistencias y discrepancias, y su respaldo. Toda diferencia con el panel se explica mediante el registro de inclusiones, exclusiones y ajustes; las inconsistencias atribuibles a ALTO se corrigen en sus sistemas.' },
    ],
    resp: 'Unidad de Registro y Actualización',
    valid: 'Gerencia Legal — independiente de la ejecución',
    fecha: 'Por definir',
    period: 'Antes de cada reporte a Walmart y, como mínimo, una vez al mes',
    indicadores: [
      { t: 'Inclusión íntegra del universo', f: 'Causas que cumplen las condiciones e incorporadas al informe final ÷ total que cumple las condiciones × 100', meta: '100%' },
      { t: 'Actualización y exclusión de causas terminadas', f: 'Causas con hito de término actualizadas y excluidas ÷ total con hito de término identificado × 100', meta: '100%' },
      { t: 'Trazabilidad de la revisión procesal', f: 'Causas con Espejo PJUD, estado validado y respaldo completo ÷ total de causas revisadas × 100', meta: '100%' },
    ],
    evidencia: [
      'Procedimiento de conciliación y catálogo de hitos procesales',
      'Documento de conformación y funciones del equipo',
      'Panel correspondiente a la fecha de corte',
      'Base original descargada desde el panel',
      'Registro de causas incorporadas, excluidas y ajustadas',
      'Registro de inconsistencias atribuibles a ALTO y sus correcciones',
      'Registro de discrepancias del PJUD y sus respaldos',
      'Informe final en Excel enviado a Walmart',
      'Acta de validación del cierre',
    ],
    cierre: 'Implementada cuando el proceso esté formalizado, el equipo operando y se acredite durante tres ciclos mensuales consecutivos: la verificación de integridad del universo, la revisión del 100% de las causas contra el PJUD, el tratamiento de todas las inconsistencias y discrepancias, la entrega del informe final a Walmart y el cumplimiento íntegro de los tres indicadores. El cierre lo valida el Gerente Legal, independiente de la ejecución.',
    control: 'Después del cierre, el proceso continúa ejecutándose antes de cada reporte a Walmart. Toda causa omitida, causa terminada no actualizada, revisión sin respaldo o discrepancia no justificada genera una acción correctiva con responsable y plazo definidos.',
  },
];
