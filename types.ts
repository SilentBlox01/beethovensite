

export type Platform = 'android' | 'ios' | 'windows' | 'macos' | 'linux';
export type Browser = 'chrome' | 'firefox' | 'safari' | 'edge' | 'brave' | 'tor' | 'other';
export type SearchEngine = 'google' | 'bing' | 'duckduckgo' | 'startpage' | 'kagi';
export type EmailProvider = 'gmail' | 'outlook' | 'yahoo' | 'proton' | 'tutanota' | 'icloud' | 'other';
export type Social = 'facebook' | 'instagram' | 'tiktok' | 'twitter' | 'linkedin' | 'reddit' | 'none';
export type Risk = 'wifi' | 'password-reuse' | 'location' | 'bluetooth' | 'public-charging' | 'none';
export type MessagingApp = 'whatsapp' | 'telegram' | 'signal' | 'messenger' | 'sms' | 'imessage' | 'none';
export type CloudService = 'google-drive' | 'icloud' | 'onedrive' | 'dropbox' | 'nextcloud' | 'none';
export type IotDevice = 'alexa' | 'google-home' | 'ring' | 'smart-tv' | 'none';
export type DefenseTool = 'password-manager' | 'vpn' | '2fa-app' | 'adblocker' | 'antivirus' | 'privacy-screen' | 'none';
export type UpdateHabit = 'automatic' | 'manual-soon' | 'manual-late' | 'never';
export type BackupHabit = 'cloud-auto' | 'external-drive' | 'both' | 'none';
export type TwoFactorMethod = 'app' | 'sms' | 'email' | 'hardware-key' | 'none';
export type PhishingHabit = 'check-url' | 'open-everything' | 'check-sender';

export type ThemeColor = 'teal' | 'blue' | 'violet' | 'rose' | 'amber' | 'cyan' | 'indigo' | 'emerald' | 'fuchsia' | 'orange';
export type Language = 'es' | 'en';

export interface UserProfile {
  platforms: Platform[];
  updateHabit: UpdateHabit;
  browsers: Browser[];
  searchEngines: SearchEngine[];
  emailProviders: EmailProvider[];
  socials: Social[];
  messaging: MessagingApp[];
  cloud: CloudService[];
  iot: IotDevice[];
  risks: Risk[];
  passwordHabit: 'unique' | 'mostly-unique' | 'reused';
  twoFactor: TwoFactorMethod;
  phishing: PhishingHabit;
  backup: BackupHabit;
  defense: DefenseTool[];
  score: number;
  completed: boolean;
}

export interface Recommendation {
  id: string;
  category: string;
  title: string;
  description: string;
  impact: 'Alto' | 'Medio' | 'Bajo' | 'Crítico' | 'High' | 'Medium' | 'Low' | 'Critical';
  actionUrl?: string;
}

export interface DocArticle {
  id: string;
  title: string;
  content: string;
}

export interface DocSection {
  title: string;
  articles: DocArticle[];
}

export interface HubApp {
    id: string;
    name: string;
    description: string;
    replaces: string;
    category: 'browser' | 'email' | 'messaging' | 'cloud' | 'search' | 'os' | 'vpn' | 'password-manager' | 'dns' | 'store' | 'productivity' | 'utilities' | 'social' | 'maps' | 'media';
    icon: string;
    url: string;
    badge?: 'Open Source' | 'Encrypted' | 'Decentralized' | 'P2P' | 'Self-Hosted' | 'Privacy' | 'Offline' | 'No Logs' | 'Free Tier' | 'Hardened' | 'Security' | 'Amnesic' | 'User Friendly' | 'Filter' | 'FOSS' | 'Anonymous' | 'Encryption' | 'Network';
    pricing: 'Free' | 'Freemium' | 'Paid';
}

export interface PhishingScenario {
    id: number;
    type: 'email' | 'wifi' | 'password' | 'sms';
    isSafe: boolean;
    // Email/SMS specific
    subject?: string;
    sender?: string;
    body?: string;
    // Wifi specific
    networkName?: string;
    security?: string;
    // Password specific
    url?: string;
    
    explanation: string;
}

export interface LegalContent {
  title: string;
  lastUpdated: string;
  sections: { heading: string; content: string; list?: string[] }[];
}

export interface HardeningItem {
    id: string;
    title: string;
    description: string;
    impact: 'High' | 'Medium' | 'Low' | 'Alto' | 'Medio' | 'Bajo';
}

