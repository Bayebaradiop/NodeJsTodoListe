/**
 * Utilitaires pour les calculs de temps précis
 */
/**
 * Calcule la différence précise entre deux dates
 * @param startDate Date de début
 * @param endDate Date de fin
 * @returns Objet avec la différence décomposée ou null si invalide
 */
export function calculateTimeDifference(startDate, endDate) {
    if (!startDate || !endDate) {
        return null;
    }
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    if (isNaN(start) || isNaN(end) || end <= start) {
        return null;
    }
    const totalMs = end - start;
    const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((totalMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((totalMs % (1000 * 60)) / 1000);
    return {
        days,
        hours,
        minutes,
        seconds,
        totalMs
    };
}
/**
 * Formate une différence de temps en chaîne lisible
 * @param timeDiff Objet TimeDifference
 * @returns Chaîne formatée (ex: "2j 3h 15min 30s")
 */
export function formatTimeDifference(timeDiff) {
    if (!timeDiff)
        return null;
    const { days, hours, minutes, seconds } = timeDiff;
    if (days > 0) {
        return `${days}j ${hours}h ${minutes}min ${seconds}s`;
    }
    else if (hours > 0) {
        return `${hours}h ${minutes}min ${seconds}s`;
    }
    else if (minutes > 0) {
        return `${minutes}min ${seconds}s`;
    }
    else {
        return `${seconds}s`;
    }
}
/**
 * Calcule le temps restant jusqu'à une date donnée
 * @param targetDate Date cible
 * @returns TimeDifference ou null si expiré
 */
export function calculateTimeRemaining(targetDate) {
    if (!targetDate)
        return null;
    const now = new Date().getTime();
    const target = new Date(targetDate).getTime();
    if (isNaN(target) || target <= now) {
        return null; // Expiré ou invalide
    }
    const totalMs = target - now;
    const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((totalMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((totalMs % (1000 * 60)) / 1000);
    return {
        days,
        hours,
        minutes,
        seconds,
        totalMs
    };
}
/**
 * Convertit des millisecondes en objet TimeDifference
 * @param ms Millisecondes
 * @returns TimeDifference
 */
export function msToTimeDifference(ms) {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return {
        days,
        hours,
        minutes,
        seconds,
        totalMs: ms
    };
}
//# sourceMappingURL=timeUtils.js.map