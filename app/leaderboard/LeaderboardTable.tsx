import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { use } from "react";

const LeaderboardTable = ({
  leaderBoardData,
}: {
  leaderBoardData: Promise<
    {
      userId: number;
      name: string | undefined;
      totalPushups: number | null;
    }[]
  >;
}) => {
  const leaderBoard = use(leaderBoardData);
  return (
    <Table className="text-xl">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaderBoard.map((item) => {
          return (
            <TableRow key={item.userId}>
              <TableCell>{item.name}</TableCell>
              <TableCell className="text-right">{item.totalPushups}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default LeaderboardTable;
