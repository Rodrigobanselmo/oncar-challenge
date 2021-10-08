export interface INavMobileItem {
  label: string;
  href: string;
  isActive: boolean;
  onToggle: () => void;
}
