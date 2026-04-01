@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

@layer base {
  :root {
    --background: 210 20% 98%;
    --foreground: 213 32% 18%;

    --card: 0 0% 100%;
    --card-foreground: 213 32% 18%;

    --popover: 0 0% 100%;
    --popover-foreground: 213 32% 18%;

    --primary: 211 53% 24%;
    --primary-foreground: 0 0% 100%;

    --secondary: 210 40% 94%;
    --secondary-foreground: 211 53% 24%;

    --muted: 210 30% 95%;
    --muted-foreground: 215 16% 47%;

    --accent: 30 100% 60%;
    --accent-foreground: 0 0% 100%;

    --success: 145 63% 32%;
    --success-foreground: 0 0% 100%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;

    --border: 214 20% 90%;
    --input: 214 20% 90%;
    --ring: 211 53% 24%;

    --radius: 0.75rem;

    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 240 5.9% 10%;
    --sidebar-primary-foreground: 0 0% 98%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 217.2 91.2% 59.8%;

    --gradient-hero: linear-gradient(135deg, hsl(211 53% 24%), hsl(211 53% 34%));
    --gradient-saffron: linear-gradient(135deg, hsl(30 100% 60%), hsl(24 100% 55%));
    --gradient-success: linear-gradient(135deg, hsl(145 63% 32%), hsl(145 63% 40%));
  }

  .dark {
    --background: 213 32% 8%;
    --foreground: 210 20% 95%;
    --card: 213 32% 12%;
    --card-foreground: 210 20% 95%;
    --popover: 213 32% 12%;
    --popover-foreground: 210 20% 95%;
    --primary: 211 60% 50%;
    --primary-foreground: 0 0% 100%;
    --secondary: 213 25% 18%;
    --secondary-foreground: 210 20% 95%;
    --muted: 213 25% 18%;
    --muted-foreground: 215 20% 65%;
    --accent: 30 100% 60%;
    --accent-foreground: 0 0% 100%;
    --success: 145 63% 42%;
    --success-foreground: 0 0% 100%;
    --destructive: 0 62% 31%;
    --destructive-foreground: 210 40% 98%;
    --border: 213 25% 20%;
    --input: 213 25% 20%;
    --ring: 211 60% 50%;
    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-primary: 224.3 76.3% 48%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground font-sans antialiased;
    font-family: 'Inter', sans-serif;
  }
}

@layer utilities {
  .text-gradient-hero {
    @apply bg-clip-text text-transparent;
    background-image: linear-gradient(135deg, hsl(30 100% 60%), hsl(24 100% 50%));
  }
  .bg-hero-gradient {
    background: linear-gradient(135deg, hsl(211 53% 20%), hsl(211 53% 30%), hsl(211 60% 24%));
  }
  .bg-saffron-gradient {
    background: linear-gradient(135deg, hsl(30 100% 60%), hsl(24 100% 55%));
  }
  .bg-success-gradient {
    background: linear-gradient(135deg, hsl(145 63% 32%), hsl(145 63% 40%));
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out;
  }
  .animate-slide-up {
    animation: slideUp 0.5s ease-out;
  }
  .animate-scale-in {
    animation: scaleIn 0.3s ease-out;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
