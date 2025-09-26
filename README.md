# IndustrialTech Frontend

A modern React frontend application for IndustrialTech - a precision manufacturing solutions company.

## Features

- **Home Page**: Hero carousel, action cards, service sections, and company overview
- **About Page**: Company story, mission, values, timeline, and statistics
- **Products Page**: Interactive product catalog with filtering and search
- **Innovation Page**: Innovation timeline, research areas, patents, and awards
- **Contact Page**: Contact form with product inquiry integration and FAQ

## Tech Stack

- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **TypeScript** - Type safety

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd frontend-extracted
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000`

### Environment Variables

Create a `.env` file at the project root with:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run typecheck` - Run TypeScript type checking

## Project Structure

```
frontend-extracted/
├── src/
│   ├── app/                    # Page components
│   │   ├── page.jsx           # Home page
│   │   ├── about/
│   │   │   └── page.jsx       # About page
│   │   ├── products/
│   │   │   └── page.jsx       # Products page
│   │   ├── innovation/
│   │   │   └── page.jsx       # Innovation page
│   │   └── contact/
│   │       └── page.jsx       # Contact page
│   ├── components/            # Reusable components
│   │   └── HomePage/          # Home page specific components
│   ├── hooks/                 # Custom React hooks
│   ├── main.jsx              # Application entry point
│   └── index.css             # Global styles
├── public/                    # Static assets
├── package.json
├── vite.config.js
├── tailwind.config.js
└── tsconfig.json
```

## Features Overview

### Home Page
- Interactive hero carousel with multiple slides
- Action cards for key user actions
- Service and support information
- Maintenance services overview
- Company about section with statistics
- Product showcase
- Innovation timeline
- Contact section with form

### About Page
- Company story and mission
- Core values presentation
- Company timeline
- Statistics and achievements
- Call-to-action section

### Products Page
- Task-based product filtering
- Search functionality
- Category filtering
- Product cards with detailed information
- Product inquiry integration

### Innovation Page
- Interactive innovation timeline
- Research areas with progress indicators
- Patents and awards showcase
- Year-based innovation selection

### Contact Page
- Comprehensive contact form
- Product inquiry pre-filling
- Contact information display
- FAQ section
- Form validation and submission states

## Customization

### Styling
The application uses Tailwind CSS for styling. You can customize the design by:
- Modifying the Tailwind configuration in `tailwind.config.js`
- Updating component styles in the respective JSX files
- Adding custom CSS in `src/index.css`

### Content
- Update company information in the respective page components
- Modify product data in the Products page
- Update innovation timeline in the Innovation page
- Customize contact information in the Contact page

## Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. The built files will be in the `dist` directory

3. Deploy the `dist` directory to your hosting provider

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is proprietary software for IndustrialTech.
