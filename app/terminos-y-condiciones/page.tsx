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
            Términos y Condiciones
          </h1>
          <p className="text-neutral-400 text-sm md:text-base">
            Última actualización:{' '}
            {new Date().toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </header>

        {/* Content */}
        <div className="space-y-8 text-neutral-300">
          {/* Sección 1 */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              1. Aceptación de los Términos
            </h2>
            <p className="leading-relaxed">
              Al acceder y utilizar Cinergia, aceptas estar vinculado por estos
              Términos y Condiciones, todas las leyes y regulaciones aplicables,
              y aceptas que eres responsable del cumplimiento de todas las leyes
              locales aplicables. Si no estás de acuerdo con alguno de estos
              términos, tienes prohibido usar o acceder a este sitio.
            </p>
          </section>

          {/* Sección 2 */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              2. Descripción del Servicio
            </h2>
            <p className="leading-relaxed">
              Cinergia es una plataforma de streaming que ofrece contenido
              audiovisual independiente latinoamericano, incluyendo películas,
              cortometrajes y documentales. El servicio permite a los usuarios:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Acceder a contenido exclusivo de cineastas latinoamericanos
              </li>
              <li>
                Visualizar películas, cortometrajes y documentales en streaming
              </li>
              <li>Crear listas personalizadas de contenido</li>
              <li>
                Acceder al contenido adquirido desde cualquier dispositivo
                compatible
              </li>
            </ul>
          </section>

          {/* Sección 3 */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              3. Registro y Cuenta de Usuario
            </h2>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-teal-400">
                3.1 Creación de Cuenta
              </h3>
              <p className="leading-relaxed">
                Para utilizar ciertos servicios de Cinergia, debes crear una
                cuenta proporcionando información precisa y completa. Eres
                responsable de mantener la confidencialidad de tu cuenta y
                contraseña.
              </p>

              <h3 className="text-xl font-semibold text-teal-400">
                3.2 Responsabilidad
              </h3>
              <p className="leading-relaxed">
                Eres el único responsable de todas las actividades que ocurran
                bajo tu cuenta. Debes notificarnos inmediatamente sobre
                cualquier uso no autorizado de tu cuenta.
              </p>
            </div>
          </section>

          {/* Sección 4 */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              4. Acceso al Contenido y Licencia de Uso
            </h2>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-teal-400">
                4.1 Período de Acceso
              </h3>
              <p className="leading-relaxed">
                Una vez adquirido el contenido, tendrás acceso durante un
                período de{' '}
                <span className="font-semibold text-white">30 días</span> para
                comenzar la reproducción. Desde el momento que inicias la
                reproducción, dispondrás de{' '}
                <span className="font-semibold text-white">7 días</span> para
                completar la visualización.
              </p>

              <h3 className="text-xl font-semibold text-teal-400">
                4.2 Limitaciones de Uso
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  El contenido es para uso personal y no comercial únicamente
                </li>
                <li>
                  No puedes descargar, copiar, reproducir o distribuir el
                  contenido
                </li>
                <li>No puedes compartir tu cuenta con terceros</li>
                <li>
                  El contenido solo puede visualizarse a través de la plataforma
                  Cinergia
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-teal-400">
                4.3 Acceso Multiplataforma
              </h3>
              <p className="leading-relaxed">
                Tendrás acceso a todo el contenido que adquieras desde cualquier
                dispositivo donde inicies sesión con tu cuenta de Cinergia.
              </p>
            </div>
          </section>

          {/* Sección 5 */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              5. Métodos de Pago
            </h2>
            <p className="leading-relaxed">
              Cinergia acepta pagos a través de billeteras electrónicas
              autorizadas, incluyendo pero no limitándose a Plin y Yape. Al
              realizar una compra, aceptas proporcionar información de pago
              válida y autorizar el cargo correspondiente.
            </p>
            <div className="bg-teal-400/10 border border-teal-400/30 rounded-lg p-4 mt-4">
              <p className="text-teal-300 text-sm">
                <strong>Nota:</strong> Todos los pagos son procesados de forma
                segura. Cinergia no almacena información sensible de pago.
              </p>
            </div>
          </section>

          {/* Sección 6 */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              6. Política de Reembolsos
            </h2>
            <p className="leading-relaxed">
              Debido a la naturaleza digital del servicio, las compras de
              contenido son finales. No ofrecemos reembolsos una vez que el
              contenido ha sido adquirido y el acceso ha sido otorgado, excepto
              en circunstancias excepcionales determinadas a nuestra discreción.
            </p>
          </section>

          {/* Sección 7 */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              7. Propiedad Intelectual
            </h2>
            <p className="leading-relaxed">
              Todo el contenido disponible en Cinergia, incluyendo pero no
              limitado a películas, cortometrajes, documentales, imágenes,
              textos, gráficos, logos y código, está protegido por derechos de
              autor y otras leyes de propiedad intelectual. Los derechos
              pertenecen a Cinergia y/o a los creadores del contenido.
            </p>
          </section>

          {/* Sección 8 */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              8. Conducta del Usuario
            </h2>
            <p className="leading-relaxed">
              Al utilizar Cinergia, te comprometes a NO:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Violar cualquier ley local, estatal, nacional o internacional
              </li>
              <li>Compartir credenciales de acceso con terceros</li>
              <li>
                Intentar hackear, descompilar o realizar ingeniería inversa del
                servicio
              </li>
              <li>
                Utilizar bots, scrapers u otras herramientas automatizadas
              </li>
              <li>
                Reproducir, distribuir o crear trabajos derivados del contenido
              </li>
              <li>Eliminar, ocultar o modificar avisos de derechos de autor</li>
            </ul>
          </section>

          {/* Sección 9 */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              9. Privacidad y Protección de Datos
            </h2>
            <p className="leading-relaxed">
              Tu privacidad es importante para nosotros. El uso de información
              personal está regido por nuestra Política de Privacidad. Al
              utilizar Cinergia, consientes la recopilación y uso de tu
              información de acuerdo con dicha política.
            </p>
          </section>

          {/* Sección 10 */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              10. Terminación del Servicio
            </h2>
            <p className="leading-relaxed">
              Nos reservamos el derecho de suspender o terminar tu acceso a
              Cinergia en cualquier momento, sin previo aviso, por conducta que
              consideremos viole estos Términos y Condiciones o sea perjudicial
              para otros usuarios, nosotros o terceros, o por cualquier otra
              razón.
            </p>
          </section>

          {/* Sección 11 */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              11. Limitación de Responsabilidad
            </h2>
            <p className="leading-relaxed">
              Cinergia no será responsable por daños indirectos, incidentales,
              especiales, consecuentes o punitivos, incluyendo sin limitación,
              pérdida de beneficios, datos, uso, buena voluntad u otras pérdidas
              intangibles resultantes de tu acceso o uso, o incapacidad de
              acceder o usar el servicio.
            </p>
          </section>

          {/* Sección 12 */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              12. Modificaciones a los Términos
            </h2>
            <p className="leading-relaxed">
              Nos reservamos el derecho de modificar estos términos en cualquier
              momento. Te notificaremos sobre cambios significativos publicando
              los nuevos términos en la plataforma. Tu uso continuado del
              servicio después de dichos cambios constituye tu aceptación de los
              nuevos términos.
            </p>
          </section>

          {/* Sección 13 */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              13. Ley Aplicable y Jurisdicción
            </h2>
            <p className="leading-relaxed">
              Estos términos se regirán e interpretarán de acuerdo con las leyes
              aplicables en América Latina, sin tener en cuenta sus
              disposiciones sobre conflictos de leyes. Cualquier disputa que
              surja en relación con estos términos será sometida a la
              jurisdicción exclusiva de los tribunales competentes.
            </p>
          </section>

          {/* Sección 14 */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              14. Contacto
            </h2>
            <p className="leading-relaxed">
              Si tienes preguntas sobre estos Términos y Condiciones, puedes
              contactarnos a través de:
            </p>
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6 mt-4">
              <p className="text-white mb-2">
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:soporte@cinergia.lat"
                  className="text-teal-400 hover:text-teal-300 underline"
                >
                  soporte@cinergia.lat
                </a>
              </p>
              <p className="text-white">
                <strong>Sitio web:</strong>{' '}
                <a
                  href="https://cinergia.lat"
                  className="text-teal-400 hover:text-teal-300 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.cinergia.lat
                </a>
              </p>
            </div>
          </section>

          {/* Footer note */}
          <div className="border-t border-neutral-700 pt-8 mt-12">
            <p className="text-neutral-500 text-sm text-center">
              Al utilizar Cinergia, reconoces que has leído y comprendido estos
              Términos y Condiciones y aceptas estar vinculado por ellos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
