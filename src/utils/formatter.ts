export const formatNumber = (num: number) => {
  if (num == null) return ""

  if (num >= 1_000_000)
    return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`

  if (num >= 1_000)
    return `${(num / 1_000).toFixed(1).replace(/\.0$/, "")}K`

  return num.toString()
}

export const ordinalSuffix = (num: number) => {
  if (num == null) return ""

  const j = num % 10
  const k = num % 100

  if (k === 11 || k === 12 || k === 13) return `th`
  if (j === 1) return `st`
  if (j === 2) return `nd`
  if (j === 3) return `rd`
  return `th`
}

export const formatTime = (dateStr: string) => {
  const date = new Date(dateStr)
  const formatted = date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return formatted;
}