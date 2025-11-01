# Google Calendar Create Button Component

A pixel-perfect recreation of Google Calendar's "+ Create" button with dropdown menu.

## Features

✅ **Pixel-perfect styling** matching Google Calendar
✅ **Smooth animations** using Framer Motion
✅ **Click-outside-to-close** functionality
✅ **Keyboard accessible** with proper focus management
✅ **Fully responsive** on all screen sizes
✅ **TypeScript support** with proper type definitions
✅ **Zero custom CSS** - 100% Tailwind CSS

## Installation

The component requires `framer-motion` for animations:

```bash
npm install framer-motion
```

## Basic Usage

```tsx
import CreateButton from "@/components/create-button";

export default function MyComponent() {
  return (
    <CreateButton
      onEventClick={() => console.log("Event clicked")}
      onTaskClick={() => console.log("Task clicked")}
      onAppointmentClick={() => console.log("Appointment clicked")}
    />
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onEventClick` | `() => void` | No | Callback when "Event" is clicked |
| `onTaskClick` | `() => void` | No | Callback when "Task" is clicked |
| `onAppointmentClick` | `() => void` | No | Callback when "Appointment schedule" is clicked |

## Examples

### In a Sidebar

```tsx
<aside className="w-64 bg-white p-4">
  <CreateButton
    onEventClick={handleEventClick}
    onTaskClick={handleTaskClick}
    onAppointmentClick={handleAppointmentClick}
  />
  {/* Other sidebar content */}
</aside>
```

### With Dialog Integration

```tsx
const [showEventDialog, setShowEventDialog] = useState(false);

<CreateButton
  onEventClick={() => setShowEventDialog(true)}
  onTaskClick={() => setShowTaskDialog(true)}
  onAppointmentClick={() => setShowAppointmentDialog(true)}
/>

{showEventDialog && <EventDialog onClose={() => setShowEventDialog(false)} />}
```

## Styling Details

### Button
- **Background**: `#ffffff` (white)
- **Border**: `border-gray-200`
- **Text**: `#3c4043`, 14px, medium weight
- **Padding**: `px-6 py-3`
- **Border Radius**: `28px` (pill shape)
- **Shadow**: `shadow-sm`
- **Hover**: `hover:bg-gray-50`, `hover:shadow-md`
- **Icon**: Plus icon with 2.5 stroke width

### Dropdown
- **Background**: White with border
- **Shadow**: `shadow-lg`
- **Border Radius**: `12px` (rounded-xl)
- **Animation**: Fade + slide down (0.2s ease-out)
- **Width**: `224px` (w-56)
- **Positioning**: Absolute, left-aligned, 8px below button

### Menu Items
- **Padding**: `px-4 py-3`
- **Font**: 14px, `#3c4043`
- **Hover**: `hover:bg-gray-100`
- **Icons**: 20px, `#5f6368`

## Animation

The dropdown uses Framer Motion for smooth animations:

- **Enter**: Opacity 0→1, translateY -10px→0
- **Exit**: Opacity 1→0, translateY 0→-10px
- **Duration**: 200ms
- **Easing**: ease-out

## Accessibility

- ✅ Proper focus management
- ✅ Click outside to close
- ✅ Keyboard navigation support
- ✅ Screen reader friendly

## Browser Support

Works on all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## File Structure

```
components/
├── create-button.tsx              # Main component
├── create-button-example.tsx      # Usage examples
└── CREATE_BUTTON_README.md        # This file
```

## Troubleshooting

### Dropdown not appearing

Make sure the parent container doesn't have `overflow: hidden`:

```tsx
<div className="relative overflow-visible">
  <CreateButton />
</div>
```

### Animation not smooth

Ensure `framer-motion` is properly installed:

```bash
npm install framer-motion
```

### Styling conflicts

The component uses specific Tailwind classes. Make sure your `tailwind.config.js` includes all necessary plugins:

```js
module.exports = {
  plugins: [require('tailwindcss-animate')],
}
```

## Customization

You can customize colors by modifying the Tailwind classes:

```tsx
// Change button color to blue
<button className="... bg-blue-500 hover:bg-blue-600 ...">
```

## License

MIT
