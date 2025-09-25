/**
 * Utilitaires pour les calculs de temps précis
 */
export interface TimeDifference {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    totalMs: number;
}
/**
 * Calcule la différence précise entre deux dates
 * @param startDate Date de début
 * @param endDate Date de fin
 * @returns Objet avec la différence décomposée ou null si invalide
 */
export declare function calculateTimeDifference(startDate: Date | string | null, endDate: Date | string | null): TimeDifference | null;
/**
 * Formate une différence de temps en chaîne lisible
 * @param timeDiff Objet TimeDifference
 * @returns Chaîne formatée (ex: "2j 3h 15min 30s")
 */
export declare function formatTimeDifference(timeDiff: TimeDifference | null): string | null;
/**
 * Calcule le temps restant jusqu'à une date donnée
 * @param targetDate Date cible
 * @returns TimeDifference ou null si expiré
 */
export declare function calculateTimeRemaining(targetDate: Date | string | null): TimeDifference | null;
/**
 * Convertit des millisecondes en objet TimeDifference
 * @param ms Millisecondes
 * @returns TimeDifference
 */
export declare function msToTimeDifference(ms: number): TimeDifference;
//# sourceMappingURL=timeUtils.d.ts.map