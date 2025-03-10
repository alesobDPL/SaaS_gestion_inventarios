import AnimatedTitle from "@/components/AnimatedTitle";
import AnimatedDescription from "@/components/AnimatedDescription";
import AnimatedButton from "@/components/AnimatedButton";


export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 sm:px-8 py-12">
      {/* Título animado */}
      <AnimatedTitle />

      {/* Descripción animada */}
      <AnimatedDescription />

      {/* Contenedor de botones animados */}
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatedButton href="/products" text="Gestión de Productos" color="bg-blue-600" />
        <AnimatedButton href="/dashboard" text="Dashboard" color="bg-green-600" />
        <AnimatedButton href="/suppliers" text="Suppliers" color="bg-purple-600" />
        <AnimatedButton href="/orders" text="Orders" color="bg-yellow-600" />
      </div>
    </div>
  );
}
