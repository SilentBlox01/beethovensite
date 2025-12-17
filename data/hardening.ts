
import { Translation } from '../types';

export interface HardeningItem {
  id: string;
  title: { en: string; es: string };
  desc: { en: string; es: string };
  level: 'Basic' | 'Advanced' | 'Paranoid';
  platform: 'Windows' | 'macOS' | 'Linux' | 'Android' | 'iOS' | 'Browser';
}

export const hardeningGuides: HardeningItem[] = [
  {
    id: 'windows-basic',
    platform: 'Windows',
    level: 'Basic',
    title: { en: 'Disable Telemetry', es: 'Desactivar Telemetría' },
    desc: { en: 'Turn off "Optional Diagnostic Data" in Settings > Privacy.', es: 'Apaga "Datos de diagnóstico opcionales" en Configuración > Privacidad.' }
  },
  {
    id: 'windows-adv',
    platform: 'Windows',
    level: 'Advanced',
    title: { en: 'Enable BitLocker', es: 'Activar BitLocker' },
    desc: { en: 'Encrypt your drive to protect data from physical theft.', es: 'Cifra tu disco para proteger datos contra robo físico.' }
  },
  {
    id: 'browser-basic',
    platform: 'Browser',
    level: 'Basic',
    title: { en: 'Install uBlock Origin', es: 'Instalar uBlock Origin' },
    desc: { en: 'The most efficient wide-spectrum blocker. CPU and memory friendly.', es: 'El bloqueador de amplio espectro más eficiente.' }
  },
  {
    id: 'browser-adv',
    platform: 'Browser',
    level: 'Advanced',
    title: { en: 'Disable WebRTC', es: 'Desactivar WebRTC' },
    desc: { en: 'Prevent IP leaks. Use an extension or config flag.', es: 'Evita fugas de IP. Usa una extensión o flag de configuración.' }
  },
  {
    id: 'linux-basic',
    platform: 'Linux',
    level: 'Basic',
    title: { en: 'Update Regularly', es: 'Actualizar Regularmente' },
    desc: { en: 'Run sudo apt update && sudo apt upgrade daily.', es: 'Ejecuta sudo apt update && sudo apt upgrade diariamente.' }
  },
  {
    id: 'linux-adv',
    platform: 'Linux',
    level: 'Advanced',
    title: { en: 'Configure Firewall (UFW)', es: 'Configurar Firewall (UFW)' },
    desc: { en: 'sudo ufw enable && sudo ufw deny incoming', es: 'Habilita el firewall y deniega conexiones entrantes.' }
  },
  {
    id: 'macos-basic',
    platform: 'macOS',
    level: 'Basic',
    title: { en: 'Enable FileVault', es: 'Activar FileVault' },
    desc: { en: 'Full disk encryption for Mac.', es: 'Cifrado de disco completo para Mac.' }
  },
  {
    id: 'android-basic',
    platform: 'Android',
    level: 'Basic',
    title: { en: 'Remove Unused Apps', es: 'Eliminar Apps sin uso' },
    desc: { en: 'Reduce attack surface by uninstalling bloatware.', es: 'Reduce la superficie de ataque desinstalando bloatware.' }
  }
];
export interface HardeningItem {
    id: string;
    title: string;
    description: string;
    impact: 'High' | 'Medium' | 'Low';
}

export const hardeningGuides: Record<string, HardeningItem[]> = {
    windows: [
        { id: 'w1', title: 'Disable Telemetry', description: 'Go to Settings > Privacy > Diagnostics & feedback and set to "Basic".', impact: 'High' },
        { id: 'w2', title: 'Enable BitLocker', description: 'Encrypt your drive to protect data if stolen.', impact: 'High' },
        { id: 'w3', title: 'User Account Control (UAC)', description: 'Set UAC to "Always Notify".', impact: 'Medium' },
        { id: 'w4', title: 'Remove Bloatware', description: 'Uninstall unused pre-installed apps (Candy Crush, Xbox, etc).', impact: 'Low' },
        { id: 'w5', title: 'Private DNS', description: 'Configure DNS over HTTPS (DoH) in Settings > Network.', impact: 'Medium' },
        { id: 'w6', title: 'Disable Advertising ID', description: 'Settings > Privacy > General > Let apps use advertising ID -> OFF.', impact: 'Medium' },
        { id: 'w7', title: 'Clipboard History', description: 'Disable if not needed to avoid accidental leaks.', impact: 'Low' }
    ],
    linux: [
        { id: 'l1', title: 'Full Disk Encryption', description: 'Ensure LUKS is enabled during installation.', impact: 'High' },
        { id: 'l2', title: 'Firewall (UFW)', description: 'Enable UFW: `sudo ufw enable`.', impact: 'High' },
        { id: 'l3', title: 'Disable Root Login', description: 'Lock root account: `sudo passwd -l root`.', impact: 'Medium' },
        { id: 'l4', title: 'AppArmor / SELinux', description: 'Ensure MAC (Mandatory Access Control) is enforcing.', impact: 'High' },
        { id: 'l5', title: 'Secure Boot', description: 'Enable Secure Boot in BIOS.', impact: 'Medium' },
        { id: 'l6', title: 'Sandboxing', description: 'Prefer Flatpak with Flatseal to manage permissions.', impact: 'Medium' }
    ],
    macos: [
        { id: 'm1', title: 'FileVault', description: 'Turn on FileVault for disk encryption.', impact: 'High' },
        { id: 'm2', title: 'Firewall', description: 'System Settings > Network > Firewall -> On.', impact: 'Medium' },
        { id: 'm3', title: 'Lockdown Mode', description: 'Enable if you are at high risk (limits functionality).', impact: 'High' },
        { id: 'm4', title: 'Limit Ad Tracking', description: 'Privacy & Security > Apple Advertising > Off.', impact: 'Low' },
        { id: 'm5', title: 'Disable Analytics', description: 'Privacy & Security > Analytics & Improvements > Share Mac Analytics -> Off.', impact: 'Medium' }
    ],
    android: [
        { id: 'a1', title: 'Remove Bloatware', description: 'Disable or uninstall carrier/manufacturer apps.', impact: 'Medium' },
        { id: 'a2', title: 'Permissions Manager', description: 'Review Location, Mic, and Camera permissions for all apps.', impact: 'High' },
        { id: 'a3', title: 'Install from F-Droid', description: 'Use open source apps when possible.', impact: 'Medium' },
        { id: 'a4', title: 'Encrypted Backup', description: 'Use Seedvault or end-to-end encrypted Google backups.', impact: 'High' },
        { id: 'a5', title: 'Disable Usage & Diagnostics', description: 'Settings > Google > three dots > Usage & diagnostics -> Off.', impact: 'Low' }
    ],
    ios: [
        { id: 'i1', title: 'Advanced Data Protection', description: 'Enable end-to-end encryption for iCloud.', impact: 'High' },
        { id: 'i2', title: 'App Tracking Transparency', description: 'Ask App Not to Track for all apps.', impact: 'Medium' },
        { id: 'i3', title: 'Lockdown Mode', description: 'Enable for extreme protection if needed.', impact: 'High' },
        { id: 'i4', title: 'Safety Check', description: 'Review who has access to your location/data.', impact: 'Medium' },
        { id: 'i5', title: 'Disable Significant Locations', description: 'Privacy > Location Services > System Services > Significant Locations -> Off.', impact: 'Medium' }
    ]
};
