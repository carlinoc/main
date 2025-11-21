import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y Condiciones - Cinergia',
  description:
    'Lee los términos y condiciones de uso de Cinergia, la plataforma de streaming de cine latinoamericano.',
  robots: 'index, follow',
};

export default function TermsAndConditionsPage(): JSX.Element {
  return (
    <div className="w-full min-h-screen bg-bgPrimaryDark">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Términos y Condiciones de Uso
          </h1>
          <p className="text-gray-400">
            Fecha de última actualización: 19 de noviembre de 2025
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-10 bg-gray-800 bg-opacity-50 rounded-lg p-6 border border-gray-700">
          <p className="text-gray-300 leading-relaxed mb-4">
            Los presentes Términos y Condiciones de Uso (&quot;Términos&quot;) y
            la Política de Privacidad y Cookies (&quot;Política&quot;) rigen el
            acceso y uso de la plataforma digital Cinergia (en adelante,
            &quot;la Plataforma&quot; o &quot;Cinergia&quot;), accesible a
            través de{' '}
            <a
              href="https://www.cinergia.lat"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              www.cinergia.lat
            </a>
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            La Plataforma es propiedad de y operada por{' '}
            <strong>MNET EMPRESA INDIVIDUAL DE RESPONSABILIDAD LIMITADA</strong>{' '}
            (en adelante, &quot;MNET&quot;), identificada con RUC N°
            20607838250, con domicilio fiscal en Prolongación Pumacurco N° 650,
            Barrio San Cristóbal, Distrito, Provincia y Departamento de Cusco,
            Perú.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Al registrarse o utilizar la Plataforma, usted (en adelante,
            &quot;el Usuario&quot;) acepta haber leído, entendido y estar sujeto
            a estos Términos y a la Política. Si no está de acuerdo, por favor
            absténgase de utilizar nuestros servicios.
          </p>
        </section>

        {/* Sección 1: Definiciones */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            1. Definiciones
          </h2>
          <div className="space-y-4 text-gray-300">
            <div>
              <strong className="text-white">Plataforma:</strong> El sitio web y
              servicio Cinergia, propiedad de MNET E.I.R.L.
            </div>
            <div>
              <strong className="text-white">Usuario:</strong> Toda persona
              natural, mayor de edad, que se registra y accede a los servicios
              de la Plataforma.
            </div>
            <div>
              <strong className="text-white">
                Contenido de Compra (EST - Electronic Sell-Through):
              </strong>{' '}
              Películas, series, documentales y otras producciones audiovisuales
              disponibles en la Plataforma para su adquisición digital
              definitiva. Al adquirir este contenido, el Usuario obtiene el
              derecho de visualización ilimitada e indefinida a través de su
              cuenta en Cinergia.
            </div>
            <div>
              <strong className="text-white">Contenido Gratuito:</strong>{' '}
              Catálogo curado de producciones audiovisuales que se encuentran
              disponibles públicamente en plataformas de terceros (ej. YouTube)
              y que Cinergia incorpora (&quot;embebe&quot;) en su Plataforma
              para su visualización.
            </div>
            <div>
              <strong className="text-white">Servicio:</strong> La combinación
              del acceso al Contenido de Alquiler (TVOD) y al Contenido
              Gratuito, junto con las funciones de cuenta de usuario.
            </div>
          </div>
        </section>

        {/* Sección 2: Objeto del Servicio */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            2. Objeto del Servicio
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Cinergia es una plataforma legal de streaming que ofrece dos
            modalidades de acceso a contenido:
          </p>
          <div className="space-y-4 text-gray-300">
            <div>
              <strong className="text-white">Contenido de Compra (EST):</strong>{' '}
              Un servicio de venta digital de películas donde el Usuario paga
              una tarifa única para obtener una licencia de visualización
              permanente. MNET declara que posee las licencias o acuerdos
              necesarios para la distribución y venta digital de este contenido.
            </div>
            <div>
              <strong className="text-white">Contenido Gratuito:</strong>{' '}
              Catálogo de producciones audiovisuales incorporadas
              (&quot;embebidas&quot;) de plataformas de terceros, facilitando su
              curaduría y descubrimiento.
            </div>
          </div>
        </section>

        {/* Sección 3: Cuenta de Usuario */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            3. Cuenta de Usuario y Registro
          </h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              <span>
                Para acceder a los Servicios, el Usuario debe ser mayor de 18
                años y registrarse creando una cuenta, proporcionando
                información veraz y actual (Nombre y Correo Electrónico).
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              <span>
                El Usuario es el único responsable de mantener la
                confidencialidad de su contraseña y de todas las actividades que
                ocurran en su cuenta.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              <span>
                El Usuario se compromete a notificar a MNET inmediatamente sobre
                cualquier uso no autorizado de su cuenta.
              </span>
            </li>
          </ul>
        </section>

        {/* Sección 4: Servicio de Compra */}
        <section className="mb-10 bg-blue-900 bg-opacity-20 rounded-lg p-6 border border-blue-800">
          <h2 className="text-2xl font-semibold text-white mb-4">
            4. Servicio de Compra y Visualización Indefinida
          </h2>
          <div className="space-y-4 text-gray-300">
            <div>
              <strong className="text-white">
                Licencia de Acceso Perpetuo:
              </strong>{' '}
              Al pagar la tarifa indicada para una película o contenido
              audiovisual (&quot;Comprar&quot;), el Usuario adquiere una
              licencia personal, intransferible, no exclusiva e indefinida para
              visualizar dicho contenido tantas veces como desee, únicamente a
              través de la Plataforma de Cinergia.
            </div>
            <div>
              <strong className="text-white">
                Disponibilidad &quot;Para Siempre&quot;:
              </strong>{' '}
              A diferencia de un alquiler, el contenido adquirido no caduca.
              Permanecerá disponible en la biblioteca personal del Usuario
              (&quot;Mis Películas&quot; o sección equivalente) de manera
              permanente mientras el Usuario mantenga su cuenta activa y la
              Plataforma Cinergia continúe operando.
            </div>
            <div>
              <strong className="text-white">Acceso Multidispositivo:</strong>{' '}
              El Usuario podrá acceder a su contenido comprado desde cualquier
              dispositivo compatible donde inicie sesión con su cuenta de
              Cinergia, respetando las limitaciones de visualización simultánea
              que la tecnología de la plataforma permita.
            </div>
          </div>
          <div className="mt-6 p-4 bg-yellow-900 bg-opacity-30 rounded border border-yellow-700">
            <h3 className="text-lg font-semibold text-yellow-300 mb-2">
              Condiciones de Disponibilidad y Vigencia de la Licencia
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              El Usuario reconoce y acepta que la adquisición del
              &quot;Contenido de Compra&quot; le otorga una licencia de acceso
              digital y no la propiedad del archivo físico. La disponibilidad
              &quot;indefinida&quot; o &quot;permanente&quot; del contenido se
              encuentra estrictamente condicionada a la operatividad y
              existencia de la plataforma Cinergia y de MNET E.I.R.L. En el
              eventual caso de que MNET decida cesar sus operaciones
              comerciales, el acceso al contenido adquirido podría interrumpirse
              sin derecho a reembolso.
            </p>
          </div>
        </section>

        {/* Sección 5: Pagos */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            5. Pagos y Pasarela de Pago
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Todos los pagos por el Contenido de Alquiler (TVOD) se procesarán a
            través de nuestra pasarela de pago, Mercado Pago, que acepta
            tarjetas de crédito/débito y Yape.
          </p>
          <div className="p-4 bg-gray-800 bg-opacity-50 rounded border border-gray-700">
            <strong className="text-white">
              Limitación de Responsabilidad de Pagos:
            </strong>
            <p className="text-gray-300 mt-2 text-sm">
              MNET E.I.R.L. no almacena, procesa ni tiene acceso a la
              información completa de las tarjetas de crédito o débito del
              Usuario. Todo el proceso de pago se realiza en los servidores
              seguros de Mercado Pago. MNET no será responsable por fallos en el
              sistema de la pasarela de pago, denegación de transacciones por
              parte de la entidad bancaria, o cualquier incidente relacionado
              con el procesamiento del pago.
            </p>
          </div>
        </section>

        {/* Sección 6: Reembolsos */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            6. Política de Reembolsos y Derecho de Desistimiento
          </h2>
          <div className="space-y-4 text-gray-300">
            <div>
              <strong className="text-white">Venta Digital Final:</strong> Dada
              la naturaleza digital e inmediata del servicio, las compras de
              contenido se consideran finales una vez que el servicio ha sido
              ejecutado (visualización iniciada).
            </div>
            <div>
              <strong className="text-white">
                Derecho de Desistimiento (Arrepentimiento):
              </strong>{' '}
              De acuerdo con el Código de Protección y Defensa del Consumidor,
              el Usuario tiene derecho a solicitar la anulación de la compra y
              el reembolso del dinero abonado.
            </div>
            <div>
              <strong className="text-white">
                Condición para el Reembolso:
              </strong>{' '}
              El Usuario puede solicitar el reembolso total de la compra
              únicamente si aún no ha iniciado la reproducción del contenido (es
              decir, no ha presionado el botón &quot;Play&quot; o
              &quot;Reproducir&quot; en ningún momento).
            </div>
            <div>
              <strong className="text-white">Extinción del Derecho:</strong> El
              derecho a solicitar reembolso se extingue automáticamente en el
              instante en que el Usuario inicia la reproducción del contenido
              adquirido.
            </div>
          </div>
        </section>

        {/* Sección 7: Propiedad Intelectual */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            7. Propiedad Intelectual y Contenido
          </h2>
          <div className="space-y-4 text-gray-300">
            <div>
              <strong className="text-white">Nuestra Propiedad:</strong> La
              marca &quot;Cinergia&quot;, los logotipos, el diseño de la
              Plataforma y todo el software asociado son propiedad exclusiva de
              MNET E.I.R.L.
            </div>
            <div>
              <strong className="text-white">
                Contenido de Alquiler (TVOD):
              </strong>{' '}
              Los derechos de autor de este contenido pertenecen a sus
              respectivos productores y distribuidores. MNET E.I.R.L. cuenta con
              las licencias correspondientes para su alquiler.
            </div>
            <div>
              <strong className="text-white">Contenido Gratuito:</strong> Este
              contenido es propiedad de sus respectivos creadores. MNET no aloja
              este contenido ni se atribuye su propiedad. Su incorporación se
              basa en las funcionalidades de &quot;embed&quot; provistas por las
              plataformas de origen (ej. YouTube).
            </div>
          </div>
        </section>

        {/* Sección 8: Safe Harbor */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            8. Procedimiento de Notificación y Retiro (Safe Harbor)
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            MNET E.I.R.L. respeta los derechos de propiedad intelectual de
            terceros. Si usted es titular de derechos de autor y considera que
            un contenido incorporado desde una plataforma de terceros infringe
            sus derechos, le solicitamos que nos envíe una notificación formal.
          </p>
          <div className="p-4 bg-gray-800 bg-opacity-50 rounded border border-gray-700">
            <p className="text-gray-300 mb-2">La notificación debe incluir:</p>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Identificación del titular de los derechos</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Identificación de la obra infringida</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>
                  El enlace específico en Cinergia donde se encuentra el
                  contenido
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>
                  Una declaración de buena fe de que el uso no está autorizado
                </span>
              </li>
            </ul>
            <p className="text-gray-300 mt-4">
              Envíe esta notificación a:{' '}
              <a
                href="mailto:info@cinergia.lat"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                info@cinergia.lat
              </a>
            </p>
          </div>
        </section>

        {/* Sección 9: Limitación de Responsabilidad */}
        <section className="mb-10 bg-red-900 bg-opacity-20 rounded-lg p-6 border border-red-800">
          <h2 className="text-2xl font-semibold text-white mb-4">
            9. Limitación de Responsabilidad
          </h2>
          <div className="space-y-3 text-gray-300 text-sm">
            <p>
              El Usuario acepta que el uso de la Plataforma es bajo su propio
              riesgo. El servicio se ofrece &quot;tal cual&quot; y &quot;según
              disponibilidad&quot;.
            </p>
            <p>
              MNET no garantiza que el servicio sea ininterrumpido o libre de
              errores. No nos responsabilizamos por la calidad de la conexión a
              Internet del Usuario, ni por fallos técnicos de las plataformas de
              terceros.
            </p>
            <p>
              La responsabilidad total de MNET ante cualquier reclamo estará
              limitada, como máximo, al monto pagado por el Usuario por el
              servicio.
            </p>
            <p>
              MNET E.I.R.L. se reserva el derecho de modificar, suspender o
              interrumpir el Servicio en cualquier momento. En caso de un cierre
              definitivo de la plataforma Cinergia, las licencias otorgadas se
              extinguirán automáticamente sin derecho a reembolso.
            </p>
          </div>
        </section>

        {/* Sección 10: Legislación */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            10. Legislación Aplicable y Resolución de Disputas
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Estos Términos se rigen por las leyes de la República del Perú.
            Cualquier controversia o disputa derivada del uso de la Plataforma
            será sometida a la jurisdicción de los jueces y tribunales del
            distrito judicial de Cusco, Perú.
          </p>
        </section>

        {/* Sección 11: Libro de Reclamaciones */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            11. Libro de Reclamaciones
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Conforme a lo establecido en el Código de Protección y Defensa del
            Consumidor (Ley N° 29571), la Plataforma cuenta con un Libro de
            Reclamaciones virtual a su disposición.
          </p>
        </section>

        {/* Política de Privacidad */}
        <div className="border-t-2 border-gray-700 mt-12 pt-12">
          <h1 className="text-4xl font-bold text-white mb-8">
            Política de Privacidad y Cookies
          </h1>

          <p className="text-gray-300 leading-relaxed mb-8">
            Esta Política describe cómo MNET E.I.R.L. recopila, usa, almacena y
            protege sus datos personales, en estricto cumplimiento de la Ley N°
            29733, Ley de Protección de Datos Personales, y su reglamento, el
            Decreto Supremo N° 016-2024-JUS.
          </p>

          {/* Identidad */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">
              1. Identidad y Domicilio del Titular del Banco de Datos
            </h2>
            <div className="p-4 bg-gray-800 bg-opacity-50 rounded border border-gray-700">
              <div className="space-y-2 text-gray-300">
                <p>
                  <strong className="text-white">Razón Social:</strong> MNET
                  EMPRESA INDIVIDUAL DE RESPONSABILIDAD LIMITADA
                </p>
                <p>
                  <strong className="text-white">RUC:</strong> 20607838250
                </p>
                <p>
                  <strong className="text-white">Domicilio:</strong>{' '}
                  Prolongación Pumacurco N° 650, Barrio San Cristóbal, Distrito,
                  Provincia y Departamento de Cusco, Perú
                </p>
                <p>
                  <strong className="text-white">Correo de Contacto:</strong>{' '}
                  <a
                    href="mailto:info@cinergia.lat"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    info@cinergia.lat
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Banco de Datos */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">
              2. Banco de Datos Personales
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Sus datos personales serán almacenados en el banco de datos
              denominado &quot;Usuarios de Cinergia&quot;, el cual se encuentra
              en proceso de inscripción ante el Registro Nacional de Protección
              de Datos Personales de la Autoridad Nacional de Protección de
              Datos Personales (ANPD).
            </p>
          </section>

          {/* Datos Recopilados */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">
              3. Datos Personales que Recopilamos
            </h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <strong className="text-white">Datos de Registro:</strong>{' '}
                Nombre y Correo Electrónico (proporcionados por el Usuario)
              </div>
              <div>
                <strong className="text-white">Datos de Uso:</strong> Historial
                de &quot;Películas Vistas&quot; y estado de la cuenta
                (activo/inactivo)
              </div>
              <div>
                <strong className="text-white">Datos de Transacción:</strong> No
                recopilamos ni almacenamos números de tarjetas de crédito. Solo
                recibimos de Mercado Pago la confirmación de la transacción
              </div>
              <div>
                <strong className="text-white">Datos de Navegación:</strong>{' '}
                Dirección IP, tipo de navegador, y cookies
              </div>
            </div>
          </section>

          {/* Finalidades */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">
              4. Finalidades del Tratamiento de Datos
            </h2>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-blue-300 mb-3">
                A. Finalidades Principales (Necesarias para el Servicio):
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>
                    Gestionar su registro, identidad y acceso a la Plataforma
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>
                    Procesar sus pagos de alquileres (TVOD) a través de Mercado
                    Pago
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>
                    Habilitar la visualización del Contenido de Alquiler (TVOD)
                    en la plataforma Muse.ia
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>
                    Mostrarle su historial de &quot;Películas Vistas&quot;
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>
                    Brindar soporte técnico o responder a sus consultas
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-300 mb-3">
                B. Finalidades Secundarias (Opcionales, requieren su
                consentimiento):
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>
                    Enviar a su correo electrónico boletines informativos
                    (newsletters)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>
                    Enviar publicidad, promociones y recomendaciones de nuevas
                    películas en Cinergia
                  </span>
                </li>
              </ul>
              <p className="text-gray-400 text-sm mt-4">
                Al momento de su registro, solicitaremos su consentimiento
                previo, expreso e inequívoco para estas finalidades secundarias.
                Usted puede revocar este consentimiento en cualquier momento.
              </p>
            </div>
          </section>

          {/* Conservación */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">
              5. Plazo de Conservación de los Datos
            </h2>
            <div className="space-y-3 text-gray-300">
              <p>
                Los datos para las Finalidades Principales se conservarán
                mientras el Usuario mantenga activa su cuenta en Cinergia, y
                posteriormente por los plazos legales aplicables en Perú para la
                defensa de cualquier reclamo.
              </p>
              <p>
                Los datos para las Finalidades Secundarias se conservarán hasta
                que el Usuario revoque su consentimiento (ej. haciendo clic en
                &quot;cancelar suscripción&quot; en un correo).
              </p>
            </div>
          </section>

          {/* Destinatarios */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">
              6. Destinatarios y Transferencia de Datos
            </h2>
            <p className="text-gray-300 mb-4">
              No vendemos ni alquilamos sus datos. Solo compartimos su
              información con los siguientes &quot;Encargados de
              Tratamiento&quot; para poder operar el Servicio:
            </p>
            <ul className="space-y-2 text-gray-300 mb-4">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>
                  <strong className="text-white">Mercado Pago:</strong> Para
                  procesar los pagos
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>
                  <strong className="text-white">Muse.ia:</strong> Para
                  autenticar su acceso y permitir la reproducción del Contenido
                  de Alquiler (TVOD)
                </span>
              </li>
            </ul>
            <div className="p-4 bg-gray-800 bg-opacity-50 rounded border border-gray-700">
              <p className="text-gray-300 text-sm">
                <strong className="text-white">
                  Flujo Transfronterizo de Datos:
                </strong>{' '}
                Los servidores de estos proveedores pueden encontrarse fuera de
                Perú. Al aceptar esta Política, el Usuario otorga su
                consentimiento para este flujo transfronterizo, necesario para
                la ejecución del Servicio.
              </p>
            </div>
          </section>

          {/* Seguridad */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">
              7. Medidas de Seguridad
            </h2>
            <p className="text-gray-300 leading-relaxed">
              MNET ha adoptado las medidas técnicas, organizativas y legales
              necesarias para garantizar la seguridad de sus datos personales y
              evitar su alteración, pérdida o acceso no autorizado.
            </p>
          </section>

          {/* Derechos ARCO */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">
              8. Ejercicio de los Derechos ARCO
            </h2>
            <p className="text-gray-300 mb-4">
              El Usuario puede ejercer sus derechos de Acceso, Rectificación,
              Cancelación y Oposición (ARCO) en cualquier momento.
            </p>
            <div className="space-y-3 text-gray-300">
              <p>
                <strong className="text-white">Procedimiento:</strong> Deberá
                enviar una solicitud al correo{' '}
                <a
                  href="mailto:info@cinergia.lat"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  info@cinergia.lat
                </a>
                , adjuntando una copia de su DNI o Carné de Extranjería.
              </p>
              <p>
                <strong className="text-white">Plazos:</strong> Responderemos a
                su solicitud en los plazos legales establecidos por la normativa
                (ej. 20 días para Acceso, 10 días para
                Rectificación/Cancelación/Oposición).
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">
              9. Política de Cookies
            </h2>

            {/* A. ¿Qué son las Cookies? */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-blue-300 mb-3">
                A. ¿Qué son las Cookies?
              </h3>
              <p className="text-gray-300">
                Son pequeños archivos de texto que se almacenan en su navegador
                cuando visita un sitio web.
              </p>
            </div>

            {/* B. Consentimiento de Cookies */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-blue-300 mb-3">
                B. Consentimiento de Cookies (Aviso Legal)
              </h3>
              <p className="text-gray-300 mb-4">
                En cumplimiento del{' '}
                <strong className="text-white">D.S. 016-2024-JUS</strong> y el
                <strong className="text-white">
                  {' '}
                  Principio de Consentimiento
                </strong>
                , Cinergia no utiliza cookies no esenciales sin su permiso
                explícito. La ley peruana prohíbe el
                <strong className="text-white">
                  {' '}
                  “consentimiento por presunción”
                </strong>
                .
              </p>

              <p className="text-gray-300 mb-4">
                Por ello, al ingresar a Cinergia, le mostraremos un banner de
                cookies que le permitirá:
              </p>

              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>
                  <strong className="text-white">Aceptar todas:</strong> Acepta
                  tanto las cookies esenciales como las no esenciales.
                </li>
                <li>
                  <strong className="text-white">Rechazar todas:</strong>{' '}
                  Rechaza todas las cookies no esenciales.
                </li>
                <li>
                  <strong className="text-white">Configurar:</strong> Le permite
                  elegir qué categorías de cookies no esenciales desea permitir.
                </li>
              </ul>
            </div>

            {/* C. Tipos de Cookies */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-blue-300 mb-3">
                C. Tipos de Cookies que utilizamos
              </h3>

              <div className="space-y-4 text-gray-300">
                {/* Cookies Esenciales */}
                <p>
                  <strong className="text-white">
                    Cookies Esenciales (Necesarias):
                  </strong>{' '}
                  No requieren consentimiento. Son obligatorias para el
                  funcionamiento del sitio.
                </p>
                <p className="ml-4">
                  <strong className="text-blue-300">Propósito:</strong> Mantener
                  su sesión iniciada, procesar compras, gestionar la
                  autenticación de pago (Mercado Pago) y permitir la
                  reproducción segura del video mediante Muse.ia.
                </p>

                {/* Cookies No Esenciales */}
                <p>
                  <strong className="text-white">
                    Cookies No Esenciales (Requieren Consentimiento):
                  </strong>
                </p>
                <p className="ml-4">
                  <strong className="text-blue-300">Propósito:</strong>{' '}
                  Actualmente{' '}
                  <strong className="text-white">no utilizamos</strong>
                  cookies de análisis (Google Analytics) ni de publicidad (Meta
                  Pixel) propias.
                </p>

                {/* Cookies de Terceros */}
                <p>
                  <strong className="text-white">
                    Cookies de Terceros (YouTube):
                  </strong>{' '}
                  Al visualizar contenido gratuito, se incrustan videos de
                  YouTube. Como consecuencia, YouTube (propiedad de Google)
                  instalará sus propias cookies de seguimiento y publicidad.
                </p>
                <p className="ml-4">
                  El control sobre estas cookies puede gestionarse desde nuestro
                  banner de consentimiento y desde la configuración de su cuenta
                  de Google.
                </p>
              </div>
            </div>

            {/* D. Gestión de Cookies */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-blue-300 mb-3">
                D. Gestión de Cookies
              </h3>
              <p className="text-gray-300">
                Puede modificar sus preferencias de cookies en cualquier momento
                a través del banner de configuración de Cinergia o mediante la
                configuración de su navegador web.
              </p>
            </div>
          </section>

          {/* Modificaciones */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">
              10. Modificaciones de la Política
            </h2>
            <p className="text-gray-300 leading-relaxed">
              MNET se reserva el derecho de actualizar o modificar esta Política
              para adaptarla a cambios legislativos, regulatorios o mejoras en
              la Plataforma. Cualquier cambio será comunicado oportunamente al
              Usuario mediante la Plataforma o los canales de contacto
              registrados.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
