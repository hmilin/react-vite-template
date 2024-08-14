// 毫秒数转换为 "h:m:s" 格式的函数
export default function timeToHMS(milliseconds: number) {
  if (Number.isNaN(Number(milliseconds))) return '';
  if (milliseconds < 0) return '0s';
  // 将毫秒数转换为秒
  const totalSeconds = Math.floor(milliseconds / 1000);

  // 计算小时数
  const hours = Math.floor(totalSeconds / 3600);

  // 计算剩余的分钟数
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  // 计算剩余的秒数
  const seconds = (totalSeconds % 3600) % 60;

  // 返回格式化的字符串
  return `${hours ? `${hours}h` : ''}${minutes ? `${minutes}m` : ''}${seconds}s`;
}
