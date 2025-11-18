/**
 * Calculates the months, days, and hours remaining between two dates.
 * @param {string} startDate - The start date in 'YYYY-MM-DDTHH:mm:ss.SSSZ' format.
 * @param {string} endDate - The end date in 'YYYY-MM-DDTHH:mm:ss.SSSZ' format.
 * @returns {string} - A message indicating the remaining time.
 */
interface CalculateTimeToMovie {
  startDate: string;
  endDate: string;
}

export const calculateTimeToMovie = ({
  startDate,
  endDate,
}: CalculateTimeToMovie): string => {
  // Validar que las fechas no sean null, undefined o vacías
  if (!startDate || !endDate) {
    return 'Información de fecha no disponible.';
  }

  try {
    // Parse the dates
    const current = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Validar que las fechas sean válidas
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return 'Fecha inválida.';
    }

    // Validar que startDate sea una fecha pasada con respecto a la fecha actual
    if (start > current) {
      return 'La película aún no está disponible.';
    }

    // Validar que endDate sea mayor que startDate
    if (end <= start) {
      return 'La película ya no está disponible.';
    }

    // Get the difference in milliseconds
    const differenceInMillis: number = end.getTime() - current.getTime();

    // Si la diferencia es negativa o cero, la película ya expiró
    if (differenceInMillis <= 0) {
      return 'La película ya no está disponible.';
    }

    // Calculate the remaining days and hours
    const remainingDays = Math.floor(
      differenceInMillis / (1000 * 60 * 60 * 24),
    );
    const remainingHours = Math.floor(
      (differenceInMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );

    if (remainingDays > 1) {
      return `Quedan ${remainingDays} días para ver la película.`;
    } else if (remainingDays === 1) {
      return 'Queda 1 día para ver la película.';
    } else if (remainingHours > 0) {
      return `Quedan ${remainingHours} horas para ver la película.`;
    } else {
      return 'La película ya no está disponible.';
    }
  } catch (error) {
    console.error('Error calculando tiempo de película:', error);
    return 'Error al calcular el tiempo.';
  }
};
