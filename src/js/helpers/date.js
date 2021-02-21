import { format } from "date-fns";

/**
 *
 * @param {String} str  - input date
 * @param {String} type - 'yyyy.mm.dd' tamplate for output
 */

export function formatDate(str, type) {
  const date = new Date(str);
  return format(date, type);
}
