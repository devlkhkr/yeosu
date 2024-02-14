export function tmCdToHHmm(tm_cd: string) {
  let tm_cd_hhmm = '';
  switch (tm_cd) {
    case '01':
      tm_cd_hhmm = '10:00';
      break;
    case '02':
      tm_cd_hhmm = '15:30';
      break;
    case '03':
      tm_cd_hhmm = '16:30';
      break;
    default:
      tm_cd_hhmm = '00:00';
      break;
  }
  return tm_cd_hhmm;
}
