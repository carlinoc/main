// app/librodereclamos/page.tsx
'use client';

import { useState, useEffect } from 'react';

interface FormData {
  nombres: string;
  apellidos: string;
  tipoDocumento: string;
  numeroDocumento: string;
  telefono: string;
  email: string;
  domicilio: string;
  menorEdad: boolean;
  tipoReclamacion: string;
  tipoBien: string;
  montoReclamado: string;
  numeroPedido: string;
  fechaIncidente: string;
  detalle: string;
  pedido: string;
  declaracion: boolean;
}

export default function LibroReclamaciones() {
  const [fechaRegistro, setFechaRegistro] = useState<string>('');
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState<FormData>({
    nombres: '',
    apellidos: '',
    tipoDocumento: 'DNI',
    numeroDocumento: '',
    telefono: '',
    email: '',
    domicilio: '',
    menorEdad: false,
    tipoReclamacion: 'Reclamo',
    tipoBien: 'Producto',
    montoReclamado: '',
    numeroPedido: '',
    fechaIncidente: '',
    detalle: '',
    pedido: '',
    declaracion: false,
  });

  useEffect(() => {
    setMounted(true);
    setFechaRegistro(new Date().toLocaleDateString('es-PE'));
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    // Validar campos obligatorios
    if (!formData.nombres.trim()) {
      newErrors.nombres = 'El nombre es obligatorio';
    }
    if (!formData.apellidos.trim()) {
      newErrors.apellidos = 'Los apellidos son obligatorios';
    }
    if (!formData.numeroDocumento.trim()) {
      newErrors.numeroDocumento = 'El número de documento es obligatorio';
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }

    // Validar fecha
    if (!formData.fechaIncidente) {
      newErrors.fechaIncidente = 'La fecha del incidente es obligatoria';
    }

    // Validar detalles
    if (!formData.detalle.trim()) {
      newErrors.detalle = 'Debe describir qué sucedió';
    } else if (formData.detalle.trim().length < 20) {
      newErrors.detalle = 'El detalle debe tener al menos 20 caracteres';
    }

    if (!formData.pedido.trim()) {
      newErrors.pedido = 'Debe indicar qué está solicitando';
    } else if (formData.pedido.trim().length < 10) {
      newErrors.pedido = 'El pedido debe tener al menos 10 caracteres';
    }

    // Validar declaración
    if (!formData.declaracion) {
      newErrors.declaracion = 'Debe aceptar la declaración jurada';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setErrorMessage(
        'Por favor, complete todos los campos obligatorios correctamente.',
      );
      setShowErrorModal(true);
      return;
    }

    setIsSubmitting(true);

    try {
      // Llamar a tu API
      const response = await fetch('api/libro-reclamaciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          fechaRegistro: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al enviar el reclamo');
      }

      // Mostrar modal de éxito
      setShowSuccessModal(true);

      // Limpiar formulario
      setFormData({
        nombres: '',
        apellidos: '',
        tipoDocumento: 'DNI',
        numeroDocumento: '',
        telefono: '',
        email: '',
        domicilio: '',
        menorEdad: false,
        tipoReclamacion: 'Reclamo',
        tipoBien: 'Producto',
        montoReclamado: '',
        numeroPedido: '',
        fechaIncidente: '',
        detalle: '',
        pedido: '',
        declaracion: false,
      });
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Ocurrió un error al enviar el reclamo. Por favor, inténtelo nuevamente.',
      );
      setShowErrorModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <style jsx global>{`
        .form-radio {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          display: inline-block;
          vertical-align: middle;
          background-origin: border-box;
          user-select: none;
          flex-shrink: 0;
          height: 1rem;
          width: 1rem;
          color: #4f46e5;
          background-color: #fff;
          border-color: #6b7280;
          border-width: 1px;
          border-radius: 100%;
        }
        .form-radio:checked {
          border-color: #4f46e5;
          background-color: #4f46e5;
          background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");
          background-size: 100% 100%;
          background-position: center;
          background-repeat: no-repeat;
        }
        header {
          display: none;
        }
        input,
        select,
        textarea {
          color: #000 !important;
        }
        input::placeholder,
        textarea::placeholder {
          color: #555 !important;
        }
      `}</style>

      <div className="bg-gray-100 min-h-screen font-['Inter',sans-serif]">
        <div className="container mx-auto p-4 md:p-10">
          <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
            {/* Cabecera */}
            <div className="p-6 md:p-8 border-b border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <svg
                    className="h-10 w-auto text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2.5-12.5l5 4-5 4v-8z" />
                  </svg>
                  <h1 className="text-2xl font-bold text-gray-900 mt-2">
                    Libro de Reclamaciones
                  </h1>
                </div>
                <div className="mt-4 md:mt-0 md:text-right text-sm text-gray-600">
                  <p className="font-semibold">
                    Razón Social: MNET EMPRESA INDIVIDUAL DE RESPONSABILIDAD
                    LIMITADA
                  </p>
                  <p className="font-semibold">RUC: 20607838250</p>
                  <p>
                    Domicilio: Prolongación Pumacurco N° 650, Barrio San
                    Cristóbal, Cusco, Perú.
                  </p>
                  <p className="mt-2">
                    Fecha de Registro:{' '}
                    <span className="font-medium">{fechaRegistro}</span>
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Conforme a lo establecido en el Código de Protección y Defensa
                del Consumidor, Ley N° 29571, esta plataforma cuenta con un
                Libro de Reclamaciones a su disposición.
              </p>
            </div>

            {/* Formulario */}
            <div className="p-6 md:p-8">
              {/* Sección 1: Información del Consumidor */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                  INFORMACIÓN DEL CONSUMIDOR
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <label
                      htmlFor="nombres"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nombres *
                    </label>
                    <input
                      type="text"
                      id="nombres"
                      name="nombres"
                      value={formData.nombres}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full border ${errors.nombres ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.nombres && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.nombres}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="apellidos"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Apellidos *
                    </label>
                    <input
                      type="text"
                      id="apellidos"
                      name="apellidos"
                      value={formData.apellidos}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full border ${errors.apellidos ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.apellidos && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.apellidos}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="tipoDocumento"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Tipo de documento *
                    </label>
                    <select
                      id="tipoDocumento"
                      name="tipoDocumento"
                      value={formData.tipoDocumento}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option>DNI</option>
                      <option>Carné de Extranjería</option>
                      <option>Pasaporte</option>
                      <option>RUC</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="numeroDocumento"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Número de documento *
                    </label>
                    <input
                      type="text"
                      id="numeroDocumento"
                      name="numeroDocumento"
                      value={formData.numeroDocumento}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full border ${errors.numeroDocumento ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.numeroDocumento && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.numeroDocumento}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="telefono"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Teléfono / Celular
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Correo electrónico *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label
                      htmlFor="domicilio"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Domicilio
                    </label>
                    <input
                      type="text"
                      id="domicilio"
                      name="domicilio"
                      value={formData.domicilio}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex items-center">
                      <input
                        id="menorEdad"
                        name="menorEdad"
                        type="checkbox"
                        checked={formData.menorEdad}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor="menorEdad"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        Represento a un menor de edad
                      </label>
                    </div>
                  </div>
                </div>
              </section>

              {/* Sección 2: Detalle del Reclamo / Queja */}
              <section className="mt-8">
                <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                  DETALLE DEL RECLAMO O QUEJA
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <span className="block text-sm font-medium text-gray-700">
                      Tipo de reclamación *
                    </span>
                    <div className="mt-2 flex space-x-4">
                      <div className="flex items-center">
                        <input
                          id="tipo-reclamo"
                          name="tipoReclamacion"
                          type="radio"
                          value="Reclamo"
                          checked={formData.tipoReclamacion === 'Reclamo'}
                          onChange={handleInputChange}
                          className="form-radio"
                        />
                        <label
                          htmlFor="tipo-reclamo"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Reclamo
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="tipo-queja"
                          name="tipoReclamacion"
                          type="radio"
                          value="Queja"
                          checked={formData.tipoReclamacion === 'Queja'}
                          onChange={handleInputChange}
                          className="form-radio"
                        />
                        <label
                          htmlFor="tipo-queja"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Queja
                        </label>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      **Reclamo:** Disconformidad relacionada al producto o
                      servicio.
                      <br />
                      **Queja:** Malestar o descontento respecto a la atención.
                    </p>
                  </div>

                  <div>
                    <span className="block text-sm font-medium text-gray-700">
                      Bien contratado *
                    </span>
                    <div className="mt-2 flex space-x-4">
                      <div className="flex items-center">
                        <input
                          id="bien-producto"
                          name="tipoBien"
                          type="radio"
                          value="Producto"
                          checked={formData.tipoBien === 'Producto'}
                          onChange={handleInputChange}
                          className="form-radio"
                        />
                        <label
                          htmlFor="bien-producto"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Producto (Alquiler de película)
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="bien-servicio"
                          name="tipoBien"
                          type="radio"
                          value="Servicio"
                          checked={formData.tipoBien === 'Servicio'}
                          onChange={handleInputChange}
                          className="form-radio"
                        />
                        <label
                          htmlFor="bien-servicio"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Servicio (Plataforma)
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="montoReclamado"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Monto Reclamado (S/.)
                    </label>
                    <input
                      type="number"
                      id="montoReclamado"
                      name="montoReclamado"
                      value={formData.montoReclamado}
                      onChange={handleInputChange}
                      min="0"
                      step="0.50"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ej: 10.00"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="numeroPedido"
                      className="block text-sm font-medium text-gray-700"
                    >
                      N° de Pedido / Alquiler (Opcional)
                    </label>
                    <input
                      type="text"
                      id="numeroPedido"
                      name="numeroPedido"
                      value={formData.numeroPedido}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="fechaIncidente"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Fecha del Incidente *
                    </label>
                    <input
                      type="date"
                      id="fechaIncidente"
                      name="fechaIncidente"
                      value={formData.fechaIncidente}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full border ${errors.fechaIncidente ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.fechaIncidente && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.fechaIncidente}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="detalle"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Detalle (Explique brevemente qué sucedió) *
                    </label>
                    <textarea
                      id="detalle"
                      name="detalle"
                      rows={4}
                      value={formData.detalle}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full border ${errors.detalle ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    ></textarea>
                    {errors.detalle && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.detalle}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="pedido"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Pedido (Explique qué está solicitando) *
                    </label>
                    <textarea
                      id="pedido"
                      name="pedido"
                      rows={4}
                      value={formData.pedido}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full border ${errors.pedido ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    ></textarea>
                    {errors.pedido && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.pedido}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {/* Sección 3: Declaración y Envío */}
              <section className="mt-8">
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <input
                        id="declaracion"
                        name="declaracion"
                        type="checkbox"
                        checked={formData.declaracion}
                        onChange={handleInputChange}
                        className={`h-4 w-4 text-blue-600 ${errors.declaracion ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-blue-500`}
                      />
                    </div>
                    <div className="ml-3">
                      <label
                        htmlFor="declaracion"
                        className="text-sm font-medium text-gray-900"
                      >
                        Declaro ser el usuario del servicio o producto y acepto
                        el contenido del presente formulario, manifestando bajo
                        Declaración Jurada la veracidad de los hechos descritos.
                        *
                      </label>
                      {errors.declaracion && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.declaracion}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 text-xs text-gray-500 space-y-2">
                    <p>
                      **Aviso de Privacidad:** Sus datos personales serán
                      tratados con la única finalidad de gestionar su
                      reclamo/queja y responder al mismo, en cumplimiento de lo
                      dispuesto por la Ley N° 29571 y la Ley N° 29733. Serán
                      conservados por MNET E.I.R.L. por el plazo legal de 2
                      años.
                    </p>
                    <p>
                      **Nota Legal:** La formulación del reclamo no impide
                      acudir a otras vías de solución de controversias ni es
                      requisito previo para interponer una denuncia ante el
                      INDECOPI.
                    </p>
                    <p className="font-semibold">
                      **Plazo de Respuesta:** El proveedor deberá dar respuesta
                      al reclamo en un plazo no mayor a quince (15) días
                      hábiles, improrrogables.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Reclamo'}
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Modal de Éxito */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">
                  ¡Reclamo Registrado!
                </h3>
                <div className="mt-2 text-sm text-gray-600">
                  <p>
                    Su reclamo ha sido registrado exitosamente. Recibirá un
                    correo de confirmación en breve.
                  </p>
                  <p className="mt-2 font-semibold">
                    Número de Registro: {new Date().getTime()}
                  </p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => setShowSuccessModal(false)}
                    className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-200"
                  >
                    Entendido
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Error */}
        {showErrorModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowErrorModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">
                  Error en el Formulario
                </h3>
                <div className="mt-2 text-sm text-gray-600">
                  <p>{errorMessage}</p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => setShowErrorModal(false)}
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
                  >
                    Corregir
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
