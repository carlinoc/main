"use client";
import { useState } from "react";
import Image from "next/image";

export default function YapeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    celular: "",
    monto: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Gracias por tu pago con Yape 💜\nMonto: S/ ${formData.monto}`);
    setFormData({ nombre: "", celular: "", monto: "" });
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Botón para abrir modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 text-lg font-semibold text-white rounded-xl bg-violet-700 hover:bg-violet-800 transition-all shadow-md"
      >
        Pagar con Yape
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-gradient-to-br from-violet-700 to-fuchsia-500 text-white rounded-2xl shadow-xl p-6 w-96 relative animate-fadeIn">
            {/* Botón cerrar */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-white text-xl font-bold hover:opacity-80"
            >
              ×
            </button>

            {/* Encabezado */}
            <div className="text-center mb-4">
                Logo
              {/* <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Yape_logo.svg/512px-Yape_logo.svg.png?20230220220022"
                alt="Yape Logo"
                width={90}
                height={90}
                className="mx-auto mb-2"
              /> */}
              <h2 className="text-xl font-bold">Pagar con Yape</h2>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium">
                  Nombre completo
                </label>
                <input
                  id="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-3 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                />
              </div>

              <div>
                <label htmlFor="celular" className="block text-sm font-medium">
                  Número de celular Yape
                </label>
                <input
                  id="celular"
                  type="tel"
                  value={formData.celular}
                  onChange={handleChange}
                  pattern="[0-9]{9}"
                  required
                  className="w-full mt-1 px-3 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                />
              </div>

              <div>
                <label htmlFor="monto" className="block text-sm font-medium">
                  Monto a pagar (S/)
                </label>
                <input
                  id="monto"
                  type="number"
                  step="0.01"
                  value={formData.monto}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-3 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 mt-3 text-lg font-semibold text-white rounded-xl bg-fuchsia-500 hover:bg-fuchsia-600 transition-all shadow-md"
              >
                Enviar pago
              </button>
            </form>

            <p className="mt-4 text-center text-sm opacity-90">
              Usa tu app Yape para completar el pago 💜
            </p>
          </div>
        </div>
      )}
    </div>
  );
}