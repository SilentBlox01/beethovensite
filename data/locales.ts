import { Translation } from '../types';

const es: Translation = {
  common: {
    appName: 'Beethoven',
    tagline: 'Privacidad simplificada para todos',
    start: 'Comenzar',
    next: 'Siguiente',
    back: 'Atrás',
    close: 'Cerrar',
    loading: 'Cargando...',
    error: 'Error',
    viewGuide: 'Ver Guía',
    seeMore: 'Ver Más',
    free: 'Gratis',
    openSource: 'Código Abierto',
    all: 'Todo'
  },
  nav: {
    home: 'Inicio',
    tools: 'Herramientas',
    assessment: 'Diagnóstico',
    hub: 'Apps',
    docs: 'Guías',
    faq: 'FAQ',
    about: 'Nosotros',
    theme: 'Tema',
    legal: 'Legal',
    terms: 'Términos',
    privacy: 'Privacidad',
    stories: 'Historias'
  },
  inspector: {
    enable: 'Inspector',
    disable: 'Cerrar',
    title: 'Inspector UI',
    select: 'Selecciona un elemento',
    props: 'Propiedades',
    computed: 'Computado',
    tag: 'Etiqueta',
    class: 'Clase',
    dimensions: 'Dimensiones',
    color: 'Color',
    font: 'Tipografía',
    spacing: 'Espaciado'
  },
  analyzer: {
    title: "Analizador de Privacidad",
    subtitle: "Verificando las defensas de tu navegador en tiempo real",
    analyzing: "Analizando entorno...",
    score: "Puntuación de Protección",
    grade: {
      a: "Excelente",
      b: "Bueno",
      c: "Aceptable",
      d: "Débil",
      f: "Crítico"
    },
    metrics: {
      https: "Cifrado HTTPS",
      httpsDesc: "Verifica si la conexión es segura.",
      tracking: "Protección de Rastreo",
      trackingDesc: "Detecta señales Global Privacy Control / DNT.",
      fingerprint: "Huella Digital",
      fingerprintDesc: "Resistencia al rastreo por Canvas/Audio.",
      webrtc: "Fuga WebRTC",
      webrtcDesc: "Comprueba si tu IP real es visible.",
      adblock: "Bloqueo de Anuncios",
      adblockDesc: "Verifica si hay un bloqueador activo.",
      battery: "API de Batería",
      batteryDesc: "Verifica si las webs pueden ver tu nivel de carga.",
      hardware: "Núcleos CPU",
      hardwareDesc: "Revelar núcleos exactos ayuda al perfilado.",
      memory: "Memoria RAM",
      memoryDesc: "Exponer cantidad de RAM facilita la huella digital."
    },
    status: {
      protected: "Protegido",
      vulnerable: "Vulnerable",
      warning: "Precaución",
      detected: "Detectado",
      hidden: "Oculto"
    },
    cta: "Mejorar Privacidad"
  },
  stories: {
    heroTitle: "Historias de Privacidad",
    heroSubtitle: "Por qué hacemos lo que hacemos",
    nameTitle: "El Nombre",
    nameDesc: "Beethoven es un tributo a nuestro Chihuahua que falleció. Su espíritu vive en esta app: protegiendo, cuidando y dando libertad a todos.",
    stormTitle: "La Tormenta",
    stormDesc: "En un mar de vigilancia, buscamos ser un faro de seguridad.",
    missionTitle: "Nuestra Misión",
    missionDesc: "Democratizar la privacidad digital a través de herramientas de código abierto.",
    visionTitle: "Visión",
    visionDesc: "Un internet donde la privacidad es la norma, no la excepción.",
    values: {
      title: "Nuestros Valores",
      items: [
        { title: "Transparencia", desc: "Código abierto y auditable.", icon: "code" },
        { title: "Privacidad", desc: "Tus datos son tuyos.", icon: "shield" },
        { title: "Comunidad", desc: "Construido por y para la gente.", icon: "heart" }
      ]
    }
  },
  about: {
    title: "Sobre Nosotros",
    subtitle: "Construyendo un futuro digital más seguro",
    missionTitle: "Misión",
    missionP1: "Creemos que la privacidad es un derecho humano fundamental.",
    missionP2: "Desarrollamos herramientas fáciles de usar para proteger tu vida digital.",
    pillars: {
      privacy: { title: "Privacidad", desc: "Sin rastreo, sin anuncios." },
      opensource: { title: "Open Source", desc: "Totalmente transparente." },
      free: { title: "Gratuito", desc: "Accesible para todos." },
      education: { title: "Educación", desc: "Aprende mientras te proteges." }
    },
    ctaTitle: "¿Listo para empezar?",
    ctaDesc: "Únete a nosotros en este viaje.",
    ctaHome: "Ir al Inicio",
    ctaGit: "GitHub"
  },
  home: {
    heroTitle: "Tu Privacidad,",
    heroSubtitle: "Simplificada.",
    heroDesc: "Diagnostica, aprende y protege tu vida digital con herramientas de código abierto. Sin registros, sin costos, 100% privado.",
    ctaCheck: "Diagnóstico Rápido",
    ctaGuides: "Guías",
    ctaAnalyzer: "Analizador en Vivo",
    featuresTitle: "Todo lo que necesitas",
    featuresDesc: "Un conjunto completo de herramientas para recuperar tu privacidad.",
    featDiagnosis: "Diagnóstico Personal",
    featDiagnosisDesc: "Evalúa tu postura de seguridad actual con un cuestionario interactivo y recibe recomendaciones personalizadas.",
    featTools: "Caja de Herramientas",
    featToolsDesc: "Generadores de contraseñas, limpiadores de enlaces, verificación de brechas y más utilidades esenciales.",
    featHub: "Centro de Privacidad",
    featHubDesc: "Descubre alternativas respetuosas con la privacidad para las aplicaciones y servicios que usas a diario.",
    featLab: "Laboratorio de Imagen",
    featLabDesc: "Limpia metadatos EXIF sensibles (ubicación, dispositivo) de tus fotos antes de compartirlas.",
    featPhishing: "Entrenador Anti-Phishing",
    featPhishingDesc: "Aprende a identificar estafas y correos maliciosos con escenarios interactivos realistas.",
    trustTitle: "Por qué confiar en nosotros",
    trustNoTrackers: "Sin Rastreadores",
    trustNoTrackersDesc: "No recopilamos datos personales ni usamos cookies de terceros.",
    trustLocal: "Procesamiento Local",
    trustLocalDesc: "Tus datos se procesan en tu dispositivo, no en nuestros servidores.",
    trustOpen: "Código Abierto",
    trustOpenDesc: "Nuestro código es público y auditable por cualquier persona.",
    openSourceSectionTitle: "100% Open Source",
    openSourceSectionDesc: "La transparencia es clave para la confianza. Explora nuestro código en GitHub.",
    openSourceSectionBtn: "Ver en GitHub",
    mapLabel: "Mapa de Amenazas Globales (Simulado)"
  },
  assessment: {
    title: "Diagnóstico de Seguridad",
    subtitle: "Evaluemos tu nivel de protección actual",
    deviceStep: "Dispositivos",
    identityStep: "Identidad",
    securityStep: "Seguridad",
    defenseStep: "Defensa",
    startBtn: "Comenzar Evaluación",
    phase1: "Fase 1: Fundamentos",
    phase2: "Fase 2: Identidad Digital",
    phase3: "Fase 3: Comunicación",
    phase4: "Fase 4: Seguridad",
    phase5: "Fase 5: Defensa Activa",
    viewReport: "Ver Informe Completo",
    questions: {
      os: "¿Qué sistema operativo usas principalmente?",
      osDesc: "Selecciona tu plataforma principal.",
      updates: "¿Cómo manejas las actualizaciones de software?",
      updatesDesc: "Las actualizaciones corrigen fallos de seguridad críticos.",
      backups: "¿Realizas copias de seguridad?",
      backupsDesc: "Esencial contra ransomware y pérdida de datos.",
      browsers: "¿Qué navegador web utilizas?",
      browsersDesc: "Tu ventana a internet.",
      search: "¿Qué buscador usas?",
      searchDesc: "Algunos buscadores rastrean cada búsqueda.",
      email: "¿Quién es tu proveedor de correo?",
      emailDesc: "El correo es la llave de tu identidad digital.",
      social: "¿Qué redes sociales usas más?",
      socialDesc: "Las redes sociales recopilan gran cantidad de datos.",
      messaging: "¿Qué app de mensajería usas?",
      messagingDesc: "La encriptación es vital para la privacidad.",
      cloud: "¿Dónde guardas tus archivos en la nube?",
      cloudDesc: "Tus documentos personales.",
      iot: "¿Tienes dispositivos inteligentes en casa?",
      iotDesc: "Altavoces, cámaras, etc.",
      passwords: "¿Cómo gestionas tus contraseñas?",
      passwordsDesc: "Reutilizar contraseñas es el mayor riesgo.",
      twoFactor: "¿Usas autenticación en dos pasos (2FA)?",
      twoFactorDesc: "Una capa extra de seguridad.",
      phishing: "¿Qué haces ante un correo sospechoso?",
      phishingDesc: "Ingeniería social y estafas.",
      risks: "¿A qué riesgos te expones frecuentemente?",
      risksDesc: "Hábitos diarios.",
      defense: "¿Qué herramientas de defensa utilizas?",
      defenseDesc: "Protección activa."
    },
    options: {
      none: "Ninguno / No uso",
      auto: "Automáticas (Recomendado)",
      manual: "Manual, cuando me acuerdo",
      never: "Casi nunca / Nunca",
      yes: "Sí",
      no: "No"
    },
    choices: {
      linuxOther: "Linux / Otros",
      manualLate: "Manual (a veces las ignoro)",
      backupBoth: "Nube y Disco Físico",
      backupCloud: "Solo Nube Automática",
      backupDisk: "Solo Disco Externo",
      browserOther: "Otro",
      searchBing: "Bing / Yahoo",
      emailGmail: "Gmail",
      emailOutlook: "Outlook / Hotmail",
      emailIcloud: "iCloud Mail",
      emailProton: "Proton / Tutanota",
      emailYahoo: "Yahoo Mail",
      msgSms: "SMS / iMessage",
      cloudDrive: "Google Drive",
      iotAlexa: "Amazon Alexa",
      iotGoogle: "Google Nest/Home",
      iotRing: "Cámaras (Ring/Nest)",
      iotTv: "Smart TV",
      passUnique: "Gestor de Contraseñas",
      passUniqueDesc: "Contraseñas únicas para todo",
      passMostly: "Variaciones",
      passMostlyDesc: "Uso una base y la cambio un poco",
      passReused: "Reutilizo Contraseñas",
      passReusedDesc: "Uso la misma para casi todo",
      twoFaApp: "App Autenticadora",
      twoFaAppDesc: "Google Auth, Authy, Aegis",
      twoFaKey: "Llave de Seguridad",
      twoFaKeyDesc: "YubiKey, Titan",
      twoFaSms: "SMS / Email",
      twoFaSmsDesc: "Me envían un código",
      twoFaNone: "No uso 2FA",
      twoFaNoneDesc: "Solo uso contraseña",
      phishCheck: "Verifico el remitente",
      phishCheckDesc: "Miro la dirección real",
      phishLook: "Analizo los enlaces",
      phishLookDesc: "Sin hacer clic",
      phishOpen: "Abro y veo",
      phishOpenDesc: "Confío en el filtro de spam",
      riskWifi: "Wi-Fi Público",
      riskWifiDesc: "Cafeterías, aeropuertos",
      riskBlue: "Bluetooth siempre activo",
      riskBlueDesc: "Visible para todos",
      riskLoc: "Ubicación siempre activa",
      riskLocDesc: "GPS activado",
      riskUsb: "Carga USB Pública",
      riskUsbDesc: "Puertos desconocidos",
      defPass: "Gestor de Contraseñas",
      def2fa: "App 2FA",
      defVpn: "VPN",
      defAd: "Bloqueador de Anuncios",
      defScreen: "Filtro de Privacidad"
    }
  },
  results: {
    securityLevel: "Nivel de Seguridad",
    score: "Puntuación",
    actionPlan: "Tu Plan de Acción",
    personalizedRecs: "Recomendaciones basadas en tus respuestas",
    perfectTitle: "¡Excelente Trabajo!",
    perfectDesc: "Tienes hábitos de seguridad muy sólidos. Mantén la vigilancia.",
    critical: "Crítico",
    suggestion: "Sugerencia",
    retest: "Repetir Test",
    areasToImprove: "áreas para mejorar",
    exportJsonBtn: "Exportar JSON",
    exportReportBtn: "Exportar Informe",
    reportTitle: "INFORME DE EVALUACIÓN DE PRIVACIDAD DE BEETHOVEN",
    reportGenerated: "Generado:",
    reportScore: "PUNTUACIÓN:",
    reportRecommendations: "RECOMENDACIONES:",
    categoryMobile: "Móvil",
    categoryBrowser: "Navegador",
    categoryNetworks: "Wi-Fi y Redes",
    categoryPasswords: "Contraseñas",
    assessmentCompleted: "Evaluación completada con puntuación",
    labels: {
      excellent: "Excelente",
      improvable: "Mejorable",
      vulnerable: "Vulnerable"
    }
  },
  tools: {
    title: "Caja de Herramientas",
    subtitle: "Utilidades esenciales para tu privacidad",
    tabKeys: "Claves",
    tabPrivacy: "Privacidad",
    tabUtils: "Utilidades",
    tabFiles: "Archivos",
    tabRadar: "Radar",
    tabSPS: "SPS",
    genTitle: "Generador de Contraseñas",
    genDesc: "Crea contraseñas robustas y aleatorias localmente.",
    auditTitle: "Auditor de Contraseñas",
    auditDesc: "Verifica la fortaleza y si ha sido filtrada.",
    leaksTitle: "Verificar Filtraciones",
    leaksDesc: "Consulta si tu correo ha sido comprometido.",
    fingerprintTitle: "Huella Digital",
    fingerprintDesc: "Analiza qué información revela tu navegador.",
    cleanerTitle: "Limpiador de Enlaces",
    cleanerDesc: "Elimina parámetros de rastreo de las URLs.",
    msgTitle: "Mensaje Seguro",
    msgDesc: "Encripta mensajes con AES-GCM.",
    tokenTitle: "Generador de Tokens",
    tokenDesc: "Crea identificadores únicos seguros.",
    permissionsTitle: "Permisos del Navegador",
    permissionsDesc: "Revisa qué sitios tienen acceso a tu hardware.",
    auditPlaceholder: "Escribe una contraseña para probar (localmente)...",
    genLength: "Longitud",
    radarStatusLabel: "Estado del Radar",
    cleanUrlLabel: "URL Limpia",
    foundInBreaches: "Encontrada en {count} filtraciones",
    hardwareGenerated: "Generado por Hardware",
    compositeHashDesc: "Hash compuesto de características del dispositivo",
    radarReady: "Radar listo. Iniciar escaneo.",
    copy: "Copiar",
    copied: "Copiado",
    regenerate: "Regenerar",
    encrypt: "Encriptar",
    decrypt: "Desencriptar",
    cleanUrl: "Limpiar URL",
    check: "Comprobar",
    analyze: "Analizar",
    weak: "Débil",
    medium: "Media",
    strong: "Fuerte",
    excellent: "Excelente",
    compromised: "Comprometida",
    safetyScore: "Puntuación de Seguridad",
    riskSafe: "Seguro",
    riskSuspicious: "Sospechoso",
    riskDangerous: "Peligroso",
    analysis: "Análisis",
    unknown: "Desconocido",
    time: {
      seconds: "segundos",
      minutes: "minutos",
      hours: "horas",
      days: "días",
      years: "años",
      centuries: "siglos"
    },
    vaultTitle: "Bóveda de Archivos",
    vaultDesc: "Encripta archivos localmente con AES-GCM.",
    vaultDrop: "Arrastra un archivo aquí",
    vaultPassPlaceholder: "Contraseña de encriptación",
    vaultEncryptBtn: "Encriptar y Descargar",
    vaultDecryptBtn: "Desencriptar y Descargar",
    vaultDownload: "Descargar",
    vaultError: "Error al procesar el archivo. Verifica la contraseña.",
    stegTitle: "Esteganografía",
    stegDesc: "Oculta mensajes de texto dentro de imágenes.",
    stegHideTab: "Ocultar",
    stegRevealTab: "Revelar",
    stegDrop: "Arrastra una imagen",
    stegMessage: "Mensaje secreto...",
    stegHideBtn: "Ocultar Mensaje",
    stegRevealBtn: "Revelar Mensaje",
    stegDownload: "Descargar Imagen",
    stegHidden: "Mensaje Oculto:",
    stegNoHidden: "No se encontró ningún mensaje oculto.",
    socialTitle: "Privacidad en Redes",
    socialDesc: "Accesos directos a la configuración de privacidad.",
    entropyBits: "bits de entropía",
    crackTime: "Tiempo estimado de crackeo",
    instant: "Instantáneo",
    crackScenarios: {
      laptop: "Laptop Común",
      rig: "Granja de GPU",
      supercomputer: "Superordenador"
    },
    patterns: {
      title: "Patrones Detectados",
      sequence: "Secuencia común",
      repeat: "Caracteres repetidos",
      date: "Fecha o año",
      keyboard: "Patrón de teclado"
    },
    gdprTitle: "Generador GDPR",
    gdprDesc: "Crea una solicitud de acceso a datos simple.",
    gdprCompany: "Nombre de la empresa",
    gdprName: "Tu nombre completo",
    gdprEmail: "Tu email registrado",
    gdprGenerate: "Generar Solicitud",
    gdprTemplate: "Estimado Oficial de Privacidad de {company},\n\n...",
    qrTitle: "Generador QR Seguro",
    qrDesc: "Crea códigos QR para Wi-Fi sin revelar la clave en texto.",
    qrWifi: "Wi-Fi",
    qrText: "Texto/URL",
    qrSsid: "Nombre de la red (SSID)",
    qrPass: "Contraseña",
    qrHidden: "••••••",
    qrGenerate: "Generar QR",
    webrtcTitle: "Prueba de Fuga WebRTC",
    webrtcDesc: "Comprueba si tu navegador filtra tu IP real a través de WebRTC.",
    webrtcLeak: "¡Fuga Detectada!",
    webrtcSafe: "Seguro: IP Oculta",
    webrtcCheck: "Comprobar Fuga",
    checksumTitle: "Verificador de Checksum",
    checksumDesc: "Verifica la integridad de un archivo comparando su hash.",
    checksumDrop: "Arrastra archivo para hashear",
    checksumHash: "SHA-256 Hash:",
    checksumCompare: "Comparar con...",
    checksumMatch: "¡Coinciden!",
    checksumMismatch: "No coinciden",
    radarTitle: "Breach Radar",
    radarDesc: "Escáner de seguridad de dominios y configuración DNS.",
    radarPlaceholder: "dominio.com",
    radarButton: "Escanear Objetivo",
    radarScanning: "Escaneando...",
    radarStatus: {
      safe: "SEGURO",
      warning: "ALERTA",
      critical: "CRÍTICO"
    },
    radarMetrics: {
      latency: "Latencia",
      jitter: "Jitter",
      ssl: "Puntuación SSL",
      server: "Servidor",
      dns: "Salud DNS",
      network: "Red",
      ports: "Puertos",
      location: "Ubicación"
    },
    radarLogs: "Registros del Sistema",
    spsTitle: "SPS (Shadow Profile Scrubber)",
    spsDesc: "Analiza huellas digitales y genera ruido para ofuscar el perfilado.",
    spsScanBtn: "Analizar Huella",
    spsRiskHigh: "RIESGO ALTO",
    spsRiskMod: "RIESGO MODERADO",
    spsRiskLow: "RIESGO BAJO",
    spsExposedApis: "APIs Expuestas",
    spsBrokers: "Posibles Brokers de Datos",
    spsBrokersDesc: "Basado en tu ubicación y configuración:",
    spsNoiseTitle: "Generador de Ruido",
    spsNoiseDesc: "Genera tráfico de búsqueda aleatorio para confundir algoritmos.",
    spsNoiseBtn: "Generar Ruido (6 Pestañas)",
    cleanerPlaceholder: "Pega un enlace sucio (ej: facebook.com?fbclid=...)",
    cleanerResults: "Los resultados aparecerán aquí",
    cleanerRecursive: "Redirección eliminada",
    paramsRemoved: "Parámetros eliminados",
    trackerFound: "Rastreador encontrado",
    deviceInfo: {
      browser: "Navegador",
      os: "Sistema Operativo",
      deviceType: "Tipo",
      screen: "Pantalla",
      battery: "Batería",
      connection: "Conexión",
      mobile: "Móvil",
      desktop: "Escritorio",
      uniqueId: "ID Único",
      gpu: "Gráfica / WebGL",
      timezone: "Zona Horaria",
      canvas: "Canvas Hash",
      audio: "Audio Hash",
      pixelRatio: "Pixel Ratio",
      bot: "Bot / Auto",
      incognito: "Incógnito",
      ip: "Dirección IP",
      location: "Ubicación",
      isp: "Proveedor (ISP)",
      hdr: "Soporte HDR",
      gamut: "Gama de Color",
      contrast: "Contraste",
      fontsLabel: "Fuentes Instaladas",
      hardwareLabel: "Hardware",
      cores: "Núcleos CPU",
      touchPoints: "Puntos Táctiles",
      userAgent: "User Agent"
    },
    perms: {
      mic: "Micrófono",
      location: "Ubicación",
      notifications: "Notificaciones",
      camera: "Cámara"
    },
    msgPlaceholderEnc: "Mensaje a encriptar...",
    msgPlaceholderDec: "Mensaje encriptado...",
    msgKeyPlaceholder: "Clave secreta...",
    msgProcess: "Procesar",
    msgErrorKey: "La clave es necesaria",
    msgErrorInvalid: "Mensaje inválido"
  },
  hub: {
    title: "Centro de Privacidad",
    subtitle: "Alternativas éticas para tu vida digital",
    searchPlaceholder: "Buscar aplicaciones...",
    replacesLabel: "Reemplaza a:",
    noAppsFound: "No se encontraron aplicaciones",
    clearFilters: "Limpiar filtros",
    cats: {
      browser: "Navegadores",
      email: "Email",
      messaging: "Mensajería",
      cloud: "Nube",
      search: "Buscadores",
      os: "Sistemas Op.",
      vpn: "VPN",
      pass: "Contraseñas",
      dns: "DNS",
      store: "Tiendas",
      productivity: "Productividad",
      utilities: "Utilidades"
    },
    apps: [
      {
        id: "firefox",
        name: "Firefox",
        description: "Navegador web rápido, privado y de código abierto.",
        replaces: "Google Chrome",
        category: "browser",
        icon: "firefox",
        url: "https://www.mozilla.org/firefox/",
        badge: "Privacy",
        pricing: "Free"
      },
      {
        id: "proton-mail",
        name: "Proton Mail",
        description: "Correo electrónico cifrado con sede en Suiza.",
        replaces: "Gmail",
        category: "email",
        icon: "mail",
        url: "https://proton.me/mail",
        badge: "Encrypted",
        pricing: "Freemium"
      },
      {
        id: "signal",
        name: "Signal",
        description: "Mensajería cifrada de extremo a extremo.",
        replaces: "WhatsApp",
        category: "messaging",
        icon: "message-circle",
        url: "https://signal.org/",
        badge: "Security",
        pricing: "Free"
      },
      {
        id: "bitwarden",
        name: "Bitwarden",
        description: "Gestor de contraseñas de código abierto.",
        replaces: "LastPass",
        category: "password-manager",
        icon: "key",
        url: "https://bitwarden.com/",
        badge: "Open Source",
        pricing: "Freemium"
      },
      {
        id: "duckduckgo",
        name: "DuckDuckGo",
        description: "El buscador que no te rastrea.",
        replaces: "Google Search",
        category: "search",
        icon: "search",
        url: "https://duckduckgo.com/",
        badge: "Privacy",
        pricing: "Free"
      },
      {
        id: "nextcloud",
        name: "Nextcloud",
        description: "Plataforma de productividad auto-hospedada.",
        replaces: "Google Drive",
        category: "cloud",
        icon: "cloud",
        url: "https://nextcloud.com/",
        badge: "Self-Hosted",
        pricing: "Free"
      }
    ]
  },
  lab: {
    title: "Laboratorio de Imagen",
    subtitle: "Elimina metadatos ocultos de tus fotos",
    dropzone: "Suelta una imagen aquí",
    noMeta: "No se encontraron metadatos EXIF",
    metaFound: "¡Metadatos Encontrados!",
    gpsFound: "Ubicación GPS Detectada",
    cleanBtn: "Limpiar Imagen",
    downloadBtn: "Descargar Imagen Segura",
    warning: "Las imágenes se procesan localmente en tu navegador.",
    analyzing: "Analizando imagen...",
    analyzeAnother: "Analizar otra imagen",
    cleanGenerated: "Imagen Limpia Generada",
    cleanDesc: "La imagen ha sido re-codificada y los metadatos eliminados.",
    original: "Original",
    meta: {
      camera: "Cámara",
      software: "Software",
      date: "Fecha"
    }
  },
  phishing: {
    title: "Cyber Trainer",
    subtitle: "¿Puedes distinguir lo real de lo falso?",
    startGame: "Comenzar Entrenamiento",
    safe: "Es Seguro",
    unsafe: "Es Phishing",
    correct: "¡Correcto!",
    wrong: "Incorrecto",
    completed: "Entrenamiento Completado",
    score: "Tu puntuación final",
    case: "Caso",
    of: "de",
    ui: {
      messages: "Mensajes",
      networks: "Redes",
      unsecured: "No segura",
      encrypted: "Cifrada",
      signin: "Iniciar Sesión",
      username: "Usuario",
      password: "Password",
      login: "Entrar",
      today: "Hoy",
      viewDetails: "Ver detalles"
    },
    scenarios: [
      {
        id: 1,
        type: "email",
        isSafe: false,
        subject: "URGENTE: Acción requerida en su cuenta",
        sender: "security@paypa1-support.com",
        body: "Hemos detectado actividad inusual. Haga clic aquí para verificar su identidad inmediatamente o su cuenta será suspendida.",
        explanation: "Fíjate en el remitente: 'paypa1' es un error tipográfico común en phishing (Typosquatting). Además, la urgencia es una señal de alerta."
      },
      {
        id: 2,
        type: "email",
        isSafe: true,
        subject: "Tu recibo de compra",
        sender: "noreply@amazon.com",
        body: "Gracias por tu pedido #123456. Se ha enviado a tu dirección guardada. Puedes ver los detalles en tu historial de pedidos.",
        explanation: "El remitente es correcto (amazon.com) y no te pide hacer clic en enlaces urgentes ni ingresar datos sensibles."
      },
      {
        id: 3,
        type: "wifi",
        isSafe: false,
        networkName: "Free_Airport_WiFi",
        security: "Open",
        explanation: "Las redes Wi-Fi abiertas (sin candado) permiten que cualquiera intercepte tu tráfico. Usa siempre VPN en estas redes."
      }
    ]
  },
  legal: {
    terms: {
      title: "Términos de Uso",
      lastUpdated: "Última actualización: Diciembre 2025",
      sections: [
        {
          heading: "1. Aceptación de Términos",
          content: "Al usar Beethoven, aceptas estos términos. Si no estás de acuerdo, no uses la aplicación. Beethoven es provisto 'AS IS' sin garantías de ningún tipo."
        },
        {
          heading: "2. Naturaleza Educativa",
          content: "Beethoven es una herramienta EDUCATIVA sobre privacidad digital. No es un sustituto para auditorías profesionales de seguridad. Los resultados son indicativos, no definitivos. Beethoven te educa, no reemplaza expertos."
        },
        {
          heading: "3. Uso Aceptable",
          content: "Prometes usar Beethoven para: educarte sobre privacidad, proteger tu información personal, compartir con amigos y familia. NO prometes: usar para ataques cibernéticos, hacking, fraude, spamming, o cualquier actividad ilegal."
        },
        {
          heading: "4. Descargo de Responsabilidad",
          content: "Beethoven es gratis y open source. No somos responsables por: pérdida de datos, daños indirectos, problemas técnicos, uso indebido de herramientas. El 100% de la responsabilidad es tuya. Si algo sale mal, revisa el GitHub issues primero."
        },
        {
          heading: "5. No hay Garantías",
          content: "Beethoven se proporciona sin garantías, implícitas o explícitas. No garantizamos: disponibilidad, precisión, seguridad. Usas Beethoven bajo tu propio riesgo. Si no puedes aceptar riesgo, no lo uses."
        },
        {
          heading: "6. Límite de Responsabilidad",
          content: "EN NINGÚN CASO Beethoven será responsable por daños incidentales, especiales, indirectos o punitivos. Esto aplica incluso si hemos sido advertidos de la posibilidad de tales daños."
        },
        {
          heading: "7. Cambios a los Términos",
          content: "Podemos cambiar estos términos en cualquier momento. Los cambios entran en vigor inmediatamente. Tu uso continuado de Beethoven significa aceptación de cambios. Revisaremos GitHub para cambios."
        },
        {
          heading: "8. Propiedad Intelectual",
          content: "Beethoven es open source bajo licencia MIT. Puedes: usar libremente, modificar, distribuir, vender versiones modificadas. Solo debes dar atribución. El código es tuyo."
        },
        {
          heading: "9. Terminación",
          content: "Podemos terminar acceso a Beethoven si violas estos términos. Sin embargo, como es open source, puedes hacer fork del repo en GitHub y seguir usando tu propia versión."
        },
        {
          heading: "10. Ley Aplicable",
          content: "Estos términos se rigen por las leyes del país/jurisdicción donde reside el contributor principal. Para disputas, primero intenta resolver vía GitHub issues o email."
        }
      ]
    },
    privacy: {
      title: "Política de Privacidad",
      lastUpdated: "Última actualización: Diciembre 2025",
      sections: [
        {
          heading: "1. Privacidad Garantizada",
          content: "Tu privacidad es sagrada. CERO datos personales son recolectados, CERO son enviados a servidores externos, CERO son compartidos con terceros. Es simple: si no hay servidor, no hay tracking."
        },
        {
          heading: "2. Qué Procesamos Localmente",
          content: "TODO se procesa en TU navegador: cuestionarios, generadores de contraseñas, analizadores de privacidad, limpiadores de imágenes, detectores de phishing. El procesamiento ocurre 100% en tu máquina.",
          list: [
            "Assessment responses: En localStorage de tu navegador",
            "Generated passwords: En memoria RAM, nunca guardadas",
            "Image metadata analysis: En tu GPU vía Canvas API",
            "Browser fingerprinting check: En tuMemory",
            "Phishing analysis: En JavaScript ejecutado localmente"
          ]
        },
        {
          heading: "3. LocalStorage",
          content: "Los únicos datos guardados en tu dispositivo (localStorage) son: Theme preference (dark/light), Color palette choice, Language (ES/EN), Your assessment responses (si eliges guardar), Assessment history (timestamps locales). Tú controlas todo esto."
        },
        {
          heading: "4. Qué NO Recolectamos",
          content: "Beethoven NO colecta: IP address, Ubicación, Cookies de tracking, Device fingerprint, Browser history, Personal information, Analytics, User behavior tracking. NADA.",
          list: [
            "No Google Analytics",
            "No Facebook Pixel",
            "No Mixpanel o similar",
            "No telemetría de ningún tipo",
            "No tracking pixels",
            "No external scripts que rastreamos"
          ]
        },
        {
          heading: "5. Cookies",
          content: "Beethoven NO usa cookies de terceros. Las ÚNICAS cookies son: localStorage del navegador (tu máquina), session storage (temporal). Ninguna se envía a servidor remoto."
        },
        {
          heading: "6. Cookies de Terceros",
          content: "Beethoven NO usa Google Fonts desde CDN (si lo hiciera, Google vería IPs). Beethoven usa fonts desde archivos locales. Cero terceros con acceso a tu actividad."
        },
        {
          heading: "7. Backup y Exportar",
          content: "Puedes exportar tu assessment en JSON. Este archivo va directo a tu computadora. Ningún servidor lo ve. Puedes importarlo después para comparar progreso. Tu control total."
        },
        {
          heading: "8. Seguridad de Datos",
          content: "Como no guardamos datos en servidor, no hay: database breaches, data leaks, hacking de servidores. Los datos solo existen en TU máquina. Tu responsabilidad = tu seguridad."
        },
        {
          heading: "9. Links Externos",
          content: "Beethoven contiene links a Privacy Hub (aplicaciones externas). Cuando haces clic, sales de Beethoven. Esas apps tienen sus propias políticas de privacidad. No somos responsables por ellas."
        },
        {
          heading: "10. Cambios a Privacidad",
          content: "Si cambiamos esta política, actualizaremos GitHub. Revisas tú cuando quieras. No hay 'terms updated' forzado. Transparencia total."
        },
        {
          heading: "11. Derechos GDPR/CCPA",
          content: "Como no procesamos datos personales, GDPR/CCPA no aplican completamente. Sin embargo: Derecho a acceso: Todos tus datos están en localStorage (accesibles vía DevTools). Derecho a eliminar: Borra localStorage cuando quieras. Derecho a portabilidad: Exporta JSON y listo."
        },
        {
          heading: "12. Contacto",
          content: "Si tienes preguntas sobre privacidad, abre issue en GitHub o envía email. Responderemos en 48 horas."
        }
      ]
    }
  },
  docs: {
    title: "Documentación",
    subtitle: "Guías detalladas para protegerte",
    sections: [
      {
        title: "Fundamentos",
        articles: [
          {
            id: "intro",
            title: "Introducción a la Privacidad",
            content: "### ¿Qué es la privacidad?\nLa privacidad no es ocultar cosas malas, es proteger tu libertad. Es tu derecho a controlar qué información sobre ti se comparte, dónde y cómo.\n\n### Por qué importa\nEn la era digital, tus datos son moneda de cambio. Las empresas los compran, venden y usan para:\n- Modelar tu comportamiento\n- Predecir tus acciones\n- Manipularte mediante publicidad dirigida\n- Discriminarte en precios, crédito, empleo\n\n**Ejemplo real**: Netflix sabe exactamente qué películas verás, Amazon predice qué comprarás antes de que lo sepas tú.\n\n### Tres pilares de la privacidad\n1. **Confidencialidad**: Solo tú y quien autorices ven tus datos. Si Google ve tu historial de búsqueda pero Amazon no, tu privacidad está protegida.\n2. **Integridad**: Tus datos no son modificados sin permiso. Tu médico confía en que tu historia clínica es exacta.\n3. **Disponibilidad**: Acceso cuando lo necesites. Poder recuperar tus fotos del 2010 cuando las quieras.\n\n### ¿Por qué Beethoven existe?\nLa privacidad no debería ser un lujo, debería ser lo normal. Beethoven te empodera con herramientas para reclamar tu derecho a la privacidad."
          },
          {
            id: "data-rights",
            title: "Derechos Digitales",
            content: "### Tu derecho a la privacidad\nLa privacidad es un derecho humano reconocido internacionalmente (UNESCO, ONU). Tienes derechos legales que puedes ejercer HOY:\n\n- **Acceso (Right to Access)**: Exigir una copia de TODOS tus datos. Verás fotos que no recuerdas subir, comentarios años atrás, dónde Google cree que vives.\n- **Rectificación (Right to Correction)**: Corregir información incorrecta. Si LinkedIn dice que trabajaste en Apple pero en Microsoft, exígeles que lo corrijan.\n- **Olvido (Right to Erasure)**: Solicitar eliminación permanente de tus datos. Derecho controversial pero poderoso.\n- **Portabilidad (Right to Data Portability)**: Obtener tus datos en formato legible (JSON, CSV). Cambiar de servicio sin perder tu historial.\n- **Oposición (Right to Object)**: Rechazar procesamiento de tus datos para marketing.\n\n### GDPR (Europa) - Artículo 5\n**Aplicable si**: Vives en Europa O una empresa europea te procesa datos\n**Penas**: Hasta €20 MILLONES o 4% de ingresos globales\n**Cómo usarlo**: Visita gdpr.eu, descarga templates de solicitud\n\n**Ejemplo práctico**: \n- Facebook procesa datos de europeos → GDPR aplica\n- Puedes solicitar: \"Acceso a todos mis datos personales\"\n- Facebook DEBE responder en 30 días\n- Si no responde, puedes demandar\n\n### CCPA (California, USA) - Ley de Privacidad del Consumidor\n**Aplicable si**: Vives en California O una empresa californiana te procesa datos\n**Penas**: Hasta $100 por violación intencional\n**Similitudes**: 80% igual a GDPR\n**Diferencia**: Menos protección para menores, pero aplica a más empresas\n\n### LGPD (Brasil) - Ley General de Protección de Datos\n**Aplicable si**: Vives en Brasil O usas servicios brasileños\n**Derechos**: Similares a GDPR + Derecho a no ser discriminado\n\n### LEYES en Argentina, España, México\nCasi todos los países latinoamericanos tienen leyes similares. Revisa el sitio de tu gobierno.\n\n### Cómo ejercer tus derechos\n1. **Genera una solicitud** con Beethoven (GDPR Generator)\n2. **Envía por correo certificado** a privacy@empresa.com\n3. **Guarda evidencia**: Captura de pantalla del email\n4. **Espera 30 días**: Deben responder\n5. **Si no responden**: Contacta a tu regulador\n   - UE: Consulta en google.com/search?q=DPA+[tu-país]\n   - USA: ftc.gov\n   - Brasil: www.gov.br/cidadania/pt-br/acesso-a-informacao/lei-geral-de-protecao-de-dados-pessoais-lgpd"
          }
        ]
      },
      {
        title: "Navegador y Rastreo",
        articles: [
          {
            id: "browser-security",
            title: "Seguridad del Navegador",
            content: "### Amenazas comunes del navegador\n\n**1. Cookies de rastreo (Tracking Cookies)**\n- **Qué son**: Archivos que guardan sitios web en tu navegador\n- **Cómo funcionan**: Facebook coloca una cookie que dice \"es Juan\". Luego ves videos en YouTube. YouTube lee esa cookie y sabe quién eres.\n- **El problema**: Terceros (Google, Meta, TikTok) ven toda tu actividad web\n- **Estadística**: 73% de usuarios no saben que están siendo rastreados\n- **Ejemplo real**: Buscas \"botas de cuero\" en Google → Ves publicidad de botas en Instagram, Twitter, Amazon. ESO es rastreo.\n\n**2. Canvas Fingerprinting (El mal del que nadie habla)**\n- **Qué es**: Webs te dibujan cosas invisibles para identificarte\n- **Cómo funciona**: Tu GPU renderiza diferente según tus drivers → Te identifican sin cookies\n- **Por qué es peligroso**: Imposible de detectar, incluso en modo privado\n- **Quién lo hace**: Casi todos - Google, Meta, Cloudflare\n- **Beethoven lo detecta**: Nuestra herramienta de Fingerprint lo identifica\n\n**3. WebRTC Leaks (La fuga de IP)**\n- **El problema**: Incluso con VPN, tu IP real puede filtrarse\n- **Cómo ocurre**: WebRTC es protocolo para videollamadas. Si Facebook quiere saber tu IP real, lo hace por aquí.\n- **Impacto**: VPN inútil si filtra tu IP real\n- **Beethoven lo previene**: Nuestro test WebRTC lo detecta\n\n**4. CNAME Tracking (El nuevo enemigo)**\n- **Qué es**: Google Analytics disfrazado de parte del sitio web\n- **Por qué es malo**: Adblockers NO lo bloquean\n- **Cómo protegerse**: uBlock Origin con filtros avanzados\n\n### Cómo protegerte - Guía práctica\n\n**Nivel 1 - Básico (30 minutos)**\n1. Instala **Firefox** (mejor privacidad que Chrome): mozilla.org/firefox\n2. Instala **uBlock Origin**: addons.mozilla.org\n3. En configuración de Firefox: \"Siempre usar modo privado\"\n4. Listo. Empezaste.\n\n**Nivel 2 - Intermedio (1 día)**\n1. Todo lo anterior +\n2. Instala **Privacy Badger**: eff.org/privacybadger (detecta rastreadores invisibles)\n3. Limpia cookies cada semana: Firefox → Ajustes → Privacidad → \"Borrar historial\"\n4. En Firefox → Ajustes → Privacidad → Rastreo: Selecciona \"Estricto\"\n5. En Firefox → Ajustes → Privacidad → DNT: Marcar \"Solicitar\"\n\n**Nivel 3 - Avanzado (1 semana)**\n1. Todo lo anterior +\n2. Usa **Containers de Firefox** (addons.mozilla.org): Separa cookies de Facebook, Google, Amazon en \"contenedores\"\n3. Desactiva JavaScript en sitios no confiables\n4. Usa **HTTPS Everywhere**: Siempre conexión cifrada\n5. Instala **LocalCDN**: Reemplaza scripts de Google/Cloudflare con locales\n\n**Nivel 4 - Experto (Cambio de vida)**\n1. Todo lo anterior +\n2. Cambia buscador a **DuckDuckGo** o **Searx**: Zero tracking\n3. Cambia email a **Proton Mail** o **Tutanota**: Cifrado de punta a punta\n4. Usa **Tor Browser** para búsquedas sensibles\n5. Descarga tu historial de Google: myaccount.google.com/data-and-privacy\n\n### Extensiones recomendadas (TODAS GRATIS)\n- **uBlock Origin**: El mejor bloqueador\n- **Privacy Badger (EFF)**: Detecta rastreadores\n- **HTTPS Everywhere**: Conexión segura\n- **Firefox Containers**: Aisla cookies por sitio\n- **Decentraleyes/LocalCDN**: Evita CDNs rastreadores"
          },
          {
            id: "vpn-tor",
            title: "VPN vs Tor",
            content: "### VPN (Red Privada Virtual)\n\n**¿Qué es?** Un túnel cifrado que oculta tu actividad. Todo pasa por servidores VPN antes de llegar a internet.\n\n**Ventajas**:\n- Rápido (50-100 Mbps típico)\n- Fácil de instalar (1 clic)\n- Oculta tu IP real\n- Acceso a contenido geo-bloqueado\n\n**Desventajas**:\n- El proveedor VPN TE VE (logs pueden existir)\n- VPNs gratis = generalmente spyware\n- Algunos sitios bloquean VPNs (Netflix, bancos)\n- Da falsa sensación de seguridad\n\n**La verdad incómoda**: Una VPN es tan segura como confíes en el proveedor. Mullvad NO guarda logs. ExpressVPN DICE que no pero es imposible verificar.\n\n**VPNs recomendadas**:\n- **Mullvad**: Gratis, sin logs verificados, abierto a auditorías. Mejor opción.\n- **ProtonVPN**: Suiza, sin logs, pero paga (desde $5/mes)\n- **IVPN**: Gibraltar, auditado, paga\n- **NUNCA**: ExpressVPN (logs dudosos), NordVPN (demasiado marketed), cualquier VPN gratis\n\n**Cómo saber si VPN funciona**:\n1. Visita ipleak.net antes vs después de activar VPN\n2. Tu IP debe cambiar\n3. Pueden haber \"leaks\" de DNS - deberían estar bloqueados\n\n### Tor Browser (The Onion Router)\n\n**¿Qué es?** Navegador que enruta tu tráfico por 3 nodos aleatorios. Imposible rastrear.\n\n**Cómo funciona**:\n- Tu mensaje: \"Hola Facebook\"\n- Se cifra 3 veces\n- Va a nodo 1 (descifra capa 1) → nodo 2 (descifra capa 2) → nodo 3 (descifra capa 3) → Facebook\n- Facebook NUNCA ve tu IP\n- Ni siquiera el nodo 1 sabe tu destino final\n\n**Ventajas**:\n- Anonimato REAL (no teórico)\n- Acceso a .onion (web profunda)\n- GRATIS\n- Imposible incluso para gobiernos rastrearte (salvo que te delates)\n\n**Desventajas**:\n- **MUY lento** (5-20 segundos por página)\n- **Llama atención**: Usar Tor en Rusia = problemas\n- Netflix/Amazon NO funcionan bien\n- Sitios pueden detectar que usas Tor\n\n**Cuándo usar Tor**:\n- Eres periodista investigando corrupción\n- Vives en país represivo (China, Irán, Rusia)\n- Buscas sobre disidencia política\n- **NO** para torrents ilegales (Tor te vuelve anónimo pero a la policía le encanta Tor)\n\n**La verdad**: Tor es seguro. Ha sido auditado por gobiernos. La NSA no puede 0-day Tor cada semana.\n\n### VPN + Tor = Protección máxima\n\n**Estrategia (poco común pero útil)**:\n1. VPN → Tor → Destino\n2. ISP ve: \"Se conecta a Tor\"\n3. Tor ve: IP de VPN (no tu IP real)\n4. Sitio final ve: IP de salida Tor (no tu IP real)\n\nPerito total, pero lento.\n\n### La verdad incómoda\n**Ninguna herramienta es perfecta**:\n- Cookies todavía te rastrean en Tor\n- Canvas fingerprinting todavía funciona en Tor\n- Tu navegación en Tor puede analizarse por timing\n- Si haces login en Facebook desde Tor, pierdes anonimato (¡Facebook sabe que eres TÚ!)\n\n**Regla de oro**: \n- VPN para privacidad del ISP\n- Tor para anonimato de verdad\n- Firefox + uBlock para navegación diaria\n- Todas juntas = paranoico pero seguro"
          }
        ]
      },
      {
        title: "Contraseñas y Autenticación",
        articles: [
          {
            id: "password-security",
            title: "Contraseñas Fuertes",
            content: "### La realidad de las contraseñas\nEl 81% de brechas de datos usan contraseñas débiles o reutilizadas.\n\n**Estadísticas aterradoras**:\n- La contraseña promedio se puede romper en 2.24 HORAS\n- 23% de usuarios usa la misma contraseña en TODOS lados\n- \"password123\" es la #1 más usada\n- Si LinkedIn filtra tu contraseña, atacantes la prueban en: Facebook, Gmail, Netflix, Banco...\n\n### Cómo crear contraseñas seguras\n\n**Mínimo 16 caracteres**: \n- 8 caracteres = 2 horas de crack (GPU)\n- 12 caracteres = 200 años\n- 16 caracteres = 200 MILLONES años\n- Más largo = exponencialmente más seguro\n\n**Mezcla de tipos**: \n- MAYÚSCULAS: Aumenta complejidad\n- minúsculas: Necesarias\n- números: 0-9 añaden variedad\n- símbolos: !@#$%^&*() - lo más importante\n\n**Ejemplo MALO**: \"Juan1985!\" \n- Información personal (nombre, año nacimiento)\n- Patrón común (nombre+año+símbolo)\n- Crackeable en días\n\n**Ejemplo BUENO**: \"7mK$x2vQpN#8R9wLj\"\n- Aleatorio\n- 17 caracteres\n- Mezcla todo\n- 200 millones de años para romper\n\n**Regla de oro**: Si puedes memorizar la contraseña, es débil. No memorices nada.\n\n**Sin información personal**: \n- ✗ Cumpleaños: 1990-12-25\n- ✗ Nombre mascota: Fluffy2024\n- ✗ Equipo favorito: RealMadrid2023\n- ✗ Película favorita: Avatar123\n- **¿Por qué?** Tu cumpleaños está en Facebook. Tu mascota en fotos. Fácil de adivinar.\n\n### La regla de oro: GESTOR DE CONTRASEÑAS\n\n**Bitarden** (GRATIS y RECOMENDADO):\n- Código abierto\n- Auditoría independiente 2022\n- Sincroniza entre dispositivos\n- Genera contraseñas aleatorias\n- Solo necesitas 1 contraseña maestra\n- bitwarden.com\n\n**1Password** (Pago pero excelente):\n- Interfaz más bonita que Bitwarden\n- Mejor para equipos\n- $3-5 /mes\n\n**KeePass** (Gratis pero más complejo):\n- Completamente local (sin nube)\n- Para paranoicos\n- Curva de aprendizaje mayor\n\n**Cómo funciona**: \n1. Eliges contraseña MAESTRA fuerte (ej: \"Beethoven7#RockMinecraft!2024\")\n2. Gestor genera 200 contraseñas random para cada sitio\n3. Solo necesitas memorizar UNA\n4. Gestor rellena automáticamente sitios\n\n**Ventaja**: Si LinkedIn es hackeado:\n- Tu contraseña de LinkedIn: Aleatoria, 20 caracteres, única\n- No afecta Gmail, Netflix, Banco\n- Attackers ven la contraseña de LinkedIn = inútil para otros sitios\n\n### Auditoría de contraseña\n\n**Usa Beethoven**: Nuestra herramienta verificará si tu contraseña:\n- Aparece en brechas conocidas (haveibeenpwned.com)\n- Es débil\n- Cuánto tardará en romperla\n\n**Mejor práctica**:\n1. Instala Bitwarden\n2. Copia todas contraseñas viejas ahí\n3. Audita cada una con Beethoven\n4. Si está hackeada: cámbiala\n5. Usa solo contraseñas generadas por Bitwarden de ahora en adelante"
          },
          {
            id: "2fa-security",
            title: "Autenticación de Dos Factores (2FA)",
            content: "### ¿Qué es 2FA?\nAlgo que sabes (contraseña) + algo que tienes (teléfono, aplicación, clave física).\n\n**El principio**: Incluso si atacantes roban tu contraseña, no pueden entrar sin el segundo factor.\n\n### Tipos de 2FA (de mejor a peor)\n\n**1. Claves de seguridad FIDO2 (Nivel Fort Knox)**\n- Ejemplo: YubiKey, Titan Security Key\n- **Cómo funciona**: Inserta llave USB, presiona botón, listo\n- **Ventaja**: Imposible de hackear (no usa internet)\n- **Desventaja**: Cuesta $40-60\n- **Cuándo**: Si tienes cuentas críticas (email, banco, trabajo)\n- **Recomendación**: TODO el mundo debería tener una\n\n**2. Apps autenticadoras (Nivel muy bueno)**\n- Ejemplos: Google Authenticator, Authy, Microsoft Authenticator, Aegis\n- **Cómo funciona**: App genera código que cambia cada 30 segundos\n- **Ventaja**: Gratuito, no requiere internet\n- **Desventaja**: Si pierdes teléfono, pierdes acceso (guarda códigos de recuperación)\n- **Recomendación**: Para la mayoría de personas\n- **Mejor opción**: Authy o Aegis (más robusto que Google Authenticator)\n\n**3. SMS (Evitar si es posible)**\n- **El problema**: SIM swapping\n  - Atacante contacta tu proveedor de telefonía\n  - Convence al operador de transferir tu número a SIM diferente\n  - Recibe tus SMS de 2FA\n  - Accede a tu cuenta\n- **Estadística**: 1 de cada 50 ataques usa SIM swapping\n- **Cuándo usar**: Solo cuando NO hay alternativa\n\n**4. Email (Mejor que nada)**\n- **Cómo funciona**: Recibes link por email para confirmar\n- **Problema**: Si tu email es hackeado, pierdes acceso\n- **Cuándo**: Backup si pierdes teléfono\n\n### Cuándo activar 2FA - Prioridades\n\n**CRÍTICA (Hoy mismo)**:\n- ✅ Email principal (Gmail/Outlook/Proton)\n- ✅ Banco online\n- ✅ Trabajo (Office 365, Slack, GitHub)\n\n**IMPORTANTE (Esta semana)**:\n- ✅ Redes sociales (Facebook, Instagram, Twitter)\n- ✅ Nubes (Google Drive, Dropbox, iCloud)\n- ✅ Contraseñas gestor (Bitwarden, 1Password)\n\n**BUENO (Este mes)**:\n- ✅ Netflix, Amazon, Spotify\n- ✅ Otros servicios online\n\n### Guía paso a paso (Gmail como ejemplo)\n\n1. Abre myaccount.google.com\n2. Menú → Seguridad\n3. Busca \"Verificación en dos pasos\"\n4. Selecciona \"App autenticadora\" (mejor que SMS)\n5. Descarga Authy o Google Authenticator\n6. Escanea código QR\n7. **IMPORTANTE**: Guarda códigos de recuperación en lugar seguro\n8. Listo\n\n### Códigos de recuperación - CRÍTICO\n\n- Google/Facebook/GitHub te dan 10 códigos cuando activas 2FA\n- Usa uno si pierdes teléfono\n- **Dónde guardar**: \n  - Contraseña gestor (Bitwarden)\n  - Papel en caja fuerte (físico)\n  - NO en notes del teléfono\n- Sin códigos de recuperación = BLOQUEADO permanentemente\n\n### La verdad\n**USA 2FA EN TODO. Es incómodo por 5 segundos, seguro por AÑOS.**"
          }
        ]
      },
      {
        title: "Redes y Conectividad",
        articles: [
          {
            id: "wifi-security",
            title: "Wi-Fi Seguro",
            content: "### Amenazas en redes públicas\n\n**1. MITM Attacks (Man-in-the-Middle)**\n- Atacante se coloca entre tú e internet\n- Lee TODO tu tráfico: emails, contraseñas, mensajes\n- **Ejemplo**: Café con WiFi \"Free_Airport\". Atacante controla router.\n- **Impacto**: Si usas HTTP (sin HTTPS), ve TODO\n- **Protección**: VPN + HTTPS\n\n**2. Redes Fake (Evil Twin)**\n- \"Free Airport WiFi\" es falso, controlado por atacante\n- \"Starbucks_WiFi\" → Es FAKE\n- Atacante replica red legítima\n- **Cómo funcionan**: Envían ubicación Starbucks falsa → Te conectas → Atacante TE VE\n- **Protección**: Pregunta al personal la red EXACTA\n\n**3. Packet Sniffing**\n- Aplicaciones como Wireshark capturan todo lo que envías\n- Si usas email en WiFi público sin HTTPS = compromiso total\n- **Estadística**: En 5 minutos en WiFi público, un atacante puede robar:\n  - Contraseñas\n  - Tokens de sesión\n  - Datos de tarjeta de crédito\n\n**4. SSL Strip Attack**\n- Atacante intercepta y cambia HTTPS por HTTP\n- Navegador muestra \"Seguro\" pero NO lo es\n- VPN te protege de esto\n\n### Cómo protegerte\n\n**NUNCA uses Wi-Fi público sin VPN**:\n1. Instala Mullvad VPN (gratis)\n2. Antes de conectar a WiFi público, activa VPN\n3. VPN primero, internet después (siempre)\n\n**Verifica el nombre de la red**:\n- Pregunta: \"¿Cuál es exactamente el nombre WiFi?\"\n- Nota: \"Starbucks_WiFi\" (del personal)\n- NO confíes en redes con nombres similares\n\n**Usa HTTPS siempre**:\n- Candadito 🔒 en barra de dirección = Cifrado\n- SIN candadito = Atacante puede leer TODO\n- En WiFi público, NO entres a sitios sin HTTPS\n\n**Desactiva auto-connect**:\n- Teléfono: Ajustes → WiFi → OFF en \"Conectar automáticamente\"\n- Evita que se conecte a redes maliciosas automáticamente\n\n**Hotspot personal**:\n- Tu propia red de teléfono (datos móviles) es más segura\n- Más lento pero infinitamente más seguro\n- Alternativa: Hotspot + VPN = máxima seguridad\n\n### En casa\n\n**INMEDIATO - Cambiar contraseña del router**:\n- Router típico: Usuario: admin, Contraseña: admin / 12345\n- Accede a 192.168.1.1 en navegador\n- Busca \"Contraseña\"\n- Cámbiala a algo fuerte (ej: \"Beethoven#2024$WiFi\")\n- Si no la cambias: Vecinos pueden entrar\n\n**Encriptación**:\n- Viejo: WEP (NO USAR, crackeable en 5 minutos)\n- Normal: WPA2 (seguro, estándar actual)\n- Nuevo: WPA3 (si tu router lo soporta, mejor)\n- Cómo verificar: Router → Configuración → Seguridad\n\n**Ocultar SSID - ES UN MITO**:\n- Creencia: Ocultar nombre WiFi = más seguro\n- Realidad: Atacante ve SSID oculto fácilmente\n- No proporciona seguridad real\n- Mejor: Nombre normal + Contraseña fuerte\n\n**Bonus - Cambiar canal WiFi**:\n- Routers en edificios interfieren entre sí\n- Canales 1, 6, 13 (no se solapan)\n- Router → Configuración → Canal: Selecciona 1, 6 o 13\n- Mejora velocidad y seguridad"
          },
          {
            id: "mobile-security",
            title: "Seguridad Móvil",
            content: "### Riesgos en móviles\n\n**1. Ubicación constantemente rastreada**\n- Google guarda CADA lugar donde has estado\n- Historial de ubicación: Google → \"Mi actividad\"\n- Ve dónde trabajas, amas, cenas, duermes\n- **Estadística**: 95% de usuarios tienen ubicación activa sin saberlo\n\n**2. Permisos de apps excesivos**\n- TikTok: Solicita acceso a cámara, micrófono, contactos, fotos\n- Incluso si DICES que no, puede espiar\n- **Ejemplo**: Instagram accede a micrófono para escuchar TV (sabe qué ves)\n\n**3. Backups sin cifrar**\n- Google Drive: Guarda TODO de tu teléfono\n- iCloud: Apple \"NO VE\" pero puede ser subpoenaed\n- Fotos, mensajes, emails: TODO en la nube\n\n**4. Google sabe tu historial completo**\n- Búsquedas\n- Videos que ves\n- Apps que usas\n- Ubicaciones\n- Contactos\n- Fotos\n- Puedes ver: myaccount.google.com/data-and-privacy (SORPRESA)\n\n### Acciones inmediatas\n\n**1. Desactiva ubicación**:\n- Android: Ajustes → Ubicación → OFF\n- iPhone: Ajustes → Privacidad → Ubicación → OFF\n- Apps que REALMENTE la necesitan (Uber, Maps) → Preguntarán cuando las uses\n- **Impacto**: Batería +10% más, Google no sabe dónde estás\n\n**2. Revisa permisos de apps**:\n- Android: Ajustes → Apps → [App] → Permisos\n- iPhone: Ajustes → Privacidad → [Permiso] → Quita apps que no necesitan\n- **Preguntas de seguridad**:\n  - ¿Por qué Flashlight necesita contactos?\n  - ¿Por qué TikTok necesita micrófono siempre?\n  - Si no hay razón: Rechaza permiso\n\n**3. Desactiva WiFi automático**:\n- Android: Ajustes → WiFi → Habilitar automáticamente → OFF\n- Previene conexión automática a redes maliciosas\n\n**4. Desactiva Bluetooth cuando no lo uses**:\n- Bluetooth: Rango corto pero puede ser atacado\n- Ejemplo: Attacker cerca tuyo con Bluetooth → Accede a datos\n- Solo activa cuando necesites (auriculares)\n\n**5. Desactiva y borra datos de Google**:\n- myaccount.google.com/data-and-privacy\n- \"Descargar datos\" → VE TODO lo que Google sabe\n- \"Borrar actividad\" → Limpia historial\n- \"Controlar actividad\" → Desactiva guardar ubicación, búsquedas, etc.\n\n**6. Actualizaciones de seguridad**:\n- Android: Ajustes → Sistema → Actualización del sistema\n- iPhone: Ajustes → General → Actualización del software\n- Instala SIEMPRE. Parchean vulnerabilidades críticas.\n\n### Alternativas radicales\n\n**GrapheneOS (Android privado)**:\n- Basado en Android oficial pero SIN Google\n- Sandbox para cada app\n- Permisos por-uso (permiso de cámara = UNA sesión)\n- Solo compatible con Pixel 6+ (específico)\n- grapheneos.org\n\n**iPhones**:\n- Privacidad mejor que Android por defecto\n- Apple NO vende datos (modelo: venta de hardware)\n- **Tradeoff**: Menos libertad, más control\n- iPhone 14+: MORE locationtrackable (chips más precisos para ubicación)\n- Mejor privacidad pero menos transparencia\n\n**CalyxOS**:\n- Android sin Google pero menos restringido que GrapheneOS\n- Más compatible con apps\n- calyxos.org"
          }
        ]
      },
      {
        title: "Malware y Amenazas",
        articles: [
          {
            id: "malware-types",
            title: "Tipos de Malware",
            content: "### Los 6 enemigos principales\n\n**1. Virus**\n- Se replica e infecta otros archivos\n- Ejemplo: Descarga .exe malicioso, infecta carpeta System32\n- **Impacto**: Rendimiento lento, errores permanentes\n- Protección: Antivirus + No descargar ejecutables de sitios raros\n\n**2. Troyanos**\n- \"Troyano\" = Se disfraza de algo legítimo\n- Ejemplo: Descarga que dice \"Flash Player\" pero es malware\n- **Impacto**: Acceso completo a tu PC\n- Protección: Descargar SOLO de sitios oficiales\n\n**3. Ransomware (El más peligroso)**\n- Cifra todos tus archivos, exige rescate\n- Ejemplo: \"Paga $500 en Bitcoin o pierdes tus fotos\"\n- **Estadística**: 1 de cada 150 emails contiene ransomware\n- **Costo promedio**: $1.5 MILLONES en recuperación\n- **Protección**: Backup externo + NO descargues archivos raros\n\n**4. Spyware**\n- Te espía silenciosamente\n- Roba: Contraseñas, emails, tarjeta de crédito\n- Ejemplo: KeyLogger grabador de pulsaciones\n- **Impacto**: Compromisos financieros totales\n- Protección: Antivirus + No instales apps de fuentes desconocidas\n\n**5. Adware**\n- Muestra anuncios invasivos\n- Redirige búsquedas a sitios maliciosos\n- **Molesto pero menos peligroso** que otros\n- Ejemplo: Buscas en Google, aparece \"yoursearch.xyz\"\n- Protección: uBlock Origin + No descargues de torrents raros\n\n**6. Worms**\n- Se propaga SIN que hagas clic en nada\n- Ejemplo: Entra por vulnerabilidad WiFi, se copia a otros PCs\n- **Impacto**: Infección masiva\n- Protección: Firewall + Actualizaciones de seguridad\n\n### Signos de infección\n\n**Nivel 1 - Tienes malware PROBABLE**:\n- ✗ Navegador lento pero internet rápido\n- ✗ Buscador cambiado sin permiso\n- ✗ Nueva toolbar en navegador\n\n**Nivel 2 - Tienes malware SEGURO**:\n- ✗ Pop-ups constantes incluso sin abrir nada\n- ✗ Computadora lenta incluso sin programas abiertos\n- ✗ Disco duro muy activo (sonido chirrido constante)\n- ✗ Ventanas abiertas que no abriste\n\n**Nivel 3 - Tienes malware CRÍTICO**:\n- ✗ Archivos desaparecen o cambian nombre\n- ✗ Dinero falta en cuenta bancaria\n- ✗ Cuentas de email hackeadas\n- ✗ Contraseña no funciona pero no la olvidaste\n\n### Qué hacer si sospechas malware\n\n**INMEDIATO**:\n1. Desconecta de internet (desconecta cable Ethernet o WiFi)\n2. NO hagas login en email/banco (si lo hagas desde PC infectado)\n3. Reinicia en Modo Seguro (con Redes)\n\n**DIAGNÓSTICO**:\n1. Descarga **Malwarebytes** en pendrive desde otro PC\n2. Ejecuta escaneo completo\n3. Si encuentra malware: Quarantine (cuarentena)\n4. Reinicia\n\n**DESPUÉS**:\n1. Escaneo con **Windows Defender** adicional\n2. **Cambiar TODAS las contraseñas** (desde otro dispositivo)\n3. Verifica cuentas: myaccount.google.com (verificar sesiones)\n4. **Considera**: Reinstalar Windows si es muy grave"
          },
          {
            id: "phishing-protection",
            title: "Protección contra Phishing",
            content: "### ¿Qué es phishing?\nEmails/sitios falsos que pretenden ser legítimos para robarte datos o dinero.\n\n**Estadísticas aterradoras**:\n- 3.4 BILLONES emails de phishing enviados ANUALMENTE\n- 1 de cada 4 usuarios clica en phishing\n- El 90% de brechas de datos comienzan con phishing\n- El CEO promedio es el objetivo más frecuente\n\n### Tipos de phishing\n\n**1. Email Phishing (El más común)**\n- \"Estimado cliente, tu cuenta fue comprometida. Haz clic AHORA\"\n- \"Amazon: Verifica tu cuenta o será cancelada\"\n- \"IRS: Debe impuestos atrasados\"\n\n**2. Spear Phishing (Dirigido)**\n- Atacante investiga sobre TI específicamente\n- Email parece de tu jefe: \"Juan, necesito que hagas esto urgentemente\"\n- **Estadística**: 66% de tasa de éxito\n\n**3. Smishing (SMS Phishing)**\n- \"Amazon: Confirma compra de $500 aquí: [link falso]\"\n- Teléfono SMS es MENOS seguro que email\n\n**4. Vishing (Voice Phishing)**\n- Llamada: \"Soy del banco, confirma tu PIN\"\n- Banco NUNCA te pide PIN por teléfono\n\n### Cómo identificar phishing\n\n**RED FLAG #1 - Urgencia artificial**:\n- ✗ \"ACTÚA AHORA o tu cuenta será cerrada\"\n- ✗ \"Autoriza esto en 24 horas o pierdes acceso\"\n- ✗ \"Pago rechazado, actualiza info INMEDIATAMENTE\"\n- Empresas reales NO usan presión temporal\n\n**RED FLAG #2 - Links sospechosos**:\n- Verifica: Pasa ratón sobre link (sin hacer clic)\n- Veras URL REAL en esquina inferior\n- ✗ paypa1-security.verify.com (NO es paypal.com)\n- ✗ amazon-signin.redirects.com (NO es amazon.com)\n- ✓ paypal.com (correcto)\n\n**RED FLAG #3 - Errores gramaticales**:\n- ✗ \"Dear costumer, your accout have been compromized\"\n- Empresas GRANDES revisan todo\n- Errores = Phishing 99% de probabilidad\n\n**RED FLAG #4 - Piden contraseña**:\n- ✗ \"Haz clic para ingresar tu contraseña\"\n- ✗ \"Confirma tu PIN de seguridad\"\n- **REGLA DE ORO**: Empresas legítimas NUNCA piden contraseña por email\n\n**RED FLAG #5 - Remitente raro**:\n- ✗ security@paypa1.com (typo: paypa1, no paypal)\n- ✗ support@amaz0n.com (cero en lugar de O)\n- ✗ noreply@bankofamerica.verify.secure.com (demasiados subdominios)\n- Verifica remitente COMPLETO (no solo nombre)\n\n**RED FLAG #6 - Genera archivo adjunto**:\n- ✗ .exe (ejecutable - NUNCA descargues)\n- ✗ .zip con .exe dentro\n- ✗ Macros de Word activadas\n- Empresas reales NO envían ejecutables\n\n### Ejemplo real - Phishing vs Legítimo\n\n**PHISHING** (Falso):\n```\nDe: security@amaz0n.verify.com\nAsunto: URGENT - Verify your Amazon Account\nCuerpo: Dear Customer,\nYour account will be closed in 24 hours.\nClick here: amazon-signin.redirects.com/verify\n```\n\n**LEGÍTIMO** (Real):\n```\nDe: account-notification@amazon.com\nAsunto: There was a change to your Amazon account\nCuerpo: Hi John,\nWe noticed a new device signed in.\nIf this wasn't you, visit Your Account > Login & security.\n```\n\n### Cómo protegerte\n\n**1. Verifica URLs escribiendo manualmente**:\n- NO hagas clic en links de emails\n- Abre tu navegador\n- Escribe la dirección (ej: amazon.com)\n- Inicia sesión\n- Si hay alerta, la ves aquí pero SEGURO\n\n**2. Llama directamente a la empresa**:\n- Email dice: \"Tu banco notó fraude\"\n- NO llames a número del email\n- Busca: \"Banco XXX número oficial\" en Google\n- Llama a ESE número\n- Empresa confirma si es real\n\n**3. Usa autenticador (2FA)**:\n- Incluso si atacante tiene contraseña\n- No puede entrar sin código 2FA\n- **ESTO SALVA TU CUENTA**\n\n**4. Verifica en múltiples canales**:\n- Email dice: \"Actúa urgentemente\"\n- Llama a empresa directamente\n- Si es real, confirman\n- Si es phishing, dicen \"no vimos ese email\"\n\n**5. Reporta phishing**:\n- Gmail: Reporta como phishing (flecha arriba → Phishing)\n- Empresa afectada: Forward email a security@empresa.com\n- Ayuda a otras personas\n\n### Test personal\n\n**¿Podrías identificar estos?**\n1. Email de \"Netflix\" con urgencia de confirmar pago → PHISHING\n2. Email de Amazon sin errores, de amazon.com, sin urgencia → LEGÍTIMO\n3. Pop-up de Facebook en email → PHISHING (Facebook NUNCA enva links así)\n4. SMS del banco pidiendo PIN → PHISHING (banco NUNCA pide PIN)"
          }
        ]
      }
    ]
  },
  recs: {
    android: { title: "Desgoogliza tu Android", desc: "Considera usar ROMs personalizadas o desactivar servicios innecesarios." },
    updates: { title: "Actualiza tu Software" },
    passwords: { title: "Mejora tus Contraseñas" },
    generic: { title: "Revisión General", desc: "Hay varios aspectos básicos que podrías mejorar." }
  },
  faq: {
    title: "Preguntas Frecuentes",
    subtitle: "Respuestas a tus dudas sobre seguridad y privacidad",
    items: [
      { question: "¿Es esta app realmente gratuita?", answer: "Sí, Beethoven es 100% gratuito y de código abierto. Nunca cobraremos por funcionalidades básicas. Nuestro objetivo es democratizar la privacidad digital.", icon: "heart" },
      { question: "¿Dónde se guardan mis datos?", answer: "En ningún lado. TODO se procesa localmente en tu dispositivo. No existe ningún servidor Beethoven. Puedes usar la app sin internet después de la primera carga. Tus datos de assessment se guardan solo en localStorage de tu navegador.", icon: "database" },
      { question: "¿Es seguro usar Beethoven?", answer: "Sí. El código es 100% abierto en GitHub, puedes auditarlo tú mismo. No hay backend, no hay APIs externas (excepto Google Fonts). La app es completamente transparente.", icon: "shield" },
      { question: "¿Beethoven es tan bueno como una auditoría profesional?", answer: "No. Beethoven es educativo y cubre 80% de los casos. Una auditoría profesional es mejor para empresas. Beethoven es perfecto para usuarios personales.", icon: "alert-triangle" },
      { question: "¿Funciona offline?", answer: "Sí, completamente. La primera vez necesitas internet para descargar assets. Después, todo funciona sin conexión. Incluso los generadores de contraseñas, analizadores, y herramientas de limpieza de imágenes funcionan offline.", icon: "wifi" },
      { question: "¿Puedo exportar mis resultados?", answer: "Sí. Desde la página de resultados puedes descargar tu assessment en JSON (para backup) o PDF (para compartir). Esto es 100% local, no se envía a ningún servidor.", icon: "download" },
      { question: "¿Qué significa el score?", answer: "Beethoven te da un score 0-100 basado en tu cuestionario. 80+ = Excelente (privacidad muy protegida). 50-79 = Mejorable (necesitas cambios). 0-49 = Vulnerable (tienes riesgos críticos). El score se recalcula cada vez que haces el assessment.", icon: "zap" },
      { question: "¿Los generadores de contraseñas son realmente seguros?", answer: "Sí. Generamos contraseñas usando crypto.getRandomValues() de la API nativa del navegador. Es matemáticamente imposible predecirlas. La generación es 100% local, nunca se envía a servidor.", icon: "key" },
      { question: "¿Puedo usar Beethoven en mi teléfono?", answer: "Sí, funciona en navegadores móviles. Sin embargo, la experiencia es mejor en desktop para ciertas herramientas (como el analizador de imágenes). La app es responsive y mobile-friendly.", icon: "smartphone" },
      { question: "¿Beethoven reporta mis datos a terceros?", answer: "NUNCA. No recolectamos, no rastreamos, no compartimos. Cero telemetría. Cero analytics. Cero cookies de tracking. La única cookie que existe es localStorage con TUS preferencias locales.", icon: "lock" },
      { question: "¿Qué es el Privacy Hub?", answer: "Una directorio curado de 100+ aplicaciones privacy-friendly. Alternativas a Google, Facebook, Microsoft, Apple. Cada app tiene badge (Open Source, Encrypted, etc) y enlace directo. Todo offline, todo verificado.", icon: "layers" },
      { question: "¿El Phishing Simulator es realista?", answer: "Sí. Basado en ataques REALES que hemos documentado. Aprenderás patrones de phishing que después reconocerás en tu email. Excelente para entrenar a familiares.", icon: "alert-triangle" },
      { question: "¿Beethoven funciona en navegadores viejos?", answer: "Requiere navegador moderno (2020+). Chrome, Firefox, Safari, Edge. IE NO funciona. El navegador debe soportar: Crypto API, Canvas API, Web Workers. Los navegadores modernos soportan todo.", icon: "code" },
      { question: "¿Cómo se llama Beethoven?", answer: "Es un tributo a nuestro querido Chihuahua que falleció. Su espíritu vive en esta app: protegiendo, cuidando, dando libertad. Beethoven el compositor también lucho contra la censura - es perfecto.", icon: "heart" },
      { question: "¿Puedo contribuir code?", answer: "SÍ. GitHub abierto. Buscamos: traductores, diseñadores, devs. Si encuentras bug, abre issue. Si tienes feature idea, propónla. La comunidad es lo que da vida a Beethoven.", icon: "code" },
      { question: "¿Beethoven tiene API?", answer: "No. Beethoven es puramente frontend. No existe API porque todo es client-side. Si necesitas integrar Beethoven en algo, duplica los componentes React. El código es tuyo.", icon: "database" },
      { question: "¿Qué lenguaje usa Beethoven?", answer: "React + TypeScript + Vite. 100% JavaScript frontend. Sin backend Node/Python/etc. Arquitectura ultra-simple = menos bugs = más seguridad. El código total es <10k líneas.", icon: "code" },
      { question: "¿Beethoven tiene publicidad?", answer: "NUNCA. Cero anuncios, cero sponsors, cero tracking. Beethoven existirá mientras haya gente que crea en privacidad. Si lo amas, considera donar o compartir.", icon: "heart" },
      { question: "¿Cómo sé que Beethoven no hace tracking?", answer: "1) Abre Developer Tools (F12), ve Network tab. 2) Usa app. 3) Verás CERO requests a servidores externos. 4) Ve el código: github.com/tu-repo. 5) Usa Pi-hole DNS - ningún request de Beethoven.", icon: "shield" },
      { question: "¿Puedo compartir Beethoven?", answer: "Por supuesto, comparte masivamente. Beethoven es open source (MIT license). Puedes fork, modificar, desplegar donde quieras. El código es tuyo. Si haces versión mejorada, comparte atrás a la comunidad.", icon: "heart" },
      { question: "¿Beethoven tiene roadmap?", answer: "Sí: Hardware security keys support, Tor integration, mobile app nativa, browser extension, integración con have-i-been-pwned API, historial de assessments (pronto). Síguenos para actualizaciones.", icon: "zap" },
      { question: "¿Por qué Beethoven si existen otras apps?", answer: "Porque la mayoría tienen: 1) Backend/tracking, 2) Paywall, 3) Datos incompletos, 4) Interfaz confusa. Beethoven: educativo, gratis, transparente, offline, simple. Hecha por gente que ama privacidad.", icon: "heart" }
    ],
    contactTitle: "¿Tienes más preguntas?",
    contactBtn: "Abre issue en GitHub"
  }
};

