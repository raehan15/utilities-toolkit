<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a Next.js 14 project with TypeScript and TailwindCSS for an all-in-one utilities website.

## Project Structure:

- Uses App Router (not Pages Router)
- Components are in `src/components/`
- Tools/pages are in `src/app/tools/[tool-name]/page.tsx`
- Global styles in `src/app/globals.css`

## Key Features:

- BMI Calculator: Health category calculation
- YouTube Title Generator: Template-based title generation
- JSON Formatter: Format, minify, and validate JSON
- Random Number Generator: Generate random numbers in ranges
- Color Palette Generator: Create color palettes from hex colors

## Coding Guidelines:

- Use TypeScript with proper types
- Use TailwindCSS for all styling
- All tools are client-side only ('use client')
- Use React hooks (useState, useEffect) for state management
- Add proper SEO metadata for each page
- Responsive design (mobile-first)
- Copy-to-clipboard functionality for results
- Error handling with user-friendly messages

## Design Principles:

- Clean, modern UI with white backgrounds and subtle shadows
- Blue color scheme for primary actions
- Gray tones for secondary elements
- Proper spacing and typography
- Interactive hover effects
- Clear visual hierarchy