export interface Translation {
  common: {
    appName: string;
    tagline: string;
    start: string;
    next: string;
    back: string;
    close: string;
    loading: string;
    error: string;
    viewGuide: string;
    seeMore: string;
    free: string;
    openSource: string;
    all: string;
  };
  nav: {
    home: string;
    tools: string;
    assessment: string;
    hub: string;
    docs: string;
    faq: string;
    about: string;
    theme: string;
    legal: string;
    terms: string;
    privacy: string;
    stories: string;
    ai?: string;
    hardening: string;
    tempMail: string;
  };
  inspector: {
      enable: string;
      disable: string;
      title: string;
      select: string;
      props: string;
      computed: string;
      tag: string;
      class: string;
      dimensions: string;
      color: string;
      font: string;
      spacing: string;
  };
  analyzer: {
      title: string;
      subtitle: string;
      analyzing: string;
      score: string;
      grade: {
          a: string;
          b: string;
          c: string;
          d: string;
          f: string;
      };
      metrics: {
          https: string;
          httpsDesc: string;
          tracking: string;
          trackingDesc: string;
          fingerprint: string;
          fingerprintDesc: string;
          webrtc: string;
          webrtcDesc: string;
          adblock: string;
          adblockDesc: string;
          battery: string;
          batteryDesc: string;
          hardware: string;
          hardwareDesc: string;
          memory: string;
          memoryDesc: string;
      };
      status: {
          protected: string;
          vulnerable: string;
          warning: string;
          detected: string;
          hidden: string;
      };
      cta: string;
      details: {
          title: string;
          userAgent: string;
          screen: string;
          timezone: string;
          language: string;
          platform: string;
          webgl: string;
          canvas: string;
          audio: string;
          fonts: string;
      };
  };
  stories: {
      heroTitle: string;
      heroSubtitle: string;
      nameTitle: string;
      nameDesc: string;
      stormTitle: string;
      stormDesc: string;
      missionTitle: string;
      missionDesc: string;
      visionTitle: string;
      visionDesc: string;
      values: {
          title: string;
          items: {
              title: string;
              desc: string;
              icon: 'heart' | 'shield' | 'code';
          }[];
      };
  };
  about: {
      title: string;
      subtitle: string;
      missionTitle: string;
      missionP1: string;
      missionP2: string;
      pillars: {
          privacy: { title: string, desc: string };
          opensource: { title: string, desc: string };
          free: { title: string, desc: string };
          education: { title: string, desc: string };
      };
      ctaTitle: string;
      ctaDesc: string;
      ctaHome: string;
      ctaGit: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    heroDesc: string;
    ctaCheck: string;
    ctaGuides: string;
    ctaAnalyzer: string;
    featuresTitle: string;
    featuresDesc: string;
    featDiagnosis: string;
    featDiagnosisDesc: string;
    featTools: string;
    featToolsDesc: string;
    featHub: string;
    featHubDesc: string;
    featLab: string;
    featLabDesc: string;
    featPhishing: string;
    featPhishingDesc: string;
    trustTitle: string;
    trustNoTrackers: string;
    trustNoTrackersDesc: string;
    trustLocal: string;
    trustLocalDesc: string;
    trustOpen: string;
    trustOpenDesc: string;
    openSourceSectionTitle: string;
    openSourceSectionDesc: string;
    openSourceSectionBtn: string;
    mapLabel: string;
  };
  assessment: {
    title: string;
    subtitle: string;
    deviceStep: string;
    identityStep: string;
    securityStep: string;
    defenseStep: string;
    startBtn: string;
    phase1: string;
    phase2: string;
    phase3: string;
    phase4: string;
    phase5: string;
    viewReport: string;
    questions: {
      os: string;
      osDesc: string;
      updates: string;
      updatesDesc: string;
      backups: string;
      backupsDesc: string;
      browsers: string;
      browsersDesc: string;
      search: string;
      searchDesc: string;
      email: string;
      emailDesc: string;
      social: string;
      socialDesc: string;
      messaging: string;
      messagingDesc: string;
      cloud: string;
      cloudDesc: string;
      iot: string;
      iotDesc: string;
      passwords: string;
      passwordsDesc: string;
      twoFactor: string;
      twoFactorDesc: string;
      phishing: string;
      phishingDesc: string;
      risks: string;
      risksDesc: string;
      defense: string;
      defenseDesc: string;
    };
    options: {
      none: string;
      auto: string;
      manual: string;
      never: string;
      yes: string;
      no: string;
    };
    choices: {
        linuxOther: string;
        manualLate: string;
        backupBoth: string;
        backupCloud: string;
        backupDisk: string;
        browserOther: string;
        searchBing: string;
        emailGmail: string;
        emailOutlook: string;
        emailIcloud: string;
        emailProton: string;
        emailYahoo: string;
        msgSms: string;
        cloudDrive: string;
        iotAlexa: string;
        iotGoogle: string;
        iotRing: string;
        iotTv: string;
        passUnique: string;
        passUniqueDesc: string;
        passMostly: string;
        passMostlyDesc: string;
        passReused: string;
        passReusedDesc: string;
        twoFaApp: string;
        twoFaAppDesc: string;
        twoFaKey: string;
        twoFaKeyDesc: string;
        twoFaSms: string;
        twoFaSmsDesc: string;
        twoFaNone: string;
        twoFaNoneDesc: string;
        phishCheck: string;
        phishCheckDesc: string;
        phishLook: string;
        phishLookDesc: string;
        phishOpen: string;
        phishOpenDesc: string;
        riskWifi: string;
        riskWifiDesc: string;
        riskBlue: string;
        riskBlueDesc: string;
        riskLoc: string;
        riskLocDesc: string;
        riskUsb: string;
        riskUsbDesc: string;
        defPass: string;
        def2fa: string;
        defVpn: string;
        defAd: string;
        defScreen: string;
    }
  };
  results: {
    securityLevel: string;
    score: string;
    actionPlan: string;
    personalizedRecs: string;
    perfectTitle: string;
    perfectDesc: string;
    critical: string;
    suggestion: string;
    retest: string;
    areasToImprove: string;
    exportJsonBtn: string;
    exportReportBtn: string;
    reportTitle: string;
    reportGenerated: string;
    reportScore: string;
    reportRecommendations: string;
    categoryMobile: string;
    categoryBrowser: string;
    categoryNetworks: string;
    categoryPasswords: string;
    assessmentCompleted: string;
    labels: {
        excellent: string;
        improvable: string;
        vulnerable: string;
    }
  };
  tools: {
    title: string;
    subtitle: string;
    tabKeys: string;
    tabPrivacy: string;
    tabUtils: string;
    tabFiles: string; 
    tabRadar: string;
    tabSPS: string;
    tabIdentity: string;
    genTitle: string;
    genDesc: string;
    auditTitle: string;
    auditDesc: string;
    leaksTitle: string;
    leaksDesc: string;
    fingerprintTitle: string;
    fingerprintDesc: string;
    cleanerTitle: string;
    cleanerDesc: string;
    msgTitle: string;
    msgDesc: string;
    tokenTitle: string;
    tokenDesc: string;
    permissionsTitle: string;
    permissionsDesc: string;
    
    // UI Elements
    auditPlaceholder: string;
    genLength: string;
    radarStatusLabel: string;
    cleanUrlLabel: string;
    foundInBreaches: string;
    hardwareGenerated: string;
    compositeHashDesc: string;
    radarReady: string;

    copy: string;
    copied: string;
    regenerate: string;
    encrypt: string;
    decrypt: string;
    cleanUrl: string;
    check: string;
    analyze: string;
    weak: string;
    medium: string;
    strong: string;
    excellent: string;
    compromised: string;
    safetyScore: string;
    riskSafe: string;
    riskSuspicious: string;
    riskDangerous: string;
    analysis: string;
    unknown: string;
    time: {
        seconds: string;
        minutes: string;
        hours: string;
        days: string;
        years: string;
        centuries: string;
    };
    
    vaultTitle: string;
    vaultDesc: string;
    vaultDrop: string;
    vaultPassPlaceholder: string;
    vaultEncryptBtn: string;
    vaultDecryptBtn: string;
    vaultDownload: string;
    vaultError: string;

    stegTitle: string;
    stegDesc: string;
    stegHideTab: string;
    stegRevealTab: string;
    stegDrop: string;
    stegMessage: string;
    stegHideBtn: string;
    stegRevealBtn: string;
    stegDownload: string;
    stegHidden: string;
    stegNoHidden: string;

    socialTitle: string;
    socialDesc: string;

    entropyBits: string;
    crackTime: string;
    instant: string;
    
    crackScenarios: {
        laptop: string;
        rig: string;
        supercomputer: string;
    };
    
    patterns: {
        title: string;
        sequence: string;
        repeat: string;
        date: string;
        keyboard: string;
    };

    gdprTitle: string;
    gdprDesc: string;
    gdprCompany: string;
    gdprName: string;
    gdprEmail: string;
    gdprGenerate: string;
    gdprTemplate: string;

    qrTitle: string;
    qrDesc: string;
    qrWifi: string;
    qrText: string;
    qrSsid: string;
    qrPass: string;
    qrHidden: string;
    qrGenerate: string;

    webrtcTitle: string;
    webrtcDesc: string;
    webrtcLeak: string;
    webrtcSafe: string;
    webrtcCheck: string;

    checksumTitle: string;
    checksumDesc: string;
    checksumDrop: string;
    checksumHash: string;
    checksumCompare: string;
    checksumMatch: string;
    checksumMismatch: string;
    
    radarTitle: string;
    radarDesc: string;
    radarPlaceholder: string;
    radarButton: string;
    radarScanning: string;
    radarStatus: {
        safe: string;
        warning: string;
        critical: string;
    };
    radarMetrics: {
        latency: string;
        jitter: string;
        ssl: string;
        server: string;
        dns: string;
        network: string;
        ports: string;
        location: string;
    };
    radarLogs: string;

    spsTitle: string;
    spsDesc: string;
    spsScanBtn: string;
    spsRiskHigh: string;
    spsRiskMod: string;
    spsRiskLow: string;
    spsExposedApis: string;
    spsBrokers: string;
    spsBrokersDesc: string;
    spsNoiseTitle: string;
    spsNoiseDesc: string;
    spsNoiseBtn: string;

    cleanerPlaceholder: string;
    cleanerResults: string;
    cleanerRecursive: string;
    paramsRemoved: string;
    trackerFound: string;
    
    deviceInfo: {
        browser: string;
        os: string;
        deviceType: string;
        screen: string;
        battery: string;
        connection: string;
        mobile: string;
        desktop: string;
        uniqueId: string;
        gpu: string;
        timezone: string;
        canvas: string;
        audio: string;
        pixelRatio: string;
        bot: string;
        incognito: string;
        ip: string;
        location: string;
        isp: string;
        hdr: string;
        gamut: string;
        contrast: string;
        
        // New labels for detailed stats
        fontsLabel: string;
        hardwareLabel: string;
        cores: string;
        touchPoints: string;
        userAgent: string;
    };
    perms: {
        mic: string;
        location: string;
        notifications: string;
        camera: string;
    };
    msgPlaceholderEnc: string;
    msgPlaceholderDec: string;
    msgKeyPlaceholder: string;
    msgProcess: string;
    msgErrorKey: string;
    msgErrorInvalid: string;

    // Identity Generator
    idTitle: string;
    idDesc: string;
    idGenerate: string;
    idName: string;
    idAddress: string;
    idPhone: string;
    idEmail: string;
    idJob: string;
    idBirth: string;
    idUsername: string;
    idPassword: string;
    idCC: string;
  };
  hardening: {
      title: string;
      subtitle: string;
      windows: string;
      linux: string;
      macos: string;
      android: string;
      ios: string;
      progress: string;
      reset: string;
      completed: string;
      checklist: {
          windows: HardeningItem[];
          linux: HardeningItem[];
          macos: HardeningItem[];
          android: HardeningItem[];
          ios: HardeningItem[];
      };
  };
  tempMail: {
      title: string;
      subtitle: string;
      generate: string;
      copy: string;
      refresh: string;
      empty: string;
      inbox: string;
      sender: string;
      subject: string;
      date: string;
      loading: string;
      error: string;
  };
  hub: {
      title: string;
      subtitle: string;
      searchPlaceholder: string;
      replacesLabel: string;
      noAppsFound: string;
      clearFilters: string;
      cats: {
          browser: string;
          email: string;
          messaging: string;
          cloud: string;
          search: string;
          os: string;
          vpn: string;
          pass: string;
          dns: string;
          store: string;
          productivity: string;
          utilities: string;
          social: string;
          maps: string;
          media: string;
      };
      apps: HubApp[];
  };
  lab: {
      title: string;
      subtitle: string;
      dropzone: string;
      noMeta: string;
      metaFound: string;
      gpsFound: string;
      cleanBtn: string;
      downloadBtn: string;
      warning: string;
      analyzing: string;
      analyzeAnother: string;
      cleanGenerated: string;
      cleanDesc: string;
      original: string;
      meta: {
          camera: string;
          software: string;
          date: string;
      };
      report: {
          title: string;
          location: string;
          device: string;
          date: string;
          cleanFirst: string;
          viewMap: string;
      };
  };
  phishing: {
      title: string;
      subtitle: string;
      startGame: string;
      safe: string;
      unsafe: string;
      correct: string;
      wrong: string;
      completed: string;
      score: string;
      case: string;
      of: string;
      ui: {
          messages: string;
          networks: string;
          unsecured: string;
          encrypted: string;
          signin: string;
          username: string;
          password: string;
          login: string;
          today: string;
          viewDetails: string;
      };
      scenarios: PhishingScenario[];
  };
  legal: {
      terms: LegalContent;
      privacy: LegalContent;
  };
  docs: {
      title: string;
      subtitle: string;
      sections: DocSection[];
  };
  recs: {
      android: { title: string, desc: string };
      updates: { title: string };
      passwords: { title: string };
      generic: { title: string, desc: string };
  };
  faq: {
    title: string;
    subtitle: string;
    items: { question: string, answer: string, icon: string }[];
    contactTitle: string;
    contactBtn: string;
  };
}