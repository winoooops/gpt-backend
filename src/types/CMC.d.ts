export interface ICMCTrendingParams {
  start: number;
  limit: number;
  time_period: "24h" | "30d" | "7d";
  convert: string;
  convert_id: number;
}