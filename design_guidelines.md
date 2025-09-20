# E-Cell NCE Website Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern educational and startup ecosystem websites like IIT Bombay E-Cell, combining professional institutional branding with dynamic entrepreneurship energy.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Deep Blue: 220 85% 25% (primary brand color)
- Vibrant Purple: 260 75% 45% (accent)
- Light Blue: 210 60% 85% (backgrounds)

**Gradients:**
- Hero gradient: Blue to purple diagonal overlay
- Card gradients: Subtle blue-to-transparent overlays
- Button gradients: Deep blue to purple horizontal

### B. Typography
- **Primary Font**: Inter (Google Fonts) - clean, modern sans-serif
- **Display Font**: Poppins (Google Fonts) - for headers and emphasis
- **Hierarchy**: H1 (32px), H2 (24px), H3 (18px), Body (16px), Small (14px)

### C. Layout System
**Spacing**: Use Tailwind units of 4, 6, 8, 12, 16 for consistent rhythm
- Mobile: p-4, gap-6 for sections
- Desktop: p-8, gap-12 for sections
- Cards: p-6 with rounded-lg borders

### D. Component Library

**Header**: Fixed top header with logo, tagline, and gradient background
**Bottom Navigation**: Fixed position with 4 tabs (Home, Post, Events, Profile) using rounded icons
**Cards**: Elevated cards with subtle shadows, rounded corners, and hover lift effects
**Buttons**: Primary (gradient fill), Secondary (outline with blur background on images)
**Hero Section**: Full-viewport height with gradient overlay and centered content

## Images

### Hero Section
- **Large hero image**: Use the first provided team image as background with dark gradient overlay (opacity 60%)
- **Team Grid**: Three additional team images in a responsive grid layout
- **Logo Integration**: Prominent logo placement in header and hero section

### Team Section
- **Profile Cards**: Placeholder circular profile images for 12 team members
- **Achievement Graphics**: Icon-based achievement highlights
- **Event Thumbnails**: Rectangular placeholder images for upcoming events

## Key Design Principles

**Mobile-First**: Bottom navigation optimized for thumb navigation
**Professional yet Approachable**: Balance institutional credibility with student energy
**Gradient Emphasis**: Strategic use of blue-purple gradients for visual hierarchy
**Card-Based Layout**: Consistent card system for content organization
**Micro-Interactions**: Subtle hover effects, smooth transitions (300ms duration)

## Content Layout Strategy

**Hero**: Full-screen with inspiring quote and CTA button
**About Sections**: Two-column layout on desktop, stacked on mobile
**Team Grid**: 3-4 columns responsive grid with hover effects
**Events**: Horizontal scrolling cards on mobile, grid on desktop
**Footer**: Social links with brand colors and clean typography

**Performance**: Optimize images, use CSS transforms for animations, minimize layout shifts