const en: Translation = {
  ...es,
  common: { ...es.common, appName: 'Beethoven', tagline: 'Privacy simplified for everyone', start: 'Start', next: 'Next', back: 'Back', close: 'Close', loading: 'Loading...', error: 'Error', viewGuide: 'View Guide', seeMore: 'See More', free: 'Free', openSource: 'Open Source', all: 'All' },
  nav: { home: 'Home', tools: 'Tools', assessment: 'Assessment', hub: 'Hub', docs: 'Docs', faq: 'FAQ', about: 'About', theme: 'Theme', legal: 'Legal', terms: 'Terms', privacy: 'Privacy', stories: 'Stories' },
  inspector: { ...es.inspector, enable: 'Inspector', disable: 'Close', title: 'Inspector UI', select: 'Select an element', props: 'Properties', computed: 'Computed', tag: 'Tag', class: 'Class', dimensions: 'Dimensions', color: 'Color', font: 'Font', spacing: 'Spacing' },
  analyzer: {
    title: "Privacy Analyzer",
    subtitle: "Checking your browser defenses in real-time",
    analyzing: "Analyzing environment...",
    score: "Protection Score",
    grade: { a: "Excellent", b: "Good", c: "Fair", d: "Weak", f: "Critical" },
    metrics: {
      https: "HTTPS Encryption", httpsDesc: "Verifies secure connection.",
      tracking: "Tracking Protection", trackingDesc: "Detects Global Privacy Control / DNT signals.",
      fingerprint: "Fingerprinting", fingerprintDesc: "Resistance to Canvas/Audio tracking.",
      webrtc: "WebRTC Leak", webrtcDesc: "Checks if real IP is visible.",
      adblock: "Ad Blocking", adblockDesc: "Checks for active blocker.",
      battery: "Battery API", batteryDesc: "Checks if websites can read battery level.",
      hardware: "CPU Cores", hardwareDesc: "Exposing exact core count aids fingerprinting.",
      memory: "Device Memory", memoryDesc: "Exposing RAM amount aids fingerprinting."
    },
    status: { protected: "Protected", vulnerable: "Vulnerable", warning: "Warning", detected: "Detected", hidden: "Hidden" },
    cta: "Improve Privacy"
  },
  stories: {
    ...es.stories,
    heroTitle: "Privacy Stories", heroSubtitle: "Why we do what we do",
    nameTitle: "The Name", nameDesc: "Beethoven is a tribute to our beloved Chihuahua who passed away. His spirit lives in this app: protecting, caring, and giving freedom to everyone.",
    stormTitle: "The Storm", stormDesc: "In a sea of surveillance, we aim to be a beacon of safety.",
    missionTitle: "Our Mission", missionDesc: "Democratize digital privacy through open source tools.",
    visionTitle: "Vision", visionDesc: "An internet where privacy is the norm, not the exception.",
    values: {
      title: "Our Values",
      items: [
        { title: "Transparency", desc: "Open source and auditable.", icon: "code" },
        { title: "Privacy", desc: "Your data is yours.", icon: "shield" },
        { title: "Community", desc: "Built by and for the people.", icon: "heart" }
      ]
    }
  },
  about: {
    ...es.about,
    title: "About Us", subtitle: "Building a safer digital future",
    missionTitle: "Mission", missionP1: "We believe privacy is a fundamental human right.", missionP2: "We develop easy-to-use tools to protect your digital life.",
    pillars: {
      privacy: { title: "Privacy", desc: "No tracking, no ads." },
      opensource: { title: "Open Source", desc: "Fully transparent." },
      free: { title: "Free", desc: "Accessible to everyone." },
      education: { title: "Education", desc: "Learn while you protect." }
    },
    ctaTitle: "Ready to start?", ctaDesc: "Join us on this journey.", ctaHome: "Go Home"
  },
  home: {
    ...es.home,
    heroTitle: "Your Privacy,", heroSubtitle: "Simplified.",
    heroDesc: "Diagnose, learn, and protect your digital life with open source tools. No logs, no costs, 100% private.",
    ctaCheck: "Quick Check", ctaGuides: "Guides", ctaAnalyzer: "Live Analyzer",
    featuresTitle: "Everything you need", featuresDesc: "A complete set of tools to reclaim your privacy.",
    featDiagnosis: "Personal Diagnosis", featDiagnosisDesc: "Assess your current security posture with an interactive quiz and get personalized recommendations.",
    featTools: "Toolbox", featToolsDesc: "Password generators, link cleaners, breach checks, and more essential utilities.",
    featHub: "Privacy Hub", featHubDesc: "Discover privacy-respecting alternatives for the apps and services you use daily.",
    featLab: "Image Lab", featLabDesc: "Clean sensitive EXIF metadata (location, device) from your photos before sharing.",
    featPhishing: "Anti-Phishing Trainer", featPhishingDesc: "Learn to identify scams and malicious emails with realistic interactive scenarios.",
    trustTitle: "Why trust us",
    trustNoTrackers: "No Trackers", trustNoTrackersDesc: "We do not collect personal data or use third-party cookies.",
    trustLocal: "Local Processing", trustLocalDesc: "Your data is processed on your device, not on our servers.",
    trustOpen: "Open Source", trustOpenDesc: "Our code is public and auditable by anyone.",
    openSourceSectionTitle: "100% Open Source", openSourceSectionDesc: "Transparency is key to trust. Explore our code on GitHub.",
    openSourceSectionBtn: "View on GitHub", mapLabel: "Global Threat Map (Simulated)"
  },
  assessment: {
    ...es.assessment,
    title: "Security Assessment", subtitle: "Let's evaluate your current protection level",
    deviceStep: "Devices", identityStep: "Identity", securityStep: "Security", defenseStep: "Defense",
    startBtn: "Start Assessment", phase1: "Phase 1: Fundamentals", phase2: "Phase 2: Digital Identity", phase3: "Phase 3: Communication", phase4: "Phase 4: Security", phase5: "Phase 5: Active Defense", viewReport: "View Full Report",
    questions: {
      os: "Which operating system do you primarily use?", osDesc: "Select your main platform.",
      updates: "How do you handle software updates?", updatesDesc: "Updates fix critical security flaws.",
      backups: "Do you perform backups?", backupsDesc: "Essential against ransomware and data loss.",
      browsers: "Which web browser do you use?", browsersDesc: "Your window to the internet.",
      search: "Which search engine do you use?", searchDesc: "Some search engines track every query.",
      email: "Who is your email provider?", emailDesc: "Email is the key to your digital identity.",
      social: "Which social networks do you use most?", socialDesc: "Social networks collect vast amounts of data.",
      messaging: "Which messaging app do you use?", messagingDesc: "Encryption is vital for privacy.",
      cloud: "Where do you store files in the cloud?", cloudDesc: "Your personal documents.",
      iot: "Do you have smart devices at home?", iotDesc: "Speakers, cameras, etc.",
      passwords: "How do you manage your passwords?", passwordsDesc: "Reusing passwords is the biggest risk.",
      twoFactor: "Do you use two-factor authentication (2FA)?", twoFactorDesc: "An extra layer of security.",
      phishing: "What do you do with a suspicious email?", phishingDesc: "Social engineering and scams.",
      risks: "What risks are you frequently exposed to?", risksDesc: "Daily habits.",
      defense: "What defense tools do you use?", defenseDesc: "Active protection."
    },
    options: { none: "None / I don't use", auto: "Automatic (Recommended)", manual: "Manual, when I remember", never: "Almost never / Never", yes: "Yes", no: "No" },
    choices: {
      linuxOther: "Linux / Others", manualLate: "Manual (sometimes I ignore them)",
      backupBoth: "Cloud and Physical Drive", backupCloud: "Automatic Cloud Only", backupDisk: "External Drive Only",
      browserOther: "Other", searchBing: "Bing / Yahoo",
      emailGmail: "Gmail", emailOutlook: "Outlook / Hotmail", emailIcloud: "iCloud Mail", emailProton: "Proton / Tutanota", emailYahoo: "Yahoo Mail",
      msgSms: "SMS / iMessage", cloudDrive: "Google Drive",
      iotAlexa: "Amazon Alexa", iotGoogle: "Google Nest/Home", iotRing: "Cameras (Ring/Nest)", iotTv: "Smart TV",
      passUnique: "Password Manager", passUniqueDesc: "Unique passwords for everything",
      passMostly: "Variations", passMostlyDesc: "I use a base and change it a bit",
      passReused: "Reuse Passwords", passReusedDesc: "I use the same one for almost everything",
      twoFaApp: "Authenticator App", twoFaAppDesc: "Google Auth, Authy, Aegis",
      twoFaKey: "Security Key", twoFaKeyDesc: "YubiKey, Titan",
      twoFaSms: "SMS / Email", twoFaSmsDesc: "They send me a code",
      twoFaNone: "I don't use 2FA", twoFaNoneDesc: "I only use password",
      phishCheck: "Check sender", phishCheckDesc: "I look at the real address",
      phishLook: "Analyze links", phishLookDesc: "Without clicking",
      phishOpen: "Open and see", phishOpenDesc: "I trust the spam filter",
      riskWifi: "Public Wi-Fi", riskWifiDesc: "Cafes, airports",
      riskBlue: "Bluetooth always on", riskBlueDesc: "Visible to everyone",
      riskLoc: "Location always on", riskLocDesc: "GPS enabled",
      riskUsb: "Public USB Charging", riskUsbDesc: "Unknown ports",
      defPass: "Password Manager", def2fa: "2FA App", defVpn: "VPN", defAd: "Ad Blocker", defScreen: "Privacy Filter"
    }
  },
  results: {
    securityLevel: "Security Level", score: "Score", actionPlan: "Your Action Plan", personalizedRecs: "Recommendations based on your answers",
    perfectTitle: "Excellent Job!", perfectDesc: "You have very solid security habits. Keep up the vigilance.",
    critical: "Critical", suggestion: "Suggestion", retest: "Retake Test", areasToImprove: "areas to improve",
    exportJsonBtn: "Export JSON",
    exportReportBtn: "Export Report",
    reportTitle: "BEETHOVEN PRIVACY ASSESSMENT REPORT",
    reportGenerated: "Generated:",
    reportScore: "SCORE:",
    reportRecommendations: "RECOMMENDATIONS:",
    categoryMobile: "Mobile",
    categoryBrowser: "Browser",
    categoryNetworks: "Wi-Fi and Networks",
    categoryPasswords: "Passwords",
    assessmentCompleted: "Assessment completed with score",
    labels: { excellent: "Excellent", improvable: "Improvable", vulnerable: "Vulnerable" }
  },
  tools: {
    title: "Toolbox", subtitle: "Essential utilities for your privacy",
    tabKeys: "Keys", tabPrivacy: "Privacy", tabUtils: "Utilities", tabFiles: "Files", tabRadar: "Radar", tabSPS: "SPS",
    genTitle: "Password Generator", genDesc: "Create robust and random passwords locally.",
    auditTitle: "Password Auditor", auditDesc: "Check strength and if it has been leaked.",
    leaksTitle: "Check Leaks", leaksDesc: "See if your email has been compromised.",
    fingerprintTitle: "Fingerprint", fingerprintDesc: "Analyze what info your browser reveals.",
    cleanerTitle: "Link Cleaner", cleanerDesc: "Remove tracking parameters from URLs.",
    msgTitle: "Secure Message", msgDesc: "Encrypt messages with AES-GCM.",
    tokenTitle: "Token Generator", tokenDesc: "Create secure unique identifiers.",
    permissionsTitle: "Browser Permissions", permissionsDesc: "Review which sites have access to your hardware.",
    auditPlaceholder: "Type a password to test (locally)...", genLength: "Length",
    radarStatusLabel: "Radar Status", cleanUrlLabel: "Clean URL", foundInBreaches: "Found in {count} breaches",
    hardwareGenerated: "Hardware Generated", compositeHashDesc: "Composite hash from device features",
    radarReady: "Radar ready. Start scan.", copy: "Copy", copied: "Copied", regenerate: "Regenerate",
    encrypt: "Encrypt", decrypt: "Decrypt", cleanUrl: "Clean URL", check: "Check", analyze: "Analyze",
    weak: "Weak", medium: "Medium", strong: "Strong", excellent: "Excellent", compromised: "Compromised",
    safetyScore: "Safety Score", riskSafe: "Safe", riskSuspicious: "Suspicious", riskDangerous: "Dangerous",
    analysis: "Analysis", unknown: "Unknown",
    time: { seconds: "seconds", minutes: "minutes", hours: "hours", days: "days", years: "years", centuries: "centuries" },
    vaultTitle: "File Vault", vaultDesc: "Encrypt files locally with AES-GCM.", vaultDrop: "Drop a file here", vaultPassPlaceholder: "Encryption password",
    vaultEncryptBtn: "Encrypt & Download", vaultDecryptBtn: "Decrypt & Download", vaultDownload: "Download", vaultError: "Error processing file. Check password.",
    stegTitle: "Steganography", stegDesc: "Hide text messages inside images.", stegHideTab: "Hide", stegRevealTab: "Reveal",
    stegDrop: "Drop an image", stegMessage: "Secret message...", stegHideBtn: "Hide Message", stegRevealBtn: "Reveal Message",
    stegDownload: "Download Image", stegHidden: "Hidden Message:", stegNoHidden: "No hidden message found.",
    socialTitle: "Social Privacy", socialDesc: "Shortcuts to privacy settings.",
    entropyBits: "bits of entropy", crackTime: "Estimated crack time", instant: "Instant",
    crackScenarios: { laptop: "Common Laptop", rig: "GPU Farm", supercomputer: "Supercomputer" },
    patterns: { title: "Detected Patterns", sequence: "Common sequence", repeat: "Repeated chars", date: "Date or year", keyboard: "Keyboard pattern" },
    gdprTitle: "GDPR Generator", gdprDesc: "Create a simple data access request.",
    gdprCompany: "Company name", gdprName: "Your full name", gdprEmail: "Your registered email", gdprGenerate: "Generate Request",
    gdprTemplate: "Dear Privacy Officer of {company},\n\n...",
    qrTitle: "Secure QR Generator", qrDesc: "Create Wi-Fi QR codes without revealing the key in text.",
    qrWifi: "Wi-Fi", qrText: "Text/URL", qrSsid: "Network name (SSID)", qrPass: "Password", qrHidden: "••••••", qrGenerate: "Generate QR",
    webrtcTitle: "WebRTC Leak Test", webrtcDesc: "Check if your browser leaks your real IP via WebRTC.",
    webrtcLeak: "Leak Detected!", webrtcSafe: "Safe: IP Hidden", webrtcCheck: "Check Leak",
    checksumTitle: "Checksum Verifier", checksumDesc: "Verify file integrity by comparing its hash.",
    checksumDrop: "Drop file to hash", checksumHash: "SHA-256 Hash:", checksumCompare: "Compare with...",
    checksumMatch: "Match!", checksumMismatch: "Do not match",
    radarTitle: "Breach Radar", radarDesc: "Domain security scanner and DNS configuration.",
    radarPlaceholder: "domain.com", radarButton: "Scan Target", radarScanning: "Scanning...",
    radarStatus: { safe: "SAFE", warning: "WARNING", critical: "CRITICAL" },
    radarMetrics: { latency: "Latency", jitter: "Jitter", ssl: "SSL Score", server: "Server", dns: "DNS Health", network: "Network", ports: "Ports", location: "Location" },
    radarLogs: "System Logs",
    spsTitle: "SPS (Shadow Profile Scrubber)", spsDesc: "Analyzes digital fingerprints and generates noise to obfuscate profiling.",
    spsScanBtn: "Analyze Fingerprint", spsRiskHigh: "HIGH RISK", spsRiskMod: "MODERATE RISK", spsRiskLow: "LOW RISK",
    spsExposedApis: "Exposed APIs", spsBrokers: "Potential Data Brokers", spsBrokersDesc: "Based on your location and settings:",
    spsNoiseTitle: "Noise Generator", spsNoiseDesc: "Generates random search traffic to confuse algorithms.",
    spsNoiseBtn: "Generate Noise (6 Tabs)",
    cleanerPlaceholder: "Paste a dirty link (e.g. facebook.com?fbclid=...)", cleanerResults: "Results will appear here",
    cleanerRecursive: "Redirect removed", paramsRemoved: "Parameters removed", trackerFound: "Tracker found",
    deviceInfo: {
      browser: "Browser", os: "OS", deviceType: "Type", screen: "Screen", battery: "Battery", connection: "Connection",
      mobile: "Mobile", desktop: "Desktop", uniqueId: "Unique ID", gpu: "GPU / WebGL", timezone: "Timezone",
      canvas: "Canvas Hash", audio: "Audio Hash", pixelRatio: "Pixel Ratio", bot: "Bot / Auto", incognito: "Incognito",
      ip: "IP Address", location: "Location", isp: "Provider (ISP)", hdr: "HDR Support", gamut: "Color Gamut", contrast: "Contrast",
      fontsLabel: "Installed Fonts", hardwareLabel: "Hardware", cores: "CPU Cores", touchPoints: "Touch Points", userAgent: "User Agent"
    },
    perms: { mic: "Microphone", location: "Location", notifications: "Notifications", camera: "Camera" },
    msgPlaceholderEnc: "Message to encrypt...", msgPlaceholderDec: "Encrypted message...", msgKeyPlaceholder: "Secret key...",
    msgProcess: "Process", msgErrorKey: "Key is required", msgErrorInvalid: "Invalid message"
  },
  hub: {
    title: "Privacy Hub", subtitle: "Ethical alternatives for your digital life",
    searchPlaceholder: "Search apps...", replacesLabel: "Replaces:", noAppsFound: "No apps found", clearFilters: "Clear filters",
    cats: {
      browser: "Browsers", email: "Email", messaging: "Messaging", cloud: "Cloud", search: "Search Engines",
      os: "OS", vpn: "VPN", pass: "Passwords", dns: "DNS", store: "Stores", productivity: "Productivity", utilities: "Utilities"
    },
    apps: es.hub.apps.map(app => ({...app})) // Clone apps structure
  },
  lab: {
    title: "Image Lab", subtitle: "Remove hidden metadata from your photos",
    dropzone: "Drop an image here", noMeta: "No EXIF metadata found", metaFound: "Metadata Found!",
    gpsFound: "GPS Location Detected", cleanBtn: "Clean Image", downloadBtn: "Download Safe Image",
    warning: "Images are processed locally in your browser.", analyzing: "Analyzing image...",
    analyzeAnother: "Analyze another image", cleanGenerated: "Clean Image Generated",
    cleanDesc: "The image has been re-encoded and metadata removed.", original: "Original",
    meta: { camera: "Camera", software: "Software", date: "Date" }
  },
  phishing: {
    title: "Cyber Trainer", subtitle: "Can you distinguish real from fake?",
    startGame: "Start Training", safe: "Safe", unsafe: "Phishing",
    correct: "Correct!", wrong: "Incorrect", completed: "Training Completed", score: "Your final score",
    case: "Case", of: "of",
    ui: { messages: "Messages", networks: "Networks", unsecured: "Unsecured", encrypted: "Encrypted", signin: "Sign In", username: "Username", password: "Password", login: "Login", today: "Today", viewDetails: "View details" },
    scenarios: [
      {
        id: 1, type: "email", isSafe: false, subject: "URGENT: Action required on your account", sender: "security@paypa1-support.com",
        body: "We have detected unusual activity. Click here to verify your identity immediately or your account will be suspended.",
        explanation: "Check the sender: 'paypa1' is a common typosquatting error. Urgency is also a red flag."
      },
      {
        id: 2, type: "email", isSafe: true, subject: "Your purchase receipt", sender: "noreply@amazon.com",
        body: "Thanks for your order #123456. It has been shipped to your saved address. You can view details in your order history.",
        explanation: "The sender is correct (amazon.com) and does not ask you to click urgent links or enter sensitive data."
      },
      {
        id: 3, type: "wifi", isSafe: false, networkName: "Free_Airport_WiFi", security: "Open",
        explanation: "Open Wi-Fi networks (no lock) allow anyone to intercept your traffic. Always use VPN on these networks."
      }
    ]
  },
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Answers to your privacy and security questions",
    items: [
      { question: "Is this app really free?", answer: "Yes, Beethoven is 100% free and open source. We will never charge for basic features. Our goal is to democratize digital privacy.", icon: "heart" },
      { question: "Where is my data stored?", answer: "Nowhere. Everything is processed locally on your device. There is no Beethoven server. You can use the app without internet after the first load. Your assessment data is stored only in your browser's localStorage.", icon: "database" },
      { question: "Is it safe to use Beethoven?", answer: "Yes. The code is 100% open on GitHub, you can audit it yourself. No backend, no external APIs (except Google Fonts). The app is completely transparent.", icon: "shield" },
      { question: "Is Beethoven as good as a professional audit?", answer: "No. Beethoven is educational and covers 80% of cases. A professional audit is better for companies. Beethoven is perfect for personal users.", icon: "alert-triangle" },
      { question: "Does it work offline?", answer: "Yes, completely. The first time you need internet to download assets. After that, everything works without connection. Even password generators, analyzers, and image cleaning tools work offline.", icon: "wifi" },
      { question: "Can I export my results?", answer: "Yes. From the results page you can download your assessment as JSON (for backup) or TXT (for sharing). This is 100% local, not sent to any server.", icon: "download" },
      { question: "What does the score mean?", answer: "Beethoven gives you a score 0-100 based on your questionnaire. 80+ = Excellent (privacy well protected). 50-79 = Improvable (needs changes). 0-49 = Vulnerable (critical risks). Score recalculates each time you take the assessment.", icon: "zap" },
      { question: "Are the password generators really secure?", answer: "Yes. We generate passwords using crypto.getRandomValues() from the browser's native API. It's mathematically impossible to predict them. Generation is 100% local, never sent to a server.", icon: "key" },
      { question: "Can I use Beethoven on my phone?", answer: "Yes, it works on mobile browsers. However, the experience is better on desktop for certain tools (like the image analyzer). The app is responsive and mobile-friendly.", icon: "smartphone" },
      { question: "Does Beethoven report my data to third parties?", answer: "NEVER. We don't collect, don't track, don't share. Zero telemetry. Zero analytics. Zero tracking cookies. The only storage is localStorage with YOUR local preferences.", icon: "lock" },
      { question: "What is the Privacy Hub?", answer: "A curated directory of 100+ privacy-friendly apps. Alternatives to Google, Facebook, Microsoft, Apple. Each app has badges (Open Source, Encrypted, etc) and direct links. All offline, all verified.", icon: "layers" },
      { question: "Is the Phishing Simulator realistic?", answer: "Yes. Based on REAL attacks we've documented. You'll learn phishing patterns that you'll recognize in your email. Excellent for training family members.", icon: "alert-triangle" },
      { question: "Does Beethoven work on old browsers?", answer: "Requires modern browser (2020+). Chrome, Firefox, Safari, Edge. IE does NOT work. Browser must support: Crypto API, Canvas API, Web Workers. Modern browsers support everything.", icon: "code" },
      { question: "Why is Beethoven named Beethoven?", answer: "It's a tribute to our beloved Chihuahua who passed away. His spirit lives in this app: protecting, caring, giving freedom. Beethoven the composer also fought against censorship - it's perfect.", icon: "heart" },
      { question: "Can I contribute code?", answer: "YES. GitHub open. We're looking for: translators, designers, devs. If you find a bug, open an issue. If you have a feature idea, propose it. Community is what brings Beethoven to life.", icon: "code" },
      { question: "Does Beethoven have an API?", answer: "No. Beethoven is purely frontend. No API exists because everything is client-side. If you need to integrate Beethoven into something, duplicate the React components. The code is yours.", icon: "database" },
      { question: "What language does Beethoven use?", answer: "React + TypeScript + Vite. 100% JavaScript frontend. No backend Node/Python/etc. Ultra-simple architecture = fewer bugs = more security. Total code is <10k lines.", icon: "code" },
      { question: "Does Beethoven have ads?", answer: "NEVER. Zero ads, zero sponsors, zero tracking. Beethoven will exist as long as people believe in privacy. If you love it, consider donating or sharing.", icon: "heart" },
      { question: "How do I know Beethoven isn't tracking me?", answer: "1) Open Developer Tools (F12), go to Network tab. 2) Use app. 3) You'll see ZERO requests to external servers. 4) Check the code: github.com/repo. 5) Use Pi-hole DNS - no requests from Beethoven.", icon: "shield" },
      { question: "Can I share Beethoven?", answer: "Of course, share widely. Beethoven is open source (MIT license). You can fork, modify, deploy anywhere. The code is yours. If you make an improved version, share it back to the community.", icon: "heart" },
      { question: "Does Beethoven have a roadmap?", answer: "Yes: Hardware security keys support, Tor integration, native mobile app, browser extension, have-i-been-pwned API integration, assessment history (coming soon). Follow us for updates.", icon: "zap" },
      { question: "Why Beethoven when other apps exist?", answer: "Because most have: 1) Backend/tracking, 2) Paywall, 3) Incomplete data, 4) Confusing interface. Beethoven: educational, free, transparent, offline, simple. Built by people who love privacy.", icon: "heart" }
    ],
    contactTitle: "Have more questions?",
    contactBtn: "Open issue on GitHub"
  },
  legal: {
    terms: {
      title: "Terms of Use",
      lastUpdated: "Last Updated: December 2025",
      sections: [
        {
          heading: "1. Acceptance of Terms",
          content: "By using Beethoven, you accept these terms. If you disagree, do not use the application. Beethoven is provided 'AS IS' without any warranties of any kind."
        },
        {
          heading: "2. Educational Nature",
          content: "Beethoven is an EDUCATIONAL tool about digital privacy. It is not a substitute for professional security audits. Results are indicative, not definitive. Beethoven educates you, it does not replace experts."
        },
        {
          heading: "3. Acceptable Use",
          content: "You promise to use Beethoven for: educating yourself about privacy, protecting your personal information, sharing with friends and family. You do NOT promise to: use for cyber attacks, hacking, fraud, spamming, or any illegal activity."
        },
        {
          heading: "4. Disclaimer",
          content: "Beethoven is free and open source. We are not responsible for: data loss, indirect damages, technical issues, tool misuse. 100% responsibility is yours. If something goes wrong, check GitHub issues first."
        },
        {
          heading: "5. No Warranties",
          content: "Beethoven is provided without warranties, implied or express. We do not guarantee: availability, accuracy, security. You use Beethoven at your own risk. If you cannot accept risk, do not use it."
        },
        {
          heading: "6. Limitation of Liability",
          content: "IN NO EVENT shall Beethoven be liable for incidental, special, indirect, or punitive damages. This applies even if we have been warned of the possibility of such damages."
        },
        {
          heading: "7. Changes to Terms",
          content: "We can change these terms at any time. Changes take effect immediately. Your continued use of Beethoven means acceptance of changes. Check GitHub for updates."
        },
        {
          heading: "8. Intellectual Property",
          content: "Beethoven is open source under MIT license. You can: use freely, modify, distribute, sell modified versions. You only must give attribution. The code is yours."
        },
        {
          heading: "9. Termination",
          content: "We can terminate access to Beethoven if you violate these terms. However, since it is open source, you can fork the repo on GitHub and continue using your own version."
        },
        {
          heading: "10. Applicable Law",
          content: "These terms are governed by the laws of the country/jurisdiction where the main contributor resides. For disputes, first try to resolve via GitHub issues or email."
        }
      ]
    },
    privacy: {
      title: "Privacy Policy",
      lastUpdated: "Last Updated: December 2025",
      sections: [
        {
          heading: "1. Privacy Guaranteed",
          content: "Your privacy is sacred. ZERO personal data is collected, ZERO is sent to external servers, ZERO is shared with third parties. Simple: if there's no server, there's no tracking."
        },
        {
          heading: "2. What We Process Locally",
          content: "EVERYTHING is processed on YOUR browser: questionnaires, password generators, privacy analyzers, image cleaners, phishing detectors. Processing happens 100% on your machine.",
          list: [
            "Assessment responses: In your browser's localStorage",
            "Generated passwords: In RAM memory, never saved",
            "Image metadata analysis: On your GPU via Canvas API",
            "Browser fingerprinting check: In memory",
            "Phishing analysis: In JavaScript executed locally"
          ]
        },
        {
          heading: "3. LocalStorage",
          content: "The only data saved on your device (localStorage) is: Theme preference (dark/light), Color palette choice, Language (ES/EN), Your assessment responses (if you choose to save), Assessment history (local timestamps). You control all of this."
        },
        {
          heading: "4. What We Do NOT Collect",
          content: "Beethoven does NOT collect: IP address, Location, Tracking cookies, Device fingerprint, Browser history, Personal information, Analytics, User behavior tracking. NOTHING.",
          list: [
            "No Google Analytics",
            "No Facebook Pixel",
            "No Mixpanel or similar",
            "No telemetry of any kind",
            "No tracking pixels",
            "No external scripts we track"
          ]
        },
        {
          heading: "5. Cookies",
          content: "Beethoven does NOT use third-party cookies. The ONLY cookies are: browser localStorage (your machine), session storage (temporary). None are sent to remote servers."
        },
        {
          heading: "6. Third-Party Cookies",
          content: "Beethoven does NOT use Google Fonts from CDN (if we did, Google would see IPs). Beethoven uses fonts from local files. Zero third parties with access to your activity."
        },
        {
          heading: "7. Backup and Export",
          content: "You can export your assessment as JSON. This file goes directly to your computer. No server sees it. You can import it later to compare progress. Complete your control."
        },
        {
          heading: "8. Data Security",
          content: "Since we don't store data on servers, there are no: database breaches, data leaks, server hacking. Data only exists on YOUR machine. Your responsibility = your security."
        },
        {
          heading: "9. External Links",
          content: "Beethoven contains links to Privacy Hub (external applications). When you click, you leave Beethoven. Those apps have their own privacy policies. We are not responsible for them."
        },
        {
          heading: "10. Changes to Privacy",
          content: "If we change this policy, we'll update GitHub. You review whenever you want. No forced 'terms updated'. Complete transparency."
        },
        {
          heading: "11. GDPR/CCPA Rights",
          content: "Since we don't process personal data, GDPR/CCPA don't fully apply. However: Right to access: All your data is in localStorage (accessible via DevTools). Right to delete: Clear localStorage whenever you want. Right to portability: Export JSON and done."
        },
        {
          heading: "12. Contact",
          content: "If you have privacy questions, open an issue on GitHub or send email. We'll respond within 48 hours."
        }
      ]
    }
  },
  docs: {
    title: "Documentation", subtitle: "Detailed guides to protect yourself",
    sections: [{
      title: "Fundamentals",
      articles: [
        {
          id: "intro",
          title: "Introduction to Privacy",
          content: "### What is privacy?\nPrivacy is not hiding bad things, it's protecting your freedom. It's your right to control what information about you is shared, where, and how.\n\n### Why it matters\nIn the digital age, your data is currency. Companies buy, sell, and use it to:\n- Model your behavior\n- Predict your actions\n- Manipulate you through targeted ads\n- Discriminate against you in prices, credit, jobs\n\n**Real example**: Netflix knows exactly what movies you'll watch. Amazon predicts what you'll buy before you know.\n\n### Three pillars of privacy\n1. **Confidentiality**: Only you and who you authorize see your data\n2. **Integrity**: Your data isn't modified without permission\n3. **Availability**: Access when you need it\n\n### Why Beethoven exists\nPrivacy shouldn't be a luxury, it should be normal. Beethoven empowers you with tools to reclaim your right to privacy."
        },
        {
          id: "data-rights",
          title: "Digital Rights",
          content: "### Your right to privacy\nPrivacy is a human right recognized internationally (UNESCO, UN). You have legal rights you can exercise TODAY:\n\n- **Access**: Get a copy of ALL data about you\n- **Rectification**: Correct wrong information\n- **Erasure**: Request permanent deletion\n- **Portability**: Get data in readable format (JSON, CSV)\n- **Objection**: Refuse data processing for marketing\n\n### GDPR (Europe)\n**Applies if**: You live in EU OR use European company's services\n**Penalties**: Up to €20 MILLION or 4% of global revenue\n**How**: Visit gdpr.eu, download request template\n\n### CCPA (California, USA)\n**Applies if**: You live in California OR use Californian company's services\n**Penalties**: Up to $100 per violation\n**Similar to GDPR** but slightly different rules\n\n### How to exercise your rights\n1. Generate request with Beethoven (GDPR Generator)\n2. Send certified mail to privacy@company.com\n3. Save evidence (email screenshot)\n4. Wait 30 days - must respond\n5. If no response: Report to your regulator"
        }
      ]
    },
    {
      title: "Browser & Tracking",
      articles: [
        {
          id: "browser-security",
          title: "Browser Security",
          content: "### Common threats\n\n**1. Tracking Cookies**\n- Files websites store in your browser\n- Third parties (Google, Meta) see ALL your activity\n- Example: Search \"leather boots\" on Google → See ads on Instagram, Amazon, Twitter\n\n**2. Canvas Fingerprinting**\n- Websites draw invisible things to identify you\n- Works even in private mode\n- Impossible to detect\n- Who does it: Google, Meta, Cloudflare (almost everyone)\n\n**3. WebRTC Leaks**\n- Even with VPN, your real IP can leak\n- Protocol for video calls reveals your location\n- Beethoven detects this\n\n### How to protect yourself\n\n**Level 1 - Basic (30 minutes)**:\n1. Install **Firefox**: mozilla.org/firefox\n2. Install **uBlock Origin** addon\n3. Firefox → Settings → Always use private mode\n4. Done.\n\n**Level 2 - Intermediate (1 day)**:\n1. Everything above +\n2. Install **Privacy Badger** (EFF)\n3. Clear cookies weekly\n4. Firefox → Settings → Tracking → \"Strict\"\n\n**Level 3 - Advanced (1 week)**:\n1. Everything above +\n2. Use **Firefox Containers** (separate cookies per site)\n3. Disable JavaScript on untrusted sites\n4. Install **HTTPS Everywhere**\n5. Install **LocalCDN** (block Google scripts)\n\n**Level 4 - Expert**:\n1. Everything above +\n2. Switch to **DuckDuckGo** or **Searx** (no tracking search)\n3. Switch to **Proton Mail** or **Tutanota** (encrypted email)\n4. Use **Tor Browser** for sensitive searches"
        },
        {
          id: "vpn-tor",
          title: "VPN vs Tor",
          content: "### VPN (Virtual Private Network)\n\n**What is it?** Encrypted tunnel that hides your activity. All traffic goes through VPN servers before reaching the internet.\n\n**Pros**:\n- Fast (50-100 Mbps typical)\n- Easy to install (1 click)\n- Hides your IP\n- Access geo-blocked content\n\n**Cons**:\n- VPN provider SEES you (logs may exist)\n- Free VPNs = usually spyware\n- Some sites block VPNs (Netflix, banks)\n- False sense of security\n\n**Truth**: A VPN is only as secure as you trust the provider.\n\n**Recommended**:\n- **Mullvad**: Free, verified no-logs, auditable\n- **ProtonVPN**: Switzerland, no-logs, $5/month\n- **AVOID**: ExpressVPN, NordVPN, any free VPN\n\n### Tor Browser\n\n**What is it?** Browser that routes traffic through 3 random nodes. Impossible to trace.\n\n**Pros**:\n- REAL anonymity (not theoretical)\n- Access to .onion (deep web)\n- FREE\n- Even governments can't trace you\n\n**Cons**:\n- VERY slow (5-20 seconds per page)\n- Using Tor in Russia = problems\n- Netflix/Amazon don't work well\n- Sites can detect you're using Tor\n\n**When to use Tor**:\n- You're a journalist investigating corruption\n- You live in oppressive country (China, Iran, Russia)\n- You're researching political dissidence\n- **NOT** for illegal torrents\n\n### The truth\n**Nothing is perfect**:\n- Cookies still track you on Tor\n- Canvas fingerprinting still works on Tor\n- If you login to Facebook on Tor, they know it's you\n\n**Golden rule**: \n- VPN for privacy from ISP\n- Tor for true anonymity\n- Firefox + uBlock for daily browsing\n- All three together = paranoid but secure"
        }
      ]
    },
    {
      title: "Passwords & Authentication",
      articles: [
        {
          id: "password-security",
          title: "Strong Passwords",
          content: "### The reality of passwords\n81% of breaches use weak or reused passwords.\n\n**Scary stats**:\n- Average password cracked in 2.24 HOURS\n- 23% of users reuse SAME password everywhere\n- If LinkedIn gets hacked, attackers try password on: Facebook, Gmail, Netflix, Bank...\n\n### How to create secure passwords\n\n**Minimum 16 characters**:\n- 8 chars = 2 hours to crack\n- 12 chars = 200 years\n- 16 chars = 200 MILLION years\n\n**Mix types** (UPPERCASE, lowercase, numbers, symbols):\n- Bad example: \"Juan1985!\" (personal info, predictable)\n- Good example: \"7mK$x2vQpN#8R9wLj\" (random, 17 chars, uncrackable)\n\n**Unique for each site**: If Netflix is hacked, your Netflix password = useless for other sites\n\n**No personal info**: No birthdays, pet names, favorite movies\n\n### The golden rule: PASSWORD MANAGER\n\n**Bitwarden** (FREE, RECOMMENDED):\n- Open source\n- Audited 2022\n- Sync across devices\n- Only memorize 1 master password\n- Generate random for every site\n- bitwarden.com\n\n**How it works**:\n1. Choose ONE strong master password (\"Beethoven7#RockMinecraft!2024\")\n2. Manager generates 200 random unique passwords for each site\n3. Only need to remember ONE\n4. Manager auto-fills sites\n\n**Benefit**: If LinkedIn hacked:\n- Your LinkedIn password: Random, 20 chars, unique\n- Doesn't affect Gmail, Netflix, Bank\n- Attackers get useless password"
        },
        {
          id: "2fa-security",
          title: "Two-Factor Authentication (2FA)",
          content: "### What is 2FA?\nSomething you know (password) + something you have (phone, app, physical key).\n\n**Principle**: Even if attackers steal your password, they can't enter without the second factor.\n\n### Types of 2FA (best to worst)\n\n**1. FIDO2 Security Keys (Fort Knox level)**\n- Example: YubiKey, Titan Security Key\n- Insert USB key, press button, done\n- Impossible to hack (offline)\n- Cost: $40-60\n- Recommendation: Everyone should have one\n\n**2. Authenticator Apps (Very good)**\n- Examples: Authy, Google Authenticator, Microsoft Authenticator\n- App generates code every 30 seconds\n- Free, no internet needed\n- If lose phone: save recovery codes\n- Best option: Authy or Aegis\n\n**3. SMS (Avoid if possible)**\n- Problem: SIM swapping\n  - Attacker calls phone company\n  - Transfers your number to their SIM\n  - Receives your SMS 2FA codes\n  - Accesses your account\n- 1 in 50 attacks uses SIM swapping\n\n**4. Email (Better than nothing)**\n- Receive link to confirm\n- Problem: If email is hacked, you lose access\n\n### When to enable 2FA\n\n**CRITICAL (Today)**:\n- Email, Banking, Work\n\n**IMPORTANT (This week)**:\n- Social media, Cloud storage, Password manager\n\n**GOOD (This month)**:\n- Netflix, Amazon, Spotify\n\n### Step-by-step (Gmail example)\n\n1. Visit myaccount.google.com\n2. Menu → Security\n3. \"Two-Step Verification\"\n4. Choose \"Authenticator app\"\n5. Download Authy\n6. Scan QR code\n7. **SAVE recovery codes** (critical!)\n8. Done\n\n### Recovery codes - CRITICAL\n\n- Google gives 10 codes when you enable 2FA\n- Use if you lose phone\n- **Where to store**:\n  - Password manager (Bitwarden)\n  - Physical paper in safe\n  - NOT phone notes\n- Without codes = PERMANENTLY LOCKED OUT\n\n### The truth\n**ENABLE 2FA EVERYWHERE. It's 5 seconds inconvenient, YEARS secure.**"
        }
      ]
    },
    {
      title: "Networks & Connectivity",
      articles: [
        {
          id: "wifi-security",
          title: "Safe Wi-Fi",
          content: "### Threats on public networks\n\n**1. MITM Attacks (Man-in-the-Middle)**\n- Attacker sits between you and internet\n- Reads: emails, passwords, messages\n- Cafe with \"Free_Airport\" WiFi controlled by attacker\n- Protection: VPN + HTTPS\n\n**2. Fake Networks (Evil Twin)**\n- \"Starbucks_WiFi\" is actually fake\n- Attacker replicates real network\n- Protection: Ask staff the EXACT network name\n\n**3. Packet Sniffing**\n- Programs like Wireshark capture all your traffic\n- In 5 minutes on public WiFi, attacker can steal:\n  - Passwords\n  - Credit card data\n  - Session tokens\n\n### How to protect yourself\n\n**1. NEVER use public WiFi without VPN**:\n- Install Mullvad VPN (free)\n- Enable VPN BEFORE connecting to WiFi\n- VPN first, internet second (always)\n\n**2. Verify network name**:\n- Ask: \"What is exactly the WiFi name?\"\n- Don't trust similar-looking names\n\n**3. Always use HTTPS**:\n- 🔒 padlock = encrypted\n- No padlock = attacker can read everything\n\n**4. Disable auto-connect**:\n- Phone: Settings → WiFi → OFF auto-connect\n- Prevents connection to malicious networks\n\n**5. Personal hotspot**:\n- Your own mobile network safer than public WiFi\n- Slower but infinitely more secure\n\n### At home\n\n**IMMEDIATELY - Change router password**:\n- Router default: admin / admin or 12345\n- Access 192.168.1.1 in browser\n- Change to strong password\n- If not changed: neighbors can enter\n\n**Encryption**:\n- Old: WEP (DON'T USE, crackable in 5 minutes)\n- Normal: WPA2 (secure)\n- New: WPA3 (better if available)\n\n**Hiding SSID is a myth**:\n- Belief: Hide WiFi name = more secure\n- Reality: Attackers find it easily\n- Better: Normal name + strong password\n\n**Bonus - Change WiFi channel**:\n- Channels 1, 6, 13 (don't overlap)\n- Reduces interference, improves speed"
        },
        {
          id: "mobile-security",
          title: "Mobile Security",
          content: "### Risks on mobile\n\n**1. Location constantly tracked**\n- Google stores EVERY place you've been\n- See: Google → \"My Activity\" → Location history\n- Knows: where you work, sleep, eat, love\n- 95% of users have location ON without knowing\n\n**2. Excessive app permissions**\n- TikTok requests: camera, microphone, contacts, photos\n- Instagram accesses mic to listen to TV (knows what you watch)\n\n**3. Unencrypted backups**\n- Google Drive/iCloud saves EVERYTHING\n- Photos, messages, emails: ALL in cloud\n\n**4. Google knows complete history**\n- Searches\n- Videos watched\n- Apps used\n- Locations\n- Can view: myaccount.google.com/data-and-privacy\n\n### Immediate actions\n\n**1. Disable location**:\n- Android: Settings → Location → OFF\n- iPhone: Settings → Privacy → Location → OFF\n- Apps needing location (Uber, Maps) ask when used\n- Battery +10% improvement\n\n**2. Review app permissions**:\n- Android: Settings → Apps → [App] → Permissions\n- iPhone: Settings → Privacy → [Permission]\n- Questions: Does Flashlight need contacts? Does TikTok need mic always?\n- If no reason: Reject permission\n\n**3. Disable auto-connect**:\n- Android: Settings → WiFi → OFF auto-connect\n- Prevents connection to malicious networks\n\n**4. Delete Google data**:\n- myaccount.google.com/data-and-privacy\n- \"Download data\" → See everything Google knows\n- \"Clear activity\" → Delete history\n- \"Manage activity\" → Disable saving location, searches\n\n**5. Update always**:\n- Android: Settings → System → System Update\n- iPhone: Settings → General → Software Update\n- Patches critical vulnerabilities\n\n**6. Disable Bluetooth when not using**:\n- Short range but can be attacked\n- Only enable when needed\n\n### Radical alternatives\n\n**GrapheneOS** (Android without Google):\n- Sandbox for each app\n- Per-use permissions (camera = ONE session)\n- Compatible with Pixel 6+ only\n- grapheneos.org\n\n**CalyxOS**:\n- Android without Google\n- More compatible than GrapheneOS\n- calyxos.org\n\n**iPhones**:\n- Better privacy than Android by default\n- Apple doesn't sell data (hardware sales model)\n- Tradeoff: Less freedom, more control"
        }
      ]
    },
    {
      title: "Malware & Threats",
      articles: [
        {
          id: "malware-types",
          title: "Types of Malware",
          content: "### The 6 main enemies\n\n**1. Virus**\n- Replicates, infects files\n- Example: Download .exe, infects System32\n- Impact: Slow performance, permanent errors\n- Protection: Antivirus + don't download executables\n\n**2. Trojan**\n- Disguises as legitimate software\n- Example: \"Flash Player\" download = malware\n- Impact: Complete PC access\n- Protection: Download ONLY from official sites\n\n**3. Ransomware (Most dangerous)**\n- Encrypts all your files, demands payment\n- Example: \"Pay $500 Bitcoin or lose photos\"\n- Stat: 1 in 150 emails contains ransomware\n- Average recovery cost: $1.5 MILLION\n- Protection: External backup + don't download from strangers\n\n**4. Spyware**\n- Spies silently\n- Steals: passwords, emails, credit cards\n- Example: Keylogger records keystrokes\n- Impact: Total financial compromise\n- Protection: Antivirus + don't install from unknown sources\n\n**5. Adware**\n- Shows invasive ads\n- Redirects searches to malicious sites\n- Less dangerous than others\n- Example: Search Google → \"yoursearch.xyz\"\n- Protection: uBlock Origin + don't download from torrents\n\n**6. Worms**\n- Spreads WITHOUT you clicking anything\n- Example: Enters via WiFi vulnerability\n- Impact: Massive infection\n- Protection: Firewall + security updates\n\n### Signs of infection\n\n**Level 1 - Probable malware**:\n- Browser slow but internet fast\n- Search engine changed without permission\n- New toolbar appeared\n\n**Level 2 - Definitely infected**:\n- Constant pop-ups (no websites open)\n- PC slow even with nothing running\n- Hard drive constantly active (constant sound)\n- Windows opening you didn't open\n\n**Level 3 - Critical infection**:\n- Files disappearing or renamed\n- Money missing from account\n- Email accounts hacked\n- Password doesn't work but you didn't change it\n\n### What to do if infected\n\n**IMMEDIATELY**:\n1. Disconnect from internet (unplug Ethernet/turn off WiFi)\n2. DON'T login to email/banking from infected PC\n3. Restart in Safe Mode\n\n**DIAGNOSE**:\n1. Download **Malwarebytes** on USB from another PC\n2. Run full scan\n3. If malware found: Quarantine\n4. Restart\n\n**AFTER**:\n1. Additional scan with Windows Defender\n2. **Change ALL passwords** (from different device)\n3. Check: myaccount.google.com (verify sessions)\n4. Consider: Reinstall Windows if severe"
        },
        {
          id: "phishing-protection",
          title: "Phishing Protection",
          content: "### What is phishing?\nFake emails/websites pretending to be legitimate to steal data or money.\n\n**Scary stats**:\n- 3.4 TRILLION phishing emails sent ANNUALLY\n- 1 in 4 users clicks phishing\n- 90% of data breaches START with phishing\n- CEO is most frequent target\n\n### Types of phishing\n\n**Email Phishing**:\n- \"Your account compromised. Click NOW\"\n- \"Amazon: Verify account or it closes\"\n- \"IRS: You owe taxes\"\n\n**Spear Phishing**:\n- Attacker researches YOU specifically\n- Email looks from your boss: \"John, do this urgently\"\n- 66% success rate\n\n**Smishing (SMS)**:\n- \"Amazon: Confirm $500 purchase: [fake link]\"\n- SMS LESS secure than email\n\n**Vishing (Phone)**:\n- Call: \"I'm from bank, confirm your PIN\"\n- Banks NEVER ask PIN by phone\n\n### How to identify phishing\n\n**RED FLAG #1 - Artificial urgency**:\n- \"ACT NOW or account closes\"\n- \"Authorize in 24 hours or lose access\"\n- Real companies don't use pressure\n\n**RED FLAG #2 - Suspicious links**:\n- Hover over link (don't click)\n- See REAL URL at bottom\n- ✗ paypa1-security.verify.com (NOT paypal.com)\n- ✗ amazon-signin.redirects.com (NOT amazon.com)\n- ✓ paypal.com (correct)\n\n**RED FLAG #3 - Grammar errors**:\n- \"Dear costumer, your accout have been compromized\"\n- Big companies proofread\n- Errors = 99% phishing\n\n**RED FLAG #4 - Request password**:\n- \"Click to enter password\"\n- \"Confirm your PIN\"\n- **RULE**: Real companies NEVER ask password by email\n\n**RED FLAG #5 - Strange sender**:\n- security@paypa1.com (typo: paypa1 not paypal)\n- support@amaz0n.com (zero not letter O)\n- noreply@bankofamerica.verify.secure.com (too many subdomains)\n- Check sender email FULLY\n\n**RED FLAG #6 - File attachment**:\n- .exe = NEVER download\n- .zip with .exe inside\n- Word with macros\n- Real companies don't send executables\n\n### How to protect yourself\n\n**1. Verify URLs manually**:\n- DON'T click email links\n- Open browser\n- Type address (amazon.com)\n- Login\n- Check alert in safe environment\n\n**2. Call company directly**:\n- Email: \"Bank found fraud\"\n- DON'T call number in email\n- Search: \"[Bank] official number\" on Google\n- Call THAT number\n- Company confirms if real\n\n**3. Use 2FA**:\n- Even with stolen password\n- Can't enter without 2FA code\n- **THIS SAVES YOUR ACCOUNT**\n\n**4. Verify multiple channels**:\n- Email: \"Act urgently\"\n- Call company directly\n- If real: they confirm\n- If phishing: \"We didn't send that\"\n\n**5. Report phishing**:\n- Gmail: Report as phishing (up arrow → Phishing)\n- Company: Forward to security@company.com\n- Helps others\n\n### Can you spot these?\n\n1. \"Netflix\" email with urgent payment → PHISHING\n2. Amazon email from amazon.com, no urgency, no links → LEGIT\n3. Facebook pop-up in email → PHISHING (never happens)\n4. SMS from bank asking PIN → PHISHING (banks never ask)"
        }
      ]
    },
    {
      title: "Encryption & Cryptography",
      articles: [
        {
          id: "encryption-basics",
          title: "Encryption Basics",
          content: "### What is encryption?\n\nEncryption converts readable data (plaintext) into unreadable code (ciphertext) using mathematical algorithms.\n\n**Types of Encryption**:\n\n**1. Symmetric Encryption (AES-256)**\n- Same key to encrypt AND decrypt\n- Example: Lock with same key\n- Speed: FAST\n- Use: File storage, messages\n- If key stolen: GAME OVER\n\n**2. Asymmetric Encryption (RSA)**\n- Public key (everyone has) to encrypt\n- Private key (only you have) to decrypt\n- Example: Mailbox (anyone can mail, only you open)\n- Speed: SLOW\n- Use: Email (PGP), HTTPS\n- Safer than symmetric\n\n**3. End-to-End Encryption (E2E)**\n- Only sender and receiver can read\n- Example: Signal, WhatsApp\n- Even company can't read\n- IDEAL for privacy\n\n### How Beethoven uses encryption\n\n**File Vault**: AES-256 locally\n- Your files never leave device\n- Encrypted with YOUR password\n- Download encrypted file\n- Only you can decrypt\n\n**Secure Messages**: AES-GCM\n- Encrypts text locally\n- Share ciphertext anywhere\n- Recipient needs password\n- Nobody can read without password\n\n### Breaking encryption: How hard?\n\n**AES-256**: 2^256 possible keys\n- Current supercomputers: 10 billion years\n- Quantum computers: Maybe 10 years (theoretical)\n- Verdict: SAFE for decades\n\n**RSA-2048**: Similar to AES-256\n- Current: Safe\n- Quantum: At risk (need RSA-4096)\n\n**Passwords**: Your weakest link\n- If password = \"password\": Cracks instantly\n- If password = 20 random chars: Unbreakable\n- Beethoven password generator: Generate strong ones"
        },
        {
          id: "incident-response",
          title: "If You're Hacked: Incident Response",
          content: "### You suspect a hack. What now?\n\n**Immediate Actions (First 1 hour)**:\n\n1. **Stay calm** - panic = mistakes\n2. **Disconnect** - unplug from WiFi/internet\n3. **Document** - screenshot everything weird\n4. **Don't touch** - don't log into anything yet\n5. **Call authorities** - if financial fraud involved\n\n**First 24 Hours**:\n\n1. **Audit from different device** (phone, laptop, friend's PC):\n   - Check bank accounts for unauthorized transactions\n   - Check email for \"password reset\" requests\n   - Check social media for changes\n   - Check cloud storage for new files\n\n2. **Change passwords** (from SAFE device):\n   - Email (most critical)\n   - Banking\n   - Social media\n   - Password manager\n   - Anything sensitive\n\n3. **Alert your bank**:\n   - Call using number on back of card (NOT email link)\n   - Freeze accounts if needed\n   - Flag fraudulent charges\n   - Request replacement card\n\n4. **Credit freeze** (if financial data breached):\n   - Freeze at: Equifax, Experian, TransUnion\n   - Prevents identity theft\n   - Takes 10 minutes per agency\n   - Free\n\n**Next Week**:\n\n1. **Check infected device for malware**:\n   - Download Malwarebytes on USB from safe device\n   - Boot infected PC in Safe Mode\n   - Run full scan\n   - Remove threats\n   - Scan with Windows Defender too\n\n2. **Enable 2FA everywhere**:\n   - Email (URGENT)\n   - Banking\n   - Social media\n   - All important accounts\n\n3. **Monitor credit reports**:\n   - Get free reports at annualcreditreport.com\n   - Look for accounts you didn't open\n   - Dispute immediately if found\n\n4. **Consider reinstalling OS**:\n   - If serious malware: Backup files, wipe drive, reinstall Windows/Mac\n   - Only foolproof way to remove deep malware\n\n**Long-term**:\n\n- Use password manager (Bitwarden)\n- Check haveibeenpwned.com monthly\n- Enable notifications on bank accounts\n- Review privacy settings quarterly\n- Keep backups (external drive)"
        }
      ]
    },
    {
      title: "How to Use Beethoven Tools",
      articles: [
        {
          id: "using-analyzer",
          title: "Privacy Analyzer: Complete Guide",
          content: "### What it does\n\nScans your browser's security in real-time. Shows what's protected, what's vulnerable.\n\n### The 8 Metrics Explained\n\n**1. HTTPS Encryption** (🔒 Most Important)\n- Shows: HTTPS lock on websites\n- Meaning: Connection is encrypted\n- Good: Green = Secure\n- Bad: Red = Site unencrypted\n- Action: NEVER enter passwords on red sites\n\n**2. Tracking Protection**\n- Shows: Do Not Track signal enabled\n- Meaning: Tells websites \"please don't track me\"\n- Good: Green = DNT enabled\n- Bad: Red = DNT disabled\n- Action: Firefox Settings → Privacy → \"Strict\"\n\n**3. Fingerprinting Resistance**\n- Shows: Can websites identify you by graphics?\n- Good: Green = Resistant\n- Bad: Red = Vulnerable\n- Action: Use Firefox + Privacy Badger\n\n**4. WebRTC Leak**\n- Shows: Does your REAL IP leak through WebRTC?\n- Good: Green = IP Hidden\n- Bad: Red = IP Exposed (even with VPN)\n- Action: If red with VPN: Enable WebRTC leak protection in Firefox\n\n**5. Ad Blocker**\n- Shows: Is an ad blocker active?\n- Good: Green = uBlock Origin detected\n- Bad: Red = No blocker\n- Action: Install uBlock Origin NOW\n\n**6. Battery API**\n- Shows: Can websites see your device battery %?\n- Good: Green = Hidden\n- Bad: Red = Exposed\n- Impact: Low risk, but helps fingerprinting\n\n**7. CPU Cores**\n- Shows: Websites see your CPU core count\n- Good: Green = Hidden\n- Bad: Red = Exposed\n- Impact: Helps create fingerprint\n\n**8. Device Memory**\n- Shows: Websites see your RAM\n- Good: Green = Hidden\n- Bad: Red = Exposed\n- Impact: Helps create fingerprint\n\n### Understanding Your Score\n\n**A (90-100%)**: Excellent\n- You've done everything right\n- Keep it up\n\n**B (80-89%)**: Good\n- Most protections enabled\n- 1-2 improvements possible\n\n**C (70-79%)**: Fair\n- Some protections missing\n- Do the action steps above\n\n**D (60-69%)**: Weak\n- Major gaps in protection\n- Install uBlock Origin immediately\n\n**F (Below 60%)**: Critical\n- You're exposed\n- Read \"Browser Security\" guide\n- Make changes NOW\n\n### How to improve\n\n1. Install Firefox (if not already)\n2. Install uBlock Origin addon\n3. Firefox → Settings → Privacy → \"Strict\" tracking\n4. Firefox → Settings → Enable DNT\n5. Check analyzer again\n6. Score should jump to A/B"
        },
        {
          id: "using-password-tools",
          title: "Password Tools: Generator & Auditor",
          content: "### Password Generator\n\n**What it does**: Creates random, unbreakable passwords\n\n**How to use**:\n1. Choose length (default 16 = good)\n2. Choose types: UPPER, lower, 123, !@#\n3. Click \"Generate\"\n4. Copy password\n5. Store in Bitwarden\n6. Paste into website\n\n**Pro tips**:\n- Minimum 16 characters\n- Always use symbols (!@#$%)\n- Generate NEW password for each site\n- NEVER reuse passwords\n- Never memorize passwords\n\n**Example strong password**:\n`7mK$x2vQpN#8R9wLj`\n- 17 characters ✓\n- Mix of ALL types ✓\n- No pattern ✓\n- Can't guess ✓\n\n### Password Auditor\n\n**What it does**: Tests password strength, checks if leaked\n\n**How to use**:\n1. Type password (stays on YOUR device)\n2. Click \"Check\"\n3. See:\n   - Strength (Weak/Medium/Strong/Excellent)\n   - Crack time (seconds/years)\n   - Leak status (safe/compromised)\n   - Patterns detected\n\n**Reading the results**:\n\n**Strength Levels**:\n- Weak = <8 hours to crack\n- Medium = 1-100 years\n- Strong = 1,000+ years\n- Excellent = 1 MILLION+ years\n\n**Crack Time Scenarios**:\n- Laptop: Average consumer PC\n- GPU Farm: 1000 computers together\n- Supercomputer: Theoretical maximum\n\n**If password found in breach**:\n- Don't panic\n- Change password IMMEDIATELY\n- Use generator to create new one\n- Check all sites using that password\n- Enable 2FA on that account\n\n**If password is weak**:\n- Use generator to create strong one\n- Replace weak password immediately\n- Check all passwords annually"
        },
        {
          id: "using-image-lab",
          title: "Image Lab: Remove Metadata",
          content: "### What metadata is\n\nHidden info IN your photos:\n- GPS location (WHERE you were)\n- Camera model (WHAT you use)\n- Date/time (WHEN taken)\n- Software used (editing tools)\n\n### Why remove it\n\n**Privacy risks**:\n- Someone sees photo → finds exact location\n- Burglars see when you're not home\n- Stalkers find your patterns\n- Employers see personal activities\n\n### How to use\n\n**Step 1**: Drag photo into Image Lab\n**Step 2**: Click \"Analyze\"\n**Step 3**: See what's revealed:\n- GPS coordinates\n- Camera info\n- Date\n**Step 4**: Click \"Clean Image\"\n**Step 5**: Download cleaned image\n**Step 6**: Share cleaned version (NOT original)\n\n### What happens\n\n- Original stays on YOUR device\n- Cleaned copy generated\n- All metadata removed\n- Image quality: SAME\n- File size: Slightly smaller\n\n### Pro tips\n\n1. **Before uploading ANYWHERE**: Clean first\n2. **Social media**: Always clean before posting\n3. **Dating apps**: Clean photos (privacy!)\n4. **Professional sites**: Clean before uploading\n5. **Remember**: Everyone sees the CLEANED version\n\n### What's removed\n- GPS location ✓\n- Camera model ✓\n- Date/time ✓\n- Software ✓\n- All EXIF data ✓\n\n### What stays\n- Photo quality ✓\n- Colors ✓\n- Resolution ✓\n- Actual image ✓"
        }
      ]
    }]
  },
  recs: {
    android: { title: "De-google your Android", desc: "Consider using custom ROMs or disabling unnecessary services." },
    updates: { title: "Update your Software" },
    passwords: { title: "Improve your Passwords" },
    generic: { title: "General Review", desc: "There are several basic aspects you could improve." }
  }
};

export const translations = { es, en };

export const LANGUAGES = [
  { code: 'es', name: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' }
] as const;