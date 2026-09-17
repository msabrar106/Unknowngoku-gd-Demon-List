/**
 * Beräknar poäng baserat på GDDL-tier upphöjt till 2
 * @param {number} rank Position på listan
 * @param {number} percent Percentage of completion
 * @param {number} minpercent Minimum percentage required
 * @param {number} gddl GDDL-tier (1-39)
 * @returns {number}
 */
export function score(rank, percent, minpercent, gddl) {
    // Säkra att gddl är ett giltigt nummer, annars sätt till 0
    const tier = gddl && typeof gddl === 'number' ? gddl : 0;

    // Om nivån är utanför listan eller krav inte uppfylls, ge 0 poäng
    if (rank > 100) return 0;
    if (rank > 75 && percent < 100) return 0;
    if (rank <= 50 && percent < minpercent) return 0;

    // Poängen är enbart GDDL Tier upphöjt till 2
    let finalScore = Math.pow(tier, 2);

    return Math.max(round(finalScore), 0);
}

/**
 * numbers of decimal digits to round to
 */
const scale = 3;

/**
 * Avrundar poängen korrekt (krävs av Prometheus/TheShittyList-mallen)
 */
export function round(num) {
    if (!('' + num).includes('e')) {
        return +(Math.round(num + 'e+' + scale) + 'e-' + scale);
    } else {
        var arr = ('' + num).split('e');
        var sig = '';
        if (+arr[1] + scale > 0) {
            sig = '+';
        }
        return +(
            Math.round(+arr[0] + 'e' + sig + (+arr[1] + scale)) + 'e-' + scale
        );
    }
}
