# Flash Cards PWA

A modern Progressive Web App for learning with flash cards, featuring a clean clay/neomorphism design with green accents.

## Features

- 📱 **Progressive Web App** - Install on any device, works offline
- 🎨 **Clay/Neomorphism Design** - Modern UI with soft shadows and smooth interactions
- 🌓 **Dark/Light Theme** - Automatic theme switching with WCAG AAA compliant colors
- 🗣️ **Text-to-Speech** - Multi-language voice support for pronunciation practice
- 📊 **Group Management** - Organize cards into groups with import/export functionality
- 🔍 **Search** - Quick search across all cards
- ⌨️ **Keyboard Shortcuts** - Navigate efficiently with arrow keys and spacebar
- 📲 **Touch Gestures** - Swipe support for mobile devices
- 🎯 **Examples** - Add example sentences to reinforce learning
- 🔄 **Import/Export** - Share card sets via compressed URLs or Excel files

## Tech Stack

- **React 18.2.0** + **TypeScript** - Type-safe modern UI
- **Vite 5.2.0** - Fast build tool with HMR
- **Redux Toolkit 2.2.2** - State management
- **Lucide React** - Beautiful outline icons
- **SCSS** - Modular stylesheets with clay mixins
- **Bootstrap 5.3.3** - Base styling framework
- **PWA** - Offline support with service workers

## Design System

### Clay/Neomorphism Style
- Soft, extruded UI elements with dual-layer shadows
- Light shadow (top-left) + Dark shadow (bottom-right)
- Green accent color: `#2d8659` (light) / `#5dba82` (dark)
- Smooth transitions and hover effects

### Color Palette
**Light Theme:**
- Background: `#e0e5ec`
- Text: `#2d3a2d`
- Accent: `#2d8659`
- Card Front: `#d5ebe0`
- Card Back: `#e0ebd5`

**Dark Theme:**
- Background: `#1a1f1b` (body) / `#2a302c` (elements)
- Text: `#d5ebe0`
- Accent: `#5dba82`
- Card Front: `#2f3531`
- Card Back: `#31352f`

### Spacing System
- `--spacing-xs`: 4px
- `--spacing-sm`: 8px
- `--spacing-md`: 12px
- `--spacing-lg`: 16px
- `--spacing-xl`: 24px
- `--spacing-2xl`: 32px

### Typography
- Body: 16px (1rem)
- Small: 14px (0.875rem)
- Large: 20px (1.25rem)
- Cards: 40px (2.5rem) base, 24px (1.5rem) small

## Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Opens at `http://localhost:5173`

### Build
```bash
npm run build
```

### Lint
```bash
npm run lint
```

### Preview Production Build
```bash
npm run preview
```

## Project Structure

```
src/
├── components/      # React components
│   ├── CardComponent/     # Main flashcard display
│   ├── HeaderComponent/   # Top navigation
│   ├── FooterComponent/   # Bottom navigation
│   ├── MenuComponent/     # Side drawer menu
│   ├── GroupComponent/    # Group management
│   ├── AddComponent/      # Add/edit cards
│   ├── SearchComponent/   # Card search
│   ├── SpeakerComponent/  # Text-to-speech
│   ├── DialogComponent/   # Modal dialogs
│   └── Icons/             # Icon components
├── store/           # Redux state management
├── hooks/           # Custom React hooks
├── types/           # TypeScript definitions
├── utils/           # Utility functions
└── styles/          # Global SCSS mixins

```

## Usage

### Adding Cards
1. Click the "+" button in the footer
2. Enter front and back text
3. Optionally add examples
4. Save to the current group

### Navigating Cards
- **Desktop**: Arrow keys (←/→), Spacebar to flip
- **Mobile**: Swipe left/right, tap to flip
- Click arrow buttons on card edges

### Managing Groups
1. Open menu (☰ button)
2. Create new group or select existing
3. Import/export via compressed URL or Excel
4. Share groups with others

### Text-to-Speech
- Single click speaker icon: Play pronunciation
- Double click speaker icon: Select voice/language
- Works on both sides of cards and examples

## Accessibility

- **WCAG AAA Compliant**: 7:1+ contrast ratios
- **Touch-Friendly**: 44px minimum button sizes
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Semantic HTML structure
- **High Contrast**: Clear visual hierarchy

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT

## Author

Created with ❤️ for language learners worldwide

