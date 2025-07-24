import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Client Portal
        </h1>
        <p className="text-center text-muted-foreground">
          Welcome to the client onboarding portal
        </p>
      </div>
    </div>
  )
}
