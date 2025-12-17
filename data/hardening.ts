
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
