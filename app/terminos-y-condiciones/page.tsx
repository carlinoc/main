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
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Términos y Condiciones de Uso y Políticas de Privacidad
          </h1>
          <p className="text-neutral-400 text-sm md:text-base">
            Fecha de última actualización: 12 de noviembre de 2025
          </p>
          <p className="text-neutral-300 mt-4 leading-relaxed">
            Los presentes Términos y Condiciones de Uso (&quot;Términos&quot;) y
            la Política de Privacidad y Cookies (&quot;Política&quot;) rigen el
            acceso y uso de la plataforma digital Cinergia (en adelante,
            &quot;la Plataforma&quot; o &quot;Cinergia&quot;), accesible a
            través de{' '}
            <a
              href="https://www.cinergia.lat"
              className="text-teal-400 hover:text-teal-300 underline"
            >
              www.cinergia.lat
            </a>
          </p>
          <p className="text-neutral-300 mt-4 leading-relaxed">
            La Plataforma es propiedad de y operada por{' '}
            <strong className="text-white">
              MNET EMPRESA INDIVIDUAL DE RESPONSABILIDAD LIMITADA
            </strong>{' '}
            (en adelante, &quot;MNET&quot;), identificada con RUC N°
            20607838250, con domicilio fiscal en Prolongación Pumacurco N° 650,
            Barrio San Cristóbal, Distrito, Provincia y Departamento de Cusco,
            Perú.
          </p>
          <div className="bg-teal-400/10 border border-teal-400/30 rounded-lg p-4 mt-6">
            <p className="text-teal-300 text-sm">
              Al registrarse o utilizar la Plataforma, usted (en adelante,
              &quot;el Usuario&quot;) acepta haber leído, entendido y estar
              sujeto a estos Términos y a la Política. Si no está de acuerdo,
              por favor absténgase de utilizar nuestros servicios.
            </p>
          </div>
        </header>

        {/* TÉRMINOS Y CONDICIONES */}
        <div className="space-y-8 text-neutral-300">
          <div className="border-t-4 border-teal-400 pt-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              TÉRMINOS Y CONDICIONES DE USO
            </h2>
          </div>

          {/* Sección 1: Definiciones */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              1. DEFINICIONES
            </h2>
            <ul className="space-y-3 ml-4">
              <li className="leading-relaxed">
                <strong className="text-white">Plataforma:</strong> El sitio web
                y servicio Cinergia, propiedad de MNET E.I.R.L.
              </li>
              <li className="leading-relaxed">
                <strong className="text-white">Usuario:</strong> Toda persona
                natural, mayor de edad, que se registra y accede a los servicios
                de la Plataforma.
              </li>
              <li className="leading-relaxed">
                <strong className="text-white">
                  Contenido de Alquiler (TVOD):
                </strong>{' '}
                Películas, series, documentales y otras producciones
                audiovisuales por las cuales MNET posee las licencias legales
                para su alquiler digital por tiempo limitado. Este contenido es
                alojado en plataformas seguras como Muse.ia.
              </li>
              <li className="leading-relaxed">
                <strong className="text-white">Contenido Gratuito:</strong>{' '}
                Catálogo curado de producciones audiovisuales que se encuentran
                disponibles públicamente en plataformas de terceros (ej.
                YouTube) y que Cinergia incorpora (&quot;embebe&quot;) en su
                Plataforma para su visualización.
              </li>
              <li className="leading-relaxed">
                <strong className="text-white">Servicio:</strong> La combinación
                del acceso al Contenido de Alquiler (TVOD) y al Contenido
                Gratuito, junto con las funciones de cuenta de usuario.
              </li>
            </ul>
          </section>

          {/* Sección 2: Objeto del Servicio */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              2. OBJETO DEL SERVICIO
            </h2>
            <p className="leading-relaxed">
              Cinergia es una plataforma legal de streaming que ofrece dos tipos
              de contenido:
            </p>
            <div className="space-y-3 ml-4">
              <div>
                <h3 className="text-xl font-semibold text-teal-400">
                  Contenido de Alquiler (TVOD):
                </h3>
                <p className="leading-relaxed mt-2">
                  Un servicio de alquiler de películas donde el Usuario paga una
                  tarifa para obtener una licencia de visualización limitada.
                  MNET declara que posee las licencias o acuerdos necesarios
                  para la explotación comercial de este contenido.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-teal-400">
                  Contenido Gratuito:
                </h3>
                <p className="leading-relaxed mt-2">
                  Un catálogo de películas y cortos (principalmente alojados en
                  YouTube) que, según nuestro entendimiento, han sido subidos a
                  dichas plataformas por sus propios creadores o titulares de
                  derechos. Cinergia actúa como un curador, facilitando el
                  descubrimiento de este contenido mediante su incorporación
                  (embed) en la Plataforma.
                </p>
              </div>
            </div>
          </section>

          {/* Sección 3: Cuenta de Usuario */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              3. CUENTA DE USUARIO Y REGISTRO
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Para acceder a los Servicios, el Usuario debe ser mayor de 18
                años y registrarse creando una cuenta, proporcionando
                información veraz y actual (Nombre y Correo Electrónico).
              </li>
              <li>
                El Usuario es el único responsable de mantener la
                confidencialidad de su contraseña y de todas las actividades que
                ocurran en su cuenta.
              </li>
              <li>
                El Usuario se compromete a notificar a MNET inmediatamente sobre
                cualquier uso no autorizado de su cuenta.
              </li>
            </ul>
          </section>

          {/* Sección 4: Servicio de Alquiler */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              4. SERVICIO DE ALQUILER (TVOD)
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-teal-400">
                  Proceso de Alquiler:
                </h3>
                <p className="leading-relaxed mt-2">
                  Al pagar la tarifa de alquiler de una película, el Usuario
                  adquiere una licencia personal, intransferible y no exclusiva
                  para ver dicho contenido únicamente a través de la Plataforma
                  de Cinergia.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-teal-400">
                  Plazos de Visualización:
                </h3>
                <p className="leading-relaxed mt-2">
                  Salvo que se indique lo contrario en la descripción de la
                  película:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                  <li>
                    El Usuario dispone de{' '}
                    <strong className="text-white">
                      treinta (30) días calendario
                    </strong>{' '}
                    desde el momento de la compra para iniciar la reproducción
                    (&quot;presionar play&quot;) del contenido.
                  </li>
                  <li>
                    Una vez iniciada la reproducción, el Usuario dispone de{' '}
                    <strong className="text-white">
                      setenta y dos (72) horas
                    </strong>{' '}
                    para terminar de ver el contenido.
                  </li>
                  <li>
                    Pasado cualquiera de estos plazos, la licencia de
                    visualización expirará y el contenido dejará de estar
                    disponible, sin derecho a reembolso.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Sección 5: Pagos */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              5. PAGOS Y PASARELA DE PAGO
            </h2>
            <p className="leading-relaxed">
              Todos los pagos por el Contenido de Alquiler (TVOD) se procesarán
              a través de nuestra pasarela de pago,{' '}
              <strong className="text-white">Mercado Pago</strong>, que acepta
              tarjetas de crédito/débito y Yape.
            </p>
            <div className="bg-orange-400/10 border border-orange-400/30 rounded-lg p-4 mt-4">
              <h3 className="text-lg font-semibold text-orange-300 mb-2">
                Limitación de Responsabilidad de Pagos:
              </h3>
              <p className="text-orange-200 text-sm leading-relaxed">
                MNET E.I.R.L. no almacena, procesa ni tiene acceso a la
                información completa de las tarjetas de crédito o débito del
                Usuario. Todo el proceso de pago se realiza en los servidores
                seguros de Mercado Pago. MNET no será responsable por fallos en
                el sistema de la pasarela de pago, denegación de transacciones
                por parte de la entidad bancaria, o cualquier incidente
                relacionado con el procesamiento del pago.
              </p>
            </div>
          </section>

          {/* Sección 6: Reembolsos */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              6. POLÍTICA DE REEMBOLSOS Y DERECHO DE DESISTIMIENTO
            </h2>
            <p className="leading-relaxed">
              Dada la naturaleza digital del servicio, todas las ventas de
              alquiler son consideradas finales.
            </p>
            <div className="space-y-3 mt-4">
              <div>
                <h3 className="text-xl font-semibold text-teal-400">
                  Derecho de Desistimiento (Arrepentimiento):
                </h3>
                <p className="leading-relaxed mt-2">
                  De acuerdo con el Código de Protección y Defensa del
                  Consumidor, el Usuario tiene derecho a solicitar la anulación
                  y el reembolso de un alquiler. Sin embargo, este derecho se
                  ejerce bajo la siguiente condición:
                </p>
                <div className="bg-blue-400/10 border border-blue-400/30 rounded-lg p-4 mt-3">
                  <p className="text-blue-200 text-sm">
                    El Usuario puede solicitar el reembolso total del alquiler{' '}
                    <strong>
                      únicamente si aún no ha iniciado la reproducción del
                      contenido
                    </strong>{' '}
                    (es decir, no ha presionado &quot;play&quot;).
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-teal-400">
                  Pérdida del Derecho:
                </h3>
                <p className="leading-relaxed mt-2">
                  El derecho de desistimiento se extingue automáticamente en el
                  momento en que el Usuario inicia la reproducción (presiona
                  &quot;play&quot;) del contenido alquilado, ya que el servicio
                  se considera ejecutado.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-teal-400">
                  Proceso de Devolución:
                </h3>
                <p className="leading-relaxed mt-2">
                  Si un reembolso es aprobado (por no haberse visto el
                  contenido), MNET solicitará la devolución a través de Mercado
                  Pago. El Usuario acepta que los plazos para que el dinero se
                  refleje en su cuenta o tarjeta dependerán exclusivamente de
                  los procedimientos de Mercado Pago y de la entidad bancaria
                  emisora de su tarjeta, sobre los cuales MNET no tiene control.
                </p>
              </div>
            </div>
          </section>

          {/* Sección 7: Propiedad Intelectual */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              7. PROPIEDAD INTELECTUAL Y CONTENIDO
            </h2>
            <div className="space-y-3">
              <div>
                <h3 className="text-xl font-semibold text-teal-400">
                  Nuestra Propiedad:
                </h3>
                <p className="leading-relaxed mt-2">
                  La marca &quot;Cinergia&quot;, los logotipos, el diseño de la
                  Plataforma y todo el software asociado son propiedad exclusiva
                  de MNET E.I.R.L.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-teal-400">
                  Contenido de Alquiler (TVOD):
                </h3>
                <p className="leading-relaxed mt-2">
                  Los derechos de autor de este contenido pertenecen a sus
                  respectivos productores y distribuidores. MNET E.I.R.L. cuenta
                  con las licencias correspondientes para su alquiler.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-teal-400">
                  Contenido Gratuito:
                </h3>
                <p className="leading-relaxed mt-2">
                  Este contenido es propiedad de sus respectivos creadores. MNET
                  no aloja este contenido ni se atribuye su propiedad. Su
                  incorporación se basa en las funcionalidades de
                  &quot;embed&quot; provistas por las plataformas de origen (ej.
                  YouTube).
                </p>
              </div>
            </div>
          </section>

          {/* Sección 8: Safe Harbor */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              8. PROCEDIMIENTO DE NOTIFICACIÓN Y RETIRO (Safe Harbor)
            </h2>
            <p className="leading-relaxed">
              Para asegurar el respeto a los derechos de autor y diferenciar
              nuestro modelo legal de curación de contenido de otras plataformas
              que facilitan la infracción, MNET establece el siguiente
              procedimiento:
            </p>
            <p className="leading-relaxed mt-3">
              MNET E.I.R.L. respeta los derechos de propiedad intelectual de
              terceros. Aunque no alojamos el Contenido Gratuito, si usted es
              titular de derechos de autor y considera que un contenido
              incorporado desde una plataforma de terceros (como YouTube)
              infringe sus derechos, le solicitamos que nos envíe una
              notificación formal.
            </p>
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-4 mt-4">
              <h3 className="text-lg font-semibold text-white mb-3">
                La notificación debe incluir:
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-2 text-sm">
                <li>Identificación del titular de los derechos.</li>
                <li>Identificación de la obra infringida.</li>
                <li>
                  El enlace específico en Cinergia donde se encuentra el
                  contenido.
                </li>
                <li>
                  Una declaración de buena fe de que el uso no está autorizado.
                </li>
              </ul>
              <p className="mt-4 text-sm">
                Por favor, envíe esta notificación a:{' '}
                <a
                  href="mailto:info@cinergia.lat"
                  className="text-teal-400 hover:text-teal-300 underline font-semibold"
                >
                  info@cinergia.lat
                </a>
              </p>
            </div>
            <p className="leading-relaxed mt-3">
              MNET se compromete a revisar la solicitud y, de ser procedente,
              retirar el enlace o contenido incorporado de la Plataforma a la
              brevedad posible.
            </p>
          </section>

          {/* Sección 9: Limitación de Responsabilidad */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              9. LIMITACIÓN DE RESPONSABILIDAD
            </h2>
            <p className="leading-relaxed">
              El Usuario acepta que el uso de la Plataforma es bajo su propio
              riesgo. El servicio se ofrece &quot;tal cual&quot; y &quot;según
              disponibilidad&quot;.
            </p>
            <p className="leading-relaxed">
              MNET no garantiza que el servicio sea ininterrumpido o libre de
              errores. No nos responsabilizamos por la calidad de la conexión a
              Internet del Usuario, ni por fallos técnicos de las plataformas de
              terceros (Muse.ia, YouTube, Mercado Pago).
            </p>
            <p className="leading-relaxed">
              La responsabilidad total de MNET ante cualquier reclamo estará
              limitada, como máximo, al monto pagado por el Usuario por el
              servicio (el costo del alquiler).
            </p>
          </section>

          {/* Sección 10: Legislación */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              10. LEGISLACIÓN APLICABLE Y RESOLUCIÓN DE DISPUTAS
            </h2>
            <p className="leading-relaxed">
              Estos Términos se rigen por las leyes de la República del Perú.
              Cualquier controversia o disputa derivada del uso de la Plataforma
              será sometida a la jurisdicción de los jueces y tribunales del
              distrito judicial de Cusco, Perú.
            </p>
          </section>

          {/* Sección 11: Libro de Reclamaciones */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              11. LIBRO DE RECLAMACIONES
            </h2>
            <p className="leading-relaxed">
              Conforme a lo establecido en el Código de Protección y Defensa del
              Consumidor (Ley N° 29571), la Plataforma cuenta con un Libro de
              Reclamaciones virtual a su disposición.
            </p>
          </section>

          {/* POLÍTICA DE PRIVACIDAD */}
          <div className="border-t-4 border-teal-400 pt-6 mt-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              POLÍTICA DE PRIVACIDAD Y COOKIES
            </h2>
            <p className="text-neutral-300 leading-relaxed">
              Esta Política describe cómo MNET E.I.R.L. recopila, usa, almacena
              y protege sus datos personales, en estricto cumplimiento de la Ley
              N° 29733, Ley de Protección de Datos Personales, y su reglamento,
              el Decreto Supremo N° 016-2024-JUS.
            </p>
          </div>

          {/* Privacidad Sección 1 */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              1. IDENTIDAD Y DOMICILIO DEL TITULAR DEL BANCO DE DATOS
            </h2>
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6">
              <ul className="space-y-2">
                <li>
                  <strong className="text-white">Razón Social:</strong> MNET
                  EMPRESA INDIVIDUAL DE RESPONSABILIDAD LIMITADA
                </li>
                <li>
                  <strong className="text-white">RUC:</strong> 20607838250
                </li>
                <li>
                  <strong className="text-white">Domicilio:</strong>{' '}
                  Prolongación Pumacurco N° 650, Barrio San Cristóbal, Distrito,
                  Provincia y Departamento de Cusco, Perú.
                </li>
                <li>
                  <strong className="text-white">Correo de Contacto:</strong>{' '}
                  <a
                    href="mailto:info@cinergia.lat"
                    className="text-teal-400 hover:text-teal-300 underline"
                  >
                    info@cinergia.lat
                  </a>
                </li>
              </ul>
            </div>
          </section>

          {/* Privacidad Sección 2 */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              2. BANCO DE DATOS PERSONALES
            </h2>
            <p className="leading-relaxed">
              Sus datos personales serán almacenados en el banco de datos
              denominado{' '}
              <strong className="text-white">
                &quot;Usuarios de Cinergia&quot;
              </strong>
              , el cual se encuentra en proceso de inscripción ante el Registro
              Nacional de Protección de Datos Personales de la Autoridad
              Nacional de Protección de Datos Personales (ANPD).
            </p>
          </section>

          {/* Privacidad Sección 3 */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              3. DATOS PERSONALES QUE RECOPILAMOS
            </h2>
            <p className="leading-relaxed">
              Recopilamos las siguientes categorías de datos:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong className="text-white">
                  Datos de Registro (proporcionados por el Usuario):
                </strong>{' '}
                Nombre y Correo Electrónico.
              </li>
              <li>
                <strong className="text-white">
                  Datos de Uso (generados en la Plataforma):
                </strong>{' '}
                Historial de &quot;Películas Vistas&quot; y estado de la cuenta
                (activo/inactivo).
              </li>
              <li>
                <strong className="text-white">Datos de Transacción:</strong> No
                recopilamos ni almacenamos números de tarjetas de crédito. Solo
                recibimos de Mercado Pago la confirmación de la transacción.
              </li>
              <li>
                <strong className="text-white">Datos de Navegación:</strong>{' '}
                Dirección IP, tipo de navegador, y cookies.
              </li>
            </ul>
          </section>

          {/* Privacidad Sección 4 */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              4. FINALIDADES DEL TRATAMIENTO DE DATOS
            </h2>
            <p className="leading-relaxed">
              Sus datos se utilizan para las siguientes finalidades:
            </p>
            <div className="space-y-4 mt-4">
              <div>
                <h3 className="text-xl font-semibold text-teal-400">
                  A. Finalidades Principales (Necesarias para el Servicio):
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                  <li>
                    Gestionar su registro, identidad y acceso a la Plataforma.
                  </li>
                  <li>
                    Procesar sus pagos de alquileres (TVOD) a través de Mercado
                    Pago.
                  </li>
                  <li>
                    Habilitar la visualización del Contenido de Alquiler (TVOD)
                    en la plataforma Muse.ia.
                  </li>
                  <li>
                    Mostrarle su historial de &quot;Películas Vistas&quot;.
                  </li>
                  <li>Brindar soporte técnico o responder a sus consultas.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-teal-400">
                  B. Finalidades Secundarias (Opcionales, requieren su
                  consentimiento):
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                  <li>
                    Enviar a su correo electrónico boletines informativos
                    (newsletters).
                  </li>
                  <li>
                    Enviar a su correo electrónico publicidad, promociones y
                    recomendaciones de nuevas películas en Cinergia.
                  </li>
                </ul>
                <div className="bg-blue-400/10 border border-blue-400/30 rounded-lg p-4 mt-3">
                  <p className="text-blue-200 text-sm">
                    Al momento de su registro, solicitaremos su consentimiento
                    previo, expreso e inequívoco (mediante una casilla de
                    verificación separada) para el tratamiento de sus datos con
                    estas finalidades secundarias. Usted puede revocar este
                    consentimiento en cualquier momento.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Privacidad Sección 5 */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              5. PLAZO DE CONSERVACIÓN DE LOS DATOS
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Los datos para las Finalidades Principales se conservarán
                mientras el Usuario mantenga activa su cuenta en Cinergia, y
                posteriormente por los plazos legales aplicables en Perú para la
                defensa de cualquier reclamo.
              </li>
              <li>
                Los datos para las Finalidades Secundarias se conservarán hasta
                que el Usuario revoque su consentimiento (ej. haciendo clic en
                &quot;cancelar suscripción&quot; en un correo).
              </li>
            </ul>
          </section>

          {/* Privacidad Sección 6 */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              6. DESTINATARIOS Y TRANSFERENCIA DE DATOS
            </h2>
            <p className="leading-relaxed">
              No vendemos ni alquilamos sus datos. Solo compartimos su
              información con los siguientes &quot;Encargados de
              Tratamiento&quot; para poder operar el Servicio:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
              <li>
                <strong className="text-white">Mercado Pago:</strong> Para
                procesar los pagos.
              </li>
              <li>
                <strong className="text-white">Muse.ia:</strong> Para autenticar
                su acceso y permitir la reproducción del Contenido de Alquiler
                (TVOD).
              </li>
            </ul>
            <div className="bg-orange-400/10 border border-orange-400/30 rounded-lg p-4 mt-4">
              <h3 className="text-lg font-semibold text-orange-300 mb-2">
                Flujo Transfronterizo de Datos:
              </h3>
              <p className="text-orange-200 text-sm leading-relaxed">
                Los servidores de estos proveedores de servicios (Mercado Pago,
                Muse.ia) pueden encontrarse fuera de Perú. Al aceptar esta
                Política, el Usuario otorga su consentimiento para este flujo
                transfronterizo, necesario para la ejecución del Servicio.
              </p>
            </div>
          </section>

          {/* Privacidad Sección 7 */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              7. MEDIDAS DE SEGURIDAD
            </h2>
            <p className="leading-relaxed">
              MNET ha adoptado las medidas técnicas, organizativas y legales
              necesarias para garantizar la seguridad de sus datos personales y
              evitar su alteración, pérdida o acceso no autorizado.
            </p>
          </section>

          {/* Privacidad Sección 8 */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              8. EJERCICIO DE LOS DERECHOS ARCO
            </h2>
            <p className="leading-relaxed">
              El Usuario puede ejercer sus derechos de Acceso, Rectificación,
              Cancelación y Oposición (ARCO) en cualquier momento.
            </p>
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-4 mt-4">
              <h3 className="text-lg font-semibold text-white mb-2">
                Procedimiento:
              </h3>
              <p className="text-sm mb-3">
                Deberá enviar una solicitud al correo{' '}
                <a
                  href="mailto:info@cinergia.lat"
                  className="text-teal-400 hover:text-teal-300 underline font-semibold"
                >
                  info@cinergia.lat
                </a>
                , adjuntando una copia de su DNI o Carné de Extranjería.
              </p>
              <h3 className="text-lg font-semibold text-white mb-2">Plazos:</h3>
              <p className="text-sm">
                Responderemos a su solicitud en los plazos legales establecidos
                por la normativa (ej. 20 días para Acceso, 10 días para
                Rectificación/Cancelación/Oposición).
              </p>
            </div>
          </section>

          {/* Privacidad Sección 9: Cookies */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              9. POLÍTICA DE COOKIES
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-teal-400">
                  A. ¿Qué son las Cookies?
                </h3>
                <p className="leading-relaxed mt-2">
                  Son pequeños archivos de texto que se almacenan en su
                  navegador cuando visita un sitio web.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-teal-400">
                  B. Consentimiento de Cookies (Aviso Legal):
                </h3>
                <p className="leading-relaxed mt-2">
                  En cumplimiento del D.S. 016-2024-JUS y el Principio de
                  Consentimiento, Cinergia no utiliza cookies no esenciales sin
                  su permiso explícito. La ley peruana prohíbe el
                  &quot;consentimiento por presunción&quot;.
                </p>
                <p className="leading-relaxed mt-2">
                  Por ello, al ingresar a Cinergia, le mostraremos un banner de
                  cookies que le permitirá:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                  <li>
                    <strong className="text-white">Aceptar todas:</strong>{' '}
                    Acepta tanto las esenciales como las no esenciales.
                  </li>
                  <li>
                    <strong className="text-white">Rechazar todas:</strong>{' '}
                    Rechaza las cookies no esenciales.
                  </li>
                  <li>
                    <strong className="text-white">Configurar:</strong> Elegir
                    qué categorías de cookies no esenciales permite.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-teal-400">
                  C. Tipos de Cookies que utilizamos:
                </h3>
                <div className="space-y-3 mt-3">
                  <div className="bg-green-400/10 border border-green-400/30 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-green-300 mb-2">
                      Cookies Esenciales (Necesarias):
                    </h4>
                    <p className="text-green-200 text-sm mb-2">
                      No requieren consentimiento. Son obligatorias para el
                      funcionamiento del sitio.
                    </p>
                    <p className="text-green-200 text-sm">
                      <strong>Propósito:</strong> Mantener su sesión iniciada,
                      procesar el carrito de compra, gestionar la autenticación
                      del pago (Mercado Pago) y permitir la reproducción segura
                      del video (Muse.ia).
                    </p>
                  </div>

                  <div className="bg-blue-400/10 border border-blue-400/30 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-blue-300 mb-2">
                      Cookies No Esenciales (Requieren Consentimiento):
                    </h4>
                    <p className="text-blue-200 text-sm">
                      <strong>Propósito:</strong> Actualmente &quot;por
                      ahora&quot; no utilizamos cookies de análisis (Google
                      Analytics) ni de publicidad (Meta Pixel) propias.
                    </p>
                  </div>

                  <div className="bg-purple-400/10 border border-purple-400/30 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-purple-300 mb-2">
                      Cookies de Terceros (YouTube):
                    </h4>
                    <p className="text-purple-200 text-sm">
                      Al visualizar el Contenido Gratuito, se incrustan videos
                      de YouTube. YouTube (propiedad de Google) instalará sus
                      propias cookies de seguimiento y publicidad. El control
                      sobre estas cookies se gestiona a través de nuestro banner
                      de consentimiento y de la propia configuración de su
                      cuenta de Google.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-teal-400">
                  D. Gestión de Cookies:
                </h3>
                <p className="leading-relaxed mt-2">
                  Puede cambiar sus preferencias de cookies en cualquier momento
                  a través de nuestro banner o centro de configuración, y
                  también a través de las opciones de su navegador web.
                </p>
              </div>
            </div>
          </section>

          {/* Privacidad Sección 10 */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              10. MODIFICACIONES DE LA POLÍTICA
            </h2>
            <p className="leading-relaxed">
              MNET se reserva el derecho de modificar esta Política para
              adaptarla a cambios legislativos o novedades de la Plataforma.
              Cualquier cambio será comunicado oportunamente al Usuario.
            </p>
          </section>

          {/* Footer */}
          <div className="border-t border-neutral-700 pt-8 mt-12">
            <p className="text-neutral-500 text-sm text-center">
              Al utilizar Cinergia, reconoces que has leído y comprendido estos
              Términos y Condiciones y Política de Privacidad, y aceptas estar
              vinculado por ellos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
