import {
  Heart,
  Activity,
  Waves,
  Focus,
  Compass,
  MessageCircle,
  HeartPulse,
  Users,
  CloudRain,
  School,
  Sprout,
  Smile,
  Scale,
  Handshake,
  BookOpen,
  Layers,
  LayoutGrid,
  Eye,
  Smartphone,
  Zap,
  Clock,
  type LucideIcon,
} from 'lucide-react'

/**
 * Registro central de ícones usados em `/content`. Os dados guardam o NOME
 * (string, serializável) em vez da referência do componente — funções não
 * cruzam a fronteira Server → Client Component como prop (RSC). Quem for
 * renderizar resolve aqui: `ICONS[item.icone]`.
 */
export const ICONS = {
  Heart,
  Activity,
  Waves,
  Focus,
  Compass,
  MessageCircle,
  HeartPulse,
  Users,
  CloudRain,
  School,
  Sprout,
  Smile,
  Scale,
  Handshake,
  BookOpen,
  Layers,
  LayoutGrid,
  Eye,
  Smartphone,
  Zap,
  Clock,
} as const satisfies Record<string, LucideIcon>

export type IconName = keyof typeof ICONS
