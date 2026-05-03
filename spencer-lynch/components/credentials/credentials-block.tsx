// spencer-lynch/components/credentials/credentials-block.tsx
import { StadiumYears } from "./stadium-years";
import { Boardrooms } from "./boardrooms";
import { QuietMoney } from "./quiet-money";
import { WorkThatMatters } from "./work-that-matters";
import { AsSeenOn } from "./as-seen-on";

export function CredentialsBlock() {
  return (
    <>
      <StadiumYears />
      <Boardrooms />
      <QuietMoney />
      <WorkThatMatters />
      <AsSeenOn />
    </>
  );
}
