import { clsx, type ClassValue } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Takes a time string and returns a relative time string in the format
 * `{value}{unit}`, where `{value}` is the number of time units and `{unit}`
 * is one of `m` for minutes, `h` for hours, `d` for days, `w` for weeks,
 * `M` for months, or `Y` for years.
 *
 * @example
 * relativeTime("2022-01-01T12:00:00.000Z") // "1M"
 *
 * @param {string} time - The time string
 * @returns {string} The relative time string
 */
export const relativeTime = (time: string): string => {
  time = moment(time).startOf("second").fromNow();

  return time
    .replace(
      /(\d+)\s*(minute?|hour?|day?|week?|month?|year?)s?/,
      (match, p1, p2) => {
        switch (p2) {
          case "minute":
            return p1 + "m";
          case "hour":
            return p1 + "h";
          case "day":
            return p1 + "d";
          case "week":
            return p1 + "w";
          case "month":
            return p1 + "M";
          case "year":
            return p1 + "Y";
          default:
            return match;
        }
      },
    )
    .replace(" ago", "");
};
